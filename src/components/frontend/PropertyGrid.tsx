// PropertyGrid.tsx
// import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { HomePropCard } from "../../components";

const PropertyGrid = ({ properties }: any) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        },
        mt: 2,
      }}
    >
      {properties.map((p: any, i: number) => (
        <Link
          to={`/property/detail/${i + 1}`}
          key={i}
          style={{ textDecoration: "none" }}
        >
          <HomePropCard {...p} />
        </Link>
      ))}
    </Box>
  );
};

export default PropertyGrid;
