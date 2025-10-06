import "../../styles/user/MapandFilter.css";
import React, { useEffect, useState } from "react";

// Category icons
import single from "../../assets/UI/single.png";
import couple3 from "../../assets/UI/couple3.png";
import family from "../../assets/UI/family.png";
import sharing from "../../assets/UI/sharing.png";
import prebooking from "../../assets/UI/prebooking.png";
import crown1 from "../../assets/UI/crown1.png";

const categories = [
  { img: single, label: "Single" },
  { img: couple3, label: "Couple" },
  { img: family, label: "Family" },
  { img: sharing, label: "Sharing" },
];

const MapandFilter: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError("Location access denied. Showing fallback.");
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <div className="MapParentSection">
      {/* Left Map Section */}
      <div className="">
      {/* leftSection */}
        {location ? (
          <iframe
            title="user-location-map"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "12px" }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=14&output=embed`}
          ></iframe>
        ) : (
          <div className="">
            {/* fallbackText */}
            {error || "Fetching your location..."}
          </div>
        )}
      </div>

      {/* Right Filter Section */}
      <div className="rightSection">
        {/* Categories */}
        <div className="upperSection">
          {categories.map((item, index) => (
            <div key={index} className="categorySection">
              <img src={item.img} alt={item.label} className="categoryImg" />
              <span className="categoryName">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Lower Options */}
        <div className="bottomSection">
          <div className="preBookingSection">
            <img src={crown1} alt="Luxury" className="lowerSectionImg" />
            <span className="lowerSectionText">Luxury Room</span>
          </div>
          <div className="luxurySection">
            <img src={prebooking} alt="Pre-Booking" className="lowerSectionImg" />
            <span className="lowerSectionText">Pre-Booking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapandFilter;
