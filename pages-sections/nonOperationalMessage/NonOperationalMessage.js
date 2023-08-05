"use client";
import { Close } from "@mui/icons-material";
import { Box, Modal, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SettingsService from "/api/SettingsService";
import BoxContainer from "/components/BoxContainer/BoxContainer";

export default function NonOperationalMessage() {
  const [shownoWorkingMessage, setShownoWorkingMessage] = useState(false);

  const [noWorkingTitle, setNoWorkingTitle] = useState("");
  const [noWorkingDescription, setNoWorkingDescription] = useState("");

  const fetchData = async () => {
    try {
      const settingsResponse = await SettingsService.getGeneralSettings(
        "shopsettings"
      );

      setNoWorkingTitle(settingsResponse?.values?.messageTitle ?? "");
      setNoWorkingDescription(
        settingsResponse?.values?.messageDescription ?? ""
      );
      setShownoWorkingMessage(
        !(settingsResponse?.values?.allowShopping ?? true)
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
        open={shownoWorkingMessage}
        onClose={() => setShownoWorkingMessage(false)}
        sx={{ display: "grid", placeItems: "center" }}
      >
        <Slide direction="down" in={shownoWorkingMessage} timeout={500}>
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
            variant="gradient"
            shadow="sm"
            sx={{
              // backgroundImage:
              //   "url('https://media.syodo.com.ua/img/noworkinghours.webp')",
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
                onClick={() => setShownoWorkingMessage(false)}
              />
            </Box>
            {/* <Divider light sx={{ my: 0 }} /> */}

            <BoxContainer p={3}>
              <Typography variant="h5" mb={1}>
                {noWorkingTitle}
              </Typography>
              <Typography variant="subtitle2">
                {noWorkingDescription}
              </Typography>
            </BoxContainer>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}
