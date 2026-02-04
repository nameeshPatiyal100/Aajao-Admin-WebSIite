import {
  Box,
  Chip,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Pagination } from "../../../components";
import { HostActions } from "./HostActions";

const COLORS = {
  text: { secondary: "#6b7280" },
  primary: "#881f9b",
};

export interface HostTableRow {
  id: number;
  name: string;
  email: string;
  propertyCount: number;
  isVerified: boolean;
  isActive: boolean;
  addedAt: string;
}

interface Props {
  hosts: HostTableRow[];
  page: number; // 0-based
  rowsPerPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onAction: (host: HostTableRow, mode: "view" | "edit") => void;
  onDelete: (host: HostTableRow) => void;
}

export const HostTable = ({
  hosts,
  page,
  rowsPerPage,
  totalPages, // ✅ FIXED
  loading,
  onPageChange,
  onAction,
  onDelete,
}: Props) => (
  <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: "#f9fafb" }}>
          <TableRow>
            {[
              "ID",
              "NAME",
              "EMAIL",
              "PROPERTIES",
              "VERIFICATION",
              "CREATED",
              "STATUS",
              "ACTIONS",
            ].map((h) => (
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
          {/* Loading */}
          {loading && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {/* Empty */}
          {!loading && hosts.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No hosts found
              </TableCell>
            </TableRow>
          )}

          {/* Rows */}
          {!loading &&
            hosts.map((host, index) => (
              <TableRow key={host.id} hover>
                <TableCell>
                  {page * rowsPerPage + index + 1}
                </TableCell>

                <TableCell>{host.name}</TableCell>
                <TableCell>{host.email}</TableCell>

                <TableCell>
                  <Chip
                    label={`${host.propertyCount} Properties`}
                    size="small"
                    sx={{
                      backgroundColor: "#EEF2FF",
                      color: "#3730A3",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={host.isVerified ? "Verified" : "Unverified"}
                    size="small"
                    sx={{
                      backgroundColor: host.isVerified
                        ? "#D1FAE5"
                        : "#FEF3C7",
                      color: host.isVerified
                        ? "#065F46"
                        : "#92400E",
                      fontWeight: 600,
                    }}
                  />
                </TableCell>

                <TableCell>{host.addedAt}</TableCell>

                <TableCell>
                  <Tooltip
                    title={
                      host.isActive
                        ? "Deactivate Host"
                        : "Activate Host"
                    }
                  >
                    <Switch
                      checked={host.isActive}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.primary,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.primary,
                          },
                      }}
                    />
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <HostActions
                    host={host}
                    onAction={onAction}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Pagination */}
    <Box display="flex" justifyContent="center" p={2}>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(_, v) => onPageChange(v - 1)}
      />
    </Box>
  </Paper>
);
