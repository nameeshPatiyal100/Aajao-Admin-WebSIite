import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ConfirmDeleteModal } from "../../../components";
import { ThemeColors } from "../../../theme/themeColor";

import Listing from "../properties/Listing";
import SearchBar from "./SearchBar";
import type { PropertyRecord, FilterData } from "../properties/types";

const bool01 = (): "0" | "1" => faker.helpers.arrayElement(["0", "1"]);

let fakeData: PropertyRecord[] = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  host_name: faker.person.fullName(),
  status: bool01(),
  is_verified: bool01()
}));  

export default function PropertiesVerifications() {
  // State Management
  const [propertiesListing, setPropertiesListing] = useState<PropertyRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  const requestBody: FilterData = {
    page: page,
    limit: rowsPerPage,
    keyword: "",
    status: "",
    is_verified: "",
  };

  const [filterData, setFilterData] = useState<FilterData>(requestBody);
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    handlePropertiesListing(requestBody);
  }, []);

  const handlePropertiesListing = (filter: FilterData) => {
    setLoading(true);

    let records = [...fakeData];

    // Search filter
    if (filter.keyword) {
      records = records.filter((item) =>
        item.name.toLowerCase().includes(filter.keyword.toLowerCase())
      );
    }

    // Status filter
    if (filter.status !== "") {
      records = records.filter((item) => item.status === filter.status);
    }

    // Verified filter
    if (filter.is_verified !== "") {
      records = records.filter((item) => item.is_verified === filter.is_verified);
    }

    setTotalRecords(records.length);

    // Pagination
    const startIndex = (filter.page - 1) * filter.limit;
    const endIndex = startIndex + filter.limit;
    const paginatedRecords = records.slice(startIndex, endIndex);

    setPropertiesListing(paginatedRecords);
    setLoading(false);
  };

  const handlePaginate = (_event: unknown, value: number) => {
    const updatedFilterData: FilterData = {
      ...filterData,
      page: value,
    };

    setPage(value);
    setFilterData(updatedFilterData);
    handlePropertiesListing(updatedFilterData);
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
      handlePropertiesListing(updatedFilterData);
    }
  };

  const handleFilter = () => {
    const updatedFilterData: FilterData = { ...filterData, page: 1 };
    setPage(1);
    handlePropertiesListing(updatedFilterData);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handlePropertiesListing(requestBody);
  };

  const handleToggleActive = (id: string) => {
    fakeData = fakeData.map((item) =>
      item.id === id ? { ...item, status: item.status === "1" ? "0" : "1" } : item
    );
    handlePropertiesListing(filterData);
  };

  const handleVerifiedStatus = (id: string) => {
    fakeData = fakeData.map((item) =>
      item.id === id ? { ...item, is_verified: item.is_verified === "1" ? "0" : "1" } : item
    );
    handlePropertiesListing(filterData);
  };

  const handleDeleteClick = (id: string) => {
    setDeletePropertyId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProperty = () => {
    if (!deletePropertyId) return;

    fakeData = fakeData.filter((item) => item.id !== deletePropertyId);

    const remainingItems = fakeData.filter((item) =>
      filterData.keyword
        ? item.name.toLowerCase().includes(filterData.keyword.toLowerCase())
        : true
    ).length;

    const totalPages = Math.ceil(remainingItems / rowsPerPage);
    const newPage = page > totalPages ? totalPages : page;

    setPage(newPage || 1);
    handlePropertiesListing({ ...filterData, page: newPage || 1 });
    setIsDeleteModalOpen(false);
    setDeletePropertyId(null);
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
        propertiesListing={propertiesListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        handlePaginate={handlePaginate}
        rowsPerPage={rowsPerPage}
        handleToggleActive={handleToggleActive}
        handleVerifiedStatus={handleVerifiedStatus}
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
