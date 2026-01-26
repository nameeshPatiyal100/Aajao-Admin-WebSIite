import { TextField, MenuItem } from "@mui/material";
import { useFormikContext } from "formik";
import { fieldStyle } from "./styles";

const AccountStatus = ({ disabled }: { disabled: boolean }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  return (
    <>
      {/* Status */}
      <TextField
        select
        fullWidth
        label="Status"
        value={values.status}
        onChange={(e) => setFieldValue("status", e.target.value)}
        error={touched.status && !!errors.status}
        helperText={
          touched.status && typeof errors.status === "string"
            ? errors.status
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>

      {/* Verification */}
      <TextField
        select
        fullWidth
        label="Verification"
        value={values.verified}
        onChange={(e) => setFieldValue("verified", e.target.value)}
        error={touched.verified && !!errors.verified}
        helperText={
          touched.verified && typeof errors.verified === "string"
            ? errors.verified
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      >
        <MenuItem value="Verified">Verified</MenuItem>
        <MenuItem value="Unverified">Unverified</MenuItem>
      </TextField>

      {/* Document Type */}
      <TextField
        select
        fullWidth
        label="Document Type"
        value={values.documentType}
        onChange={(e) => setFieldValue("documentType", e.target.value)}
        error={touched.documentType && !!errors.documentType}
        helperText={
          touched.documentType && typeof errors.documentType === "string"
            ? errors.documentType
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      >
        <MenuItem value="Aadhaar Card">Aadhaar Card</MenuItem>
        <MenuItem value="Driving Licence">Driving Licence</MenuItem>
        <MenuItem value="Passport">Passport</MenuItem>
      </TextField>

      {/* Document Number */}
      <TextField
        fullWidth
        label="Document Number"
        value={values.documentNumber}
        onChange={(e) => setFieldValue("documentNumber", e.target.value)}
        error={touched.documentNumber && !!errors.documentNumber}
        helperText={
          touched.documentNumber && typeof errors.documentNumber === "string"
            ? errors.documentNumber
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      />
    </>
  );
};

export default AccountStatus;
