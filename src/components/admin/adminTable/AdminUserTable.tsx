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

/* ===== API ROW TYPE ===== */
export interface UserRow {
  user_fullName: string;
  user_isVerified: 0 | 1;
  user_isActive: 0 | 1;
  "userCred.cred_user_email": string;
}

/* ===== COLUMN TYPE ===== */
type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

/* ===== COLUMNS ===== */
const columns: Column<UserRow>[] = [
  {
    key: "user_fullName",
    header: "Name",
  },
  {
    key: "userCred.cred_user_email",
    header: "Email",
  },
  {
    key: "user_isVerified",
    header: "Verified",
    render: (value) => (
      <Chip
        label={value === 1 ? "Verified" : "Not Verified"}
        color={value === 1 ? "success" : "default"}
        size="small"
        sx={{ fontWeight: 500 }}
      />
    ),
  },
  {
    key: "user_isActive",
    header: "Status",
    render: (value) => (
      <Chip
        label={value === 1 ? "Active" : "Inactive"}
        color={value === 1 ? "success" : "error"}
        size="small"
        sx={{ fontWeight: 500 }}
      />
    ),
  },
];

/* ===== PROPS ===== */
type AdminUserTableProps = {
  rows: UserRow[];
};

export default function AdminUserTable({ rows }: AdminUserTableProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          stickyHeader
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 8px",
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
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                {columns.map((col) => {
                  const value = row[col.key];

                  return (
                    <TableCell key={String(col.key)}>
                      {col.render ? (
                        col.render(value, row)
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