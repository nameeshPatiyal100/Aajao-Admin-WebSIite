import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import { fieldStyle } from "./styles";

const PersonalInfo = ({ disabled }: { disabled: boolean }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  return (
    <>
      <TextField
        label="Full Name"
        value={values.fullName}
        onChange={(e) => setFieldValue("fullName", e.target.value)}
        error={touched.fullName && !!errors.fullName}
        helperText={touched.fullName && typeof errors.fullName === "string" ? errors.fullName : ""}
        disabled={disabled}
        sx={fieldStyle}
      />

      <TextField
        label="Email"
        value={values.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
        error={touched.email && !!errors.email}
        helperText={touched.email && typeof errors.email === "string" ? errors.email : ""}
        disabled={disabled}
      />

      <TextField
        label="Phone"
        value={values.phone}
        onChange={(e) => setFieldValue("phone", e.target.value)}
        error={touched.phone && !!errors.phone}
        helperText={touched.phone && typeof errors.phone === "string" ? errors.phone : ""}
        disabled={disabled}
      />

      <TextField
        label="Date of Birth"
        type="date"
        value={values.dob || ""}
        onChange={(e) => setFieldValue("dob", dayjs(e.target.value).format("YYYY-MM-DD"))}
        error={touched.dob && !!errors.dob}
        helperText={touched.dob && typeof errors.dob === "string" ? errors.dob : ""}
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
      />
    </>
  );
};

export default PersonalInfo;
