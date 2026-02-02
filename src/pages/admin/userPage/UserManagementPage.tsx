import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { AddUserModal, ConfirmDeleteModal } from "../../../components";
import { UserTable } from "./UserTable";
import { UserHeader } from "./UserHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchUsers } from "../../../features/admin/userManagement/user.slice";
import { useDebounce } from "../../../hooks/useDebounce";
import { Attendant, ModalMode } from "./types";
import { ApiUser } from "../../../types/api.types";

export interface UserTableRow {
  user_id: number;
  user_fullName: string;
  email: string;
  added_at: string;
  isActive: number;
  isVerified: number;
}

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
  const debouncedSearch = useDebounce(searchTerm, 500);
  const rowsPerPage = 10;
  
  const handleEdit = (userId: number) => {
    const user = tableUsers.find((u) => u.user_id === userId);
    if (!user) return;
    setSelectedUser({
      user_id: user.user_id,
      name: user.user_fullName,
      email: user.email,
      createdAt: user.added_at,
      isActive: user.isActive === 1,
      isVerified: user.isVerified === 1,
    });

    setModalMode("edit");
    setIsAddModalOpen(true);
  };

  const handleDelete = (userId: number) => {
    const user = tableUsers.find((u) => u.user_id === userId);
    if (!user) return;

    setSelectedUser({
      user_id: user.user_id,
      name: user.user_fullName,
      email: user.email,
      createdAt: user.added_at,
      isActive: user.isActive === 1,
      isVerified: user.isVerified === 1,
    });

    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: page + 1,
        search: debouncedSearch,
      })
    );
  }, [dispatch, page, debouncedSearch]);
  const tableUsers: UserTableRow[] = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.map((u: ApiUser) => ({
      user_id: u.user_id,
      user_fullName: u.user_fullName,
      email: u.userCred?.cred_user_email ?? "-",
      added_at: new Date(u.added_at).toLocaleDateString(),
      isActive: u.user_isActive === 1 ? 1 : 0,
      isVerified: u.user_isVerified === 1 ? 1 : 0,
    }));
  }, [users]);

  return (
    <Box p={3} minHeight="100vh">
      <UserHeader
        searchTerm={searchTerm}
        onSearch={(value) => {
          setPage(0);
          setSearchTerm(value);
        }}
        onAdd={() => {
          setSelectedUser(null);
          setModalMode("add");
          setIsAddModalOpen(true);
        }}
      />

      <UserTable
        users={tableUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={pagination?.totalRecords || 0}
        loading={loading}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
        // user={selectedUser || undefined}
        userId={selectedUser?.user_id}
      />

      {error && (
        <Box mt={2} color="error.main">
          {error}
        </Box>
      )}
    </Box>
  );
}
