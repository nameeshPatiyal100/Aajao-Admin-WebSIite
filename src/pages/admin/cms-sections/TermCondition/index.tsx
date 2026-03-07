import { useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";

import TCHeader from "./TCHeader";
import TCListing, { TCRecord } from "./TCListing";
import TCModal from "./TCModal";

import { ThemeColors } from "../../../../theme/themeColor";

/* ================= Fake Data ================= */

let fakeData: TCRecord[] = Array.from({ length: 30 }).map(
  (_, index) => ({
    id: index + 1,
    title: faker.lorem.sentence(),
    status: faker.datatype.boolean() ? 1 : 0,
    created_at: faker.date.past().toISOString(),
  })
);

/* ================= Component ================= */

export default function TCManagement() {
  const [records, setRecords] = useState<TCRecord[]>(fakeData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTC, setSelectedTC] = useState<TCRecord | null>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  /* ================= Pagination ================= */

  const handlePaginate = (_: unknown, value: number) => {
    setPage(value);
  };

  /* ================= Delete ================= */

  const handleDeleteConfirm = (id: number) => {
    const updated = records.filter((item) => item.id !== id);
    setRecords(updated);
  };

  /* ================= Edit ================= */

  const handleEditClick = (id: number) => {
    const record = records.find((r) => r.id === id);
    if (record) {
      setSelectedTC(record);
      setOpenModal(true);
    }
  };

  /* ================= Submit ================= */

  const handleSubmit = (data: {
    title: string;
    description: string;
    status: 0 | 1;
  }) => {
    if (selectedTC) {
      const updated = records.map((item) =>
        item.id === selectedTC.id ? { ...item, ...data } : item
      );
      setRecords(updated);
    } else {
      const newRecord: TCRecord = {
        id: records.length + 1,
        title: data.title,
        status: data.status,
        created_at: new Date().toISOString(),
      };

      setRecords([newRecord, ...records]);
    }

    setOpenModal(false);
  };

  return (
    <Box sx={{ backgroundColor: ThemeColors.background, minHeight: "100vh" }}>
      <TCHeader
        ThemeColors={ThemeColors}
        filterData={{}}
        handleFilterUpdate={() => {}}
        handleFilter={() => {}}
        handleClear={() => {}}
        onAddClick={() => {
          setSelectedTC(null);
          setOpenModal(true);
        }}
      />

      <TCListing
        terms={records}
        totalRecords={records.length}
        loading={false}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePaginate={handlePaginate}
        handleEditClick={handleEditClick}
        handleDeleteConfirm={handleDeleteConfirm}
      />

      <TCModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        initialData={
          selectedTC
            ? {
                title: selectedTC.title,
                description: "",
                status: selectedTC.status,
              }
            : undefined
        }
      />
    </Box>
  );
}