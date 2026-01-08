import { Box, Button, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadBox, uploadPreview } from "./styles";

const IdUpload = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <Box>
      <Typography fontSize={14} fontWeight={600} mb={1}>
        Government ID
      </Typography>

      <Box sx={uploadBox}>
        {values.idImage && (
          <img src={values.idImage} alt="id" style={uploadPreview as any} />
        )}

        {!disabled && (
          <Button
            startIcon={<UploadFileIcon />}
            component="label"
            variant="outlined"
          >
            Upload ID
            <input
              hidden
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFieldValue("idImage", URL.createObjectURL(file));
              }}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default IdUpload;
