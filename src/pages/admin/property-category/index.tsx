import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";
import AppSnackbarContainer from "../../../components/admin/common/AppSnackbarContainer";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";
import type { FilterData } from "./types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPropertyCategories } from "../../../features/admin/propertyCategory/propertyCategory.thunk";
import { changePropertyCategoryStatus } from "../../../features/admin/propertyCategory/propertyCategoryStatus.slice";
import { deletePropertyCategory } from "../../../features/admin/propertyCategory/propertyCategoryDelete.slice";

export default function PropertyCategory() {
  // State Management
  // const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
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

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    dispatch(fetchPropertyCategories(updatedFilterData));
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
      dispatch(fetchPropertyCategories(updatedFilterData));
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    dispatch(fetchPropertyCategories(updatedFilterData));
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    dispatch(fetchPropertyCategories(requestBody));
  };

  const handleToggleActive = async (id: number) => {
    const cat = categories.find((c) => c.cat_id === id);
    if (!cat) return;

    const newStatus: "1" | "0" = cat.cat_isActive === "1" ? "0" : "1";

    try {
      await dispatch(
        changePropertyCategoryStatus({ categoryId: id, status: newStatus }),
      ).unwrap();

      dispatch(fetchPropertyCategories(filterData));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormClose = () => {
    setFormShow(false);
    setCategoryId(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      setCategoryId(id);
    }
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) return;
    try {
      await dispatch(
        deletePropertyCategory({ categoryId: deleteCategoryId }),
      ).unwrap();
      dispatch(fetchPropertyCategories(filterData));
      setIsDeleteModalOpen(false);
      setDeleteCategoryId(null);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
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
          categoryId={categoryId}
          formshow={formshow}
          handleFormClose={handleFormClose}
          filterData={filterData}
        />
      )}
      <AppSnackbarContainer />
    </Box>
  );
}
