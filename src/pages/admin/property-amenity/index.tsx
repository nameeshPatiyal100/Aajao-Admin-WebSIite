import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";

import Listing from "./Listing";
import SearchBar from "./SearchBar";
import AddUpdateForm from "./AddUpdateForm";
import type { FilterData } from "./types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changePropertyAmenityStatus } from "../../../features/admin/propertyAmenity/propertyAmenityStatus.slice";
import { deletePropertyAmenity } from "../../../features/admin/propertyAmenity/propertyAmenityDelete.slice";
import { fetchPropertyAmenities } from "../../../features/admin/propertyAmenity/propertyAmenity.thunk";

export default function PropertyAmenity() {
  // State Management
  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [amenetiesId, setAmenetiesId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { amenities, loading, pagination } = useAppSelector((state) => state.propertyAmenity);
  const totalRecords = pagination?.totalRecords;

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    search: "",
    status: "",
  };

  useEffect(() => {
    dispatch(fetchPropertyAmenities(requestBody));
  }, [dispatch]);

  const [filterData, setFilterData] = useState<FilterData>(requestBody);
  const [deleteAmenityId, setDeleteAmenityId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    dispatch(fetchPropertyAmenities(updatedFilterData));
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
      dispatch(fetchPropertyAmenities(updatedFilterData));
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    dispatch(fetchPropertyAmenities(updatedFilterData));
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    dispatch(fetchPropertyAmenities(requestBody));
  };

  const handleToggleActive = async (id: number) => {
    const amenity = amenities.find((amn) => amn.amn_id === id);
    if (!amenity) return;

    const newStatus: "1" | "0" = String(amenity.amn_isActive) === "1" ? "0" : "1";

    try {
      await dispatch(
        changePropertyAmenityStatus({ amenetiesId: id, amn_isActive: newStatus }),
      ).unwrap();

      dispatch(fetchPropertyAmenities(filterData));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormClose = () => {
    setFormShow(false);
    setAmenetiesId(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) {
      setAmenetiesId(id);
    }
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteAmenityId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAmenity = async () => {
    if (!deleteAmenityId) return;
    try {
      await dispatch(deletePropertyAmenity({ amenetiesId: deleteAmenityId })).unwrap();
      dispatch(fetchPropertyAmenities(filterData));
      setIsDeleteModalOpen(false);
      setDeleteAmenityId(null);
    } catch (err) {
      console.error("Failed to delete Amenity:", err);
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

      {/* Amenity Table */}
      <Listing
        ThemeColors={ThemeColors}
        amenities={amenities}
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
        onConfirm={handleDeleteAmenity}
        title="Delete Amenity"
        description="Are you sure you want to permanently remove this Amenity?"
      />

      {formshow && (
        <AddUpdateForm
          amenetiesId={amenetiesId}
          formshow={formshow}
          handleFormClose={handleFormClose}
          filterData={filterData}
        />
      )}
    </Box>
  );
}
