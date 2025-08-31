import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import {
  Add as AddIcon,
  TrendingUp,
  Business,
  People,
  Assessment,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { PropertyRow } from "../components/types";
import CommonModal from "./PropertyModal";
import {
  SearchBar,
  StatCard,
  ConfirmDialog,
  PropertyListItem,
} from "../../../components";

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

export default function AdminProperties() {
  const [rows, setRows] = useState<PropertyRow[]>([
    {
      id: "P001",
      name: "Sunset Villa",
      email: "owner@sunsetvilla.com",
      date: "2025-08-10",
      active: true,
      type: "Residential",
      value: "$1,250,000",
      location: "Beverly Hills, CA",
    },
    {
      id: "P002",
      name: "Downtown Loft",
      email: "contact@dtloft.com",
      date: "2025-08-12",
      active: false,
      type: "Commercial",
      value: "$850,000",
      location: "Manhattan, NY",
    },
    {
      id: "P003",
      name: "Ocean View Condo",
      email: "info@oceanview.com",
      date: "2025-08-15",
      active: true,
      type: "Residential",
      value: "$980,000",
      location: "Miami Beach, FL",
    },
    {
      id: "P004",
      name: "City Center Plaza",
      email: "admin@cityplaza.com",
      date: "2025-08-18",
      active: true,
      type: "Commercial",
      value: "$2,100,000",
      location: "Chicago, IL",
    },
  ]);

  const [selectedProperty, setSelectedProperty] = useState<PropertyRow | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ added modal state
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Handlers
  const handleToggle = (id: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, active: !row.active } : row))
    );
  };

  const handleView = (id: string) => {
    alert("Viewing details for property " + id);
  };

  const handleDelete = (property: PropertyRow) => {
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProperty) {
      setRows((prev) => prev.filter((row) => row.id !== selectedProperty.id));
      setIsDeleteModalOpen(false);
      setSelectedProperty(null);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 🔹 Filtering
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Stats
  const stats = [
    {
      label: "Total Properties",
      value: rows.length.toString(),
      icon: Business,
      color: purpleTheme.primary.main,
      bgColor: `${purpleTheme.primary.main}15`,
    },
    {
      label: "Active Properties",
      value: rows.filter((r) => r.active).length.toString(),
      icon: Assessment,
      color: "#10B981",
      bgColor: "#10B98115",
    },
    {
      label: "Total Value",
      value: "$5.28M",
      icon: TrendingUp,
      color: "#3B82F6",
      bgColor: "#3B82F615",
    },
    {
      label: "Property Owners",
      value: rows.length.toString(),
      icon: People,
      color: "#F59E0B",
      bgColor: "#F59E0B15",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: purpleTheme.background.default,
        pb: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 3,
            mb: 4,
          }}
        >
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
              Property Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and monitor all properties in your portfolio
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)} // ✅ opens modal
            sx={{
              background: `linear-gradient(135deg, ${purpleTheme.primary.main}, ${purpleTheme.primary.light})`,
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Add Property
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} lg={3} key={i}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "grey.100",
            mb: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{ p: 3, borderBottom: "1px solid", borderColor: "grey.100" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <SearchBar
                  placeholder="Search properties by name, location, or type..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                  color={purpleTheme.primary.main}
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ overflow: "auto" }}>
            {filteredRows.map((row, i) => (
              <Box key={row.id}>
                <PropertyListItem
                  row={row}
                  onToggle={handleToggle}
                  onView={handleView}
                  onDelete={handleDelete}
                  theme={purpleTheme}
                  formatDate={formatDate}
                  variant="property"
                  editable={true}
                />
                {i < filteredRows.length - 1 && <Divider sx={{ mx: 3 }} />}
              </Box>
            ))}
          </Box>
        </Paper>

        <CommonModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Property"
          onSubmit={() => {
            console.log("Form submitted!");
            setIsModalOpen(false);
          }}
        ></CommonModal>

        <ConfirmDialog
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete"
          highlight={selectedProperty?.name || ""}
          highlightColor={purpleTheme.primary.main}
          confirmText="Delete Property"
          cancelText="Cancel"
        />
      </Container>
    </Box>
  );
}
