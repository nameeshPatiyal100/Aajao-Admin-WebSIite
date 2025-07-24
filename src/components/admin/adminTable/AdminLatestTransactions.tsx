import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(
  customerName: string,
  roomType: string,
  checkIn: string,
  checkOut: string,
  status: string
) {
  return { customerName, roomType, checkIn, checkOut, status };
}

const rows = [
  createData("John Doe", "Deluxe Suite", "2025-05-10", "2025-05-15", "Confirmed"),
  createData("Jane Smith", "Standard Room", "2025-05-12", "2025-05-14", "Pending"),
  createData("Mark Johnson", "Presidential Suite", "2025-05-09", "2025-05-13", "Cancelled"),
  createData("Emily Davis", "Family Room", "2025-05-11", "2025-05-16", "Confirmed"),
  createData("Chris Lee", "Economy Room", "2025-05-08", "2025-05-10", "Checked Out"),
];

export default function AdminLatestTransactions() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        p: 3,
        m: 3,
        overflowX: "auto"
      }}
    >
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            fontFamily: "Poppins, sans-serif",
            color: "grey.800",
          }}
          aria-label="booking table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Room Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Check-In</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Check-Out</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#fafafa" },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.customerName}
                </TableCell>
                <TableCell>{row.roomType}</TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "white",
                      backgroundColor:
                        row.status === "Confirmed"
                          ? "#4caf50"
                          : row.status === "Pending"
                          ? "#ff9800"
                          : row.status === "Cancelled"
                          ? "#f44336"
                          : "#9e9e9e",
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

