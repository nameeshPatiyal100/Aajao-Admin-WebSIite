import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../theme/themeColor";

import type { ReviewRecord, FilterData } from "./types";
import SearchBar from "./SearchBar";
import Listing from "./Listing";
import UpdateForm from "./UpdateForm";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchReviewListing } from "../../../features/admin/Review/reviewListingSlice.slice";
import { fetchReviewDetail } from "../../../features/admin/Review/reviewDetailSlice.slice";

export default function PropertyReviews() {
  const dispatch = useAppDispatch();

  // Listing State
  const { reviews, loading, totalRecords } = useAppSelector(
    (state) => state.reviewListingSliceReducer
  );

  // Review Detail State
  const { reviewDetail, loading: detailLoading } = useAppSelector(
    (state) => state.reviewDetailSlice
  );

  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

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

  useEffect(() => {
    dispatch(fetchReviewListing(requestBody));
  }, [dispatch]);

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

  // Filter Update
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

  // Modal Controls
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

  const handleUpdateReview = (values: any) => {
    console.log("Updated Review:", values);
    dispatch(fetchReviewListing(filterData));
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
        reviewsListing={reviews}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handleFormShow={handleFormShow}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
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
    </Box>
  );
}

{
  /* <MenuItem value="0">Pending</MenuItem>
<MenuItem value="1">Approved</MenuItem>
<MenuItem value="2">Rejected</MenuItem> */
}
