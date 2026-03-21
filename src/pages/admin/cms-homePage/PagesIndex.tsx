import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";

import type { PageRecord, PageFilterData } from "./types";
import PageSearchBar from "./PageSearchBar";
import PageListing from "./Listing";
import PageEditModal from "./PageEditModal";

// ✅ RTK
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCmsSections } from "../../../features/admin/CMS/cmsSection.slice";

export default function PagesIndex() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* ================= Redux ================= */

  const { data, loading } = useAppSelector((state) => state.cmsSection);

  /* ================= Local State ================= */

  const rowsPerPage = 10;

  const requestBody: PageFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
    status: "",
  };

  const [pageListing, setPageListing] = useState<PageRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState<PageFilterData>(requestBody);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageRecord | null>(null);

  /* ================= API Call ================= */

  const handleListing = (filter: PageFilterData) => {
    dispatch(
      fetchCmsSections({
        page: filter.page,
        limit: filter.limit,
        search: filter.keyword,
      })
    );
  };

  useEffect(() => {
    handleListing(filterData);
  }, []);

  /* ================= Map API → UI ================= */

  useEffect(() => {
    if (data) {
      const mapped: PageRecord[] =
        data.sections?.map((item) => ({
          id: item.cs_id,
          title: item.cs_title,
          slug: item.cs_slug,
          status: item.cs_isActive === 1 ? "published" : "draft",
          url: item.cs_url,
          created_at: item.cs_created_at || new Date().toISOString(),
        })) || [];

      setPageListing(mapped);
      setTotalRecords(data.totalRecords);
    }
  }, [data]);

  /* ================= Pagination ================= */

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  /* ================= Filters ================= */

  const handleFilterUpdate = (name: keyof PageFilterData, value: string) => {
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    const updatedFilter = { ...filterData, page: 1 };
    setPage(1);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  const handleClear = () => {
    setFilterData(requestBody);
    setPage(1);
    handleListing(requestBody);
  };
  const handleEdit = (row: PageRecord) => {
    setSelectedPage(row);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelectedPage(null);
  };
  const handleModalSubmit = (updatedData: PageRecord) => {
    setPageListing((prev) =>
      prev.map((item) => (item.id === updatedData.id ? updatedData : item))
    );

    handleClose();
  };
  const handleEnter = (row: PageRecord) => {
    const path = `/admin/${row.url}`;
    navigate(path); // ✅ FIXED
  };
  const handleAddNew = () => {
    navigate("/cms/pages/create");
  };
  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
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
