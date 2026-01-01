import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function SearchBar(props) {
  const {
    COLORS,
    filterData,
    handleFilterUpdate,
    handleFilter,
    handleClear,
    handleFormShow,
  } = props;
  const [searchItem, setSearchItem] = useState("");
  const handleInputChange = (event) => {
    setSearchItem(event.target.value);
    handleFilterUpdate("keyword", event.target.value, false);
  };
  const handleCancel = () => {
    setSearchItem("");
    handleClear();
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      flexWrap="wrap"
      gap={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography
          variant="h4"
          sx={{
            color: COLORS.primary,
            fontWeight: 700,
          }}
        >
          Property Category
        </Typography>
        {/* Add Category Button */}
        <Button
          variant="contained"
          onClick={() => handleFormShow(0)}
          sx={{
            backgroundColor: COLORS.primary,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#3730a3",
            },
          }}
        >
          Add Category
        </Button>
      </Box>

      <form onSubmit={(e) => { e.preventDefault(); handleFilter();}}>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {/* Search Text */}
          <TextField
            label="Search name or email"
            variant="outlined"
            size="small"
            value={searchItem}
            onChange={(e) => {
              handleInputChange(e);
            }}
            sx={{ minWidth: 220 }}
          />

          {/* Status Select */}
          <TextField
            label="Status"
            select
            size="small"
            name="status"
            value={filterData.status}
            onChange={(e) => {
              handleFilterUpdate("status", e.target.value, true);
            }}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </TextField>

          {/* Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                background: COLORS.primary,
              }}
              onClick={() => handleFilter()}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handleCancel();
              }}
            >
              Clear
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
}
