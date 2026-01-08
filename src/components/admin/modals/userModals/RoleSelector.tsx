import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { sectionBox } from "./styles";

const RoleSelector = ({ disabled }: { disabled: boolean }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Box sx={sectionBox}>
      <Typography fontSize={14} fontWeight={600} mb={1}>
        Account Role
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={values.user}
            onChange={(e) => {
              setFieldValue("user", e.target.checked);
              if (e.target.checked) setFieldValue("host", false);
            }}
            disabled={disabled}
          />
        }
        label="User"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={values.host}
            onChange={(e) => {
              setFieldValue("host", e.target.checked);
              if (e.target.checked) setFieldValue("user", false);
            }}
            disabled={disabled}
          />
        }
        label="Host"
      />
    </Box>
  );
};

export default RoleSelector;
