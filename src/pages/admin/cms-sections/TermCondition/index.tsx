import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import TCHeader from "./TCHeader";
import TCListing, { TCRecord } from "./TCListing";
import TCModal from "./TCModal";

import { ThemeColors } from "../../../../theme/themeColor";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchTerms } from "../../../../features/admin/TermsConditions/tcCms.slice";

import {
  fetchTermDetail,
  clearTermDetail,
} from "../../../../features/admin/TermsConditions/detailTerm.slice";

import {
  saveTerm,
  clearSaveTermState,
} from "../../../../features/admin/TermsConditions/addUpdateTerm.slice";

import {
  deleteTerm,
  clearDeleteTermState,
} from "../../../../features/admin/TermsConditions/deleteTerm.slice";

import { TableLoader } from "../../../../components/admin/common/TableLoader";
import CustomSnackbar from "../../../../components/admin/snackbar/CustomSnackbar";

export default function TCManagement() {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.tcCms);

  const { data: detailData, loading: detailLoading } = useAppSelector(
    (state) => state.detailTerm
  );

  const {
    loading: saveLoading,
    success: saveSuccess,
    error: saveError,
  } = useAppSelector((state) => state.addUpdateTerm);

  const { success: deleteSuccess, error: deleteError } = useAppSelector(
    (state) => state.deleteTerm
  );

  /* ================= LOCAL ================= */

  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  /* Snackbar */
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const rowsPerPage = 10;

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(fetchTerms({ page, limit: rowsPerPage, search }));
  }, [dispatch, page, search]);

  /* ================= MAP ================= */

  const records: TCRecord[] =
    data?.terms?.map((item) => ({
      id: item.tc_id,
      title: item.tc_title,
      status: item.tc_isActive === 1 ? 1 : 0,
      created_at: item.tc_created_at,
    })) || [];

  /* ================= HANDLERS ================= */

  const handlePaginate = (_: unknown, value: number) => {
    setPage(value);
  };

  const handleDeleteConfirm = (id: number) => {
    dispatch(deleteTerm({ tc_id: id }));
  };

  const handleEditClick = (id: number) => {
    dispatch(fetchTermDetail({ tc_id: id }));
    setOpenModal(true);
  };

  const handleSubmit = (formData: {
    title: string;
    description: string;
    status: 0 | 1;
  }) => {
    dispatch(
      saveTerm({
        tc_id: detailData?.tc_id,
        tc_title: formData.title,
        tc_description: formData.description,
        tc_type: 1,
        tc_isActive: formData.status,
      })
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearTermDetail());
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  /* ================= SAVE SUCCESS ================= */

  useEffect(() => {
    if (saveSuccess) {
      setSnackbar({
        open: true,
        message: "Saved successfully",
        severity: "success",
      });

      setOpenModal(false);

      dispatch(clearSaveTermState());
      dispatch(clearTermDetail());

      dispatch(fetchTerms({ page, limit: rowsPerPage, search }));
    }

    if (saveError) {
      setSnackbar({
        open: true,
        message: saveError,
        severity: "error",
      });

      dispatch(clearSaveTermState());
    }
  }, [saveSuccess, saveError]);

  /* ================= DELETE SUCCESS ================= */

  useEffect(() => {
    if (deleteSuccess) {
      setSnackbar({
        open: true,
        message: "Deleted successfully",
        severity: "success",
      });

      dispatch(clearDeleteTermState());
      dispatch(fetchTerms({ page, limit: rowsPerPage, search }));
    }

    if (deleteError) {
      setSnackbar({
        open: true,
        message: deleteError,
        severity: "error",
      });

      dispatch(clearDeleteTermState());
    }
  }, [deleteSuccess, deleteError]);

  /* ================= UI ================= */

  return (
    <Box sx={{ backgroundColor: ThemeColors.background, minHeight: "100vh" }}>
      <TCHeader
        ThemeColors={ThemeColors}
        filterData={{ keyword: search }}
        handleFilterUpdate={(key, value) => {
          if (key === "keyword") setSearch(value);
        }}
        handleFilter={() => setPage(1)}
        handleClear={() => {
          setSearch("");
          setPage(1);
        }}
        onAddClick={() => {
          dispatch(clearTermDetail());
          setOpenModal(true);
        }}
      />

      {loading ? (
        <TableLoader text="Loading Terms & Conditions..." />
      ) : records.length === 0 ? (
        <Box textAlign="center" py={4}>
          No Terms & Conditions found
        </Box>
      ) : (
        <TCListing
          terms={records}
          totalRecords={data?.totalRecords || 0}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePaginate={handlePaginate}
          handleEditClick={handleEditClick}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}

      <TCModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        loading={detailLoading || saveLoading}
        initialData={
          detailData
            ? {
                title: detailData.tc_title,
                description: detailData.tc_description,
                status: detailData.tc_isActive === 1 ? 1 : 0,
              }
            : undefined
        }
      />

      {/* ================= SNACKBAR ================= */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}
