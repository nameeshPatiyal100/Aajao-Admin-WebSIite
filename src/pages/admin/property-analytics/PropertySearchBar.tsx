import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { PurpleThemeColor } from "../../../theme/themeColor";
import { PropertySearchBarProps } from "./types";

const PropertySearchBar: React.FC<PropertySearchBarProps> = ({
  ThemeColors,
  filterData,
  handleFilterUpdate,
  handleFilter,
  handleClear,
}) => {
  const [searchItem, setSearchItem] = useState(filterData.keyword || "");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    handleFilterUpdate("keyword", event.target.value, false);
  };

  const handleCancel = () => {
    setSearchItem("");
    handleClear();
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} mb={4}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          color: ThemeColors.primary,
          fontWeight: 700,
        }}
      >
        Property Listings
      </Typography>

      {/* Search Form */}
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {/* Search Input */}
          <TextField
            label="Search property or host..."
            variant="outlined"
            size="small"
            value={searchItem}
            onChange={handleInputChange}
            sx={{
              minWidth: 280,
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: PurpleThemeColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: PurpleThemeColor,
              },
            }}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: ThemeColors.primary,
                px: 3,
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderColor: ThemeColors.primary,
                color: ThemeColors.primary,
              }}
            >
              Clear
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default PropertySearchBar;