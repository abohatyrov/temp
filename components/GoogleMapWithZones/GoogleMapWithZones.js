import React from "react";
import PropTypes from "prop-types";

import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Polygon,
} from "@react-google-maps/api";

import ServiceAreasCoords from "/consts/ServiceAreasCoordinats";
import { Box } from "@mui/material";

const defaultMarkerPosition = { lng: 24.0103439, lat: 49.8295436 };
const googleLibs = ["places", "geometry"];
function GoogleMapWithZones({
  markerIcon = null,
  markerPosition = null,
  onMapLoad = () => {},
}) {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <Box height="100%">
      {
        <LoadScriptNext
          id="google-maps"
          googleMapsApiKey="AIzaSyBUhj2_q75WCg9gjOCC6Mbm2pXxIdzfs60"
          libraries={googleLibs}
          // onLoad={() => console.log("Google Maps API loaded successfully.")}
          onError={() => console.error("Error loading Google Maps API.")}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition ?? defaultMarkerPosition}
            onLoad={onMapLoad}
            zoom={12}
          >
            <>
              {ServiceAreasCoords.locations.map((location, index) => (
                <Marker
                  key={"marker" + index}
                  position={location.coords}
                  icon="/assets/icons/location_icon.png"
                  title={location.name}
                />
              ))}
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  icon={
                    markerIcon ? "/assets/icons/location_icon.png" : markerIcon
                  }
                />
              )}
              {ServiceAreasCoords.areas.map((area, index) => (
                <Polygon
                  key={"polygon" + index}
                  path={area.coords}
                  options={{
                    fillColor: area.type,
                    strokeWeight: 0.5,
                  }}
                />
              ))}
            </>
          </GoogleMap>
        </LoadScriptNext>
      }
    </Box>
  );
}

export default GoogleMapWithZones;

GoogleMapWithZones.propTypes = {
  markerIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  markerPosition: PropTypes.object,
};
