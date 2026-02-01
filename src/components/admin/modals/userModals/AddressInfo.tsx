import React from "react";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { personalInfoFieldStyle } from "./styles";

const AddressInfo = ({ disabled }: { disabled: boolean }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  return (
    <>
      <TextField
        fullWidth
        label="Address"
        multiline
        rows={3}
        value={values.address}
        onChange={(e) => setFieldValue("address", e.target.value)}
        error={touched.address && !!errors.address}
        helperText={
          touched.address && typeof errors.address === "string"
            ? errors.address
            : ""
        }
        disabled={disabled}
        sx={{ ...personalInfoFieldStyle, gridColumn: "1 / -1" }}
      />

      <TextField
        fullWidth
        label="City"
        value={values.city}
        onChange={(e) => setFieldValue("city", e.target.value)}
        error={touched.city && !!errors.city}
        helperText={
          touched.city && typeof errors.city === "string" ? errors.city : ""
        }
        disabled={disabled}
        sx={personalInfoFieldStyle}
      />

      <TextField
        fullWidth
        label="Zipcode"
        value={values.zipcode}
        onChange={(e) => setFieldValue("zipcode", e.target.value)}
        error={touched.zipcode && !!errors.zipcode}
        helperText={
          touched.zipcode && typeof errors.zipcode === "string"
            ? errors.zipcode
            : ""
        }
        disabled={disabled}
        sx={personalInfoFieldStyle}
      />
    </>
  );
};

// export default ;
export default React.memo(AddressInfo);


