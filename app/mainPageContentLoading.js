"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import CardCatalogueLoading from "../components/Card/CardCatalogueLoading";

export default function MainPageContentLoading() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
  }, []);

  return (
    <Container
      maxWidth="xl"
      disableGutters={isMobileView}
      sx={{ pt: 6, pb: 10 }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-2">
          <CardCatalogueLoading />
          <CardCatalogueLoading />
          <CardCatalogueLoading />
      </div>
    </Container>
  );
}
