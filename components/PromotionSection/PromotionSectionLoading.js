"use client";

import { Grid, Skeleton } from "@mui/material";

export default function PromotionSectionLoading() {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ width: "100%" }}>
      <Grid item xs={12} sx={{ aspectRatio: { md: "6/2", xs: "1/1.2557" } }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Grid>
    </Grid>
  );
}
