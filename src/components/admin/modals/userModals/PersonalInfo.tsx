import { TextField, IconButton, InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { fieldStyle } from "./styles";

const PersonalInfo = ({ disabled }: { disabled: boolean }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        label="Full Name"
        value={values.fullName}
        onChange={(e) => setFieldValue("fullName", e.target.value)}
        error={touched.fullName && !!errors.fullName}
        helperText={
          touched.fullName && typeof errors.fullName === "string"
            ? errors.fullName
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      />

      <TextField
        fullWidth
        label="Email"
        value={values.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
        error={touched.email && !!errors.email}
        helperText={
          touched.email && typeof errors.email === "string"
            ? errors.email
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      />

      <TextField
        fullWidth
        label="Phone"
        value={values.phone}
        onChange={(e) => setFieldValue("phone", e.target.value)}
        error={touched.phone && !!errors.phone}
        helperText={
          touched.phone && typeof errors.phone === "string"
            ? errors.phone
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
      />

      {/* 🔐 PASSWORD FIELD */}
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={(e) => setFieldValue("password", e.target.value)}
        error={touched.password && !!errors.password}
        helperText={
          touched.password && typeof errors.password === "string"
            ? errors.password
            : ""
        }
        disabled={disabled}
        sx={fieldStyle}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* 📅 DATE PICKER */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Birth"
          value={values.dob ? dayjs(values.dob) : null}
          onChange={(value) =>
            setFieldValue(
              "dob",
              value ? value.format("YYYY-MM-DD") : ""
            )
          }
          disabled={disabled}
          slotProps={{
            textField: {
              fullWidth: true,
              error: touched.dob && !!errors.dob,
              helperText:
                touched.dob && typeof errors.dob === "string"
                  ? errors.dob
                  : "",
              sx: fieldStyle,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default PersonalInfo;
