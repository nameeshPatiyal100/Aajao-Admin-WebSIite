import { Box, Typography } from "@mui/material"
import { PropertyListItem } from "../../../components";

const purpleTheme = {
  primary: {
    main: "#7C3AED",
    light: "#A855F7",
    dark: "#5B21B6",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#EC4899",
    light: "#F472B6",
    dark: "#BE185D",
  },
  background: {
    default: "#F8FAFC",
    paper: "#FFFFFF",
  },
};
const AdminAmmenities = () => {
     const mockRow = {
        id: "1234",
        name: "Green Villa",
        email: "owner@example.com",
        type: "Residential",
        location: "California, USA",
        value: "$450,000",
        date: "2025-08-20",
        active: true,
      };

      const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <Box>
          <Box>
    <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(135deg, ${purpleTheme.primary.main}, ${purpleTheme.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
            Ammenities

        </Typography>
        <Typography variant="body1" color="text.secondary">
            Manage and categorize your property ammenities effectively.
        </Typography>


        <PropertyListItem
                row={mockRow}
                onToggle={(id) => console.log("Toggle:", id)}
                onView={(id) => console.log("View:", id)}
                onDelete={(row) => console.log("Delete:", row)}
                formatDate={formatDate}
                editable={true}
              />


  </Box>

    </Box>
  )
}

export default AdminAmmenities