// import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import BadgeIcon from "@mui/icons-material/Badge";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

const PRIMARY = "#c14365";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const IDInfo = ({ data, errors, onChange }: any) => {
  const idTypes = ["Aadhaar", "PAN", "Passport", "Driver's License"];

  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: PRIMARY,
          textAlign: "center",
        }}
      >
        ID Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Document Type */}
        <TextField
          fullWidth
          select
          required
          label="Document Type *"
          value={data.docType}
          error={!!errors.docType}
          helperText={errors.docType}
          onChange={(e) => onChange("docType", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root fieldset": { borderColor: PRIMARY },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: PRIMARY },
            "& label": { color: PRIMARY, fontWeight: 600 },
          }}
        >
          {idTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        {/* Document Number */}
        <TextField
          fullWidth
          required
          label="Document Number *"
          value={data.docNumber}
          error={!!errors.docNumber}
          helperText={errors.docNumber}
          onChange={(e) => onChange("docNumber", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: PRIMARY }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root fieldset": { borderColor: PRIMARY },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: PRIMARY },
            "& label": { color: PRIMARY, fontWeight: 600 },
          }}
        />

        {/* File Upload */}
        <Button
          variant="contained"
          component="label"
          startIcon={<FileUploadIcon />}
          sx={{ backgroundColor: PRIMARY }}
        >
          Upload Document
          <input
            type="file"
            hidden
            onChange={(e) =>
              onChange("file", e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>

        {/* Preview */}
        {data.file && (
          <Box
            sx={{
              mt: 2,
              width: "100%",
              height: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              border: "2px dashed #ccc",
              borderRadius: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              const url = URL.createObjectURL(data.file);
              window.open(url, "_blank");
            }}
          >
            {/* Cross button */}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onChange("file", null);
              }}
              sx={{ position: "absolute", top: 4, right: 4, color: PRIMARY }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* File / Image Preview */}
            {isImage(data.file) ? (
              <Box
                component="img"
                src={URL.createObjectURL(data.file)}
                alt="preview"
                sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              />
            ) : (
              <InsertDriveFileIcon sx={{ fontSize: 80, color: "#999" }} />
            )}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default IDInfo;
