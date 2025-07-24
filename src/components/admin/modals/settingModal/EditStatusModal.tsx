
import React, { useState } from "react";
import "./editStatusModal.css";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Fade,
  Backdrop,
} from "@mui/material";

interface EditStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; color: string; type: string }) => void;
}

const statusTypes = ["Published", "Draft", "Archived", "Scheduled"];

const EditStatusModal: React.FC<EditStatusModalProps> = ({
  open,
  onClose,
  // onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    color: "",
    type: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const showSuccess = () => {
    setSnackbarMessage("Operation successful!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const showError = () => {
    setSnackbarMessage("Something went wrong.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = () => {
  //   onSubmit(formData);
  //   onClose(); // Close after submission
  //   setFormData({ name: "", color: "", type: "" }); // Reset form
  // };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={open}>
          <Box className="modal-form-box">
            <Typography variant="h6" mb={2}>
              Add New Status
            </Typography>
            <TextField
              label="Status Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Color Code"
              name="color"
              value={formData.color}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="#22C55E"
            />
            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
            >
              {statusTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={showError}>
                Cancel
              </Button>
              <Button variant="contained" onClick={showSuccess}>
                Submit
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default EditStatusModal;
