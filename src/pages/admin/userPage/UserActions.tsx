import { IconButton, Tooltip } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Attendant, ModalMode } from "./types";

const COLORS = {
  primary: "#881f9b",
  secondary: "#10b981",
};

interface Props {
  user: Attendant;
  onAction: (user: Attendant, mode: "view" | "edit") => void;
  onDelete: (user: Attendant) => void;
}


export const UserActions = ({ user, onAction, onDelete }: Props) => (
  <>
    <Tooltip title="View Details">
      <IconButton
        size="small"
        sx={{ color: COLORS.primary, mr: 1 }}
        onClick={() => onAction(user, "view")}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="Edit User">
      <IconButton
        size="small"
        sx={{ color: COLORS.secondary, mr: 1 }}
        onClick={() => onAction(user, "edit")}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="Delete User">
      <IconButton
        size="small"
        sx={{ color: "error.main" }}
        onClick={() => onDelete(user)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </>
);
