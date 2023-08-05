"use client";
import { useEffect, useState, forwardRef } from "react";
import { Box, Container, Snackbar, Switch, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import useShoppingCart from "hooks/useShoppingCart";

import ProductsSection from "/pages-sections/ProductsSection";

import { styled } from "@mui/material/styles";
import BottomNavigationSection from "/components/BottomNavigation/BottomNavigation";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BlogPageContent({ relatedProducts = [] }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  const { addItemToCart } = useShoppingCart();

  const handleAddToCart = (e) => {
    addItemToCart(e);
    setShowAddToCartMessage(true);
  };

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
  }, []);

  return (
    <div>
      {/* RELATED ITEMS */}
      {(relatedProducts ?? []).length > 0 && (
        <ProductsSection
          catalogue={[
            {
              products: relatedProducts,
            },
          ]}
          onItemAddToCart={(e) => handleAddToCart(e)}
          mobileView={isMobileView}
        />
      )}

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
    </div>
  );
}
