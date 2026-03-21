import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../../theme/themeColor";

import FaqSearchBar from "./FaqSearchBar";
import FaqModal from "./FaqModal";
import FaqListing, { FaqRecord } from "./FaqListingSection";
import { TableLoader } from "../../../../components/admin/common/TableLoader";
import CustomSnackbar from "../../../../components/admin/snackbar/CustomSnackbar";

// ✅ RTK
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchFaqListing } from "../../../../features/admin/FAQManagement/faqListing.slice";
import { fetchFaqDetail } from "../../../../features/admin/FAQManagement/faqDetail.slice";
import {
  upsertFaq,
  resetFaqUpsertState, // ✅ FIX ADDED
} from "../../../../features/admin/FAQManagement/faqUpsert.slice";

import {
  deleteFaq,
  resetDeleteFaqState,
} from "../../../../features/admin/FAQManagement/faqDelete.slice";

/* ================= Types ================= */

interface FaqFilterData {
  page: number;
  limit: number;
  keyword: string;
}

/* ================= Component ================= */

export default function FaqManagement() {
  const dispatch = useAppDispatch();

  // ✅ Redux state
  const { data, loading } = useAppSelector((state) => state.faqListing);

  const { success: deleteSuccess, error: deleteError } = useAppSelector(
    (state) => state.faqDelete
  );

  const { data: faqDetailData, loading: detailLoading } = useAppSelector(
    (state) => state.faqDetail
  );

  const {
    success,
    error,
    message,
    loading: faqUpsertLoading,
  } = useAppSelector((state) => state.faqUpsert);

  /* ================= LOCAL STATE ================= */

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [faqListing, setFaqListing] = useState<FaqRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqRecord | null>(null);

  const rowsPerPage = 10;

  const requestBody: FaqFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<FaqFilterData>(requestBody);

  /* ================= API CALL ================= */

  const handleListing = (filter: FaqFilterData) => {
    dispatch(
      fetchFaqListing({
        page: filter.page,
        limit: filter.limit,
        search: filter.keyword,
      })
    );
  };

  useEffect(() => {
    handleListing(filterData);
  }, []);

  /* ================= UPSERT SUCCESS / ERROR ================= */

  useEffect(() => {
    if (success) {
      setSnackbar({
        open: true,
        message: message || "FAQ saved successfully",
        severity: "success",
      });

      handleListing(filterData); // refresh list
      dispatch(resetFaqUpsertState());
      setOpenModal(false);
    }

    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });

      dispatch(resetFaqUpsertState());
    }
  }, [success, error]);

  /* ================= DELETE ================= */

  const handleDeleteConfirm = (faq_Id: number) => {
    dispatch(deleteFaq({ faq_Id }));
  };

  useEffect(() => {
    if (deleteSuccess) {
      setSnackbar({
        open: true,
        message: "FAQ deleted successfully",
        severity: "success",
      });

      handleListing(filterData);
      dispatch(resetDeleteFaqState());
    }

    if (deleteError) {
      setSnackbar({
        open: true,
        message: deleteError,
        severity: "error",
      });

      dispatch(resetDeleteFaqState());
    }
  }, [deleteSuccess, deleteError, dispatch]);

  /* ================= MAP API → UI ================= */

  useEffect(() => {
    if (data) {
      const mappedFaqs: FaqRecord[] =
        data.sections?.map((faq) => ({
          id: faq.faq_id,
          title: faq.faq_question,
          status: faq.faq_is_active === 1 ? 1 : 0,
          created_at: faq.faq_created_at,
        })) || [];

      setFaqListing(mappedFaqs);
      setTotalRecords(data.totalRecords);
    }
  }, [data]);

  /* ================= Pagination ================= */

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  /* ================= Filter ================= */

  const handleFilterUpdate = (key: string, value: string) => {
    setFilterData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFilter = () => {
    const updatedFilter = { ...filterData, page: 1 };
    setPage(1);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleListing(requestBody);
  };

  /* ================= EDIT ================= */

  const handleEditClick = (id: number) => {
    const faq = faqListing.find((f) => f.id === id); // ✅ FIX
    if (faq) {
      setSelectedFaq(faq); // ✅ IMPORTANT
    }

    setOpenModal(true);
    dispatch(fetchFaqDetail({ faqId: id }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmitFaq = (data: {
    title: string;
    description: string;
    status: 0 | 1;
    display_order: number;
  }) => {
    dispatch(
      upsertFaq({
        faq_id: selectedFaq?.id || null,
        faq_question: data.title,
        faq_answer: data.description,
        faq_display_order: data.display_order,
        faq_is_active: data.status,
      })
    );
  };

  /* ================= UI ================= */

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
      }}
    >
      <FaqSearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        onAddClick={() => {
          setSelectedFaq(null);
          setOpenModal(true);
        }}
      />

      {/* ✅ Loader */}
      {loading ? (
        <TableLoader />
      ) : (
        <FaqListing
          faqs={faqListing}
          totalRecords={totalRecords}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePaginate={handlePaginate}
          handleEditClick={handleEditClick}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}

      <FaqModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitFaq}
        initialData={
          faqDetailData
            ? {
                title: faqDetailData.faq_question,
                description: faqDetailData.faq_answer,
                status: faqDetailData.faq_is_active === 1 ? 1 : 0,
                display_order: faqDetailData.faq_display_order,
              }
            : undefined
        }
        loading={detailLoading}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
}
