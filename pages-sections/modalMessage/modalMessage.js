"use client";
import { Close } from "@mui/icons-material";
import { Box, Modal, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SettingsService from "/api/SettingsService";
import BoxContainer from "/components/BoxContainer/BoxContainer";
import isEmpty from "helpers/strhelper";
export default function ModalMessage() {
  const [showMessage, setShowMessage] = useState(false);

  const [popupMessage, setPopupMessage] = useState({});

  const fetchData = async () => {
    try {
      const settingsResponse = await SettingsService.getGeneralSettings(
        "shopsettings"
      );
      setPopupMessage(settingsResponse?.values?.popupMessage ?? {});
      setShowMessage(
        settingsResponse?.values?.popupMessage?.showPopup ?? false
      );
    } catch (error) {
      console.error("Unable fetch page data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Modal
        disableAutoFocus
        open={showMessage}
        onClose={() => setShowMessage(false)}
        sx={{ display: "grid", placeItems: "center" }}
      >
        <Slide direction="down" in={showMessage} timeout={500}>
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
            variant="gradient"
            shadow="sm"
            sx={
              isEmpty(popupMessage.imageUrl)
                ? {}
                : {
                    backgroundImage: `url(${popupMessage.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    textAlign: "center",
                    minHeight: 450,
                  }
            }
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
                onClick={() => setShowMessage(false)}
              />
            </Box>
            {/* <Divider light sx={{ my: 0 }} /> */}

            <BoxContainer p={3} className="max-w-md">
              <Typography variant="h5" mb={1}>
                {popupMessage.messageTitle ?? ""}
              </Typography>
              <Typography variant="subtitle2">
                {popupMessage.messageDescription ?? ""}
              </Typography>
            </BoxContainer>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}
