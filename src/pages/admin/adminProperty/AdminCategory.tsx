import { Typography, Box, Button } from "@mui/material";
import { PropertyListItem, SearchBar } from "../../../components";
import { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { FilterIcon } from "lucide-react";

const purpleTheme = {
  primary: {
    main: "#7C3AED",
    light: "#A855F7",
    dark: "#5B21B6",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#EC4899",
    light: "#F472B6",
    dark: "#BE185D",
  },
  background: {
    default: "#F8FAFC",
    paper: "#FFFFFF",
  },
};

export default function AdminCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockRow = {
    id: "1234",
    name: "Green Villa",
    email: "owner@example.com",
    type: "Residential",
    location: "California, USA",
    value: "$450,000",
    date: "2025-08-20",
    active: true,
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(135deg, ${purpleTheme.primary.main}, ${purpleTheme.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Property Categories
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and categorize your properties effectively.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: `linear-gradient(135deg, ${purpleTheme.primary.main}, ${purpleTheme.primary.light})`,
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Add Property Category
        </Button>
      </Box>


      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 4,
          mb: 2,
        }}
      >
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 66%" } }}>
          <SearchBar
            placeholder="Search properties by name, location, or type..."
            color={purpleTheme.primary.main}
          />
        </Box>
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 3,
              py: 1.5,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Advanced Filter
          </Button>
        </Box>
      </Box>


      <PropertyListItem
        row={mockRow}
        onToggle={(id) => console.log("Toggle:", id)}
        onView={(id) => console.log("View:", id)}
        onDelete={(row) => console.log("Delete:", row)}
        formatDate={formatDate}
        editable={true}
      />
    </>
  );
}
