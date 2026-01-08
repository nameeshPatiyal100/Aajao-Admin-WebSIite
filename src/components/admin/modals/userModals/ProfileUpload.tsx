import { Box, Button, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadBox, uploadPreview } from "./styles";

const ProfileUpload = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <Box>
      <Typography fontSize={14} fontWeight={600} mb={1}>
        Profile Image
      </Typography>

      <Box sx={uploadBox}>
        {values.profileImage && (
          <img src={values.profileImage} alt="profile" style={uploadPreview as any} />
        )}

        {!disabled && (
          <Button
            startIcon={<UploadFileIcon />}
            component="label"
            variant="outlined"
          >
            Upload
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFieldValue("profileImage", URL.createObjectURL(file));
              }}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfileUpload;
