import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";

import { AddUserModal, ConfirmDeleteModal } from "../../../components";

import { Host, ModalMode } from "./types";
import { HostTable } from "./HostTable";
import { HostHeader } from "./HostHeader";

export default function HostManagementPage() {
  const [data, setData] = useState<Host[]>([]);
  const [filteredData, setFilteredData] = useState<Host[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rowsPerPage = 10;

  /* ----------------------------------
     Mock Host Data
  ---------------------------------- */
  useEffect(() => {
    const fakeHosts: Host[] = Array.from({ length: 50 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      date: faker.date.past().toLocaleDateString(),
      status: faker.helpers.arrayElement(["Active", "Inactive"]),
      isVerified: faker.datatype.boolean(),
      propertyCount: faker.number.int({ min: 0, max: 25 }),
    }));

    setData(fakeHosts);
    setFilteredData(fakeHosts);
  }, []);

  /* ----------------------------------
     Search (debounced handled in header)
  ---------------------------------- */
  useEffect(() => {
    setFilteredData(
      data.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setPage(0);
  }, [searchTerm, data]);

  return (
    <Box p={3} minHeight="100vh">
      {/* Header */}
      <HostHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onAdd={() => {
          setSelectedHost(null);
          setModalMode("add");
          setIsAddModalOpen(true);
        }}
      />

      {/* Table */}
      <HostTable
        hosts={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onAction={(host, mode) => {
          setSelectedHost(host);
          setModalMode(mode);
          setIsAddModalOpen(true);
        }}
        onDelete={(host) => {
          setSelectedHost(host);
          setIsDeleteModalOpen(true);
        }}
        onStatusToggle={(host) =>
          setData((prev) =>
            prev.map((h) =>
              h.id === host.id
                ? {
                    ...h,
                    status: h.status === "Active" ? "Inactive" : "Active",
                  }
                : h
            )
          )
        }
      />

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() =>
          setData((prev) => prev.filter((h) => h.id !== selectedHost?.id))
        }
        title="Delete Host"
        description="Are you sure you want to permanently remove this host?"
      />

      {/* Add / Edit / View Host */}
      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={(host: Host) => setData((prev) => [host, ...prev])}
        mode={modalMode}
        user={selectedHost || undefined}
      />
    </Box>
  );
}
