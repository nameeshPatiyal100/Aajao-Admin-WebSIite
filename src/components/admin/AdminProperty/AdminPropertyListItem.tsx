import {
  Box,
  Avatar,
  Typography,
  Chip,
  Switch,
  IconButton,
  Tooltip,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { PropertyRow } from "../../types";

// Generic interface that works for both properties and categories
interface GenericRow {
  id: string;
  name?: string;        // For properties
  title?: string;       // For categories
  email?: string;       // For properties
  slug?: string;        // For categories
  location?: string;    // For properties
  type?: string;        // For properties
  value?: string;       // For properties
  active: boolean;
  date?: string;        // For propertiesnpm
  createdAt?: string;   // For categories
  canEdit?: boolean;
}

// interface PropertyListItemProps {
//   row: GenericRow;
//   onToggle: (id: string) => void;
//   onView: (id: string) => void;
//   onDelete: (row: GenericRow) => void; // Can accept full row or just ID
//   // onDelete: (row: GenericRow | PropertyRow) => void;
//   formatDate?: (date: string) => string;
//   editable?: boolean;
//   variant?: 'property' | 'category'; // Specify which variant to render
//   theme?: any; // Allow custom theme
// }
interface PropertyListItemProps {
  row: GenericRow;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (row: GenericRow | PropertyRow ) => void; 
  formatDate?: (date: string) => string;
  editable?: boolean;
  variant?: 'property' | 'category';
  theme?: any;
}


export default function PropertyListItem({
  row,
  onToggle,
  onView,
  onDelete,
  formatDate,
  editable = true,
  variant = 'property', // Default to property variant
  theme: customTheme,
}: PropertyListItemProps) {
  const muiTheme = useTheme();
  const theme = customTheme || muiTheme;

  // Determine display name based on variant
  const displayName = variant === 'category' ? row.title : row.name;
  
  // Determine date field based on variant
  const dateValue = variant === 'category' ? row.createdAt : row.date;

  // Format date helper
  const getFormattedDate = (date: string) => {
    if (formatDate && date) {
      return formatDate(date);
    }
    if (date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return "";
  };

  // Handle delete - support both function signatures
  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(row);     // you can still pass the full row
    }
  };
  

  if (variant === 'category') {
    return (
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:nth-of-type(odd)": {
            backgroundColor: theme.palette?.background?.default || "#f5f5f5",
          },
          "&:hover": { 
            bgcolor: `${theme.palette?.primary?.main || "#7C3AED"}08`,
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {/* Category Title */}
        <TableCell component="th" scope="row">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${
                  theme.palette?.primary?.main || "#7C3AED"
                }, ${theme.palette?.secondary?.main || "#EC4899"})`,
                fontWeight: 700,
                fontSize: "0.9rem",
                width: 40,
                height: 40,
              }}
            >
              {displayName ? displayName.charAt(0).toUpperCase() : ""}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
              {displayName}
            </Typography>
          </Box>
        </TableCell>

        {/* Category Slug */}
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {row.slug}
          </Typography>
        </TableCell>

        {/* Status Toggle */}
        <TableCell align="center">
          <Switch
            checked={row.active}
            onChange={() => onToggle(row.id)}
            color="primary"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: theme.palette?.primary?.main || "#7C3AED",
                "&:hover": { 
                  bgcolor: `${theme.palette?.primary?.main || "#7C3AED"}20` 
                },
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                bgcolor: theme.palette?.primary?.main || "#7C3AED",
              },
            }}
          />
        </TableCell>

        {/* Created Date */}
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {getFormattedDate(dateValue || "")}
          </Typography>
        </TableCell>

        {/* Actions */}
        <TableCell align="center">
          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
            <Tooltip title="Edit Category" arrow>
              <span>
                <IconButton
                  size="small"
                  disabled={!editable}
                  onClick={() => onView(row.id)}
                  sx={{
                    color: editable 
                      ? theme.palette?.primary?.main || "#7C3AED"
                      : "#9CA3AF",
                    "&:hover": editable ? {
                      backgroundColor: `${theme.palette?.primary?.main || "#7C3AED"}15`,
                      transform: "scale(1.1)",
                    } : {},
                    transition: "all 0.2s ease",
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Delete Category" arrow>
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ 
                  color: "#EF4444",
                  "&:hover": {
                    backgroundColor: "#EF444415",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  // Property variant (default)
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette?.background?.default || "#f5f5f5",
        },
        "&:hover": { 
          bgcolor: `${theme.palette?.primary?.main || "#7C3AED"}08`,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        transition: "all 0.2s ease",
      }}
    >
      {/* Property Name */}
      <TableCell component="th" scope="row">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              background: `linear-gradient(135deg, ${
                theme.palette?.primary?.main || "#7C3AED"
              }, ${theme.palette?.secondary?.main || "#EC4899"})`,
              fontWeight: 700,
              fontSize: "0.9rem",
              width: 40,
              height: 40,
            }}
          >
            {displayName ? displayName.charAt(0).toUpperCase() : ""}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
              {displayName}
            </Typography>
            {row.email && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                {row.email}
              </Typography>
            )}
          </Box>
        </Box>
      </TableCell>

      {/* Location */}
      {row.location && (
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">📍</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.location}
            </Typography>
          </Box>
        </TableCell>
      )}

      {/* Type */}
      {row.type && (
        <TableCell align="center">
          <Chip
            label={row.type}
            size="small"
            variant="outlined"
            sx={{
              borderColor: theme.palette?.primary?.main || "#7C3AED",
              color: theme.palette?.primary?.main || "#7C3AED",
              fontWeight: 500,
            }}
          />
        </TableCell>
      )}

      {/* Value */}
      {row.value && (
        <TableCell align="right">
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette?.primary?.main || "#7C3AED",
              fontSize: "1rem"
            }}
          >
            {row.value}
          </Typography>
        </TableCell>
      )}

      {/* Status */}
      <TableCell align="center">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Switch
            checked={row.active}
            onChange={() => onToggle(row.id)}
            color="primary"
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: theme.palette?.primary?.main || "#7C3AED",
                "&:hover": { 
                  bgcolor: `${theme.palette?.primary?.main || "#7C3AED"}20` 
                },
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                bgcolor: theme.palette?.primary?.main || "#7C3AED",
              },
            }}
          />
          <Chip
            label={row.active ? 'Active' : 'Inactive'}
            size="small"
            sx={{
              bgcolor: row.active ? '#10B98115' : '#EF444415',
              color: row.active ? '#10B981' : '#EF4444',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        </Box>
      </TableCell>

      {/* Date */}
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {getFormattedDate(dateValue || "")}
        </Typography>
      </TableCell>

      {/* Actions */}
      <TableCell align="center">
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <Tooltip title="View Details" arrow>
            <IconButton
              size="small"
              onClick={() => onView(row.id)}
              sx={{
                color: theme.palette?.primary?.main || "#7C3AED",
                "&:hover": {
                  backgroundColor: `${theme.palette?.primary?.main || "#7C3AED"}15`,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit Property" arrow>
            <span>
              <IconButton
                size="small"
                disabled={!editable}
                onClick={() => onView(row.id)}
                sx={{
                  color: editable ? "#F59E0B" : "#9CA3AF",
                  "&:hover": editable ? {
                    backgroundColor: "#F59E0B15",
                    transform: "scale(1.1)",
                  } : {},
                  transition: "all 0.2s ease",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Delete Property" arrow>
            <IconButton
              size="small"
              onClick={handleDelete}
              sx={{ 
                color: "#EF4444",
                "&:hover": {
                  backgroundColor: "#EF444415",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
}