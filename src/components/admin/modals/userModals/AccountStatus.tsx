import { TextField, MenuItem } from "@mui/material";
import { useFormikContext } from "formik";

const AccountStatus = ({ disabled }: { disabled: boolean }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  return (
    <>
      <TextField
        select
        label="Status"
        value={values.status}
        onChange={(e) => setFieldValue("status", e.target.value)}
        error={touched.status && !!errors.status}
        helperText={touched.status && typeof errors.status === "string" ? errors.status : ""}
        disabled={disabled}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>

      <TextField
        select
        label="Verification"
        value={values.verified}
        onChange={(e) => setFieldValue("verified", e.target.value)}
        error={touched.verified && !!errors.verified}
        helperText={touched.verified && typeof errors.verified === "string" ? errors.verified : ""}
        disabled={disabled}
      >
        <MenuItem value="Verified">Verified</MenuItem>
        <MenuItem value="Unverified">Unverified</MenuItem>
      </TextField>
    </>
  );
};

export default AccountStatus;
