import * as React from "react";
import PropTypes, { bool } from "prop-types";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

import isEmpty from "/helpers/strhelper";
import { TextField } from "@mui/material";

const autocompleteService = { current: null };

export default function GoogleAutocomplete({
  //city, street, building,
  address,
  onSelect = () => {},
  onStreetChange= () => {},
  onAddressChange= () => {},
  error =  false,
}) {
  const [value, setValue] = React.useState("");
  const [building, setBuilding] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        request.input = "Львів, " + request.input;
        request.types = ["address"];
        request.componentRestrictions = { country: "ua" };
        request.language = "uk";
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 1000),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      { input: inputValue + " " + (address?.building ?? "") },
      (results) => {
        if (active) {
          let newOptions = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [
              ...newOptions,
              ...results,
              //.filter(x => x.structured_formatting?.main_text?.startsWith('вул.'))
            ];
          }
          setOptions(newOptions);
          if (!isEmpty(building) && results) {
            onAddressChange(results[0]);
          }
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, building, fetch]);

  React.useEffect(() => {
    setValue(address?.street ?? "");
    setBuilding(address?.building ?? "");
  }, [address]);

  return (
    <Autocomplete
      fullWidth
      sx={{
        ".MuiOutlinedInput-root": {
          paddingLeft: "6px",
          paddingTop: "5px",
          paddingBottom: "13px",
        },
        ".MuiAutocomplete-popupIndicator":
          error === true ? { left: "-20px" } : {},
      }}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : option.structured_formatting?.main_text ?? ""
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText=""
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onSelect(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        onStreetChange();
      }}
      renderInput={(params) => (
        <TextField
          error={error}
          {...params}
          label="Вулиця*"
          fullWidth
          // inputProps={{
          //   autoComplete: "street-address",
          // }}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting?.main_text_matched_substrings ?? [];
        const parts = parse(
          option.structured_formatting?.main_text ?? "",
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting?.secondary_text ?? ""}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

GoogleAutocomplete.propTypes = {
  city: PropTypes.string.isRequired,
  street: PropTypes.string,
  building: PropTypes.string,
  onSelect: PropTypes.func,
  onStreetChange: PropTypes.func,
  onAddressChange: PropTypes.func,
  error: bool,
};
