import { PurpleThemeColor } from "../../../../theme/themeColor";

export const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#881f9b",
    },
    "&:hover fieldset": {
      borderColor: "#881f9b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#881f9b",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#881f9b",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#881f9b",
  },
};
// styles.ts
export const personalInfoFieldStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#881f9b", // ✅ input text color
    "& fieldset": {
      borderColor: "#881f9b",
    },
    "&:hover fieldset": {
      borderColor: "#881f9b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#881f9b",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#881f9b",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#881f9b",
  },

  "& .MuiFormHelperText-root": {
    color: "#881f9b", // optional: helper text color
  },
};


export const sectionBox = {
  gridColumn: "1 / -1",
  p: 2,
  borderRadius: 2,
  border: "1px solid #e5e7eb",
  backgroundColor: "#fafafa",
};

export const uploadBox = {
  display: "flex",
  gap: 2,
  alignItems: "center",
};

export const uploadPreview = {
  width: 120,
  height: 120,
  borderRadius: 2,
  objectFit: "cover",
  border: `1px solid ${PurpleThemeColor}`,
};
