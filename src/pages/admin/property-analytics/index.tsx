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

  const { data, loading: detailLoading } = useAppSelector(
    (state) => state.propertyAnalyticsDetail
  );

  const { properties, loading } = useAppSelector(
    (state) => state.propertyAnalytics
  );

  const rowsPerPage = 10;

  const requestBody: PropertyFilterData = {
    page: 1,
    limit: rowsPerPage,
  };

  const [filterData, setFilterData] =
    useState<PropertyFilterData>(requestBody);

  const [page, setPage] = useState(1);

  /* ✅ API CALL */
  useEffect(() => {
    dispatch(fetchPropertyAnalytics(filterData));
  }, [dispatch, filterData]);

  /* ✅ FILTER UPDATE */
  const handleFilterUpdate = (
    name: keyof PropertyFilterData,
    value: string | number | undefined
  ) => {
    setFilterData((prev) => {
      const updated: any = { ...prev, page: 1 };

      if (value === undefined || value === "") {
        delete updated[name];
      } else {
        updated[name] = value;
      }

      return updated;
    });
  };

  const handleFilter = () => {
    setFilterData((prev) => ({ ...prev, page: 1 }));
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
  };

  const handlePaginate = (_: unknown, value: number) => {
    setPage(value);
    setFilterData((prev) => ({ ...prev, page: value }));
  };

  /* ✅ DATA */
  const mappedProperties: PropertyRecord[] = properties.map((item) => ({
    id: item.id,
    property_name: item.name,
    host_name: item.hostName,
    max_price: item.price,
    avg_bookings: item.totalBookings,
    is_luxury: item.isLuxury,
    is_active: item.isActive,
  }));

  /* ✅ MODAL */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyRecord | null>(null);

  const handleEdit = (row: PropertyRecord) => {
    setSelectedProperty(row);
    setModalOpen(true);
    dispatch(fetchPropertyAnalyticsDetail({ propertyId: Number(row.id) }));
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <Box sx={{ backgroundColor: ThemeColors.background, minHeight: "100vh" }}>
      <PropertySearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
      />

      <PropertyListing
        ThemeColors={ThemeColors}
        propertyListing={mappedProperties}
        totalRecords={mappedProperties.length}
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