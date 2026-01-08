import { PurpleThemeColor } from "../../../../theme/themeColor";

export const fieldStyle = {
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: PurpleThemeColor,
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
