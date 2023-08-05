"use client";
import { useEffect } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { AccessTime, LocationOn, Mail, PhoneInTalk } from "@mui/icons-material";
import { appConfig } from "configs/config";
import GoogleMapWithZones from "/components/GoogleMapWithZones/GoogleMapWithZones";
import BoxContainer from "/components/BoxContainer/BoxContainer";

const socials = [
  {
    icon: <i className="fab fa-facebook" />,
    link: "https://www.facebook.com/syodo.sushi.lviv",
  },
  {
    icon: <i className="fab fa-instagram" />,
    link: "https://www.instagram.com/syodo.sushi/",
  },
];

export default function ContactsPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <Container sx={{ pt: 6, pb: 10 }}>
      <Grid container justifyContent="center" spacing={2} mb={5}>
        <Grid item xs={12} md={6}>
          <BoxContainer className="p-4 space-y-4">
            <Typography variant="h4" textTransform="uppercase">
              Контакти
            </Typography>
            <Divider sx={{ my: 2 }} />
            <div className="flex">
              <LocationOn fontSize="large" sx={{ mx: 1 }} color="secondary" />
              <Typography variant="body1">
                м. Львів, вул. Трускавецька 2а
              </Typography>
            </div>
            <div className="flex">
              <PhoneInTalk fontSize="large" sx={{ mx: 1 }} color="secondary" />
              <Typography
                variant="body1"
                component="a"
                color="primary"
                href="tel:+380-67-722-93-45"
                mb={0.75}
              >
                +38 (067) 722 93 45
              </Typography>
            </div>
            <div className="flex">
              <LocationOn fontSize="large" sx={{ mx: 1 }} color="secondary" />
              <Typography variant="body1">
                м. Львів, вул. Mалоголосківська, 28
              </Typography>
            </div>
            <div className="flex">
              <PhoneInTalk fontSize="large" sx={{ mx: 1 }} color="secondary" />
              <Typography
                variant="body1"
                component="a"
                color="primary"
                href="tel:+380631398512"
                mb={0.75}
              >
                +38 (063) 139 85 12
              </Typography>
            </div>
            <div className="flex">
              <Mail fontSize="large" sx={{ mx: 1 }} color="secondary" />
              <Typography
                variant="body1"
                component="a"
                color="primary"
                href="mailto:info@syodo.com.ua"
              >
                info@syodo.com.ua
              </Typography>
            </div>
            <div className="flex">
              <AccessTime fontSize="large" sx={{ mx: 1 }} color="secondary" />
              <Typography variant="body1">
                Пн-Нд <br />
                {appConfig.WORKING_HOURS.FROM}-{appConfig.WORKING_HOURS.TO}
              </Typography>
            </div>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={1}
              mb={3}
            >
              {socials.map(({ icon, link }, key) => (
                <Typography
                  key={link}
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  variant="h3"
                  color="primary"
                  opacity={0.8}
                  mr={key === socials.length - 1 ? 0 : 2.5}
                >
                  {icon}
                </Typography>
              ))}
            </Box>
          </BoxContainer>

          <Box
            mt={3}
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <img
              src="/assets/images/sushi_here_1.png"
              alt="Суші Тут"
              style={{ width: "35%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <BoxContainer sx={{ height: "100%", minHeight: 350 }} shadow="lg">
            <GoogleMapWithZones />
          </BoxContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
