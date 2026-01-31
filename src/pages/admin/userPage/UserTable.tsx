import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "../../../components";
import { UserTableRow } from "./UserManagementPage";
import { UserActions } from "./UserActions";
import { TableLoader } from "../../../components/admin/common/TableLoader";

interface Props {
  users: UserTableRow[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export const UserTable = ({
  users,
  page,
  rowsPerPage,
  totalCount,
  loading,
  onPageChange,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              {[
                "#",
                "NAME",
                "EMAIL",
                "CREATED",
                "STATUS",
                "VERIFIED",
                "ACTIONS",
              ].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 600 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <TableLoader text="Fetching users..." />
                </TableCell>
              </TableRow>
            )}

            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No users found
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              users.map((user, index) => (
                <TableRow key={user.user_id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                  <TableCell>{user.user_fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.added_at}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.isActive ? "Active" : "Inactive"}
                      sx={{
                        backgroundColor: user.isActive ? "#D1FAE5" : "#FEE2E2",
                        color: user.isActive ? "#065F46" : "#DC2626",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isVerified ? "YES" : "NO"}
                      sx={{
                        backgroundColor: user.isVerified
                          ? "#D1FAE5"
                          : "#FEE2E2",
                        color: user.isVerified ? "#065F46" : "#DC2626",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <UserActions
                      userId={user.user_id}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={Math.ceil(totalCount / rowsPerPage)}
          page={page + 1}
          onChange={(_, value) => onPageChange(value - 1)}
        />
      </Box>
    </Paper>
  );
};
