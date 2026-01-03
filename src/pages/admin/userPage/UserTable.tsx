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
    // Typography,
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
    onPageChange: (page: number) => void;
    onAction: (user: Attendant, mode: "view" | "edit") => void;
    onDelete: (user: Attendant) => void;
  }
  
  export const UserTable = ({
    users,
    page,
    rowsPerPage,
    onPageChange,
    onAction,
    onDelete,
  }: Props) => (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              {["ID", "NAME", "AGE", "EMAIL", "CREATED", "STATUS", "ACTIONS"].map(
                (h) => (
                  <TableCell
                    key={h}
                    sx={{ fontWeight: 600, color: COLORS.text.secondary }}
                  >
                    {h}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          user.status === "Active" ? "#D1FAE5" : "#FEE2E2",
                        color:
                          user.status === "Active" ? "#065F46" : "#DC2626",
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
  
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, v) => onPageChange(v - 1)}
        />
      </Box>
    </Paper>
  );
  