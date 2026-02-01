import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFormikContext } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { uploadBox, uploadPreview } from "./styles";

const PURPLE = "#881f9b";

const IdUpload = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [preview, setPreview] = useState<string>("");

  /* -------------------------------------------------- */
  /* Sync preview with formik value (API image / reset) */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (!values.idImage) {
      setPreview("");
      return;
    }

    // Existing image from backend (string URL)
    if (typeof values.idImage === "string") {
      setPreview(values.idImage);
    }

    // New file selected
    if (values.idImage instanceof File) {
      const blobUrl = URL.createObjectURL(values.idImage);
      setPreview(blobUrl);

      // cleanup to avoid memory leak
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [values.idImage]);

  return (
    <Box>
      <Typography fontSize={14} fontWeight={600} mb={1.5}>
        ID Document Image
      </Typography>

      <Box sx={uploadBox}>
        {preview && (
          <Box sx={{ position: "relative", mb: 1.5 }}>
            {/* clickable preview */}
            <a href={preview} target="_blank" rel="noopener noreferrer">
              <img
                src={preview}
                alt="id-document"
                style={{
                  ...(uploadPreview as any),
                  cursor: "pointer",
                }}
              />
            </a>

            {!disabled && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFieldValue("idImage", ""); // remove image
                }}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  bgcolor: "#fff",
                  color: PURPLE,
                  boxShadow: 1,
                  "&:hover": { bgcolor: "#f3e8ff" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}

        {!disabled && (
          <Button
            startIcon={<UploadFileIcon sx={{ color: PURPLE }} />}
            component="label"
            variant="outlined"
            sx={{
              borderColor: PURPLE,
              color: PURPLE,
              mt: 0.5,
              "&:hover": {
                borderColor: PURPLE,
                bgcolor: "#f3e8ff",
              },
            }}
          >
            Upload
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // ✅ store REAL FILE in formik
                setFieldValue("idImage", file);
              }}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(IdUpload);
