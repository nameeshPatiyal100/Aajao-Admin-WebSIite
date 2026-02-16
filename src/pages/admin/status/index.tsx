import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../theme/themeColor";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";
import Listing from "./Listing";
import { TableLoader } from "../../../components/admin/common/TableLoader";

import { fetchBookingStatusListingForAdminPage } from "../../../features/admin/BookingStatus/bookingStatusListingForAdminPage.slice";
import { updateBookingStatusAdminPage } from "../../../features/admin/BookingStatus/bookingStatusUpdateSlice";

// import { FilterData } from "./types";

export default function StatusPage() {
  const dispatch = useAppDispatch();

  const {
    loading: updateLoading,
    success,
    error,
  } = useAppSelector((state) => state.updateBookingStatusAdminPage);

  const {
    rows: statusListing,
    pagination,
    loading,
  } = useAppSelector((state) => state.bookingStatusListingForAdminPage);

  const rowsPerPage = pagination.limit || 10;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  useEffect(() => {
    dispatch(
      fetchBookingStatusListingForAdminPage({
        page: 1,
        limit: rowsPerPage,
      })
    );
  }, [dispatch, rowsPerPage]);

  /* ============================
     PAGINATION
  ============================ */
  const handlePaginate = (_: unknown, value: number) => {
    dispatch(
      fetchBookingStatusListingForAdminPage({
        page: value,
        limit: rowsPerPage,
      })
    );
  };

  const handleSaveStatus = (row: {
    bs_id: number;
    bs_title: string;
    bs_code: string | null;
  }) => {
    console.log(row,"Saving status...");
    dispatch(updateBookingStatusAdminPage(row)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setSnackbarMessage("Booking status updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        dispatch(
          fetchBookingStatusListingForAdminPage({
            page: pagination.currentPage,
            limit: rowsPerPage,
          })
        );
      }

      if (res.meta.requestStatus === "rejected") {
        setSnackbarMessage(res.payload || "Something went wrong");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ✅ TABLE LOADER */}
      {loading ||updateLoading ? (
        <TableLoader />
      ) : (
        <Listing
          statusListing={statusListing}
          totalRecords={pagination.totalRecords}
          loading={loading}
          page={pagination.currentPage}
          handlePaginate={handlePaginate}
          rowsPerPage={rowsPerPage}
          onSave={handleSaveStatus}
        />
      )}

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}
