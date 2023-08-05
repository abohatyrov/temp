"use client";
import CartProvider from "context/Cart";
import CheckoutAddressProvider from "context/CheckoutAddress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import {
  blackColor,
  primaryColor,
  whiteColor,
} from "../styles/jss/nextjs-material-kit-pro";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#bb4347",
    },
    secondary: {
      main: "rgb(203, 184, 175)",
    },
  },
  typography: {
    fontFamily: '__namuFont_93e222, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: blackColor,
          "& a": {
            color: whiteColor,
            textDecoration: "none",
            "&:hover": {
              color: primaryColor[0],
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fff !important",
          },
        },
      },
    },
  },
});
// const clientSideEmotionCache = createEmotionCache();

const Providers = ({ children }) => {
  return (
    // <CacheProvider value={clientSideEmotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <StyledEngineProvider injectFirst> */}
      <CartProvider>
        <CheckoutAddressProvider>
          <div>{children}</div>
        </CheckoutAddressProvider>
      </CartProvider>
      {/* </StyledEngineProvider> */}
    </ThemeProvider>
    // </CacheProvider>
  );
};

export default Providers;
