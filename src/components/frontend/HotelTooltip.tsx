// HotelTooltip.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HotelTooltipProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const HotelTooltip: React.FC<HotelTooltipProps> = ({ id, name, price, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/detail/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 180,
        borderRadius: "12px",
        // boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={image}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ p: 1.2 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "#c14365", mb: 0.5 }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{price.toLocaleString()} / night
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HotelTooltip;
