import { useEffect, useMemo, useState } from "react";
import { Box, Paper, Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchBookingList } from "../../../features/admin/Bookings/fetchBooking.slice";

import AdminBookingHeader from "./AdminBookingHeader";
import BookingListTable from "./BookingListTable";
import "./index.css";
import { ConfirmDeleteModal } from "../../../components";
import { BookingRow } from "./types";
import BookingDetailModal from "./BookingDetailModal";

const AdminBooking = () => {
  const dispatch = useAppDispatch();

  /* FILTER STATE */
  const [filters, setFilters] = useState({
    keyword: "",
    bookingStatus: "",
    paymentStatus: "",
    category: "",
    fromDate: null as Date | null,
    toDate: null as Date | null,
    limit: 10,
  });

  /* REDUX STATE */
  const {
    data,
    loading,
    totalPages,
    currentPage,
  } = useAppSelector((state) => state.bookingList);

  /* FETCH LIST */
  useEffect(() => {
    dispatch(
      fetchBookingList({
        page: currentPage,
        limit: filters.limit,
      })
    );
  }, [dispatch, currentPage, filters.limit]);

  /* MAP API → TABLE ROWS */
  const rows: BookingRow[] = useMemo(() => {
    return data.map((b) => ({
      id: b.book_id,
      userName: b["userDetails.user_fullName"],
      propertyName: b["bookingProperty.property_name"],
      checkIn: b["bookDetails.bt_book_checkIn"] || "-",
      checkOut: b["bookDetails.bt_book_checkout"] || "-",
      amount: Number(b.book_total_amt),
      bookingStatus: b["bookingStatus.bs_title"],
      statusColor: b["bookingStatus.bs_code"],
      paymentStatus: b.book_is_paid === 1 ? "paid" : "unpaid",
      createdAt: new Date(b.book_added_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));
  }, [data]);

  /* MODALS */
  const [detailOpen, setDetailOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingRow | null>(null);

  /* FILTER HANDLERS */
  const handleFilterUpdate = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    dispatch(fetchBookingList({ page: 1, limit: filters.limit }));
  };

  const handleClear = () => {
    setFilters({
      keyword: "",
      bookingStatus: "",
      paymentStatus: "",
      category: "",
      fromDate: null,
      toDate: null,
      limit: 10,
    });
    dispatch(fetchBookingList({ page: 1, limit: 10 }));
  };

  /* ACTION HANDLERS */
  const handleView = (row: BookingRow) => {
    setSelectedBooking(row);
    setIsEdit(false);
    setDetailOpen(true);
  };

  const handleEdit = (row: BookingRow) => {
    setSelectedBooking(row);
    setIsEdit(true);
    setDetailOpen(true);
  };

  const handleCancel = (row: BookingRow) => {
    console.log("Cancel booking", row);
  };

  const handleDelete = (row: BookingRow) => {
    setSelectedBooking(row);
    setDeleteOpen(true);
  };

  return (
    <Box>
      {/* HEADER */}
      <AdminBookingHeader
        ThemeColors={{ primary: "#881f9b" }}
        filterData={filters}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={applyFilters}
        handleClear={handleClear}
        handleFormShow={() => console.log("Export bookings")}
      />

      {/* LIST */}
      <Paper sx={{ p: 3, borderRadius: "1rem" }}>
        {loading ? (
          <Box textAlign="center" py={4}>
            Loading bookings...
          </Box>
        ) : (
          <BookingListTable
            rows={rows}
            onView={handleView}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" pt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, v) =>
                dispatch(fetchBookingList({ page: v, limit: filters.limit }))
              }
            />
          </Box>
        )}
      </Paper>

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
        title="Delete Booking"
        description="Are you sure you want to permanently remove this booking?"
      />

      {/* DETAIL MODAL */}
      <BookingDetailModal
        open={detailOpen}
        booking={selectedBooking}
        isEdit={isEdit}
        onClose={() => setDetailOpen(false)}
        onSubmit={() => setDetailOpen(false)}
      />
    </Box>
  );
};

export default AdminBooking;
