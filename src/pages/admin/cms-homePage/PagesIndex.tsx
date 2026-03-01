import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";

import type { PageRecord, PageFilterData } from "./types";
import PageSearchBar from "./PageSearchBar";
import PageListing from "./Listing";
import PageEditModal from "./PageEditModal";

let fakeData: PageRecord[] = Array.from({ length: 50 }).map((_, index) => ({
    id: index + 1,
    title: faker.lorem.words(3),
    slug: faker.lorem.slug(),
    status: faker.helpers.arrayElement([0, 1]) === 0 ? "draft" : "published",
    url: faker.internet.url(),
    created_at: faker.date.past().toISOString(),
  }));

export default function PagesIndex() {
  const navigate = useNavigate();

  const rowsPerPage = 10;
  const requestBody: PageFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
    status: "",
  };

  const [pageListing, setPageListing] = useState<PageRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeData.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState<PageFilterData>(requestBody);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageRecord | null>(null);

  const handleEdit = (row: PageRecord) => {
    setSelectedPage(row);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedPage(null);
  };

  const handleModalSubmit = (updatedData: PageRecord) => {
    fakeData = fakeData.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );

    handleClose();
    handleListing(filterData);
  };

  useEffect(() => {
    handleListing(requestBody);
  }, []);

  const handleListing = (filter: PageFilterData) => {
    setLoading(true);

    let records = [...fakeData];

    // Keyword Filter
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      records = records.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.slug.toLowerCase().includes(keyword)
      );
    }

    // Status Filter
    if (filter.status) {
      records = records.filter((item) => item.status === filter.status);
    }

    setTotalRecords(records.length);

    const start = (filter.page - 1) * filter.limit;
    const end = start + filter.limit;

    setPageListing(records.slice(start, end));
    setLoading(false);
  };

  /* ===========================
     Pagination
  =========================== */

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  /* ===========================
     Filters
  =========================== */

  const handleFilterUpdate = (name: keyof PageFilterData, value: string) => {
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

  /* ===========================
     Actions
  =========================== */

  //   const handleEdit = (row: PageRecord) => {
  //     navigate(`/cms/pages/edit/${row.id}`);
  //   };

  const handleEnter = (row: PageRecord) => {
    navigate(`/cms/pages/${row.slug}`);
  };

  const handleAddNew = () => {
    navigate("/cms/pages/create");
  };

  /* ===========================
     Render
  =========================== */

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
        // p: 3,
      }}
    >
      <PageSearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        handleAddNew={handleAddNew}
      />

      <PageListing
        ThemeColors={ThemeColors}
        pageListing={pageListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePaginate={handlePaginate}
        handleEdit={handleEdit}
        handleEnter={handleEnter}
      />
      <PageEditModal
        open={modalOpen}
        handleClose={handleClose}
        selectedPage={selectedPage}
        handleSubmit={handleModalSubmit}
        ThemeColors={ThemeColors}
      />
    </Box>
  );
}
