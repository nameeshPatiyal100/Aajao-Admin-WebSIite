import { IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Props {
  userId: number;
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export const UserActions = ({ userId, onEdit, onDelete }: Props) => {
  return (
    <>
      <Tooltip title="Edit User">
        <IconButton
          size="small"
          sx={{ color: "#10b981", mr: 1 }}
          onClick={() => onEdit(userId)}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete User">
        <IconButton
          size="small"
          sx={{ color: "error.main" }}
          onClick={() => onDelete(userId)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};
