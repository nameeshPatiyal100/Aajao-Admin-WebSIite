import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ThemeColors } from "../../../theme/themeColor";

import type { PropertyRecord, PropertyFilterData } from "./types";
import PropertySearchBar from "./PropertySearchBar";
import PropertyListing from "./PropertyListing";
import PropertyEditModal from "./PropertyEditModal";

let fakeData: PropertyRecord[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  property_name: faker.company.name(),
  host_name: faker.person.fullName(),
  max_price: faker.number.int({ min: 2000, max: 20000 }),
  avg_bookings: faker.number.int({ min: 1, max: 100 }),
}));

export default function PropertyAnalytics() {
  const [propertyListing, setPropertyListing] = useState<PropertyRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyRecord | null>(null);

  const handleEdit = (row: PropertyRecord) => {
    setSelectedProperty(row);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedProperty(null);
  };

  const rowsPerPage = 10;

  const requestBody: PropertyFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<PropertyFilterData>(requestBody);

  useEffect(() => {
    handleListing(requestBody);
  }, []);

  const handleListing = (filter: PropertyFilterData) => {
    setLoading(true);

    let records = [...fakeData];

    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      records = records.filter(
        (item) =>
          item.property_name.toLowerCase().includes(keyword) ||
          item.host_name.toLowerCase().includes(keyword)
      );
    }

    setTotalRecords(records.length);

    const start = (filter.page - 1) * filter.limit;
    const end = start + filter.limit;

    setPropertyListing(records.slice(start, end));
    setLoading(false);
  };

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  const handleFilterUpdate = (
    name: keyof PropertyFilterData,
    value: string
  ) => {
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    const updatedFilter = { ...filterData, page: 1 };
    setPage(1);
    handleListing(updatedFilter);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleListing(requestBody);
  };

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
        propertyListing={propertyListing}
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
      />
    </Box>
  );
}
