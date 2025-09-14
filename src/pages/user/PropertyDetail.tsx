import "../../styles/user/PropertyDetail.css";
import { Box, Typography, IconButton, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export const PropertyDetail = () => {
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
        </div>

        {/* Right Side - Details */}
        <div className="rightSection">
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
    </div>
  );
};
