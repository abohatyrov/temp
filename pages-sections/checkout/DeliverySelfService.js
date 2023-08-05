import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import GoogleMapWithZones from "/components/GoogleMapWithZones/GoogleMapWithZones";
import ServiceAreasCoords from "/consts/ServiceAreasCoordinats";
import { useState } from "react";
export default function DeliverySelfService({ value = "", onSelect = () => {}, ...rest }) {
  const [markerCoords, setMarkerCoords] = useState(null);
 
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="delivery-self-service-label">
          Оберіть Локацію Самовивозу
        </InputLabel>
        <Select
          labelId="delivery-self-service-label"
          value={value}
          label=""
          onChange={(e) => {
            onSelect(e.target.value);
            setMarkerCoords(
              ServiceAreasCoords.locations.find((x) => x.id === e.target.value)
                ?.coords
            );
          }}
        >
          {ServiceAreasCoords.locations.map((location) => (
            <MenuItem value={location.id} key={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box height={450} borderRadius="md" mt={1.5}>
        <GoogleMapWithZones
          markerIcon="/assets/icons/location_icon.png"
          markerPosition={markerCoords}
        />
      </Box>
    </div>
  );
}

// Typechecking props for the DefaultNavbar
DeliverySelfService.propTypes = {
  value: PropTypes.string,
  onSelect: PropTypes.func,
};
