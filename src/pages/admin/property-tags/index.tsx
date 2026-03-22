import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";
import type { FilterData } from "./types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchPropertyTags } from "../../../features/admin/propertyTag/propertyTag.thunk";
import { changePropertyTagStatus } from "../../../features/admin/propertyTag/propertyTagStatus.slice";
import { deletePropertyTag } from "../../../features/admin/propertyTag/propertyTagDelete.slice";

// ✅ SNACKBAR
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

export default function PropertyTag() {
  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [tagId, setTagId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { tags, loading, pagination } = useAppSelector(
    (state) => state.propertyTag
  );

  const totalRecords = pagination?.totalRecords;
  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    search: "",
    status: "",
  };

  useEffect(() => {
    dispatch(fetchPropertyTags(requestBody));
  }, [dispatch]);

  const [filterData, setFilterData] = useState<FilterData>(requestBody);
  const [deleteTagId, setDeleteTagId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ✅ LOCAL SNACKBAR STATE
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [localTags, setLocalTags] = useState(tags);

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    console.log("SNACKBAR TRIGGERED:", message);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    dispatch(fetchPropertyTags(updatedFilterData));
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
      dispatch(fetchPropertyTags(updatedFilterData));
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    dispatch(fetchPropertyTags(updatedFilterData));
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    dispatch(fetchPropertyTags(requestBody));
  };

  const handleToggleActive = async (id: number) => {
    const tag = localTags.find((t) => t.tag_id === id);
    if (!tag) return;

    const newStatus = Number(tag.tag_isActive) === 1 ? 0 : 1;

    // ✅ INSTANT UI UPDATE (smooth switch)
    setLocalTags((prev) =>
      prev.map((t) =>
        t.tag_id === id ? { ...t, tag_isActive: String(newStatus) } : t
      )
    );

    try {
      const res = await dispatch(
        changePropertyTagStatus({
          tagId: id,
          tag_isActive: newStatus === 1 ? "1" : "0",
        })
      ).unwrap();

      showSnackbar(res?.message || "Status updated", "success");
    } catch (err: any) {
      // ❌ revert if API fails
      setLocalTags((prev) =>
        prev.map((t) =>
          t.tag_id === id ? { ...t, tag_isActive: tag.tag_isActive } : t
        )
      );

      showSnackbar(err?.message || "Failed to update", "error");
    }
  };

  const handleFormClose = () => {
    setFormShow(false);
    setTagId(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) setTagId(id);
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTagId(id);
    setIsDeleteModalOpen(true);
  };

  // ✅ DELETE TAG
  const handleDeleteTag = async () => {
    if (!deleteTagId) return;

    try {
      const res = await dispatch(
        deletePropertyTag({ tagId: deleteTagId })
      ).unwrap();

      showSnackbar(res?.message || "Tag deleted successfully", "success");

      dispatch(fetchPropertyTags(filterData));
      setIsDeleteModalOpen(false);
      setDeleteTagId(null);
    } catch (err: any) {
      showSnackbar(err?.message || "Failed to delete tag", "error");
    }
  };
  const handleFormSuccess = (message: string) => {
    showSnackbar(message, "success");
  };

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <SearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        handleFormShow={handleFormShow}
      />

      {/* Listing */}
      <Listing
        ThemeColors={ThemeColors}
        // tags={tags}
        tags={localTags}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handleFormShow={handleFormShow}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        handleToggleActive={handleToggleActive}
        handleDeleteClick={handleDeleteClick}
      />

      {/* Delete Modal */}
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTag}
        title="Delete Tag"
        description="Are you sure you want to permanently remove this Tag?"
      />

      {/* Form */}
      {formshow && (
        <AddUpdateForm
          tagId={tagId}
          formshow={formshow}
          handleFormClose={handleFormClose}
          filterData={filterData}
          onSuccess={handleFormSuccess} // ✅ IMPORTANT
        />
      )}

      {/* ✅ SNACKBAR */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}
