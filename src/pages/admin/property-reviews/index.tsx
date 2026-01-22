import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ThemeColors } from "../../../theme/themeColor";

import type { ReviewRecord, FilterData } from "./types";
import SearchBar from "./SearchBar";
import Listing from "./Listing";
import UpdateForm from "./UpdateForm";

let fakeData: ReviewRecord[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  property: faker.company.name(),
  user_name: faker.person.fullName(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  rating: faker.helpers.arrayElement(["1", "2", "3", "4", "5"]),
  status: faker.helpers.arrayElement(["0", "1", "2"]),
}));

export default function PropertyReviews() {
  // State Management
  const [reviewsListing, setReviewsListing] = useState<ReviewRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<ReviewRecord | null>(null);
  const [formshow, setFormShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    keyword: "",
    status: "",
    rating: "",
  };

  const [filterData, setFilterData] = useState<FilterData>(requestBody);

  useEffect(() => {
    handleReviewsListing(requestBody);
  }, []);

  const handleReviewsListing = (filter: FilterData) => {
    setLoading(true);

    let records = [...fakeData];

    // Search filter
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();

      records = records.filter(
        (item) =>
          item.property.toLowerCase().includes(keyword) ||
          item.user_name.toLowerCase().includes(keyword),
      );
    }

    if (filter.status !== "") {
      records = records.filter((item) => item.status === filter.status);
    }

    if (filter.rating !== "") {
      records = records.filter((item) => item.rating === filter.rating);
    }

    setTotalRecords(records.length);

    // Pagination
    const startIndex = (filter.page - 1) * filter.limit;
    const endIndex = startIndex + filter.limit;
    const paginatedRecords = records.slice(startIndex, endIndex);

    setReviewsListing(paginatedRecords);
    setLoading(false);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    handleReviewsListing(updatedFilterData);
  };

  const handleFilterUpdate = (
    name: keyof FilterData,
    value: string,
    apply: boolean = false,
  ) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      [name]: value,
    };
    setFilterData(updatedFilterData);
    if (apply) {
      handleReviewsListing(updatedFilterData);
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    handleReviewsListing(updatedFilterData);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleReviewsListing(requestBody);
  };

  const handleFormClose = () => {
    setFormShow(false);
    setFormData(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      const result = reviewsListing.find((item) => item.id === id) || null;
      setFormData(result);
    }
    setFormShow(true);
  };

  const handleUpdateReview = (values: any) => {
    if (values.id) {
      // Update
      fakeData = fakeData.map((item) =>
        item.id === values.id ? { ...item, status: values.status } : item,
      );
    }

    handleReviewsListing(filterData);
  };

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header Section */}
      <SearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
      />

      {/* Listing Table */}
      <Listing
        ThemeColors={ThemeColors}
        reviewsListing={reviewsListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handleFormShow={handleFormShow}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
      />

      {formshow && (
        <UpdateForm
          formData={formData}
          formshow={formshow}
          handleFormClose={handleFormClose}
          handleUpdateReview={handleUpdateReview}
        />
      )}
    </Box>
  );
}
