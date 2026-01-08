import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { FilterList as FilterListIcon } from "@mui/icons-material";
  
  const COLORS = {
    primary: "#881f9b",
  };
  
  interface HostHeaderProps {
    searchTerm: string;
    onSearch: (value: string) => void;
    onAdd: () => void;
  }
  
  export const HostHeader = ({
    searchTerm,
    onSearch,
    onAdd,
  }: HostHeaderProps) => {
    const [isActive, setIsActive] = useState(false);
    const [isInactive, setIsInactive] = useState(false);
    const [localSearch, setLocalSearch] = useState(searchTerm);
  
    /* 🔹 Debounced Search */
    useEffect(() => {
      const handler = setTimeout(() => {
        onSearch(localSearch);
      }, 500); // debounce delay
  
      return () => clearTimeout(handler);
    }, [localSearch, onSearch]);
  
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{ color: COLORS.primary, fontWeight: 700 }}
        >
          Host Management
        </Typography>
  
        {/* Actions */}
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {/* Search */}
          <Box display="flex" gap={1} alignItems="center">
            <TextField
              label="Search host name or E-mail"
              size="small"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-root": {
                  color: COLORS.primary,
                  "& fieldset": { borderColor: COLORS.primary },
                  "&:hover fieldset": { borderColor: COLORS.primary },
                  "&.Mui-focused fieldset": { borderColor: COLORS.primary },
                },
                "& .MuiInputLabel-root": { color: COLORS.primary },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: COLORS.primary,
                },
              }}
            />
            <Button variant="contained" sx={{ background: COLORS.primary }}>
              Search
            </Button>
          </Box>
  
          {/* Filters */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setIsActive((p) => !p)}
              sx={{
                borderColor: "#2e7d32",
                color: isActive ? "#fff" : "#2e7d32",
                backgroundColor: isActive ? "#2e7d32" : "transparent",
                "&:hover": {
                  backgroundColor: "#e0f2f1",
                  borderColor: "#2e7d32",
                  color: "#2e7d32",
                },
              }}
            >
              {isActive ? "Active (ON)" : "Active (OFF)"}
            </Button>
  
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setIsInactive((p) => !p)}
              sx={{
                borderColor: "#d32f2f",
                color: isInactive ? "#fff" : "#d32f2f",
                backgroundColor: isInactive ? "#d32f2f" : "transparent",
                "&:hover": {
                  backgroundColor: "#fdecea",
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                },
              }}
            >
              {isInactive ? "Inactive (ON)" : "Inactive (OFF)"}
            </Button>
          </Stack>
  
          {/* Add Host */}
          <Button
            variant="contained"
            onClick={onAdd}
            sx={{
              backgroundColor: COLORS.primary,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#3730a3" },
            }}
          >
            Add Host
          </Button>
        </Box>
      </Box>
    );
  };

  
//   const handleSearch = (value: string) => {
//     dispatch(fetchHosts({ search: value }));
//   };
  