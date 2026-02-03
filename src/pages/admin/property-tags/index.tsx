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

export default function PropertyTag() {
  // State Management
  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [tagId, setTagId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { tags, loading } = useAppSelector((state) => state.propertyTag);
  const totalRecords = tags.length;

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
    apply: boolean = false,
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
    const tag = tags.find((t) => t.tag_id === id);
    if (!tag) return;

    const newStatus: "1" | "0" = String(tag.tag_isActive) === "1" ? "0" : "1";
    console.log(tag);
    console.log(newStatus);

    try {
      await dispatch(
        changePropertyTagStatus({ tagId: id, tag_isActive: newStatus }),
      ).unwrap();

      dispatch(fetchPropertyTags(filterData));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormClose = () => {
    setFormShow(false);
    setTagId(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      setTagId(id);
    }
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTagId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTag = async () => {
    if (!deleteTagId) return;
    try {
      await dispatch(deletePropertyTag({ tagId: deleteTagId })).unwrap();
      dispatch(fetchPropertyTags(filterData));
      setIsDeleteModalOpen(false);
      setDeleteTagId(null);
    } catch (err) {
      console.error("Failed to delete tag:", err);
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

      {/* Tag Table */}
      <Listing
        ThemeColors={ThemeColors}
        tags={tags}
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
          tagId={tagId}
          formshow={formshow}
          handleFormClose={handleFormClose}
          filterData={filterData}
        />
      )}
    </Box>
  );
}
