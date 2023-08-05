import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";

import GoogleMapWithZones from "/components/GoogleMapWithZones/GoogleMapWithZones";
import GoogleAutocomplete from "/components/GoogleAutocomplete/GoogleAutocomplete";
import useShoppingCart from "/hooks/useShoppingCart";
import useCheckoutAddress from "/hooks/useCheckoutAddress";

import isEmpty from "/helpers/strhelper";
import { GreenAreaMinDeliveryOrder } from "/helpers/priceCalc";
import { YellowAreaMinDeliveryOrder } from "/helpers/priceCalc";
import { RedAreaMinDeliveryOrder } from "/helpers/priceCalc";
import { GreenAreaDeliveryTime } from "/helpers/priceCalc";
import { YellowAreaDeliveryTime } from "/helpers/priceCalc";
import { RedAreaDeliveryTime } from "/helpers/priceCalc";
import ServiceAreasCoords from "/consts/ServiceAreasCoordinats";

export default function DeliveryByAddress({
  streetIsValid = true,
  buildingIsValid = true,
  onAddressChange = () => {},
}) {
  const { checkoutAddress } = useCheckoutAddress();
  const { totalPrice, serviceArea, changeServiceArea } = useShoppingCart();

  const [streetAddress, setStreetAddress] = useState({
    street: "",
    building: "",
  });
  const [entrance, setEntranse] = useState("");

  const [floor, setFloor] = useState("");
  const [apt, setApt] = useState("");
  const [eCode, seteCode] = useState("");
  const [markerCoords, setMarkerCoords] = useState(null);
  const [mapIsLoaded, setMapIsLoaded] = useState(false);
  const geocodeService = { current: null };

  const isPointInServiceArea = (point, serviceAreas) => {
    let isInServiceArea = false;

    for (let index = 0; index < (serviceAreas ?? []).length; index++) {
      const serviceArea = serviceAreas[index];

      const serviceAreaPoligon = new window.google.maps.Polygon({
        paths: serviceArea.coords,
      });

      const pointInArea = window.google.maps.geometry.poly.containsLocation(
        point,
        serviceAreaPoligon
      );
      if (pointInArea) {
        isInServiceArea = true;
        break;
      }
    }

    return isInServiceArea;
  };

  const handlePlaceFound = (placeId) => {
    try {
      if (!geocodeService.current && window.google) {
        geocodeService.current = new window.google.maps.Geocoder();
      }

      if (!isEmpty(placeId) && geocodeService.current) {
        geocodeService.current.geocode({ placeId }).then(({ results }) => {
          // console.log('geocoding results', results)
          const positionCoordinates = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          // define service area
          const point = new window.google.maps.LatLng(
            positionCoordinates.lat,
            positionCoordinates.lng
          );

          setMarkerCoords({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
          const greenLocations = ServiceAreasCoords.areas.filter(
            (x) => x.type === "green"
          );
          const yellownLocations = ServiceAreasCoords.areas.filter(
            (x) => x.type === "yellow"
          );

          if (isPointInServiceArea(point, greenLocations)) {
            changeServiceArea("green");
          } else if (isPointInServiceArea(point, yellownLocations)) {
            changeServiceArea("yellow");
          } else {
            changeServiceArea("red");
          }
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (onAddressChange) {
      onAddressChange({
        street: streetAddress.street,
        building: streetAddress.building,
        entrance: entrance,
        apartment: apt,
        floor: floor,
        eCode: eCode,
        deliveryPoint: markerCoords,
      });
    }
  }, [streetAddress, entrance, floor, apt, eCode, markerCoords]);

  useEffect(() => {
    if (checkoutAddress && mapIsLoaded) {
      // setCity(checkoutAddress.city);
      setStreetAddress({
        street: checkoutAddress.street ?? "",
        building: checkoutAddress.building ?? "",
      });

      setEntranse(checkoutAddress.entrance ?? "");
      setFloor(checkoutAddress.floor ?? "");
      setApt(checkoutAddress.apt ?? "");
      seteCode(checkoutAddress.eCode ?? "");
    }
  }, [checkoutAddress, mapIsLoaded]);

  useEffect(() => {
    if (!geocodeService.current && window.google) {
      geocodeService.current = new window.google.maps.Geocoder();
    }
    if (!geocodeService.current) {
      return undefined;
    }
    return () => {};
  }, []);

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12}>
        <Autocomplete
          readOnly
          fullWidth
          sx={{
            ".MuiOutlinedInput-root": {
              paddingLeft: "6px",
              paddingTop: "5px",
              paddingBottom: "4px",
            },
          }}
          value="Львів"
          options={["Львів"]}
          noOptionsText=""
          disableClearable
          renderInput={(params) => (
            <TextField {...params} label="Місто*" sx={{ m: 0 }} />
          )}
        />
      </Grid>
      <Grid item xs={8}>
        <GoogleAutocomplete
          city="Львів"
          address={streetAddress}
          error={!streetIsValid}
          onChange={() => {}}
          onSelect={(e) => {
            //console.log("onStreet onSelect");
            // setStreet(e?.terms[0].value);
            setStreetAddress({
              street: e?.terms[0].value,
              building: e?.terms.length >= 5 ? e?.terms[1].value : "",
            });

            if (e) {
              handlePlaceFound(e.place_id);
            }

            // if (e?.terms.length >= 5) {
            //   // setBuilding(e?.terms[1].value);
            //   setBuildingValid(true);
            // }
          }}
          onStreetChange={() => {
            // console.log("onStreetChange");
            // setBuilding("");
          }}
          onAddressChange={(e) => {
            // console.log("onAddressChange", e);

            if (e) {
              handlePlaceFound(e.place_id);
            }
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          error={!buildingIsValid}
          label="№ Будинку"
          value={streetAddress.building}
          onChange={(e) => {
            setStreetAddress({
              street: streetAddress.street,
              building: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Під'їзд"
          value={entrance}
          onChange={(e) => {
            setEntranse(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Поверх"
          value={floor}
          onChange={(e) => {
            setFloor(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="кв/офіс"
          value={apt}
          onChange={(e) => {
            setApt(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Домофон"
          value={eCode}
          onChange={(e) => {
            seteCode(e.target.value);
          }}
        />
      </Grid>

      {/* Map */}
      <Grid item xs={12}>
        
          {serviceArea === "green" && (
            <div>
              <Typography variant="body2" color="success">
                Ця адреса в ЗЕЛЕНІЙ зоні.
              </Typography>
              <Typography variant="body2" color="success">
                Орієнтовний час доставки {GreenAreaDeliveryTime} хвилин.
              </Typography>
              <Typography variant="body2" color="error">
                Мінімальна сума замовлення для безкоштовної доставки{" "}
                {GreenAreaMinDeliveryOrder / 100} грн.
              </Typography>
              {}
            </div>
          )}
          {serviceArea === "yellow" && (
            <div>
              <Typography variant="body2" color="warning">
                Ця адреса в ЖОВТІЙ зоні.
              </Typography>
              <Typography variant="body2" color="warning">
                Орієнтовний час доставки {YellowAreaDeliveryTime} хвилин.
              </Typography>
              <Typography variant="body2" color="warning">
                Мінімальна сума замовлення для безкоштовної доставки{" "}
                {YellowAreaMinDeliveryOrder / 100} грн.
              </Typography>
            </div>
          )}
          {serviceArea === "red" && (
            <div>
              <Typography variant="body2" color="error">
                Ця адреса в ЧЕРВОНІЙ зоні.
              </Typography>
              <Typography variant="body2" color="error">
                Орієнтовний час доставки {RedAreaDeliveryTime} хвилин.
              </Typography>
              <Typography variant="body2" color="error">
                Мінімальна сума замовлення для доставки{" "}
                {RedAreaMinDeliveryOrder / 100} грн.
              </Typography>
            </div>
          )}
          {totalPrice.delivery > 0 && (
            <Typography variant="body2" color="error">
              Вартість доставки {totalPrice.delivery / 100} грн.
            </Typography>
          )}
        
        <div className="h-96">
          <GoogleMapWithZones
            markerPosition={markerCoords}
            onMapLoad={() => {
              setMapIsLoaded(true);
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

// Typechecking props for the DefaultNavbar
DeliveryByAddress.propTypes = {
  streetIsValid: PropTypes.bool,
  buildingIsValid: PropTypes.bool,
  onAddressChange: PropTypes.func,
};
