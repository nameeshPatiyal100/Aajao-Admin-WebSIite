import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};

const statusColorMap: Record<
  string,
  "success" | "warning" | "error" | "default"
> = {
  Confirmed: "success",
  Pending: "warning",
  Cancelled: "error",
  "Checked Out": "default",
};

export default function AdminTable<T>({
  columns,
  rows,
}: AdminTableProps<T>) {
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ width: "100%" }}>
        <Table
          stickyHeader
          sx={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* ===== HEADER ===== */}
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    backgroundColor: "#f9fafb",
                    borderBottom: "none",
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* ===== BODY ===== */}
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {columns.map((col) => {
                  const value = row[col.key];

                  return (
                    <TableCell key={String(col.key)}>
                      {col.render ? (
                        col.render(value, row)
                      ) : typeof value === "string" &&
                        statusColorMap[value] ? (
                        <Chip
                          label={value}
                          color={statusColorMap[value]}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      ) : (
                        <Typography fontWeight={500}>
                          {String(value)}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
