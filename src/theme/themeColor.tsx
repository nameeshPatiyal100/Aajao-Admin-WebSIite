export const PurpleThemeColor = "#881f9b";

export const ThemeColors = {
  primary: PurpleThemeColor,
  secondary: "#10b981",
  background: "#f4f5f7",
  text: {
    primary: "#111827",
    secondary: "#6b7280",
  },
};

export const FieldLabelColor = {
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: PurpleThemeColor,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: PurpleThemeColor,
  },
};

export const FOCUS_COLOR = "#881f9b";

export const commonFieldSx = {
  minWidth: 180,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: FOCUS_COLOR,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: FOCUS_COLOR,
  },
};

export const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: 2,
      mt: 1,
      "& .MuiMenuItem-root": {
        fontSize: "0.85rem",
        "&.Mui-selected": {
          backgroundColor: `${FOCUS_COLOR}15`,
          color: FOCUS_COLOR,
        },
        "&:hover": {
          backgroundColor: `${FOCUS_COLOR}10`,
        },
      },
    },
  },
};
