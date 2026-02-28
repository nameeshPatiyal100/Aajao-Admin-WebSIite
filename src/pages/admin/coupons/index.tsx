import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ThemeColors } from "../../../theme/themeColor";

import type { CouponRecord, CouponFormData } from "./types";
import CouponSearchBar from "./CouponSearchBar";
import CouponListing from "./Listing";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import CouponFormModal from "./CouponFormModal";
import DeleteSnackbar from "../../../components/admin/snackbar/DeleteSnackbar";

interface CouponFilterData {
  page: number;
  limit: number;
  keyword: string;
}

let fakeData: CouponRecord[] = Array.from({ length: 50 }).map((_, index) => ({
  coupon_id: index + 1,
  coupon_title: faker.commerce.productName(),
  coupon_code: faker.string.alphanumeric(8).toUpperCase(),
  discount_percentage: faker.number.int({ min: 5, max: 50 }),
  is_active: faker.datatype.boolean(),
}));

export default function CouponManagement() {
  const [couponListing, setCouponListing] = useState<CouponRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState<number | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const rowsPerPage = 10;

  const requestBody: CouponFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<CouponFilterData>(requestBody);

  useEffect(() => {
    handleListing(requestBody);
  }, []);

  const handleListing = (filter: CouponFilterData) => {
    setLoading(true);

    let records = [...fakeData];

    // 🔎 Search filter
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      records = records.filter(
        (item) =>
          item.coupon_title.toLowerCase().includes(keyword) ||
          item.coupon_code.toLowerCase().includes(keyword)
      );
    }

    setTotalRecords(records.length);

    const start = (filter.page - 1) * filter.limit;
    const end = start + filter.limit;

    setCouponListing(records.slice(start, end));
    setLoading(false);
  };

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  const handleFilterUpdate = (
    key: string,
    value: string,
    _isImmediate?: boolean
  ) => {
    setFilterData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFilter = () => {
    const updatedFilter = { ...filterData, page: 1 };
    setPage(1);
    handleListing(updatedFilter);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleListing(requestBody);
  };

  const handleToggleActive = (couponId: number) => {
    fakeData = fakeData.map((coupon) =>
      coupon.coupon_id === couponId
        ? { ...coupon, is_active: !coupon.is_active }
        : coupon
    );

    handleListing(filterData);
  };

  const handleDeleteClick = (couponId: number) => {
    setSelectedCouponId(couponId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCouponId !== null) {
      fakeData = fakeData.filter(
        (coupon) => coupon.coupon_id !== selectedCouponId
      );

      setDeleteOpen(false);
      setSelectedCouponId(null);
      handleListing(filterData);

      // Show snackbar
      setSnackbarOpen(true);
    }
  };
  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedCouponId(null);
  };

  const handleEditClick = (id: number) => {
    setFormMode("edit");
    setEditId(id);
    setFormOpen(true);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFormSubmit = (data: CouponFormData) => {
    if (formMode === "add") {
      fakeData.unshift({
        coupon_id: Date.now(),
        coupon_title: data.coupon_title,
        coupon_code: data.coupon_code,
        discount_percentage: Number(data.discount_percentage) || 0,
        is_active: data.status === 1,
      });
    }

    if (formMode === "edit" && editId !== null) {
      fakeData = fakeData.map((coupon) =>
        coupon.coupon_id === editId
          ? {
              ...coupon,
              coupon_title: data.coupon_title,
              coupon_code: data.coupon_code,
              discount_percentage: Number(data.discount_percentage) || 0,
              is_active: data.status === 1,
            }
          : coupon
      );
    }

    handleListing(filterData);
    setFormOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
        p: 3,
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
        coupons={couponListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePaginate={handlePaginate}
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
        initialData={
          formMode === "edit" && editId !== null
            ? {
                coupon_title:
                  fakeData.find((c) => c.coupon_id === editId)?.coupon_title ||
                  "",
                coupon_code:
                  fakeData.find((c) => c.coupon_id === editId)?.coupon_code ||
                  "",
                discount_percentage:
                  fakeData.find((c) => c.coupon_id === editId)
                    ?.discount_percentage || 0,
                status: fakeData.find((c) => c.coupon_id === editId)?.is_active
                  ? 1
                  : 0,
              }
            : null
        }
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}
