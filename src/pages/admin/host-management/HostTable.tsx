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
  import { Host } from "./types";
  import { HostActions } from "./HostActions";
  
  const COLORS = {
    text: { secondary: "#6b7280" },
    primary: "#881f9b",
  };
  
  interface Props {
    hosts: Host[];
    page: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onAction: (host: Host, mode: "view" | "edit") => void;
    onDelete: (host: Host) => void;
    onStatusToggle: (host: Host) => void;
  }
  
  export const HostTable = ({
    hosts,
    page,
    rowsPerPage,
    onPageChange,
    onAction,
    onDelete,
    onStatusToggle,
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
            {hosts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((host, index) => (
                <TableRow key={host.id} hover>
                  {/* Index */}
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
  
                  {/* Name */}
                  <TableCell>{host.name}</TableCell>
  
                  {/* Email */}
                  <TableCell>{host.email}</TableCell>
  
                  {/* Property Count */}
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
  
                  {/* Verification */}
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
  
                  {/* Created Date */}
                  <TableCell>{host.date}</TableCell>
  
                  {/* Status Toggle */}
                  <TableCell>
                    <Tooltip
                      title={
                        host.status === "Active"
                          ? "Deactivate Host"
                          : "Activate Host"
                      }
                    >
                      <Switch
                        checked={host.status === "Active"}
                        onChange={() => onStatusToggle(host)}
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
  
                  {/* Actions */}
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
          count={Math.ceil(hosts.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, v) => onPageChange(v - 1)}
        />
      </Box>
    </Paper>
  );
  