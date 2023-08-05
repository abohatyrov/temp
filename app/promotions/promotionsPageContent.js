"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import ConfigurationService from "/api/ConfigurationService";
import { useEffect, useState } from "react";

export default function PromotionsPageContent() {
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchData = async () => {
    try {
      const bannerResponse = await ConfigurationService.getBanners();
      setBanners(bannerResponse);
    } catch (error) {
      // console.error("Unable fetch page data", error);
    } finally {
      setPageIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 750);
    fetchData();
  }, []);

  return (
    <Container sx={{ pt: 3, pb: 10 }}>
      <Typography
        mb={5}
        variant="h3"
        textTransform="uppercase"
        sx={{ textAlign: "center", color: "primary" }}
      >
        Наші Акції
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        {banners.map((promo) => (
          <Grid item key={promo.id} xs={12} md={10} xl={8}>
            <Box
              sx={{ border: "2px solid black" }}
            >
              <img
                src={isMobile ? promo.image_mob : promo.image}
                alt="Наші Акції"
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
