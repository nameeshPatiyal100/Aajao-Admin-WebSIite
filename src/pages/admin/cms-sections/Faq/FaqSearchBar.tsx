import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { PurpleThemeColor } from "../../../../theme/themeColor";

/* ================= Types ================= */

export interface FaqSearchBarProps {
  ThemeColors: any;
  filterData: {
    keyword?: string;
  };
  handleFilterUpdate: (
    key: string,
    value: string,
    shouldFetch?: boolean
  ) => void;
  handleFilter: () => void;
  handleClear: () => void;
  onAddClick: () => void;
}

/* ================= Component ================= */

const FaqSearchBar: React.FC<FaqSearchBarProps> = ({
  ThemeColors,
  filterData,
  handleFilterUpdate,
  handleFilter,
  handleClear,
  onAddClick,
}) => {
  const [searchItem, setSearchItem] = useState(
    filterData.keyword || ""
  );

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
      {/* Header Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          variant="h4"
          sx={{
            color: ThemeColors.primary,
            fontWeight: 700,
          }}
        >
          FAQ Listings
        </Typography>

        <Button
          variant="contained"
          onClick={onAddClick}
          sx={{
            backgroundColor: PurpleThemeColor,
            px: 3,
            "&:hover": {
              backgroundColor: PurpleThemeColor,
              opacity: 0.9,
            },
          }}
        >
          + Add FAQ
        </Button>
      </Box>

      {/* Search Form */}
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            label="Search FAQ title..."
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

          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: PurpleThemeColor,
                px: 3,
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderColor: PurpleThemeColor,
                color: PurpleThemeColor,
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

export default FaqSearchBar;