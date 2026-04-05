import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const COLORS = {
  primary: "#881f9b",
};

interface HostHeaderProps {
  searchTerm: string;
  status: 1 | 0 | null;
  verified: 1 | 0 | null;
  onSearch: (
    search: string,
    status: 1 | 0 | null,
    verified: 1 | 0 | null
  ) => void;
  onAdd: () => void;
}

export const HostHeader = ({
  searchTerm,
  status,
  verified,
  onSearch,
  onAdd,
}: HostHeaderProps) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    onSearch(localSearch, status, verified);
  };

  const toggleStatus = (value: 1 | 0) => {
    const newStatus = status === value ? null : value;
    onSearch(localSearch, newStatus, verified);
  };

  const toggleVerified = (value: 1 | 0) => {
    const newVerified = verified === value ? null : value;
    onSearch(localSearch, status, newVerified);
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearch("", null, null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mb={4}
      flexWrap="wrap"
      gap={2}
    >
      <Typography variant="h4" sx={{ color: "#881f9b", fontWeight: 700 }}>
        Host Management
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        {/* SEARCH */}
        <TextField
          label="Search host name or E-mail"
          size="small"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          sx={{
            minWidth: 220,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: COLORS.primary,
              },
              "&:hover fieldset": {
                borderColor: COLORS.primary,
              },
              "&.Mui-focused fieldset": {
                borderColor: COLORS.primary,
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": {
              color: COLORS.primary,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.primary,
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: COLORS.primary,
            "&:hover": {
              backgroundColor: "#6e167d",
            },
          }}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={handleClear}
          sx={{
            borderColor: COLORS.primary,
            color: COLORS.primary,
            "&:hover": {
              borderColor: COLORS.primary,
              backgroundColor: "#f3e8ff",
            },
          }}
        >
          Clear
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => toggleStatus(1)}
            sx={{
              borderColor: "#2e7d32",
              color: status === 1 ? "#fff" : "#2e7d32",
              backgroundColor: status === 1 ? "#2e7d32" : "transparent",
            }}
          >
            Active
          </Button>

          <Button
            onClick={() => toggleStatus(0)}
            sx={{
              borderColor: "#d32f2f",
              color: status === 0 ? "#fff" : "#d32f2f",
              backgroundColor: status === 0 ? "#d32f2f" : "transparent",
            }}
          >
            Inactive
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => toggleVerified(1)}
            sx={{
              borderColor: "#0288d1",
              color: verified === 1 ? "#fff" : "#0288d1",
              backgroundColor: verified === 1 ? "#0288d1" : "transparent",
            }}
          >
            Verified
          </Button>

          <Button
            onClick={() => toggleVerified(0)}
            sx={{
              borderColor: "#f57c00",
              color: verified === 0 ? "#fff" : "#f57c00",
              backgroundColor: verified === 0 ? "#f57c00" : "transparent",
            }}
          >
            Unverified
          </Button>
        </Stack>

        <Button
          variant="contained"
          onClick={onAdd}
          sx={{
            backgroundColor: COLORS.primary,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#6e167d",
            },
          }}
        >
          Add Host
        </Button>
      </Box>
    </Box>
  );
};
