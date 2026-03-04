import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* MUI Date Picker */
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs, { Dayjs } from "dayjs";

const purpleColor = "#7B1FA2";

/* ================= Fake Data ================= */

const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return months.map((month) => ({
    month,
    Villa: Math.floor(Math.random() * 200),
    Apartment: Math.floor(Math.random() * 200),
    Resort: Math.floor(Math.random() * 200),
    Cottage: Math.floor(Math.random() * 200),
  }));
};

export default function BookingHeatmap() {
  const [state, setState] = useState("Tamil Nadu");
  const [city, setCity] = useState("Chennai");

  const [fromDate, setFromDate] = useState<Dayjs | null>(
    dayjs("2025-01-01")
  );
  const [toDate, setToDate] = useState<Dayjs | null>(
    dayjs("2025-06-30")
  );

  const [chartData, setChartData] = useState(generateMonthlyData());

  /* ================= Filter Change ================= */

  const refreshData = () => {
    setChartData(generateMonthlyData());
  };

  /* ================= CSV Export ================= */

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(chartData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "booking_analytics.csv");
  };

  /* ================= Excel Export ================= */

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(chartData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "booking_analytics.xlsx");
  };

  /* ================= Purple Style ================= */

  const purpleFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: purpleColor,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: purpleColor,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={3}>
        {/* PAGE TITLE */}
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
          sx={{ color: purpleColor }}
        >
          Booking Analytics
        </Typography>

        {/* FILTER + EXPORT */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {/* STATE */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ "&.Mui-focused": { color: purpleColor } }}>
                State
              </InputLabel>
              <Select
                value={state}
                label="State"
                onChange={(e) => {
                  setState(e.target.value);
                  refreshData();
                }}
                sx={purpleFieldStyle}
              >
                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                <MenuItem value="Kerala">Kerala</MenuItem>
                <MenuItem value="Karnataka">Karnataka</MenuItem>
              </Select>
            </FormControl>

            {/* CITY */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ "&.Mui-focused": { color: purpleColor } }}>
                City
              </InputLabel>
              <Select
                value={city}
                label="City"
                onChange={(e) => {
                  setCity(e.target.value);
                  refreshData();
                }}
                sx={purpleFieldStyle}
              >
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                <MenuItem value="Madurai">Madurai</MenuItem>
              </Select>
            </FormControl>

            {/* FROM DATE */}
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
                refreshData();
              }}
              slotProps={{
                textField: {
                  size: "small",
                  sx: purpleFieldStyle,
                },
              }}
            />

            {/* TO DATE */}
            <DatePicker
              label="To"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
                refreshData();
              }}
              slotProps={{
                textField: {
                  size: "small",
                  sx: purpleFieldStyle,
                },
              }}
            />
          </Stack>

          {/* EXPORT BUTTONS */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleExportCSV}
              sx={{
                borderColor: purpleColor,
                color: purpleColor,
              }}
            >
              Export CSV
            </Button>

            <Button
              variant="contained"
              onClick={handleExportExcel}
              sx={{
                backgroundColor: purpleColor,
                "&:hover": { backgroundColor: purpleColor },
              }}
            >
              Export Excel
            </Button>
          </Stack>
        </Box>

        {/* CHART */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="Villa" stackId="a" fill="#7B1FA2" />
              <Bar dataKey="Apartment" stackId="a" fill="#9C27B0" />
              <Bar dataKey="Resort" stackId="a" fill="#BA68C8" />
              <Bar dataKey="Cottage" stackId="a" fill="#CE93D8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}