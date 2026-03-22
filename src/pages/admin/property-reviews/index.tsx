import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../theme/themeColor";

import type { FilterData } from "./types";
import SearchBar from "./SearchBar";
import Listing from "./Listing";
import UpdateForm from "./UpdateForm";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchReviewListing } from "../../../features/admin/Review/reviewListingSlice.slice";
import { fetchReviewDetail } from "../../../features/admin/Review/reviewDetailSlice.slice";
import { updateReview } from "../../../features/admin/Review/updateReviewSlice";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

export default function PropertyReviews() {
  const dispatch = useAppDispatch();

  const { reviews, loading, totalRecords } = useAppSelector(
    (state) => state.reviewListingSlice
  );

  const { reviewDetail, loading: detailLoading } = useAppSelector(
    (state) => state.reviewDetailSlice
  );

  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [_selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    search: "",
    status: "",
    rating: "",
    keyword: "",
  };

  const [filterData, setFilterData] = useState<FilterData>(requestBody);

  // ✅ LOCAL STATE FOR SMOOTH TOGGLE
  const [localReviews, setLocalReviews] = useState(reviews);

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    dispatch(fetchReviewListing(requestBody));
  }, [dispatch]);

  // ✅ SNACKBAR STATE
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Pagination
  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    dispatch(fetchReviewListing(updatedFilterData));
  };

  // Filters
  const handleFilterUpdate = (
    name: keyof FilterData,
    value: string,
    apply: boolean = false
  ) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      [name]: value,
    };

    setFilterData(updatedFilterData);

    if (apply) {
      dispatch(fetchReviewListing(updatedFilterData));
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    dispatch(fetchReviewListing(updatedFilterData));
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    dispatch(fetchReviewListing(requestBody));
  };

  // 🔥 SMOOTH TOGGLE + SNACKBAR
  const handleToggleStatus = async (id: number) => {
    const review = localReviews.find((r: any) => r.review_id === id);
    if (!review) return;

    const newStatus: "0" | "1" | "2" = review.status === "1" ? "2" : "1"; // example toggle Approved <-> Rejected

    // ✅ INSTANT UI UPDATE
    setLocalReviews((prev: any[]) =>
      prev.map((r) => (r.review_id === id ? { ...r, status: newStatus } : r))
    );

    try {
      const res = await dispatch(
        updateReview({
          bookingId: id.toString(),
          status: Number(newStatus), 
        })
      ).unwrap();

      showSnackbar(
        res?.message || "Review status updated successfully",
        "success"
      );
    } catch (err: any) {
      setLocalReviews((prev: any[]) =>
        prev.map((r) =>
          r.review_id === id ? { ...r, status: review.status } : r
        )
      );

      showSnackbar(err?.message || "Failed to update status", "error");
    }
  };

  const handleFormClose = () => {
    setFormShow(false);
    setSelectedReviewId(null);
  };

  const handleFormShow = (id?: string) => {
    if (!id) return;

    setSelectedReviewId(id);
    setFormShow(true);

    dispatch(fetchReviewDetail(id));
  };

  const handleUpdateReview = (_values: any) => {
    dispatch(fetchReviewListing(filterData));
    showSnackbar("Review updated successfully", "success");
  };

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <SearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
      />

      <Listing
        ThemeColors={ThemeColors}
        reviewsListing={localReviews} // ✅ USE LOCAL STATE
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handleFormShow={handleFormShow}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        handleToggleStatus={handleToggleStatus} // ✅ PASS THIS
      />

      {formshow && (
        <UpdateForm
          reviewDetail={reviewDetail}
          loading={detailLoading}
          formshow={formshow}
          handleFormClose={handleFormClose}
          handleUpdateReview={handleUpdateReview}
        />
      )}

      {/* ✅ GLOBAL SNACKBAR */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}
