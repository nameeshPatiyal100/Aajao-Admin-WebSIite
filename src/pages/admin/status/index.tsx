import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../theme/themeColor";

// import Listing from "./Listing";
import { ListingRecord, FilterData } from "./types";
import SearchBar from "./SearchBar";
import Listing from "./Listing";

const STATUSES = [
  { id: 1, name: "Pending", bg_color: "#FEF3C7", text_color: "#92400E" },
  { id: 2, name: "Confirmed", bg_color: "#DCFCE7", text_color: "#166534" },
  { id: 3, name: "Approved", bg_color: "#BBF7D0", text_color: "#14532D" },
  { id: 4, name: "Rejected", bg_color: "#FEE2E2", text_color: "#991B1B" },
  { id: 5, name: "Cancelled", bg_color: "#F3F4F6", text_color: "#374151" },
  { id: 6, name: "Checked in", bg_color: "#E0F2FE", text_color: "#075985" },
  { id: 7, name: "Checked out", bg_color: "#EEF2FF", text_color: "#312E81" },
  { id: 8, name: "No show", bg_color: "#FFEDD5", text_color: "#9A3412" },
  { id: 9, name: "On hold", bg_color: "#FEF9C3", text_color: "#854D0E" },
  { id: 10, name: "Refunded", bg_color: "#CCFBF1", text_color: "#065F46" },
  { id: 11, name: "Expired", bg_color: "#E5E7EB", text_color: "#1F2937" },
] as const;

let fakeData: ListingRecord[] = STATUSES.map((status) => ({
  id: status.id,
  name: status.name,
  bg_color: status.bg_color,
  text_color: status.text_color,
}));

export default function StatusPage() {
  // State Management
  const [statusListing, setStatusListing] = useState<ListingRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<FilterData>(requestBody);

  useEffect(() => {
    handleStatusListing(requestBody);
  }, []);

  const handleStatusListing = (filter: FilterData) => {
    setLoading(true);

    let records = [...fakeData];

    // Search filter
    if (filter.keyword) {
      records = records.filter((item) =>
        item.name.toLowerCase().includes(filter.keyword.toLowerCase()),
      );
    }

    setTotalRecords(records.length);

    // Pagination
    const startIndex = (filter.page - 1) * filter.limit;
    const endIndex = startIndex + filter.limit;
    const paginatedRecords = records.slice(startIndex, endIndex);

    setStatusListing(paginatedRecords);
    setLoading(false);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    handleStatusListing(updatedFilterData);
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
      handleStatusListing(updatedFilterData);
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    handleStatusListing(updatedFilterData);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleStatusListing(requestBody);
  };

  const handleSaveStatus = (updatedRow: ListingRecord) => {
    fakeData = fakeData.map((item) =>
      item.id === updatedRow.id ? updatedRow : item,
    );
    handleStatusListing(filterData);
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
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
      />
      <Listing
        statusListing={statusListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        onSave={handleSaveStatus}
      />
    </Box>
  );
}
