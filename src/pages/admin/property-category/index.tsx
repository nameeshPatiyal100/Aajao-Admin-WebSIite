import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ConfirmDeleteModal } from "../../../components";
import { PurpleThemeColor } from "../../../theme/themeColor";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";

const COLORS = {
  primary: PurpleThemeColor,
  secondary: "#10b981",
  background: "#f4f5f7",
  text: {
    primary: "#111827",
    secondary: "#6b7280",
  },
};

interface Attendant {
  id: string;
  name: string;
  status: "1" | "0";
}

interface FilterData {
  status: string;
  keyword: string;
  [key: string]: any;
}

let fakeData: Attendant[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  status: faker.helpers.arrayElement(["1", "0"]) as "1" | "0",
}));

export default function PropertyCategory() {
  // State Management
  const [categoryListing, setCategoryListing] = useState<Attendant[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<Attendant | null>(null);
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
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    handleCategoryListing(requestBody);
  }, []);

  const handleCategoryListing = (filter: FilterData) => {
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

    setCategoryListing(paginatedRecords);
    setLoading(false);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    handleCategoryListing(updatedFilterData);
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
      handleCategoryListing(updatedFilterData);
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    handleCategoryListing(updatedFilterData);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleCategoryListing(requestBody);
  };

  const handleToggleActive = (id: string) => {
    fakeData = fakeData.map((cat) =>
      cat.id === id ? { ...cat, status: cat.status === "1" ? "0" : "1" } : cat
    );
    handleCategoryListing(filterData);
  };

  const handleFormClose = () => {
    setFormShow(false);
    setFormData(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      const result = categoryListing.find((cat) => cat.id === id) || null;
      setFormData(result);
    }
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = () => {
    if (!deleteCategoryId) return;

    fakeData = fakeData.filter((cat) => cat.id !== deleteCategoryId);

    const remainingItems = fakeData.filter((cat) =>
      filterData.keyword
        ? cat.name.toLowerCase().includes(filterData.keyword.toLowerCase())
        : true
    ).length;

    const totalPages = Math.ceil(remainingItems / rowsPerPage);
    const newPage = page > totalPages ? totalPages : page;

    setPage(newPage || 1);
    handleCategoryListing({ ...filterData, page: newPage || 1 });
    setIsDeleteModalOpen(false);
    setDeleteCategoryId(null);
  };

  const handleAddOrUpdateCategory = (values: Attendant) => {
    if (values.id) {
      // Update
      fakeData = fakeData.map((cat) =>
        cat.id === values.id
          ? { ...cat, name: values.name, status: values.status }
          : cat
      );
    } else {
      // Add
      const newRecord: Attendant = {
        id: faker.string.uuid(),
        name: values.name,
        status: values.status,
      };
      fakeData.unshift(newRecord);
    }

    handleCategoryListing(filterData);
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header Section */}
      {/* <SearchBar
        COLORS={COLORS}
        filterData={filterData}
        handleFormShow={handleFormShow}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
      /> */}
      <SearchBar
        COLORS={COLORS}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        handleFormShow={handleFormShow}
      />

      {/* Category Table */}
      <Listing
        COLORS={COLORS}
        categoryListing={categoryListing}
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
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        description="Are you sure you want to permanently remove this category?"
      />

      {formshow && (
        <AddUpdateForm
          formData={formData}
          formshow={formshow}
          handleFormClose={handleFormClose}
          handleAddOrUpdateCategory={handleAddOrUpdateCategory}
        />
      )}
    </Box>
  );
}
