import { useMemo, useState } from "react";
import { Box, Paper, Pagination } from "@mui/material";
import AdminBookingHeader from "./AdminBookingHeader";
import BookingListTable from "./BookingListTable";
// import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import "./index.css"
import { ConfirmDeleteModal } from "../../../components";
import { BookingRow } from "./types";
import BookingDetailModal from "./BookingDetailModal";

/* MOCK DATA (replace with API later) */
const MOCK_BOOKINGS: BookingRow[] = [
  {
    id: "BK-1001",
    userName: "Rahul Sharma",
    propertyName: "Palm Residency",
    checkIn: "2025-05-10",
    checkOut: "2025-05-15",
    amount: 12500,
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    createdAt: "2025-05-01",
  },
  {
    id: "BK-1002",
    userName: "Ananya Singh",
    propertyName: "Sea View Villa",
    checkIn: "2025-05-12",
    checkOut: "2025-05-14",
    amount: 8400,
    bookingStatus: "pending",
    paymentStatus: "unpaid",
    createdAt: "2025-05-03",
  },
];

const AdminBooking = () => {
  /* PAGINATION */
  const [page, setPage] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  // const [selectedBooking, setSelectedBooking] =
  useState<BookingRow | null>(null);
  const [isEdit, setIsEdit] = useState(false);

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

  /* DATA STATE */
  const [rows, setRows] = useState<BookingRow[]>(MOCK_BOOKINGS);

  /* DELETE MODAL */
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(
    null
  );

  /* FILTER UPDATE */
  const handleFilterUpdate = (key: string, value: any, autoApply = false) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (autoApply) applyFilters(updated);
  };

  /* APPLY FILTERS */
  const applyFilters = (data = filters) => {
    let filtered = [...MOCK_BOOKINGS];

    if (data.keyword) {
      filtered = filtered.filter(
        (b) =>
          b.id.toLowerCase().includes(data.keyword.toLowerCase()) ||
          b.userName.toLowerCase().includes(data.keyword.toLowerCase()) ||
          b.propertyName.toLowerCase().includes(data.keyword.toLowerCase())
      );
    }

    if (data.bookingStatus) {
      filtered = filtered.filter((b) => b.bookingStatus === data.bookingStatus);
    }

    if (data.paymentStatus) {
      filtered = filtered.filter((b) => b.paymentStatus === data.paymentStatus);
    }

    setPage(0);
    setRows(filtered);
  };

  /* CLEAR FILTERS */
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
    setRows(MOCK_BOOKINGS);
    setPage(0);
  };

  /* PAGINATED DATA */
  const paginatedRows = useMemo(() => {
    const start = page * filters.limit;
    return rows.slice(start, start + filters.limit);
  }, [rows, page, filters.limit]);

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

      {/* LISTING */}
      <Paper sx={{ p: 3, borderRadius: "1rem" }}>
        <BookingListTable
          rows={paginatedRows}
          onView={handleView}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />

        {/* PAGINATION */}
        <Box display="flex" justifyContent="center" pt={3}>
          <Pagination
            count={Math.ceil(rows.length / filters.limit)}
            page={page + 1}
            onChange={(_, v) => setPage(v - 1)}
          />
        </Box>
      </Paper>

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setRows((prev) => prev.filter((b) => b.id !== selectedBooking?.id));
          setDeleteOpen(false);
        }}
        title="Delete Booking"
        description="Are you sure you want to permanently remove this booking?"
      />
      <BookingDetailModal
        open={detailOpen}
        booking={selectedBooking}
        isEdit={isEdit}
        onClose={() => setDetailOpen(false)}
        onSubmit={(data) => {
          console.log("Updated booking", data);
          setDetailOpen(false);
        }}
      />
    </Box>
  );
};

export default AdminBooking;
