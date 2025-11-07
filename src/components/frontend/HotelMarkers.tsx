import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import HotelTooltip from "./HotelTooltip";

// ✅ Define hotel structure
interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: string | number;
  image: string;
}

// ✅ Define props for HotelMarkers
interface HotelMarkersProps {
    hotels: Hotel[];
    hotelIcon: L.Icon | L.DivIcon;
  }

const HotelMarkers: React.FC<HotelMarkersProps> = ({ hotels, hotelIcon }) => {
  return (
    <>
      {hotels.map((hotel) => {
        let hoverTimeout: ReturnType<typeof setTimeout>;

        return (
          <Marker
            key={hotel.id}
            position={[hotel.lat, hotel.lng]}
            icon={hotelIcon}
            eventHandlers={{
              click: (e) => e.target.openPopup(),
              mouseover: (e) => {
                hoverTimeout = setTimeout(() => e.target.openPopup(), 150);
              },
              mouseout: (e) => {
                clearTimeout(hoverTimeout);
                setTimeout(() => {
                  const popupEl = document.querySelector(".leaflet-popup:hover");
                  if (!popupEl) e.target.closePopup();
                }, 250);
              },
            }}
          >
            <Popup
              closeButton={false}
              autoPan={false}
              className="hotel-popup"
            >
              <div
                style={{ pointerEvents: "auto" }}
                onMouseOver={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <HotelTooltip
                  id={hotel.id}
                  name={hotel.name}
                  price={typeof hotel.price === "string" ? parseFloat(hotel.price) : hotel.price}
                  image={hotel.image}
                />
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default HotelMarkers;
