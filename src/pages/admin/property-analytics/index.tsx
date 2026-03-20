import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeColors } from "../../../theme/themeColor";

import type { PropertyRecord, PropertyFilterData } from "./types";
import PropertySearchBar from "./PropertySearchBar";
import PropertyListing from "./PropertyListing";
import PropertyEditModal from "./PropertyEditModal";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPropertyAnalytics } from "../../../features/admin/propertyAnalytics/propertyAnalytics.slice";
import { fetchPropertyAnalyticsDetail } from "../../../features/admin/propertyAnalytics/propertyAnalyticsDetail.slice";

export default function PropertyAnalytics() {
  const dispatch = useAppDispatch();

  /* ================= REDUX STATE ================= */
  const { data, loading: detailLoading } = useAppSelector(
    (state) => state.propertyAnalyticsDetail
  );

  const { properties, loading } = useAppSelector(
    (state) => state.propertyAnalytics
  );

  /* ================= LOCAL STATE ================= */

  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyRecord | null>(null);

  const rowsPerPage = 10;

  const requestBody: PropertyFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<PropertyFilterData>(requestBody);

  /* ================= FETCH API ================= */

  useEffect(() => {
    dispatch(fetchPropertyAnalytics());
  }, []);

  /* ================= MAP API → UI ================= */

  const mappedProperties: PropertyRecord[] = properties.map((item) => ({
    id: item.id,
    property_name: item.name,
    host_name: item.hostName,
    max_price: item.price,
    avg_bookings: item.totalBookings,
    is_luxury: item.isLuxury,
    is_active: item.isActive,
  }));

  /* ================= FILTER ================= */

  const filteredData = mappedProperties.filter((item) => {
    if (!filterData.keyword) return true;

    const keyword = filterData.keyword.toLowerCase();

    return (
      item.property_name.toLowerCase().includes(keyword) ||
      item.host_name.toLowerCase().includes(keyword)
    );
  });

  const totalRecords = filteredData.length;

  /* ================= PAGINATION ================= */

  const start = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(start, start + rowsPerPage);

  const handlePaginate = (_: unknown, value: number) => {
    setPage(value);
  };

  /* ================= FILTER HANDLERS ================= */

  const handleFilterUpdate = (
    name: keyof PropertyFilterData,
    value: string
  ) => {
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    setPage(1);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
  };

  /* ================= EDIT ================= */

  const handleEdit = (row: PropertyRecord) => {
    setSelectedProperty(row);
    setModalOpen(true);

    // 🔥 CALL API HERE
    dispatch(fetchPropertyAnalyticsDetail({ propertyId: Number(row.id) }));
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedProperty(null);
  };

  /* ================= RENDER ================= */

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
      }}
    >
      <PropertySearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
      />

      <PropertyListing
        ThemeColors={ThemeColors}
        propertyListing={paginatedData}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePaginate={handlePaginate}
        handleEdit={handleEdit}
      />

      <PropertyEditModal
        open={modalOpen}
        handleClose={handleClose}
        selectedProperty={selectedProperty}
        analyticsData={data}
        loading={detailLoading}
      />
    </Box>
  );
}
