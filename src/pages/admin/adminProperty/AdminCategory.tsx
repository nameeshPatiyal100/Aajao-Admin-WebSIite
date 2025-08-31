import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch, // Ensure Switch is imported for the modal
} from "@mui/material";
import { PropertyListItem, SearchBar } from "../../../components"; // Assuming this path is correct
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

// Interface for Category data (matching what PropertyListItem expects now)
interface Category {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  createdAt: string;
}

const initialCategories: Category[] = [
  {
    id: "cat1",
    title: "Residential Properties",
    slug: "residential-properties",
    active: true,
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "cat2",
    title: "Commercial Properties",
    slug: "commercial-properties",
    active: true,
    createdAt: "2023-02-20T11:30:00Z",
  },
  {
    id: "cat3",
    title: "Land & Plots",
    slug: "land-plots",
    active: false,
    createdAt: "2023-03-10T09:00:00Z",
  },
  {
    id: "cat4",
    title: "Industrial Properties",
    slug: "industrial-properties",
    active: true,
    createdAt: "2023-04-05T14:00:00Z",
  },
];

export default function AdminCategory() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null); // For editing
  const [modalCategoryTitle, setModalCategoryTitle] = useState("");
  const [modalCategorySlug, setModalCategorySlug] = useState("");
  const [modalCategoryActive, setModalCategoryActive] = useState(true); // For new/edited active status
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleToggleActive = (id: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === id ? { ...cat, active: !cat.active } : cat
      )
    );
  };

  // This function is triggered by PropertyListItem's "Edit" button
  const handleEditClick = (id: string) => {
    const categoryToEdit = categories.find((cat) => cat.id === id);
    if (categoryToEdit) {
      setCurrentCategory(categoryToEdit);
      setModalCategoryTitle(categoryToEdit.title);
      setModalCategorySlug(categoryToEdit.slug);
      setModalCategoryActive(categoryToEdit.active);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
    }
  };

  const handleSaveCategory = () => {
    if (currentCategory) {
      // Editing existing category
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === currentCategory.id
            ? {
                ...cat,
                title: modalCategoryTitle,
                slug: modalCategorySlug,
                active: modalCategoryActive,
              }
            : cat
        )
      );
    } else {
      // Adding new category
      const newCat: Category = {
        id: `cat${Date.now()}`, // Unique ID for new category
        title: modalCategoryTitle,
        slug: modalCategorySlug,
        active: modalCategoryActive,
        createdAt: new Date().toISOString(),
      };
      setCategories((prevCategories) => [...prevCategories, newCat]);
    }
    // Close modal and reset states
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentCategory(null);
    setModalCategoryTitle("");
    setModalCategorySlug("");
    setModalCategoryActive(true); // Reset to true for next add
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{ mb: 4 }}>
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
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage and categorize your properties effectively.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentCategory(null); // Ensure no category is selected for adding
            setModalCategoryTitle("");
            setModalCategorySlug("");
            setModalCategoryActive(true); // Default active for new
            setIsAddModalOpen(true);
          }}
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
            placeholder="Search categories by title or slug..."
            color={purpleTheme.primary.main}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="property categories table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: 700,
                  backgroundColor: purpleTheme.primary.light,
                  color: purpleTheme.primary.contrastText,
                  borderBottom: "none",
                },
              }}
            >
              <TableCell>Category Title</TableCell>
              <TableCell>Category Slug</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <PropertyListItem
                key={category.id}
                row={category}
                onToggle={handleToggleActive}
                onView={handleEditClick}
                onDelete={handleDeleteClick}
                formatDate={formatDate}
                variant="category"
                editable={true}
                theme={purpleTheme}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Category Modal */}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setCurrentCategory(null);
          setModalCategoryTitle("");
          setModalCategorySlug("");
          setModalCategoryActive(true);
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>
          {currentCategory ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Category Title"
            type="text"
            fullWidth
            variant="outlined"
            value={modalCategoryTitle}
            onChange={(e) => setModalCategoryTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Category Slug"
            type="text"
            fullWidth
            variant="outlined"
            value={modalCategorySlug}
            onChange={(e) => setModalCategorySlug(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={modalCategoryActive}
                onChange={(e) => setModalCategoryActive(e.target.checked)}
                color="primary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: purpleTheme.secondary.main,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: purpleTheme.secondary.light,
                  },
                }}
              />
            }
            label="Active"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              setCurrentCategory(null);
              setModalCategoryTitle("");
              setModalCategorySlug("");
              setModalCategoryActive(true);
            }}
            sx={{ color: purpleTheme.secondary.main }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCategory}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${purpleTheme.primary.main}, ${purpleTheme.primary.light})`,
              color: purpleTheme.primary.contrastText,
            }}
          >
            {currentCategory ? "Save Changes" : "Add Category"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
