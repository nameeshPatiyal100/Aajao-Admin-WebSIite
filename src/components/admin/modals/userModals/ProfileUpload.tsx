import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFormikContext } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { uploadBox, uploadPreview } from "./styles";

const PURPLE = "#881f9b";

const ProfileUpload = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <Box>
      {/* ⬇ Slight gap below heading */}
      <Typography fontSize={14} fontWeight={600} mb={1.5}>
        Profile Image
      </Typography>

      <Box sx={uploadBox}>
        {values.profileImage && (
          <Box sx={{ position: "relative", mb: 1.5 }}>
            <img
              src={values.profileImage}
              alt="profile"
              style={uploadPreview as any}
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
                  setFieldValue("profileImage", URL.createObjectURL(file));
                }
              }}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfileUpload;
