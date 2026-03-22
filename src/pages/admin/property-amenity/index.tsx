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
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

export default function PropertyAmenity() {
  const [page, setPage] = useState(1);
  const [formshow, setFormShow] = useState(false);
  const [amenetiesId, setAmenetiesId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { amenities, loading, pagination } = useAppSelector(
    (state) => state.propertyAmenity
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
    dispatch(fetchPropertyAmenities(requestBody));
  }, [dispatch]);

  const [filterData, setFilterData] = useState<FilterData>(requestBody);

  // ✅ LOCAL STATE FOR SMOOTH TOGGLE
  const [localAmenities, setLocalAmenities] = useState(amenities);

  useEffect(() => {
    setLocalAmenities(amenities);
  }, [amenities]);

  const [deleteAmenityId, setDeleteAmenityId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ✅ SNACKBAR STATE
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
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
    dispatch(fetchPropertyAmenities(updatedFilterData));
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

  // 🔥 SMOOTH TOGGLE + SNACKBAR
  const handleToggleActive = async (id: number) => {
    const amenity = localAmenities.find((amn) => amn.amn_id === id);
    if (!amenity) return;
    const newStatus: "0" | "1" = amenity.amn_isActive === "1" ? "0" : "1";
    setLocalAmenities((prev) =>
      prev.map((a) => (a.amn_id === id ? { ...a, amn_isActive: newStatus } : a))
    );

    try {
      const res = await dispatch(
        changePropertyAmenityStatus({
          amenetiesId: id,
          amn_isActive: newStatus, // ✅ NO String()
        })
      ).unwrap();

      showSnackbar(
        res?.message ||
          `Amenity ${
            newStatus === "1" ? "activated" : "deactivated"
          } successfully`,
        "success"
      );
    } catch (err: any) {
      setLocalAmenities((prev) =>
        prev.map((a) =>
          a.amn_id === id ? { ...a, amn_isActive: amenity.amn_isActive } : a
        )
      );

      showSnackbar(err?.message || "Failed to update status", "error");
    }
  };

  const handleFormClose = () => {
    setFormShow(false);
    setAmenetiesId(null);
  };

  const handleFormShow = (id?: string) => {
    if (id) setAmenetiesId(id);
    setFormShow(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteAmenityId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAmenity = async () => {
    if (!deleteAmenityId) return;

    try {
      const res = await dispatch(
        deletePropertyAmenity({ amenetiesId: deleteAmenityId })
      ).unwrap();

      showSnackbar(res?.message || "Amenity deleted successfully", "success");

      dispatch(fetchPropertyAmenities(filterData));
      setIsDeleteModalOpen(false);
      setDeleteAmenityId(null);
    } catch (err: any) {
      showSnackbar(err?.message || "Failed to delete amenity", "error");
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
      <SearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        handleFormShow={handleFormShow}
      />

      <Listing
        ThemeColors={ThemeColors}
        amenities={localAmenities}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handleFormShow={handleFormShow}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        handleToggleActive={handleToggleActive}
        handleDeleteClick={handleDeleteClick}
      />

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
          showSnackbar={showSnackbar}
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
