import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFormikContext } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { uploadBox, uploadPreview } from "./styles";

const PURPLE = "#881f9b";

const IdUpload = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <Box>
      {/* ⬇ Slight gap below heading */}
      <Typography fontSize={14} fontWeight={600} mb={1.5}>
        ID Document Image
      </Typography>

      <Box sx={uploadBox}>
        {values.idImage && (
          <Box sx={{ position: "relative", mb: 1.5 }}>
            {/* 🔍 Clickable image → open in new tab */}
            <a
              href={values.idImage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={values.idImage}
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
                  e.stopPropagation(); // ⛔ prevent opening image
                  e.preventDefault();
                  setFieldValue("idImage", "");
                }}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  bgcolor: "#fff",
                  color: PURPLE,
                  boxShadow: 1,
                  "&:hover": {
                    bgcolor: "#f3e8ff",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}

        {/* ⬇ Upload button spacing */}
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
                if (file) {
                  setFieldValue("idImage", URL.createObjectURL(file));
                }
              }}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default IdUpload;
