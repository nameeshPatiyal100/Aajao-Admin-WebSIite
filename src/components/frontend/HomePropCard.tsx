import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

interface HomePropCardProps {
  image: string;
  name: string;
  location: string;
  price: string;
  tag?: string;
  rating?: number;
}

const HomePropCard: React.FC<HomePropCardProps> = ({
  image,
  name,
  location = "india",
  price,
  tag = "Featured", // 👈 default tag
  rating = 4.3,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2.5,
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
        transition: "0.25s",
        "&:hover": { boxShadow: "0 8px 22px rgba(0, 0, 0, 0.20)" },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          height: 140,
          position: "relative",
          overflow: "hidden",
          borderTopLeftRadius: 2.5,
          borderTopRightRadius: 2.5,
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* TAG ON TOP RIGHT */}
        {tag && (
          <Chip
            label={tag}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "#c14365",
              color: "white",
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ padding: "12px 14px" }}>
        {/* Title */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#c14365",
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: "#c14365" }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {location}
          </Typography>
        </Box>
        {/* Rating */}
        {rating && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 0.5,
            }}
          >
            ⭐ {rating}
          </Typography>
        )}

        {/* Price */}
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, color: "#c14365", mb: 1 }}
        >
          {price}
        </Typography>

        {/* FULL WIDTH BUTTON */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#c14365",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 0.8,
            "&:hover": { bgcolor: "#ab3864" },
          }}
          onClick={() => navigate("/property/detail/1")}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomePropCard;
