import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
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
    const value = event.target.value;
    setSearchItem(value);
    handleFilterUpdate("keyword", value);
  };

  const handleCancel = () => {
    setSearchItem("");
    handleClear();
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} mb={4}>
      <Typography
        variant="h4"
        sx={{ color: ThemeColors.primary, fontWeight: 700 }}
      >
        Property Analytics
      </Typography>

      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            label="Search property or host..."
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
              sx={{ background: ThemeColors.primary }}
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

            {/* ACTIVE */}
            <Button
              variant={filterData.status === 1 ? "contained" : "outlined"}
              onClick={() =>
                handleFilterUpdate(
                  "status",
                  filterData.status === 1 ? undefined : 1,
                  true
                )
              }
              sx={{
                ...(filterData.status === 1
                  ? {
                      backgroundColor: "green",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }
                  : {
                      borderColor: "green",
                      color: "green",
                    }),
              }}
            >
              Active
            </Button>

            {/* INACTIVE */}
            <Button
              variant={filterData.status === 0 ? "contained" : "outlined"}
              onClick={() =>
                handleFilterUpdate(
                  "status",
                  filterData.status === 0 ? undefined : 0,
                  true
                )
              }
              sx={{
                ...(filterData.status === 0
                  ? {
                      backgroundColor: "red",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }
                  : {
                      borderColor: "red",
                      color: "red",
                    }),
              }}
            >
              Inactive
            </Button> 
            <Button
              variant={filterData.isLuxury === 1 ? "contained" : "outlined"}
              onClick={() =>
                handleFilterUpdate(
                  "isLuxury",
                  filterData.isLuxury === 1 ? undefined : 1,
                  true
                )
              }
            >
              Luxury
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default PropertySearchBar;
