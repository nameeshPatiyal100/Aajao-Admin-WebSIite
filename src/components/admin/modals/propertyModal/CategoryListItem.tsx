import {
  Box,
  Typography,
  Switch,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Eye as EyeIcon, PenIcon, Trash2Icon } from "lucide-react";

interface CategoryRow {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  active: boolean;
  canEdit?: boolean;
}

interface CategoryListItemProps {
  row: CategoryRow;
  onToggle: (id: string) => void;
  onEdit: (row: CategoryRow) => void;
  onDelete: (row: CategoryRow) => void;
  formatDate: (date: string) => string;
  editable?: boolean;
}

export default function CategoryListItem({
  row,
  onToggle,
  onEdit,
  onDelete,
  formatDate,
  editable = true,
}: CategoryListItemProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #e5e7eb",
        "&:hover": { bgcolor: `${theme.palette.primary.main}05` },
        transition: "background 0.2s ease",
      }}
    >
      {/* Category Title */}
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {row.title}
      </Typography>

      {/* Category Slug */}
      <Typography variant="body2" color="text.secondary">
        {row.slug}
      </Typography>

      {/* Toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Switch
          checked={row.active}
          onChange={() => onToggle(row.id)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: theme.palette.primary.main,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: theme.palette.primary.main,
            },
          }}
        />
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: row.active ? "#10B981" : "#6B7280",
          }}
        >
          {row.active ? "Active" : "Inactive"}
        </Typography>
      </Box>

      {/* Created Date */}
      <Typography variant="body2" color="text.secondary">
        {formatDate(row.createdAt)}
      </Typography>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
        {/* Edit */}
        <Tooltip title="Edit Category" arrow>
          <span>
            <IconButton
              size="small"
              disabled={!(editable && row.canEdit)}
              onClick={() => onEdit(row)}
              sx={{
                color:
                  editable && row.canEdit
                    ? theme.palette.primary.main
                    : "#9CA3AF",
              }}
            >
              <PenIcon size={16} />
            </IconButton>
          </span>
        </Tooltip>

        {/* View (optional) */}
        <Tooltip title="View Details" arrow>
          <IconButton
            size="small"
            sx={{ color: theme.palette.primary.main }}
          >
            <EyeIcon size={16} />
          </IconButton>
        </Tooltip>

        {/* Delete */}
        <Tooltip title="Delete Category" arrow>
          <IconButton
            size="small"
            onClick={() => onDelete(row)}
            sx={{ color: "#EF4444" }}
          >
            <Trash2Icon size={16} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
