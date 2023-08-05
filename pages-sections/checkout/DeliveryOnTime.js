"use client";
import PropTypes from "prop-types";
import { addDays, addHours, addMonths, compareAsc, format } from "date-fns";
import uaLocale from "date-fns/locale/uk";
import { Autocomplete, Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

const timeslotsDict = [
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export default function DeliveryOnTime({
  deliveryDate,
  onDeliveryDateChange,
  deliveryTime,
  onDeliveryTimeChange,
  mobileView,
  ...rest
}) {
  const [timeSlots, setTimeSlots] = useState(timeslotsDict);

  const calculateTimeSlots = (deldate) => {
    const timestamp = new Date();
    const t = new Date(
      timestamp.getFullYear(),
      timestamp.getMonth(),
      timestamp.getDate()
    );
    if (compareAsc(addDays(t, 1), deldate) === -1) {
      setTimeSlots(timeslotsDict);
      onDeliveryTimeChange(timeslotsDict[0]);
    } else {
      const sl = timeslotsDict.filter(
        (x) => x > format(addHours(new Date(), 1), "HH:mm")
      );
      setTimeSlots(sl);
      onDeliveryTimeChange(sl[0]);
    }
  };

  useEffect(() => {
    calculateTimeSlots(deliveryDate);
  }, [deliveryDate]);

  return (
    <Box sx={{ display: "flex" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uaLocale}>
        {mobileView ? (
          <DesktopDatePicker
            label="Дата доставки"
            mask="__.__.____"
            minDate={new Date()}
            maxDate={addMonths(new Date(), 1)}
            value={deliveryDate}
            onChange={(e) => {
              onDeliveryDateChange(e);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <MobileDatePicker
            label="Дата доставки"
            mask="__.__.____"
            minDate={new Date()}
            maxDate={addMonths(new Date(), 1)}
            value={deliveryDate}
            onChange={(e) => {
              onDeliveryDateChange(e);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </LocalizationProvider>

      <Autocomplete
        options={timeSlots}
        noOptionsText="Нажаль на цю дату години недоступні"
        value={deliveryTime ?? ""}
        onChange={(e, newValue) => {
          onDeliveryTimeChange(newValue);
        }}
        sx={{
          ml: 1.5,
          width: "200px",
          ".MuiOutlinedInput-root": {
            paddingLeft: "6px",
            paddingTop: "5px",
            paddingBottom: "13px",
          },
        }}
        renderInput={(params) => <TextField {...params} label="Час доставки" />}
      />
    </Box>
  );
}

DeliveryOnTime.defaultProps = {
  deliveryDate: new Date(),
  onDeliveryDateChange: () => {},
  deliveryTime: "",
  onDeliveryTimeChange: () => {},
};

// Typechecking props for the DefaultNavbar
DeliveryOnTime.propTypes = {
  deliveryDate: PropTypes.instanceOf(Date),
  onDeliveryDateChange: PropTypes.func,
  deliveryTime: PropTypes.string,
  onDeliveryTimeChange: PropTypes.func,
};
