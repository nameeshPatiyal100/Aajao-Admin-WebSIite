import { useEffect, useState } from "react";
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
  Skeleton,
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

/* Date Picker */
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs, { Dayjs } from "dayjs";

/* Redux */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchBookingAnalytics } from "../../../features/admin/bookingAnalytics/bookingAnalytics.slice";

/* ================= CONSTANTS ================= */

const purpleColor = "#7B1FA2";

const COLORS = [
  "#7B1FA2",
  "#9C27B0",
  "#BA68C8",
  "#CE93D8",
  "#E1BEE7",
  "#F3E5F5",
];

const getColor = (index: number) => COLORS[index % COLORS.length];

/* ================= TRANSFORM FUNCTION ================= */

const transformAnalyticsData = (apiData: any) => {
  if (!apiData) return [];

  return apiData.categories.map((month: string, index: number) => {
    const obj: any = { month };

    apiData.series.forEach((s: any) => {
      obj[s.name] = s.data[index];
    });

    return obj;
  });
};

/* ================= COMPONENT ================= */

export default function BookingHeatmap() {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.bookingAnalytics);

  const [state, setState] = useState("Tamil Nadu");
  const [city, setCity] = useState("Chennai");

  const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs("2025-01-01"));
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs("2025-06-30"));

  /* ================= API CALL ================= */

  const handleApplyFilter = () => {
    if (!fromDate || !toDate) {
      alert("Please select date range");
      return;
    }

    dispatch(
      fetchBookingAnalytics({
        state,
        city,
        fromDate: fromDate.format("YYYY-MM-DD"),
        toDate: toDate.format("YYYY-MM-DD"),
      })
    );
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    handleApplyFilter();
  }, []);

  /* ================= TRANSFORM DATA ================= */

  const chartData = transformAnalyticsData(data);

  /* ================= EXPORT CSV ================= */

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(chartData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "booking_analytics.csv");
  };

  /* ================= EXPORT EXCEL ================= */

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(chartData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "booking_analytics.xlsx");
  };

  /* ================= STYLE ================= */

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
        {/* TITLE */}
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
          sx={{ color: purpleColor }}
        >
          Booking Analytics
        </Typography>

        {/* FILTERS */}
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
                onChange={(e) => setState(e.target.value)}
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
                onChange={(e) => setCity(e.target.value)}
                sx={purpleFieldStyle}
              >
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                <MenuItem value="Madurai">Madurai</MenuItem>
              </Select>
            </FormControl>

            {/* FROM */}
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  sx: purpleFieldStyle,
                },
              }}
            />

            {/* TO */}
            <DatePicker
              label="To"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  sx: purpleFieldStyle,
                },
              }}
            />

            {/* APPLY BUTTON */}
            <Button
              variant="contained"
              onClick={handleApplyFilter}
              disabled={loading}
              sx={{
                backgroundColor: purpleColor,
                "&:hover": { backgroundColor: purpleColor },
              }}
            >
              Apply
            </Button>
          </Stack>

          {/* EXPORT */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleExportCSV}
              sx={{ borderColor: purpleColor, color: purpleColor }}
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
          {loading ? (
            <Skeleton variant="rectangular" height={450} />
          ) : chartData.length === 0 ? (
            <Typography align="center">No Data Available</Typography>
          ) : (
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis
                  domain={[data?.yAxis?.min ?? 0, data?.yAxis?.max ?? 100]}
                  tickCount={data ? data.yAxis.max / data.yAxis.tick + 1 : 5}
                />

                <Tooltip />
                <Legend />

                {data?.series.map((s, index) => (
                  <Bar
                    key={s.name}
                    dataKey={s.name}
                    stackId="a"
                    fill={getColor(index)}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
