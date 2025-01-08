import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet"; // Import for types
import { DivIcon } from "leaflet"; // Import DivIcon for custom icons

// Define types for the Location prop
interface Location {
  lat: number;
  lng: number;
  nameproject: string;
  namecompany: string;
  powercapacity: string;
  type: string;
  title: string;
  slug: string;
  status: string;
}

interface MapComponentProps {
  locations: Location[];
}

const MapComponent = ({ locations }: MapComponentProps) => {
  // Default center is set to Indonesia
  const defaultCenter: LatLngExpression = [-1.548926, 118.014863];

  // Function to choose marker color based on status
  const getMarkerColor = (status: string): string => {
    switch (status) {
      case "pengembangan":
        return "#FF7F50"; // Coral color for "pengembangan"
      case "operasi":
        return "#32CD32";
      case "konstruksi":
        return "#1E90FF";
      default:
        return "#808080";
    }
  };

  return (
<div style={{ height: "400px", width: "100%", borderRadius: "15px", overflow: "hidden" }}>
    <MapContainer
        center={defaultCenter}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-md"
        scrollWheelZoom={false} 
        zoomAnimation={true}
        // dragging={false} 
        touchZoom={false} 
        doubleClickZoom={false}
    >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    {locations.map((location, index) => {
      const markerColor = getMarkerColor(location.status);

      console.log("Marker Color: ", markerColor); 

      const svgIcon = `
      <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 512.00 512.00" xml:space="preserve" fill="#ffffff" stroke="#ffffff" stroke-width="0.00512">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <!-- Apply the markerColor directly to the fill of the path -->
            <path fill="${markerColor}" d="M256,0C159.969,0,82.125,77.859,82.125,173.906C82.125,269.938,236.797,512,256,512 c19.219,0,173.875-242.063,173.875-338.094C429.875,77.859,352.031,0,256,0z M256,240.406c-36.719,0-66.5-29.781-66.5-66.5 c0-36.75,29.781-66.531,66.5-66.531s66.516,29.781,66.516,66.531C322.516,210.625,292.719,240.406,256,240.406z"></path>
          </g>
        </g>
      </svg>
    `;
  
      const customIcon = new DivIcon({
        html: svgIcon,
        iconSize: [0, 0],
        iconAnchor: [11, 15], // Adjust anchor for better positioning
      });

      return (
        <Marker
        key={index}
        position={[location.lat, location.lng]}
        icon={customIcon}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup(); // Show the popup on hover
          },
        //   mouseout: (e) => {
        //     e.target.closePopup(); // Hide the popup when hover is removed
        //   },
        }}
      >
    <Popup >
    <div className=" bg-white rounded-lg w-32 h-full max-w-xs text-left space-y-0 p-0 ">

        <div className="flex items-center space-x-2 m-0">
            <strong className="text-[0.825rem] font-bold text-gray-900">{location.nameproject}</strong>
        </div>

        <div className="flex justify-between m-0 p-0">
            <p className="text-[0.685rem] text-gray-600 p-0 m-0">Company:</p>
            <p className="text-[0.685rem] text-gray-600 px-3 inline-block text-right p-0 m-0">{location.namecompany}</p>
        </div>

        <div className="flex justify-between m-0 p-0">
            <p className="text-[0.685rem]  text-gray-600 p-0 m-0">Capacity:</p>
            <p className="text-[0.685rem]  text-gray-600 px-3 p-0 m-0 inline-block text-right">{location.powercapacity}</p>
        </div>

        <div className="flex justify-between items-center m-0 p-0">
            <p className="text-[0.685rem]  text-gray-600 p-0 m-0">Status:</p>
            <p
                className="text-[0.685rem] rounded-sm font-medium py-1 px-1 inline-block"
                style={{
                    backgroundColor: markerColor,
                    color: '#ffffff',
                }}
            >
                {location.status}
            </p>
        </div>
</div>


  </Popup>
      </Marker>
      );
    })}
  </MapContainer>
</div>

  );
};

export default MapComponent;
