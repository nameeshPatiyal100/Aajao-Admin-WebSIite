import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ThemeColors } from "../../../../theme/themeColor";

import FaqSearchBar from "./FaqSearchBar";
import FaqModal from "./FaqModal";
import FaqListing, { FaqRecord } from "./FaqListingSection";

/* ================= Types ================= */

interface FaqFilterData {
  page: number;
  limit: number;
  keyword: string;
}

/* ================= Fake Data ================= */

let fakeFaqData: FaqRecord[] = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  title: faker.lorem.sentence(),
  status: faker.datatype.boolean() ? 1 : 0,
  created_at: faker.date.past().toISOString(),
}));

/* ================= Component ================= */

export default function FaqManagement() {
  const [faqListing, setFaqListing] = useState<FaqRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(fakeFaqData.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqRecord | null>(null);

  const rowsPerPage = 10;

  const requestBody: FaqFilterData = {
    page: 1,
    limit: rowsPerPage,
    keyword: "",
  };

  const [filterData, setFilterData] = useState<FaqFilterData>(requestBody);

  useEffect(() => {
    handleListing(requestBody);
  }, []);

  /* ================= Listing Logic ================= */

  const handleListing = (filter: FaqFilterData) => {
    setLoading(true);

    let records = [...fakeFaqData];

    // 🔎 Search Filter
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      records = records.filter((item) =>
        item.title.toLowerCase().includes(keyword)
      );
    }

    setTotalRecords(records.length);

    const start = (filter.page - 1) * filter.limit;
    const end = start + filter.limit;

    setFaqListing(records.slice(start, end));
    setLoading(false);
  };

  /* ================= Pagination ================= */

  const handlePaginate = (_: unknown, value: number) => {
    const updatedFilter = { ...filterData, page: value };
    setPage(value);
    setFilterData(updatedFilter);
    handleListing(updatedFilter);
  };

  /* ================= Filter ================= */

  const handleFilterUpdate = (
    key: string,
    value: string,
    _isImmediate?: boolean
  ) => {
    setFilterData((prev) => ({
      ...prev,
      [key]: value,
    }));
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

  /* ================= Delete ================= */

  const handleDeleteConfirm = (faqId: number) => {
    fakeFaqData = fakeFaqData.filter((faq) => faq.id !== faqId);

    handleListing(filterData);
  };

  /* ================= Edit ================= */

  const handleEditClick = (id: number) => {
    const faq = fakeFaqData.find((f) => f.id === id);

    if (faq) {
      setSelectedFaq(faq);
      setOpenModal(true);
    }
  };

  const handleSubmitFaq = (data: {
    title: string;
    description: string;
    status: 0 | 1;
  }) => {
    if (selectedFaq) {
      // UPDATE
      fakeFaqData = fakeFaqData.map((faq) =>
        faq.id === selectedFaq.id ? { ...faq, ...data } : faq
      );
    } else {
      // ADD NEW
      const newFaq: FaqRecord = {
        id: fakeFaqData.length + 1,
        title: data.title,
        status: data.status,
        created_at: new Date().toISOString(),
      };

      fakeFaqData.unshift(newFaq);
    }

    handleListing(filterData);
    setOpenModal(false);
  };

  /* ================= UI ================= */

  return (
    <Box
      sx={{
        backgroundColor: ThemeColors.background,
        minHeight: "100vh",
      }}
    >
      <FaqSearchBar
        ThemeColors={ThemeColors}
        filterData={filterData}
        handleFilterUpdate={handleFilterUpdate}
        handleFilter={handleFilter}
        handleClear={handleClear}
        onAddClick={() => {
          setSelectedFaq(null);
          setOpenModal(true);
        }}
      />

      <FaqListing
        faqs={faqListing}
        totalRecords={totalRecords}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePaginate={handlePaginate}
        handleEditClick={handleEditClick}
        handleDeleteConfirm={handleDeleteConfirm}
      />
      <FaqModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitFaq}
        initialData={
          selectedFaq
            ? {
                title: selectedFaq.title,
                description: "",
                status: selectedFaq.status,
              }
            : undefined
        }
      />
    </Box>
  );
}
