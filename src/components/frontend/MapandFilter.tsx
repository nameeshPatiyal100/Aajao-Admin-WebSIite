import "../../styles/user/MapandFilter.css";
import React, { useEffect, useState } from "react";

const MapandFilter: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
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
      <div className="leftSection">
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
          <div className="fallbackText">{error || "Fetching your location..."}</div>
        )}
      </div>

      <div className="rightSection">
        <div className="upperSection"></div>
        <div className="bottomSection">
          <div className="preBookingSection"></div>
          <div className="luxurySection"></div>
        </div>
      </div>
    </div>
  );
};

export default MapandFilter;
