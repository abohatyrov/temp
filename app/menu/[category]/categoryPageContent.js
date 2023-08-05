"use client";
import {
  Box,
  Container,
  Divider,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductsSection from "/pages-sections/ProductsSection";
import { getCategoryName } from "helpers/strhelper";
import useShoppingCart from "hooks/useShoppingCart";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import BottomNavigationSection from "../../../components/BottomNavigation/BottomNavigation";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CategoryPageContent({ category = "", catalogue = [] }) {
  const { addItemToCart } = useShoppingCart();
  const [isMobileView, setIsMobileView] = useState(false);

  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  const handleAddToCart = (e) => {
    addItemToCart(e);
    setShowAddToCartMessage(true);
  };

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
  }, []);

  return (
    <Container maxWidth="xl" disableGutters={isMobileView} sx={{ pt: 6, pb: 10 }} >
      {isMobileView && (
        <Box sx={{ textAlign: "center", mx: 5 }}>
          <Typography variant="h3" mt={3}>
            {getCategoryName(category)}
          </Typography>
        </Box>
      )}

      <ProductsSection
        sectionName={getCategoryName(category)}
        catalogue={catalogue}
        onItemAddToCart={(e) => handleAddToCart(e)}
        mobileView={isMobileView}
      />

      {/* Notifications adding product to cart */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showAddToCartMessage}
        autoHideDuration={2000}
        onClose={() => {
          setShowAddToCartMessage(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowAddToCartMessage(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Товар додано в кошик!
        </Alert>
      </Snackbar>
       {/* Bottom Menu */}
       {isMobileView && <BottomNavigationSection />}
    </Container>
  );
}
