import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { PurpleThemeColor } from "../../../theme/themeColor";
import { PageSearchBarProps } from "./types";

const PageSearchBar: React.FC<PageSearchBarProps> = ({
  ThemeColors,
  filterData,
  handleFilterUpdate,
  handleFilter,
  handleClear
}) => {
  const [searchItem, setSearchItem] = useState(filterData.keyword || "");
  // const [_status, setStatus] = useState(filterData.status || "");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    handleFilterUpdate("keyword", event.target.value, false);
  };

  const handleCancel = () => {
    setSearchItem("");
    // setStatus("");
    handleClear();
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} mb={4}>
      {/* ===== Page Title + Add Button ===== */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          variant="h4"
          sx={{
            color: ThemeColors.primary,
            fontWeight: 700,
          }}
        >
          CMS Pages
        </Typography>
      </Box>

      {/* ===== Search Form ===== */}
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {/* Search Input */}
          <TextField
            label="Search title or slug..."
            variant="outlined"
            size="small"
            value={searchItem}
            onChange={handleInputChange}
            sx={{
              minWidth: 260,
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

export default PageSearchBar;