import { IconButton, Tooltip } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { HostTableRow } from "./HostTable"; // ✅ use table row type

const COLORS = {
  primary: "#881f9b",
  secondary: "#10b981",
};

interface Props {
  host: HostTableRow;
  onAction: (host: HostTableRow, mode: "view" | "edit") => void;
  onDelete: (host: HostTableRow) => void;
}

export const HostActions = ({ host, onAction, onDelete }: Props) => (
  <>
    {/* View */}
    <Tooltip title="View Host">
      <IconButton
        size="small"
        sx={{ color: COLORS.primary, mr: 1 }}
        onClick={() => onAction(host, "view")}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    {/* Edit */}
    <Tooltip title="Edit Host">
      <IconButton
        size="small"
        sx={{ color: COLORS.secondary, mr: 1 }}
        onClick={() => onAction(host, "edit")}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    {/* Delete */}
    <Tooltip title="Delete Host">
      <IconButton
        size="small"
        sx={{ color: "error.main" }}
        onClick={() => onDelete(host)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </>
);
