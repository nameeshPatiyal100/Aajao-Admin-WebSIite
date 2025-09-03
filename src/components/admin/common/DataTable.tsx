import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { FileX } from "lucide-react";

interface Column<T> {
  id: keyof T | "actions";
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode; // Custom cell render
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  keyField: keyof T;
  emptyMessage?: string;
}

function DataTable<T extends { [key: string]: any }>({
  columns,
  rows,
  keyField,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  return (
    <TableContainer
      component={Paper}
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(136, 31, 155, 0.05)" }}>
            {columns.map((col) => (
              <TableCell
                key={String(col.id)}
                align={col.align || "left"}
                sx={{ fontWeight: 700, fontFamily: "Lato" }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                hover
                key={String(row[keyField])}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(136, 31, 155, 0.04)",
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={String(col.id)}
                    align={col.align || "left"}
                    sx={{ fontFamily: "Lato" }}
                  >
                    {col.render ? col.render(row) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 3,
                  }}
                >
                  <FileX size={48} color="#9B7EBD" />
                  <Typography variant="body1" sx={{ mt: 2, color: "#666" }}>
                    {emptyMessage}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
