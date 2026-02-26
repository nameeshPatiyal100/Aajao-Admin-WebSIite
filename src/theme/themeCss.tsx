import { PurpleThemeColor } from "./themeColor";

export const themeCss = {
  modalFormContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 700, md: 900 },
    bgcolor: "background.paper",
    height: "80vh",
    // padding: 0,
    borderRadius: 4,
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    overflowY: "auto",
    transition: "all 0.3s ease-in-out",
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#c4b5fd",
      borderRadius: 4,
    },
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 3,
    py: 2,
    bgcolor: PurpleThemeColor,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
};
