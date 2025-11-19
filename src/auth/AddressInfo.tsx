import React from "react";
import {
  TextField,
  InputAdornment,
  Typography,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinIcon from "@mui/icons-material/Pin";

const PRIMARY = "#c14365";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AddressInfo = ({ data, errors, onChange }: any) => {
  const renderInput = (
    label: string,
    name: string,
    value: string,
    error: string,
    icon: any,
    placeholder = ""
  ) => (
    <TextField
      fullWidth
      required
      label={label + " *"}
      placeholder={placeholder}
      value={value}
      error={!!error}
      helperText={error}
      onChange={(e) => onChange(name, e.target.value)}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      }}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          "& fieldset": { borderColor: PRIMARY },
          "&.Mui-focused fieldset": { borderColor: PRIMARY },
        },
        "& label": { color: PRIMARY, fontWeight: 600 },
        "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY }, // Keep label color on focus
      }}
    />
  );

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" style={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, color: PRIMARY, textAlign: "center" }}
      >
        Address Information
      </Typography>

      {/* Address */}
      {renderInput("Address", "address", data.address, errors.address, <HomeIcon sx={{ color: PRIMARY }} />, "Enter your address")}

      {/* Country (disabled, default India) */}
      <TextField
        fullWidth
        label="Country *"
        value="India"
        disabled
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationCityIcon sx={{ color: PRIMARY }} /></InputAdornment>,
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": { borderColor: PRIMARY },
            "&.Mui-focused fieldset": { borderColor: PRIMARY },
          },
          "& label": { color: PRIMARY, fontWeight: 600 },
          "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY },
        }}
      />

      {/* State Dropdown */}
      <TextField
        fullWidth
        select
        required
        label="State *"
        value={data.state}
        error={!!errors.state}
        helperText={errors.state}
        onChange={(e) => onChange("state", e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationCityIcon sx={{ color: PRIMARY }} /></InputAdornment>,
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": { borderColor: PRIMARY },
            "&.Mui-focused fieldset": { borderColor: PRIMARY },
          },
          "& label": { color: PRIMARY, fontWeight: 600 },
          "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY },
        }}
      >
        <MenuItem value="X">X</MenuItem>
        <MenuItem value="Y">Y</MenuItem>
        <MenuItem value="Z">Z</MenuItem>
      </TextField>

      {/* City */}
      {renderInput("City", "city", data.city, errors.city, <LocationCityIcon sx={{ color: PRIMARY }} />, "Enter your city")}

      {/* Pincode */}
      {renderInput("Pincode", "pincode", data.pincode, errors.pincode, <PinIcon sx={{ color: PRIMARY }} />, "Enter your pincode")}
    </motion.div>
  );
};

export default AddressInfo;
