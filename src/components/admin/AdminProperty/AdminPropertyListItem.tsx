import {
  Box,
  Avatar,
  Typography,
  Chip,
  Switch,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { PropertyRow } from "../../types";

interface GenericRow {
  id: string;
  name?: string;
  title?: string;
  email?: string;
  slug?: string;
  location?: string;
  type?: string;
  value?: string;
  active: boolean;
  date?: string;
  createdAt?: string;
}

interface PropertyListItemProps {
  row: GenericRow;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (row: GenericRow | PropertyRow) => void;
  formatDate?: (date: string) => string;
  editable?: boolean;
  variant?: "property" | "category";
  theme?: {
    primary: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    secondary: { main: string; light?: string; dark?: string };
    background: { default: string; paper: string };
  }; // ✅ add this
}

/* ---------- Component ---------- */
export default function PropertyListItem({
  row,
  onToggle,
  onView,
  onDelete,
  editable = true,
  variant = "property",
}: PropertyListItemProps) {
  const theme = useTheme();

  const displayName = variant === "category" ? row.title : row.name;

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
        p: 2.5,
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0px 6px 20px rgba(0,0,0,0.08)`,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Name & Avatar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 2, minWidth: 200 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            fontSize: "1rem",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          {displayName?.charAt(0)?.toUpperCase()}
        </Avatar>

        <Box>
          <Typography fontWeight={600} fontSize="1rem">
            {displayName}
          </Typography>
          {row.email && (
            <Typography fontSize="0.8rem" color="text.secondary">
              {row.email}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Location */}
      {variant === "property" && (
        <Typography fontSize="0.85rem" color="text.secondary" sx={{ flex: 1 }}>
          {row.location || "-"}
        </Typography>
      )}

      {/* Type */}
      {variant === "property" && (
        <Chip
          label={row.type || "—"}
          size="small"
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            fontWeight: 500,
            flexShrink: 0,
          }}
        />
      )}

      {/* Value */}
      {variant === "property" && (
        <Typography fontWeight={600} color="primary.main" fontSize="0.9rem" sx={{ flexShrink: 0 }}>
          {row.value || "-"}
        </Typography>
      )}

      {/* Status */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        <Switch size="small" checked={row.active} onChange={() => onToggle(row.id)} />
        <Chip
          label={row.active ? "Active" : "Inactive"}
          size="small"
          sx={{
            bgcolor: row.active ? "#10B98115" : "#EF444415",
            color: row.active ? "#10B981" : "#EF4444",
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", flexShrink: 0 }}>
        <Tooltip title="View">
          <IconButton size="small" onClick={() => onView(row.id)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit">
          <span>
            <IconButton
              size="small"
              disabled={!editable}
              sx={{ color: editable ? "#F59E0B" : "#9CA3AF" }}
              onClick={() => onView(row.id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton size="small" sx={{ color: "#EF4444" }} onClick={() => onDelete(row)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}
