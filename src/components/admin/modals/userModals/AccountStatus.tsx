import React, { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useFormikContext } from "formik";
import { fieldStyle } from "./styles";

const AccountStatus = ({ disabled }: { disabled: boolean }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    setFieldValue("documentNumber", "");
  }, [values.documentType]);

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
        <MenuItem value={1}>Active</MenuItem>
        <MenuItem value={0}>Inactive</MenuItem>
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
        <MenuItem value={1}>Verified</MenuItem>
        <MenuItem value={0}>Unverified</MenuItem>
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
        <MenuItem value={1}>Aadhaar Card</MenuItem>
        <MenuItem value={2}>Driving Licence</MenuItem>
        <MenuItem value={3}>Passport</MenuItem>
      </TextField>
      {/* <TextField
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
      /> */}
      <TextField
        fullWidth
        label="Document Number"
        value={values.documentNumber}
        onChange={(e) => {
          let value = e.target.value;

          // 🚀 Restrict input based on type
          if (values.documentType === 1) {
            // Aadhaar → only numbers
            value = value.replace(/\D/g, "").slice(0, 12);
          }

          setFieldValue("documentNumber", value);
        }}
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

export default React.memo(AccountStatus);

// export default AccountStatus;
