import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShoppingCartAlert({
  show = false,
  onClose = () => {},
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={show}
      autoHideDuration={2000}
      onClose={() => {
        onClose();
      }}
    >
      <Alert
        onClose={() => {
          onClose();
        }}
        severity="success"
        sx={{ width: "100%" }}
      >
        Товар додано в кошик!
      </Alert>
    </Snackbar>
  );
}
