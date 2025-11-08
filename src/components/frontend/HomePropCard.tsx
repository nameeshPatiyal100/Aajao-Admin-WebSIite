import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import "../../styles/user/HomePropCard.css";

interface HomePropCard {
  image: string;
  name: string;
  description: string;
  location: string;
  price: string;
}

const HomePropCard: React.FC<HomePropCard> = ({
  image,
  name,
  description,
  location,
  price,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="hotelCard">
      {/* Hotel Image */}
      <CardMedia component="img" height="200" image={image} alt={name} />

      {/* Content */}
      <CardContent>
        <Typography variant="h6" className="hotelTitle">
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="hotelDescription"
        >
          {description}
        </Typography>

        {/* Location */}
        <Box className="hotelLocation">
          <LocationOnIcon className="locationIcon" />
          <Typography variant="body2">{location}</Typography>
        </Box>

        {/* Price + Action */}
        <Box className="hotelFooter">
          <Typography variant="h6" className="hotelPrice">
            {price}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#c14365",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: "#ab3864" },
            }}
            onClick={() => navigate("/property/detail/1")}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HomePropCard;
