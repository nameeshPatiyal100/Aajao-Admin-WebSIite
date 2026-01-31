import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { AddUserModal, ConfirmDeleteModal } from "../../../components";
import { UserTable } from "./UserTable";
import { UserHeader } from "./UserHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchUsers } from "../../../features/admin/userManagement/user.slice";
import { Attendant, ModalMode } from "./types";
import { ApiUser } from "../../../types/api.types";

export default function UserManagementPage() {
  const dispatch = useAppDispatch();

  const { users, loading, error, pagination } = useAppSelector(
    (state) => state.users
  ) as {
    users: ApiUser[];
    loading: boolean;
    error: string | null;
    pagination: { totalRecords: number } | null;
  };

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedUser, setSelectedUser] = useState<Attendant | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rowsPerPage = 10;

  /* =======================
     API CALL (SERVER SIDE)
  ======================= */
  useEffect(() => {
    dispatch(
      fetchUsers({
        page: page + 1, // backend pages start from 1
        search: searchTerm,
      })
    );
  }, [dispatch, page, searchTerm]);

  console.log(users, "users  ");
  /* =======================
     MAP BACKEND → UI TYPE
  ======================= */
  const mappedUsers: Attendant[] = useMemo(() => {
    return users.map((u) => ({
      user_id: u.user_id,
      name: u.user_fullName,
      email: u.userCred?.cred_user_email ?? "-",
      createdAt: new Date(u.added_at).toLocaleDateString(),
      isActive: u.user_isActive === 1,
    }));
  }, [users]);

  return (
    <Box p={3} minHeight="100vh">
      <UserHeader
        searchTerm={searchTerm}
        onSearch={(value) => {
          setPage(0); // reset page on search
          setSearchTerm(value);
        }}
        onAdd={() => {
          setSelectedUser(null);
          setModalMode("add");
          setIsAddModalOpen(true);
        }}
      />

      <UserTable
        users={mappedUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
        totalCount={pagination?.totalRecords || 0}
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
        onConfirm={() => {
          // later: dispatch(deleteUser(selectedUser!.id))
          setIsDeleteModalOpen(false);
        }}
        title="Delete User"
        description="Are you sure you want to permanently remove this user?"
      />

      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={() => {
          // later: dispatch(addUser(payload))
          setIsAddModalOpen(false);
        }}
        mode={modalMode}
        user={selectedUser || undefined}
      />

      {error && (
        <Box mt={2} color="error.main">
          {error}
        </Box>
      )}
    </Box>
  );
}
