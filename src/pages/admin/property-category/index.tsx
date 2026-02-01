import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";
import AppSnackbarContainer from "../../../components/admin/common/AppSnackbarContainer";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";
import type { CategoryRecord, FilterData } from "./types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPropertyCategories } from "../../../features/admin/propertyCategory/propertyCategory.thunk";

let fakeData: CategoryRecord[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  status: faker.helpers.arrayElement(["1", "0"]) as "1" | "0",
}));

export default function PropertyCategory() {
  // State Management
  const [categoryListing, setCategoryListing] = useState<CategoryRecord[]>([]);
  // const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<CategoryRecord | null>(null);
  const [formshow, setFormShow] = useState(false);
  // const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector(
    (state) => state.propertyCategory,
  );
  const totalRecords = categories.length;

  // Fetch categories on mount
  
  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    search: "",
    status: "",
  };

  useEffect(() => {
    dispatch(fetchPropertyCategories(requestBody));
  }, [dispatch]);
  const [filterData, setFilterData] = useState<FilterData>(requestBody);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handlecategoryListing = (filter: FilterData) => {

    let records = [...fakeData];

    // Search filter
    if (filter.search) {
      records = records.filter((item) =>
        item.name.toLowerCase().includes(filter.search.toLowerCase()),
      );
    }

    // Status filter
    if (filter.status !== "") {
      records = records.filter((item) => item.status === filter.status);
    }

    // Pagination
    const startIndex = (filter.page - 1) * filter.limit;
    const endIndex = startIndex + filter.limit;
    const paginatedRecords = records.slice(startIndex, endIndex);

    setCategoryListing(paginatedRecords);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    dispatch(fetchPropertyCategories(updatedFilterData))
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
      dispatch(fetchPropertyCategories(updatedFilterData))
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    dispatch(fetchPropertyCategories(updatedFilterData))
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    dispatch(fetchPropertyCategories(requestBody))
  };

  const handleToggleActive = (id: string) => {
    fakeData = fakeData.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "1" ? "0" : "1" }
        : item,
    );
    handlecategoryListing(filterData);
  };

  const handleFormClose = () => {
    setFormShow(false);
    setFormData(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      const result = categoryListing.find((item) => item.id === id) || null;
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

    fakeData = fakeData.filter((item) => item.id !== deleteCategoryId);

    const remainingItems = fakeData.filter((item) =>
      filterData.search
        ? item.name.toLowerCase().includes(filterData.search.toLowerCase())
        : true,
    ).length;

    const totalPages = Math.ceil(remainingItems / rowsPerPage);
    const newPage = page > totalPages ? totalPages : page;

    setPage(newPage || 1);
    handlecategoryListing({ ...filterData, page: newPage || 1 });
    setIsDeleteModalOpen(false);
    setDeleteCategoryId(null);
  };

  const handleAddOrUpdateCategory = (values: CategoryRecord) => {
    if (values.id) {
      // Update
      fakeData = fakeData.map((item) =>
        item.id === values.id
          ? { ...item, name: values.name, status: values.status }
          : item,
      );
    } else {
      // Add
      const newRecord: CategoryRecord = {
        id: faker.string.uuid(),
        name: values.name,
        status: values.status,
      };
      fakeData.unshift(newRecord);
    }

    handlecategoryListing(filterData);
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

      {/* Category Table */}
      <Listing
        ThemeColors={ThemeColors}
        categories={categories}
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
        description="Are you sure you want to permanently remove this Category?"
      />

      {formshow && (
        <AddUpdateForm
          formData={formData}
          formshow={formshow}
          handleFormClose={handleFormClose}
          handleAddOrUpdateCategory={handleAddOrUpdateCategory}
        />
      )}
      <AppSnackbarContainer />
    </Box>
  );
}
