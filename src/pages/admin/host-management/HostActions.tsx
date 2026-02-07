import { IconButton, Tooltip } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { HostTableRow } from "./HostTable";

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
