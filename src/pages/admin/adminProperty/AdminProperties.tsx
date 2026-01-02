import { useState } from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";

import {
  Add as AddIcon,
  TrendingUp,
  Business,
  People,
  Assessment,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

import {
  SearchBar,
  StatCard,
  ConfirmDialog,
  PropertyListItem,
} from "../../../components";

import PropertyModal from "./PropertyModal";
import AdvancedFilters from "./AdvancedFilters";

import { PropertyRow, GenericRow } from "../../../components/types";

/* ===================== COLORS ===================== */

const PRIMARY_COLOR = "#5B21B6"; // 🔥 PURPLE.dark
const PRIMARY_LIGHT = "#E9D5FF";
const SECONDARY_COLOR = "#A855F7";
const BACKGROUND_COLOR = "#F9FAFB";

/* ---------------------------------- */

export default function AdminProperties() {
  /* ===================== STATE ===================== */

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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const [statusFilter, setStatusFilter] = useState<
    "active" | "inactive" | null
  >(null);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<any>(null);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const [selectedProperty, setSelectedProperty] =
    useState<PropertyRow | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===================== HANDLERS ===================== */

  const handleToggle = (id: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, active: !row.active } : row
      )
    );
  };

  const handleFilterSubmit = () => {
    const payload = {
      status: statusFilter,
      category,
      date,
      price,
      rating,
    };

    console.log("Filter Payload →", payload);
    // 🔥 API call goes here
  };

  const handleClearFilters = () => {
    setStatusFilter(null);
    setCategory("");
    setDate(null);
    setPrice("");
    setRating("");
  };

  const handleView = (id: string) => {
    alert("Viewing property " + id);
  };

  const handleDelete = (row: GenericRow | PropertyRow | string) => {
    const selected =
      typeof row === "string"
        ? rows.find((r) => r.id === row)
        : (row as PropertyRow);

    setSelectedProperty(selected || null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedProperty) return;
    setRows((prev) => prev.filter((r) => r.id !== selectedProperty.id));
    setIsDeleteModalOpen(false);
  };

  /* ===================== FILTERING ===================== */

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ===================== STATS ===================== */

  const stats = [
    {
      label: "Total Properties",
      value: rows.length.toString(),
      icon: Business,
      color: PRIMARY_COLOR,
      bgColor: `${PRIMARY_COLOR}15`,
    },
    {
      label: "Active Properties",
      value: rows.filter((r) => r.active).length.toString(),
      icon: Assessment,
      color: "#16A34A",
      bgColor: "#16A34A15",
    },
    {
      label: "Total Value",
      value: "$2.1M",
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

  /* ===================== UI ===================== */

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BACKGROUND_COLOR }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(
                  135deg,
                  ${PRIMARY_COLOR},
                  ${SECONDARY_COLOR}
                )`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Property Management
            </Typography>
            <Typography color="text.secondary">
              Manage and monitor all properties
            </Typography>
          </Box>

          <Button
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              background: `linear-gradient(
                135deg,
                ${PRIMARY_COLOR},
                ${PRIMARY_LIGHT}
              )`,
              color: "#fff",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Add Property
          </Button>
        </Box>

        {/* STATS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(4,1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </Box>

        {/* SEARCH + FILTER */}
        <Paper sx={{ borderRadius: 4, mb: 3 }}>
          <Box sx={{ p: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 2, minWidth: 260 }}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search properties..."
                color={PRIMARY_COLOR}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Button
                fullWidth
                startIcon={<FilterIcon />}
                onClick={() => setShowAdvancedFilter((p) => !p)}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  color: PRIMARY_COLOR,
                  border: `1px solid ${PRIMARY_COLOR}`,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: `${PRIMARY_COLOR}10`,
                  },
                }}
              >
                Advanced Filters
              </Button>
            </Box>
          </Box>
          {/* ADVANCED FILTERS COMPONENT */}
          <AdvancedFilters
            open={showAdvancedFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            onApply={handleFilterSubmit}
            onClear={handleClearFilters}
          />

          {/* PROPERTY LIST */}
          <Box sx={{ p: 2.5 }}>
            <AnimatePresence>
              {filteredRows.map((row) => (
                <motion.div key={row.id}>
                  <Box
                    sx={{
                      mb: 2,
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "#fff",
                      boxShadow: "0 3px 6px rgba(0,0,0,0.06)",
                    }}
                  >
                    <PropertyListItem
                      row={row}
                      onToggle={handleToggle}
                      onView={handleView}
                      onDelete={handleDelete}
                      editable
                      variant="property"
                    />
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Paper>

        {/* MODALS */}
        <ConfirmDialog
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete"
          highlight={selectedProperty?.name || ""}
          highlightColor={PRIMARY_COLOR}
        />

        <PropertyModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      </Container>
    </Box>
  );
}
