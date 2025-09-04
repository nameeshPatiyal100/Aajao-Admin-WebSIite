import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
} from "@mui/material";
import {
  Add as AddIcon,
  // TrendingUp,
  // Business,
  // People,
  // Assessment,
  // FilterList as FilterIcon,
} from "@mui/icons-material";
import { PropertyRow, GenericRow } from "../../../components/types";
import {
  // SearchBar,
  // StatCard,
  ConfirmDialog,
  PropertyListItem,
} from "../../../components";
import "./AdminProperties.css"; // ✅ custom CSS
import PropertyModal from "./PropertyModal";

type PropertyRowInline = {
  id: string;
  name: string;
  email: string;
  type: "Residential" | "Commercial";
  location: string;
  value: number | string;
  date: string;
  active: boolean;
};
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
  const [rows, setRows] = useState<PropertyRowInline[]>([
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(setSearchTerm)

  const handleToggle = (id: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, active: !row.active } : row))
    );
  };

  const handleView = (id: string) => {
    alert("Viewing details for property " + id);
  };

  const handleDelete = (row: GenericRow | PropertyRow | string) => {
    if (typeof row === "string") {
      setSelectedProperty(rows.find((r) => r.id === row) || null);
    } else {
      setSelectedProperty(row as PropertyRow);
    }
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

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* Header */}
        <div className="admin-header">
          <div>
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
          </div>
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
              textTransform: "none",StatCard
            }}
          >
            Add Property
          </Button>
        </div>
  
        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            < {...stat} key={i} />
          ))}
        </div>
  
        {/* Search + Filter */}
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
          <div className="search-filter">
            <div className="search-box">
              <SearchBar
                placeholder="Search properties by name, location, or type..."
                value={searchTerm}
                onChange={setSearchTerm}
                color={purpleTheme.primary.main}
              />
            </div>
            <div className="filter-btn">
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
            </div>
          </div>
  
          {/* ✅ Property List */}
          <div className="property-list">
            {filteredRows.map((row) => (
              <div className="property-item" key={row.id}>
                <PropertyListItem
                  row={row}
                  onToggle={handleToggle}
                  onView={handleView}
                  onDelete={handleDelete}
                  // theme={purpleTheme}
                  formatDate={formatDate}
                  variant="property"
                  editable={true}
                />
              </div>
            ))}
          </div>
        </Paper>
  
        {/* Confirm Delete Modal */}
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
  
        {/* ✅ Property Add/Edit Modal */}
        <PropertyModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {
            // setRows((prev) => [...prev, newProperty]);
            setIsModalOpen(false);
          }}
        />
      </Container>
    </Box>
  );
  
}
