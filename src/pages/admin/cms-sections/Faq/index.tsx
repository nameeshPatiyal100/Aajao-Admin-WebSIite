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
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useAppSelector((state) => state.faqDelete);

  const { data: faqDetailData, loading: detailLoading } = useAppSelector(
    (state) => state.faqDetail
  );

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

  const handleDeleteConfirm = (faq_Id: number) => {
    dispatch(deleteFaq({ faq_Id }));
  };

  /* ================= MAP API → UI ================= */

  useEffect(() => {
    if (data) {
      const mappedFaqs: FaqRecord[] =
        data.sections?.map((faq) => ({
          id: faq.faq_id,
          title: faq.faq_question,
          status: faq.faq_is_active === 1 ? 1 : 0, // ✅ FIX HERE
          created_at: faq.faq_created_at,
        })) || [];

      setFaqListing(mappedFaqs);
      setTotalRecords(data.totalRecords);
    }
  }, [data]);

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

  /* ================= Pagination ================= */

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  /* ================= Filter ================= */

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
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleListing(requestBody);
  };

  /* ================= Edit ================= */

  const handleEditClick = (id: number) => {
    setOpenModal(true);
    dispatch(fetchFaqDetail({ faqId: id }));
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

      {/* ✅ Loader Integration */}
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
        onSubmit={() => {}}
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
        loading={detailLoading} // ✅ NEW
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
