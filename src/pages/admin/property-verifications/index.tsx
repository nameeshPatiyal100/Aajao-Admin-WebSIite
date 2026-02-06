import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";

import Listing from "../properties/Listing";
import SearchBar from "./SearchBar";
import type { FilterData } from "../properties/types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProperties } from "../../../features/admin/properties/property.thunk";
import { changePropertyStatus } from "../../../features/admin/properties/propertyStatus.slice";
import { deleteProperty } from "../../../features/admin/properties/propertyDelete.slice";

export default function PropertiesVerifications() {
  // State Management
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const { properties, loading, pagination } = useAppSelector((state) => state.properties);
  const totalRecords = pagination?.totalRecords;

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    search: "",
    status: "",
  };

  const [filterData, setFilterData] = useState<FilterData>(requestBody);
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProperties(requestBody));
  }, [dispatch]);

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    dispatch(fetchProperties(updatedFilterData));
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
      dispatch(fetchProperties(updatedFilterData));
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    dispatch(fetchProperties(updatedFilterData));
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    dispatch(fetchProperties(requestBody));
  };

  const handleToggleActive = async (id: number) => {
    const property = properties.find((t) => t.property_id === id);
    if (!property) return;

    const newStatus: "1" | "0" =
      String(property.is_active) === "true" ? "0" : "1";

    try {
      await dispatch(
        changePropertyStatus({ propertyId: id, status: newStatus }),
      ).unwrap();

      dispatch(fetchProperties(filterData));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletePropertyId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProperty = async () => {
    if (!deletePropertyId) return;
    try {
      await dispatch(deleteProperty({ propertyId: deletePropertyId })).unwrap();
      dispatch(fetchProperties(filterData));
      setIsDeleteModalOpen(false);
      setDeletePropertyId(null);
    } catch (err) {
      console.error("Failed to delete property:", err);
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
      />

      {/* Property Table */}
      <Listing
        ThemeColors={ThemeColors}
        properties={properties}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        handleToggleActive={handleToggleActive}
        handleDeleteClick={handleDeleteClick}
      />

      {/* Modals */}
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProperty}
        title="Delete Property"
        description="Are you sure you want to permanently remove this Property?"
      />
    </Box>
  );
}
