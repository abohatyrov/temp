"use client";
import { Close } from "@mui/icons-material";
import { Box, Modal, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { appConfig } from "configs/config";

export default function NonWorkingHoursMessage() {
  {
    /* Non Working hours modal */
  }
  const [showNonWorkingHours, setShowNonWorkingHours] = useState(false);
  const toggleNonWorkingHoursModal = () =>
    setShowNonWorkingHours(!showNonWorkingHours);

  useEffect(() => {
    // setShowIntro(sessionStorage.getItem("show_intro") !== "false");

    const currentTimeStamp = new Date();
    const currentTime = `${`0${currentTimeStamp.getHours()}`.slice(
      -2
    )}:${`0${currentTimeStamp.getMinutes()}`.slice(-2)}`;

    if (
      currentTime < `${appConfig.WORKING_HOURS.FROM}` ||
      currentTime >= `${appConfig.WORKING_HOURS.TO}`
    ) {
      setShowNonWorkingHours(true);
    }
  }, []);

  return (
    <div>
      <Modal
        disableAutoFocus
        open={showNonWorkingHours}
        onClose={toggleNonWorkingHoursModal}
        sx={{ display: "grid", placeItems: "center" }}
      >
        <Slide direction="down" in={showNonWorkingHours} timeout={500}>
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
            variant="gradient"
            shadow="sm"
            sx={{
              backgroundImage:
                "url('https://media.syodo.com.ua/img/noworkinghours.webp')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minWidth: { xl: 760, lg: 600, md: 500, sm: 400, xs: "90%" },
              minHeight: { xl: 479, lg: 400, md: 340, sm: 270, xs: 280 },
              backgroundColor: "secondary",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              py={3}
              px={2}
            >
              <Close
                color="white"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={toggleNonWorkingHoursModal}
              />
            </Box>
            {/* <Divider light sx={{ my: 0 }} /> */}
            <Box px={6} pb={6} textAlign="center" sx={{}}>
              {/* <AccessAlarmsIcon fontSize="large" />
                <Typography variant="h5" mt={3} mb={1}>
                  Вибачте, але ми зараз не працюємо.
                </Typography>
                <Typography variant="subtitle2">
                  Ми з радістю приготуємо Ваше замовлення
                </Typography>
                <Typography variant="subtitle2" mb={2}>
                  {`щодня з ${appConfig.WORKING_HOURS.FROM} по ${appConfig.WORKING_HOURS.TO}`}
                </Typography> */}
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}
