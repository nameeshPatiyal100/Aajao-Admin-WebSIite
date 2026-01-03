import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faker } from "@faker-js/faker";
import { AddUserModal, ConfirmDeleteModal } from "../../../components";
import { Attendant, ModalMode } from "./types";
import { UserTable } from "./UserTable";
import { UserHeader } from "./UserHeader";

export default function UserManagementPage() {
  const [data, setData] = useState<Attendant[]>([]);
  const [filteredData, setFilteredData] = useState<Attendant[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedUser, setSelectedUser] = useState<Attendant | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rowsPerPage = 10;

  useEffect(() => {
    const fakeData = Array.from({ length: 50 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      date: faker.date.past().toLocaleDateString(),
      status: faker.helpers.arrayElement(["Active", "Inactive"]),
    }));
    setData(fakeData);
    setFilteredData(fakeData);
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setPage(0);
  }, [searchTerm, data]);

  return (
    <Box p={3} minHeight="100vh">
      <UserHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onAdd={() => {
          setSelectedUser(null);
          setModalMode("add");
          setIsAddModalOpen(true);
        }}
      />

      <UserTable
        users={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onAction={(user, mode) => {
          setSelectedUser(user);
          setModalMode(mode);
          setIsAddModalOpen(true);
        }}
        onDelete={(user) => {
          setSelectedUser(user);
          setIsDeleteModalOpen(true);
        }}
      />

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() =>
          setData((prev) => prev.filter((u) => u.id !== selectedUser?.id))
        }
        title="Delete User"
        description="Are you sure you want to permanently remove this user?"
      />

      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={(u: Attendant) => setData((prev) => [u, ...prev])}
        mode={modalMode}
        user={selectedUser}
      />
    </Box>
  );
}
