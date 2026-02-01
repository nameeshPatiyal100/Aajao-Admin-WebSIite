import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFormikContext } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { uploadBox, uploadPreview } from "./styles";

const PURPLE = "#881f9b";

const ProfileUpload = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [preview, setPreview] = useState<string>("");

  /* -------------------------------------------------- */
  /* Sync preview with formik value (API image / reset) */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (!values.profileImage) {
      setPreview("");
      return;
    }

    // Existing backend image (string URL)
    if (typeof values.profileImage === "string") {
      setPreview(values.profileImage);
    }

    // Newly selected file
    if (values.profileImage instanceof File) {
      const blobUrl = URL.createObjectURL(values.profileImage);
      setPreview(blobUrl);

      // cleanup memory
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [values.profileImage]);

  return (
    <Box>
      <Typography fontSize={14} fontWeight={600} mb={1.5}>
        Profile Image
      </Typography>

      <Box sx={uploadBox}>
        {preview && (
          <Box sx={{ position: "relative", mb: 1.5 }}>
            <img
              src={preview}
              alt="profile"
              style={{
                ...(uploadPreview as any),
                cursor: "pointer",
              }}
            />

            {!disabled && (
              <IconButton
                size="small"
                onClick={() => setFieldValue("profileImage", "")}
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

                // ✅ store REAL File, not blob url
                setFieldValue("profileImage", file);
              }}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(ProfileUpload);
