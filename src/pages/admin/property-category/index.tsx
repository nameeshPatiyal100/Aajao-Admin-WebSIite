import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ConfirmDeleteModal } from "../../../components";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";

const COLORS = {
  primary: "#881f9b",
  secondary: "#10b981", // Emerald green
  background: "#f4f5f7", // Soft gray
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

let fakeData: Attendant[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  status: faker.helpers.arrayElement(["1", "0"]),
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

  const requestBody = {
    page: page,
    limit: rowsPerPage,
    keyword: "",
    status: "",
  };

  const [filterData, setFilterData] = useState(requestBody);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (fakeData && fakeData.length > 0) {
      handleCategoryListing(requestBody);
    }
  }, []);

  const handleCategoryListing = (filterData) => {
    setLoading(true);

    let records = [...fakeData];

    // 🔍 Search filter
    if (filterData.keyword) {
      records = records.filter((item) =>
        item.name.toLowerCase().includes(filterData.keyword.toLowerCase())
      );
    }

    // 🔄 Status filter
    if (filterData.status !== "") {
      records = records.filter((item) => item.status === filterData.status);
    }
    setTotalRecords(records.length);

    // 📄 Pagination (API-style)
    const startIndex = (filterData.page - 1) * filterData.limit;
    const endIndex = startIndex + filterData.limit;

    const paginatedRecords = records.slice(startIndex, endIndex);

    setCategoryListing(paginatedRecords);
    setLoading(false);
  };

  const handlePaginate = (event, value) => {
    const updatedFilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    handleCategoryListing(updatedFilterData);
  };

  const handleFilterUpdate = async (name, value, boolen = false) => {
    let updatedFilterData;
    updatedFilterData = {
      ...filterData,
      [name]: value,
    };
    setFilterData(updatedFilterData);
    if (boolen === true) {
      handleCategoryListing(updatedFilterData);
    }
  };

  const handleFilter = () => {
    let updatedFilterData = {
      ...filterData,
      page: 1,
    };
    setPage(1);
    handleCategoryListing(updatedFilterData);
  };

  const handleClear = () => {
    setFilterData(requestBody);
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

  const handleFormShow = async (id) => {
    try {
      if (id) {
        const result =
          categoryListing && categoryListing.find((cat) => cat.id === id);
        setFormData(result);
      }
    } catch (error) {}
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = () => {
    if (!deleteCategoryId) return;
    fakeData = fakeData.filter((cat) => cat.id !== deleteCategoryId);
    const remainingItems = fakeData.filter((cat) => {
      if (filterData.keyword) {
        return cat.name
          .toLowerCase()
          .includes(filterData.keyword.toLowerCase());
      }
      return true;
    }).length;

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
      const newRecord = {
        id: faker.string.uuid(),
        name: values.name,
        status: values.status,
      };
      fakeData.unshift(newRecord);
    }

    // Refresh listing
    handleCategoryListing(filterData);
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        fontFamily: "Inter', sans-serif",
      }}
    >
      {/* Header Section */}
      <SearchBar
        COLORS={COLORS}
        filterData={filterData}
        handleFormShow={handleFormShow}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
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
        setPage={setPage}
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

      {formshow === true && (
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
