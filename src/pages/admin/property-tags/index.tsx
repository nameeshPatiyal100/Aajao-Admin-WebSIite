import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";
import type { TagRecord, FilterData } from "./types";

let fakeData: TagRecord[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  status: faker.helpers.arrayElement(["1", "0"]) as "1" | "0",
}));

export default function PropertyTag() {
  // State Management
  const [tagsListing, setTagsListing] = useState<TagRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<TagRecord | null>(null);
  const [formshow, setFormShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    keyword: "",
    status: "",
  };

  const [filterData, setFilterData] = useState<FilterData>(requestBody);
  const [deleteTagId, setDeleteTagId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    handleTagsListing(requestBody);
  }, []);

  const handleTagsListing = (filter: FilterData) => {
    setLoading(true);

    let records = [...fakeData];

    // Search filter
    if (filter.keyword) {
      records = records.filter((item) =>
        item.name.toLowerCase().includes(filter.keyword.toLowerCase())
      );
    }

    // Status filter
    if (filter.status !== "") {
      records = records.filter((item) => item.status === filter.status);
    }

    setTotalRecords(records.length);

    // Pagination
    const startIndex = (filter.page - 1) * filter.limit;
    const endIndex = startIndex + filter.limit;
    const paginatedRecords = records.slice(startIndex, endIndex);

    setTagsListing(paginatedRecords);
    setLoading(false);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    handleTagsListing(updatedFilterData);
  };

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
      handleTagsListing(updatedFilterData);
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    handleTagsListing(updatedFilterData);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleTagsListing(requestBody);
  };

  const handleToggleActive = (id: string) => {
    fakeData = fakeData.map((item) =>
      item.id === id ? { ...item, status: item.status === "1" ? "0" : "1" } : item
    );
    handleTagsListing(filterData);
  };

  const handleFormClose = () => {
    setFormShow(false);
    setFormData(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      const result = tagsListing.find((item) => item.id === id) || null;
      setFormData(result);
    }
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTagId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTag = () => {
    if (!deleteTagId) return;

    fakeData = fakeData.filter((item) => item.id !== deleteTagId);

    const remainingItems = fakeData.filter((item) =>
      filterData.keyword
        ? item.name.toLowerCase().includes(filterData.keyword.toLowerCase())
        : true
    ).length;

    const totalPages = Math.ceil(remainingItems / rowsPerPage);
    const newPage = page > totalPages ? totalPages : page;

    setPage(newPage || 1);
    handleTagsListing({ ...filterData, page: newPage || 1 });
    setIsDeleteModalOpen(false);
    setDeleteTagId(null);
  };

  const handleAddOrUpdateTag = (values: TagRecord) => {
    if (values.id) {
      // Update
      fakeData = fakeData.map((item) =>
        item.id === values.id
          ? { ...item, name: values.name, status: values.status }
          : item
      );
    } else {
      // Add
      const newRecord: TagRecord = {
        id: faker.string.uuid(),
        name: values.name,
        status: values.status,
      };
      fakeData.unshift(newRecord);
    }

    handleTagsListing(filterData);
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
        handleFormShow={handleFormShow}
      />

      {/* Tag Table */}
      <Listing
        ThemeColors={ThemeColors}
        tagsListing={tagsListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handleFormShow={handleFormShow}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        handleToggleActive={handleToggleActive}
        // setPage={setPage}
        handleDeleteClick={handleDeleteClick}
      />

      {/* Modals */}
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTag}
        title="Delete Tag"
        description="Are you sure you want to permanently remove this Tag?"
      />

      {formshow && (
        <AddUpdateForm
          formData={formData}
          formshow={formshow}
          handleFormClose={handleFormClose}
          handleAddOrUpdateTag={handleAddOrUpdateTag}
        />
      )}
    </Box>
  );
}
