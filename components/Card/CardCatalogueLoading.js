import { Skeleton } from "@mui/material";

export default function CardCatalogueLoading() {
  return (
    <div style={{ width: "100%", aspectRatio: "1/1.307" }}>
      <Skeleton variant="rectangle" width="100%" height="100%" />
    </div>
  );
}
