import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FOCUS_COLOR = "#881f9b";

interface Props {
  ThemeColors: { primary: string };
  filterData: any;
  handleFilterUpdate: (key: string, value: any, autoApply?: boolean) => void;
  handleFilter: () => void;
  handleClear: () => void;
  handleFormShow: () => void;
}

const commonFieldSx = {
  minWidth: 180,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: FOCUS_COLOR,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: FOCUS_COLOR,
  },
};

const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: 2,
      mt: 1,
      "& .MuiMenuItem-root": {
        fontSize: "0.85rem",
        "&.Mui-selected": {
          backgroundColor: `${FOCUS_COLOR}15`,
          color: FOCUS_COLOR,
        },
        "&:hover": {
          backgroundColor: `${FOCUS_COLOR}10`,
        },
      },
    },
  },
};

const AdminBookingHeader = ({
  ThemeColors,
  filterData,
  handleFilterUpdate,
  handleFilter,
  handleClear,
  handleFormShow,
}: Props) => {
  return (
    <Box mb={4}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={3} flexWrap="wrap">
        <Typography variant="h4" fontWeight={700} color={ThemeColors.primary}>
          Bookings Management
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: ThemeColors.primary }}
          onClick={handleFormShow}
        >
          Export
        </Button>
      </Box>

      {/* FILTERS */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          {/* SEARCH */}
          <TextField
            label="Search bookings"
            size="small"
            value={filterData.keyword}
            onChange={(e) => handleFilterUpdate("keyword", e.target.value)}
            sx={{ ...commonFieldSx, minWidth: 220 }}
          />

          {/* BOOKING STATUS */}
          <TextField
            label="Booking Status"
            select
            size="small"
            value={filterData.bookingStatus}
            onChange={(e) =>
              handleFilterUpdate("bookingStatus", e.target.value, true)
            }
            sx={commonFieldSx}
            SelectProps={{ MenuProps: menuProps }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>

          {/* PAYMENT STATUS */}
          <TextField
            label="Payment Status"
            select
            size="small"
            value={filterData.paymentStatus}
            onChange={(e) =>
              handleFilterUpdate("paymentStatus", e.target.value, true)
            }
            sx={commonFieldSx}
            SelectProps={{ MenuProps: menuProps }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="refunded">Refunded</MenuItem>
          </TextField>

          {/* CATEGORY */}
          <TextField
            label="Category"
            select
            size="small"
            value={filterData.category}
            onChange={(e) =>
              handleFilterUpdate("category", e.target.value, true)
            }
            sx={commonFieldSx}
            SelectProps={{ MenuProps: menuProps }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="room">Room</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
          </TextField>

          {/* FROM DATE */}
          <DatePicker
            label="From Date"
            value={filterData.fromDate}
            onChange={(value) => handleFilterUpdate("fromDate", value, true)}
            slotProps={{
              textField: {
                size: "small",
                sx: commonFieldSx,
              },
            }}
          />

          {/* TO DATE */}
          <DatePicker
            label="To Date"
            value={filterData.toDate}
            onChange={(value) => handleFilterUpdate("toDate", value, true)}
            slotProps={{
              textField: {
                size: "small",
                sx: commonFieldSx,
              },
            }}
          />

          <TextField
            label="Records"
            select
            size="small"
            value={filterData.limit}
            onChange={(e) => handleFilterUpdate("limit", e.target.value, true)}
            sx={{
              minWidth: 130,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#881f9b",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#881f9b",
              },
            }}
            SelectProps={{ MenuProps: menuProps }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </TextField>

          {/* ACTION BUTTONS */}
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: ThemeColors.primary }}
              onClick={handleFilter}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{
                borderColor: "#881f9b",
                color: "#881f9b",
                "&:hover": {
                  borderColor: "#881f9b",
                  backgroundColor: "#881f9b10",
                },
              }}
            >
              Clear
            </Button>
          </Stack>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default AdminBookingHeader;
