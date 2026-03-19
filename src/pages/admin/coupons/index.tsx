import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../theme/themeColor";

import type { CouponRecord, CouponFormData } from "./types";
import CouponSearchBar from "./CouponSearchBar";
import CouponListing from "./Listing";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import CouponFormModal from "./CouponFormModal";
import DeleteSnackbar from "../../../components/admin/snackbar/DeleteSnackbar";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCouponListing } from "../../../features/admin/Coupons/couponListing";
import { fetchCouponDetail } from "../../../features/admin/Coupons/couponDetailed.slice";
import { saveCoupon } from "../../../features/admin/Coupons/couponUpsert.slice";
import { deleteCoupon } from "../../../features/admin/Coupons/deleteCoupon.slice";
import { updateCouponStatus } from "../../../features/admin/Coupons/updateStatus.slice";

/* ================= TYPES ================= */

interface CouponFilterData {
  page: number;
  limit: number;
  keyword: string;
}

/* ================= COMPONENT ================= */

export default function CouponManagement() {
  const dispatch = useAppDispatch();
  /* ================= REDUX STATE ================= */
  const { coupon: couponDetail, loading: detailLoading } = useAppSelector(
    (state) => state.couponDetailed
  );
  const { loading: saveLoading } = useAppSelector(
    (state) => state.couponUpsert
  );
  const { coupons, totalRecords, loading } = useAppSelector(
    (state) => state.couponListing
  );

  /* ================= LOCAL STATE ================= */

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const rowsPerPage = 10;

  const requestBody: CouponFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<CouponFilterData>(requestBody);

  /* ================= API CALL ================= */

  const handleListing = (filter: CouponFilterData) => {
    dispatch(
      fetchCouponListing({
        page: filter.page,
        limit: filter.limit,
        search: filter.keyword,
        status: "",
      })
    );
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    handleListing(filterData);
  }, []);

  /* ================= PAGINATION ================= */

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  /* ================= FILTER ================= */

  const handleFilterUpdate = (key: string, value: string) => {
    setFilterData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFilter = () => {
    const updatedFilter = { ...filterData, page: 1 };
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    handleListing(requestBody);
  };

  /* ================= DELETE ================= */

  const handleDeleteClick = (couponId: number) => {
    setSelectedCouponId(couponId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteCoupon(selectedCouponId!)).unwrap();
  
      setSnackbarMessage("Coupon deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      handleListing(filterData);
    } catch (err: any) {
      setSnackbarMessage(err);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  
    setDeleteOpen(false);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedCouponId(null);
  };

  /* ================= EDIT ================= */

  const handleEditClick = (id: number) => {
    setFormMode("edit");
    setEditId(id);
    setFormOpen(true);
    dispatch(fetchCouponDetail(id));
  };

  /* ================= ADD / EDIT SUBMIT ================= */

  // const handleFormSubmit = (data: CouponFormData) => {
  //   dispatch(
  //     saveCoupon({
  //       formData: data,
  //       cpn_id: formMode === "edit" ? editId : null, // 🔥 KEY LOGIC
  //     })
  //   ).then(() => {
  //     handleListing(filterData);
  //     setFormOpen(false);
  //   });
  // };
  const handleFormSubmit = async (data: CouponFormData) => {
    try {
      await dispatch(
        saveCoupon({
          formData: data,
          cpn_id: formMode === "edit" ? editId : null,
        })
      ).unwrap();

      // ✅ SUCCESS
      setSnackbarMessage(
        formMode === "edit"
          ? "Coupon updated successfully"
          : "Coupon created successfully"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      handleListing(filterData);
      setFormOpen(false);
    } catch (error: any) {
      // ❌ ERROR
      setSnackbarMessage(error || "Something went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleToggleActive = async (
    id: number,
    newStatus: boolean
  ) => {
    try {
      await dispatch(
        updateCouponStatus({
          cpn_id: id,
          cpn_status: newStatus ? 1 : 0,
        })
      ).unwrap();
  
      setSnackbarMessage("Status updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      handleListing(filterData);
    } catch (err: any) {
      setSnackbarMessage(err);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  /* ================= SNACKBAR ================= */

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  /* ================= DATA MAPPING ================= */

  const mappedCoupons: CouponRecord[] = coupons.map((item) => ({
    coupon_id: Number(item.id),
    coupon_title: item.title,
    coupon_code: item.code,
    discount_percentage: item.discount,
    is_active: item.status === "1",
  }));

  /* ================= RENDER ================= */

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
      }}
    >
      <CouponSearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        onAddClick={() => {
          setFormMode("add");
          setEditId(null);
          setFormOpen(true);
        }}
      />

      <CouponListing
        ThemeColors={ThemeColors}
        coupons={mappedCoupons}
        totalRecords={totalRecords}
        loading={loading}
        page={filterData.page}
        rowsPerPage={rowsPerPage}
        handlePaginate={handlePaginate}
        // handleToggleActive={() => {}} 
        handleToggleActive={handleToggleActive}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <DeleteSnackbar
        open={snackbarOpen}
        message="Coupon deleted successfully"
        type="success"
        onClose={handleCloseSnackbar}
      />

      <CouponFormModal
        open={formOpen}
        mode={formMode}
        initialData={formMode === "edit" ? couponDetail : null}
        loading={detailLoading || saveLoading}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}
