import {
  Box,
  Avatar,
  Typography,
  Chip,
  Switch,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { PenIcon } from "lucide-react";

interface PropertyListItemProps {
  row: PropertyRow;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (row: PropertyRow) => void;
  formatDate: (date: string) => string;
}

export default function PropertyListItem({
  row,
  onToggle,
  onView,
  onDelete,
  formatDate,
  editable
}: PropertyListItemProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": { bgcolor: `${theme.palette.primary.main}05` },
        transition: "background-color 0.2s ease",
      }}
    >

      <Avatar
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          fontWeight: 700,
          fontSize: "0.9rem",
        }}
      >
        {row.id.slice(-2)}
      </Avatar>


      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "1rem", mb: 0.5 }}
        >
          {row.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {row.email}
        </Typography>
        <Box
          sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}
        >
          <Chip
            label={row.type}
            size="small"
            sx={{
              bgcolor: row.type === "Residential" ? "#E0F2FE" : "#FEF3E2",
              color: row.type === "Residential" ? "#0369A1" : "#EA580C",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {row.location}
          </Typography>
        </Box>
      </Box>


      <Box sx={{ textAlign: "right", minWidth: 120 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 0.5 }}
        >
          {row.value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(row.date)}
        </Typography>
      </Box>


      <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
        <Switch
          checked={row.active}
          onChange={() => onToggle(row.id)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: theme.palette.primary.main,
              "&:hover": { bgcolor: `${theme.palette.primary.main}20` },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: theme.palette.primary.main,
            },
          }}
        />
        <Typography
          sx={{
            ml: 1,
            fontWeight: 500,
            color: row.active ? "#10B981" : "#6B7280",
          }}
        >
          {row.active ? "Active" : "Inactive"}
        </Typography>
      </Box>



      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Tooltip title="Edit Property" arrow>
          <span>
          <IconButton
            size="small"
            disabled={!editable}
            onClick={() => onView(row.id)}
            sx={{ color: editable ? theme.palette.primary.main : "#9CA3AF", cursor: editable ? "pointer" : "not-allowed" }}
          >
            <PenIcon fontSize="small" />
          </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="View Details" arrow>
          <IconButton
            size="small"
            onClick={() => onView(row.id)}
            sx={{ color: theme.palette.primary.main }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Property" arrow>
          <IconButton
            size="small"
            onClick={() => onDelete(row)}
            sx={{ color: "#EF4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
