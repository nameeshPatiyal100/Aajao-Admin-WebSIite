import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  // useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface HomePropCardProps {
  image: string;
  name: string;
  description: string;
  location: string;
  price: string;
}

const HomePropCard: React.FC<HomePropCardProps> = ({
  image,
  name,
  description,
  location,
  price,
}) => {
  const navigate = useNavigate();
  // const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          maxWidth: 350,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)" },
          display: "flex",
          flexDirection: "column",
          minHeight: 420, // ✅ keeps consistent card height
        }}
      >
        {/* ✅ Fixed-height Image Box */}
        <Box
          sx={{
            height: 200,
            width: "100%",
            overflow: "hidden",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            backgroundColor: "#f3f3f3", // fallback when image missing
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover", // ensures it fills without distortion
            }}
          />
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#c14365",
              mb: 1,
              fontSize: "1.1rem",
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              lineHeight: 1.5,
              flexGrow: 1,
            }}
          >
            {description.length > 90
              ? `${description.slice(0, 90)}...`
              : description}
          </Typography>

          {/* Location */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#666",
              gap: 0.5,
              mb: 2,
            }}
          >
            <LocationOnIcon sx={{ fontSize: 20, color: "#c14365" }} />
            <Typography variant="body2">{location}</Typography>
          </Box>

          {/* Price & Button */}
          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#c14365",
                fontSize: "1.05rem",
              }}
            >
              {price}
            </Typography>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#c14365",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 2.5,
                py: 0.8,
                "&:hover": { bgcolor: "#ab3864" },
              }}
              onClick={() => navigate("/property/detail/1")}
            >
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HomePropCard;
