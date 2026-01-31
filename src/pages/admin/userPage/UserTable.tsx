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
  CircularProgress,
} from "@mui/material";
import { Pagination } from "../../../components";
import { Attendant } from "./types";
import { UserActions } from "./UserActions";

const COLORS = {
  text: { secondary: "#6b7280" },
};

interface Props {
  users: Attendant[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onAction: (user: Attendant, mode: "view" | "edit") => void;
  onDelete: (user: Attendant) => void;
}

export const UserTable = ({
  users,
  page,
  rowsPerPage,
  totalCount,
  loading,
  onPageChange,
  onAction,
  onDelete,
}: Props) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              {["#", "NAME", "EMAIL", "CREATED", "STATUS", "ACTIONS"].map((h) => (
                <TableCell
                  key={h}
                  sx={{ fontWeight: 600, color: COLORS.text.secondary }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* 🔄 LOADING */}
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            )}

            {/* 📭 EMPTY */}
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No users found
                </TableCell>
              </TableRow>
            )}

            {/* ✅ DATA */}
            {!loading &&
              users.map((user, index) => (
                <TableRow key={user.user_id} hover>
                  <TableCell>
                    {page * rowsPerPage + index + 1}
                  </TableCell>

                  <TableCell>{user.user_fullName}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.added_at}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.user_isActive ? "Active" : "Inactive"}
                      size="small"
                      sx={{
                        backgroundColor: user.user_isActive
                          ? "#D1FAE5"
                          : "#FEE2E2",
                        color: user.user_isActive
                          ? "#065F46"
                          : "#DC2626",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <UserActions
                      user={user}
                      onAction={onAction}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 PAGINATION */}
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={Math.ceil(totalCount / rowsPerPage)}
          page={page + 1}
          onChange={(_, v) => onPageChange(v - 1)}
        />
      </Box>
    </Paper>
  );
};

