import {
  TextField,
  InputAdornment,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

import { motion } from "framer-motion";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import WcIcon from "@mui/icons-material/Wc";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EventIcon from "@mui/icons-material/Event";

const PRIMARY = "#c14365";
const ERROR_COLOR = "#333"; // blackish error text

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PersonalInfo = ({ data, errors, onChange }: any) => {
  const renderInput = (
    label: string,
    name: string,
    value: string,
    error: string,
    icon: any,
    type = "text"
  ) => (
    <TextField
      fullWidth
      required
      type={type}
      label={label}
      value={value}
      error={!!error}
      onChange={(e) => onChange(name, e.target.value)}
      helperText={error}
      FormHelperTextProps={{
        sx: { color: "#000", fontWeight: 600 }, // error text color
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      sx={{
        // ★ Rounded, modern look
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          transition: "all 0.25s ease",
  
          // ★ Hover effect
          "&:hover fieldset": {
            borderColor: PRIMARY,
          },
  
          // ★ Focus effect (smooth animation + color)
          "&.Mui-focused fieldset": {
            borderColor: PRIMARY,
            boxShadow: `0 0 0 2px ${PRIMARY}33`, // light glow
          },
        },
  
        // ★ Default and required * color
        "& label": {
          color: PRIMARY,
          fontWeight: 600,
        },
        "& .MuiFormLabel-asterisk": {
          color: PRIMARY,
        },
  
        // ★ Focused label color
        "& .Mui-focused": {
          color: PRIMARY,
        },
  
        // ★ Placeholder style
        "& input::placeholder": {
          opacity: 0.7,
          color: "#999",
        },
      }}
    />
  );
  
  

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: PRIMARY,
          textAlign: "center",
        }}
      >
        Personal Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {renderInput(
          "Full Name",
          "fullName",
          data.fullName,
          errors.fullName,
          <PersonIcon sx={{ color: PRIMARY }} />
        )}

        {renderInput(
          "Email",
          "email",
          data.email,
          errors.email,
          <EmailIcon sx={{ color: PRIMARY }} />
        )}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {renderInput(
            "Password",
            "password",
            data.password,
            errors.password,
            <LockIcon sx={{ color: PRIMARY }} />,
            "password"
          )}

          {renderInput(
            "Confirm Password",
            "confirmPassword",
            data.confirmPassword,
            errors.confirmPassword,
            <LockIcon sx={{ color: PRIMARY }} />,
            "password"
          )}
        </Box>

        {/* DOB */}
        <TextField
          fullWidth
          // required
          type="date"
          label="Date of Birth *"
          value={data.dob}
          error={!!errors.dob}
          helperText={errors.dob}
          FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 600 } }}
          onChange={(e) => onChange("dob", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon sx={{ color: PRIMARY }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiOutlinedInput-root fieldset": { borderColor: PRIMARY },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: PRIMARY },
            "& label": { color: PRIMARY, fontWeight: 600 },
            "& .MuiFormLabel-asterisk": { color: PRIMARY },
          }}
        />

        {/* Gender */}
        <TextField
          select
          fullWidth
          // required
          label="Gender *"
          value={data.gender}
          error={!!errors.gender}
          helperText={errors.gender}
          FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 600 } }}
          onChange={(e) => onChange("gender", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WcIcon sx={{ color: PRIMARY }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root fieldset": { borderColor: PRIMARY },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: PRIMARY },
            "& label": { color: PRIMARY, fontWeight: 600 },
            "& .MuiFormLabel-asterisk": { color: PRIMARY },
          }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        {/* Primary Phone */}
        {renderInput(
          "Primary Phone *",
          "contact",
          data.contact,
          errors.contact,
          <PhoneIphoneIcon sx={{ color: PRIMARY }} />
        )}

        {/* Alternate Phone */}
        {renderInput(
          "Alternate Phone",
          "alternatePhone",
          data.alternatePhone,
          "",
          <PhoneIphoneIcon sx={{ color: PRIMARY }} />
        )}

        {/* User Type */}
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 700, color: PRIMARY, mb: 1 }}>
            Select User Type
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={data.isUser}
                onChange={(e) => onChange("isUser", e.target.checked)}
                sx={{
                  color: PRIMARY,
                  "&.Mui-checked": { color: PRIMARY }, // theme color when selected
                }}
              />
            }
            label="User"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={data.isHost}
                onChange={(e) => onChange("isHost", e.target.checked)}
                sx={{
                  color: PRIMARY,
                  "&.Mui-checked": { color: PRIMARY },
                }}
              />
            }
            label="Host"
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default PersonalInfo;
