import "../../styles/user/PropertyDetail.css";
import { Box, Typography, IconButton, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HomePropCard } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  LocationOn,
  Pool,
  LocalParking,
  Wifi,
  Star,
} from "@mui/icons-material";
import L from "leaflet";

export const PropertyDetail = () => {
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c14365",
          borderRadius: "50%",
          width: 35,
          height: 35,
          position: "absolute",
          right: -15,
          top: "40%",
          zIndex: 2,
          cursor: "pointer",
          color: "#fff",
        }}
        onClick={onClick}
      >
        &gt;
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c14365",
          borderRadius: "50%",
          width: 35,
          height: 35,
          position: "absolute",
          left: -15,
          top: "40%",
          zIndex: 2,
          cursor: "pointer",
          color: "#fff",
        }}
        onClick={onClick}
      >
        &lt;
      </div>
    );
  };
  const similarProperties = [
    {
      image: "/room2.jpg",
      name: "Luxury Apartment",
      description: "Modern interiors with a beautiful view.",
      location: "Chennai, India",
      price: "₹2000/night",
    },
    {
      image: "/room3.jpg",
      name: "Cozy Studio",
      description: "Perfect for solo travelers.",
      location: "Chennai, India",
      price: "₹1200/night",
    },
    {
      image: "/room4.jpg",
      name: "Family Apartment",
      description: "Spacious apartment for family stay.",
      location: "Chennai, India",
      price: "₹2500/night",
    },
    {
      image: "/room1.jpg",
      name: "Modern Flat",
      description: "Elegant interiors with premium amenities.",
      location: "Chennai, India",
      price: "₹1800/night",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  const chandigarhCoords: [number, number] = [30.7333, 76.7794];

  // Custom Marker Icon
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  return (
    <div className="mainUpperContainer">
      {/* Breadcrumb Section */}
      <Box className="breadcrumbContainer">
        <IconButton className="backButton">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Property Detail</Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <div className="mainSection">
        {/* Left Side - Images */}
        <div className="leftSection">
          <img src="/room1.jpg" alt="cover" className="coverImage" />
          <div className="propertyImages">
            <img src="/room2.jpg" alt="room2" className="smallImage" />
            <img src="/room3.jpg" alt="room3" className="smallImage" />
            <img src="/room4.jpg" alt="room4" className="smallImage" />
            <img src="/room1.jpg" alt="room5" className="smallImage" />
          </div>
          <div className="titleSection">
            <div className="leftTitleSection">
              <span className="price">₹1500</span>
              <span className="location">
                <LocationOn className="locationIcon" /> 123 ani street chennai,
                India
              </span>

              <div className="categoryTags">
                <span className="category">Apartment</span>
                <span className="tag">Luxury</span>
                <span className="tag">Family</span>
              </div>

              <div className="amenities">
                <span className="amenity">
                  <Pool className="amenityIcon" /> Pool
                </span>
                <span className="amenity">
                  <LocalParking className="amenityIcon" /> Parking
                </span>
                <span className="amenity">
                  <Wifi className="amenityIcon" /> WiFi
                </span>
              </div>

              {/* ⭐ Rating Section */}
              <div className="ratings">
                <Star className="starIcon" />
                <Star className="starIcon" />
                <Star className="starIcon" />
                <Star className="starIcon" />
                <Star className="starIcon" />
              </div>
            </div>

            <div className="rightTitleSection">
              <div className="bookingBox">
                <h3 className="bookingTitle">Book Your Stay</h3>

                <div className="dateGroup">
                  <label className="dateLabel">Check-in</label>
                  <input type="date" className="datePicker" />
                </div>

                <div className="dateGroup">
                  <label className="dateLabel">Check-out</label>
                  <input type="date" className="datePicker" />
                </div>

                <button className="bookButton">Book Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="propeDetailRightSection">
          <div className="rightBox ownerBox">
            <h3 className="ownerTitle">Owner's Details</h3>
            <h6 className="ownerName">Mr Joe Doe</h6>
            <p className="ownerDesc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto alias, sap
            </p>
            <span className="contactAgent">
              {/* <i className="fas fa-phone"></i> Contact agent */}
              <PhoneIcon className="phoneIcon" /> Contact agent
            </span>
          </div>

          {/* <div className="rightBox"></div> */}
          <div className="rightMapBox mapBox">
            <MapContainer
              center={chandigarhCoords}
              zoom={13}
              scrollWheelZoom={false}
              className="propertyMap"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={chandigarhCoords} icon={markerIcon}>
                <Popup>Property located in Chandigarh</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <div className="descriptionSection">
        <h3 className="descriptionTitle">Property Description</h3>
        <p className="descriptionText">
          This luxury apartment offers a perfect blend of comfort and elegance.
          Located in the heart of Chennai, the property features spacious rooms,
          modern interiors, and access to premium amenities like a swimming
          pool, parking facilities, and high-speed WiFi. Ideal for families and
          business travelers alike, this homestay ensures both relaxation and
          convenience.
        </p>
        <div className="propertyInfo">
          <div className="infoItem">
            <span className="infoTitle">Pets Allowed:</span>
            <span className="infoValue">Yes</span>
          </div>
          <div className="infoItem">
            <span className="infoTitle">Smoking:</span>
            <span className="infoValue">No</span>
          </div>
        </div>

        {/* House Rules Section */}
        <div className="houseRules">
          <h4 className="houseRulesTitle">House Rules</h4>
          <ul className="rulesList">
            <li>Check-in after 2:00 PM</li>
            <li>Check-out before 11:00 AM</li>
            <li>No loud music after 10:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="similarPropertiesSection">
        <h3 className="similarPropertiesTitle">
          Similar Properties You May Like
        </h3>
        <Slider {...sliderSettings} className="similarPropertiesSlider">
          {similarProperties.map((prop, index) => (
            <HomePropCard
              key={index}
              image={prop.image}
              name={prop.name}
              description={prop.description}
              location={prop.location}
              price={prop.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
