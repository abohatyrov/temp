"use client";
import { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

import { getCategoryCode } from "helpers/strhelper";
import useShoppingCart from "hooks/useShoppingCart";

import ProductsSection from "/pages-sections/ProductsSection";
import PromotionBanner from "/components/PromotionBanner";
import IncrementButtons from "/components/IncrementButtons/IncrementButtons";

import Analytics from "/helpers/Analytics";
import { styled } from "@mui/material/styles";
import BottomNavigationSection from "/components/BottomNavigation/BottomNavigation";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    backgroundColor: "#aab4be!important",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('/assets/icons/nomilkwitch_on.png')`,
        backgroundSize: "75% auto",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be!important",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#ffffff",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "75% auto",
      backgroundImage: `url('/assets/icons/nomilkwitch_off.png')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be!important",
    borderRadius: 20 / 2,
    width: "50px",
    height: "1em!important",
  },
}));

export default function ProductPageContent({
  product = null,
  relatedProducts = [],
}) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [count, setCount] = useState(1);
  const [milkOff, setMilkOff] = useState(false);

  const { addItemToCart } = useShoppingCart();

  const handleAddToCart = (e) => {
    addItemToCart(e);
    setShowAddToCartMessage(true);
  };

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
  }, []);

  return (
    <Container
      maxWidth="xl"
      disableGutters={isMobileView}
      sx={{ px: { xs: 1 } }}
    >
      <Breadcrumbs>
        <Typography
          variant="subtitle1"
          component={Link}
          href="/"
          color="primary"
        >
          Головна
        </Typography>
        <Typography
          variant="subtitle1"
          component={Link}
          color="primary"
          href={`/menu/${getCategoryCode(product.category_name)}`}
        >
          {product.category_name ?? "Category"}
        </Typography>
        <Typography
          variant="subtitle1"
          component={Link}
          color="primary"
          href={`/products/${product.id}`}
        >
          {product.title ?? "Product"}
        </Typography>
      </Breadcrumbs>

      <Box
        p={2}
        mb={3}
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #aaaaaa",
        }}
      >
        <Grid container justifyContent="center" my={2} spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Box
              style={{
                border: "1.5px solid #000000",
                backgroundColor: "white",
                backgroundColor: "white",

                boxShadow: "2px 2px 15px rgba(0, 0, 0, .3)",
              }}
            >
              {product.positionOfTheWeek === true && (
                <PromotionBanner
                  title={product.title}
                  sx={{
                    zIndex: 3,
                    position: "absolute",
                  }}
                />
              )}
              <div
                style={{
                  height: 0,
                  paddingBottom: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Image fill src={product.image} alt={product.title} />
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <h1 className="pb-3 text-3xl">{product?.title}</h1>
              <h2 className="pb-2 text-lg">{product?.description}</h2>

              <Typography variant="body1" mb={3}>
                {`Вага: ${product?.weight}`}
              </Typography>
              {product?.linkedPosition && (
                <Box mb={3}>
                  <Typography variant={isMobileView ? "body1" : "h6"}>
                    Додаткові Опції
                  </Typography>
                  <Grid container item xs={12} mx="auto">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <MaterialUISwitch
                            sx={{ m: 1 }}
                            checked={milkOff}
                            onChange={(e) => {
                              setMilkOff(e.target.checked);
                            }}
                          />
                        }
                        label={
                          milkOff ? (
                            <Typography variant="subtitle2" color="primary">
                              БЕЗ ЛАКТОЗИ
                            </Typography>
                          ) : (
                            <Typography variant="subtitle2" color="primary">
                              МІСТИТЬ ЛАКТОЗУ
                            </Typography>
                          )
                        }
                      />
                    </FormGroup>
                  </Grid>
                </Box>
              )}
              <Divider sx={{ my: 3 }} />
              <div className="flex justify-between">
                {product.positionOfTheWeek ? null : (
                  <Box sx={{ mx: 2 }}>
                    <IncrementButtons
                      initValue={count}
                      onChange={(prop) => setCount(prop)}
                      size="medium"
                    />
                  </Box>
                )}

                <Typography
                  variant={isMobileView ? "h6" : "h5"}
                  sx={{ mt: "4px" }}
                >
                  {milkOff === true
                    ? (parseFloat(product.linkedPrice) / 100).toFixed(0)
                    : (parseFloat(product.price) / 100).toFixed(0)}
                  грн
                </Typography>
              </div>
              <Divider sx={{ my: 3 }} />
              <Button
                sx={{ minWidth: 150 }}
                color="primary"
                variant="contained"
                onClick={() => {
                  addItemToCart({
                    ...product,
                    qty: count,
                    milkOff,
                  });
                  // analytics
                  Analytics.addItemToShoppingCart(
                    {
                      ...product,
                      qty: count,
                      milkOff,
                    },
                    window
                  );
                  setShowAddToCartMessage(true);
                  setCount(1);
                  setMilkOff(false);
                }}
              >
                <AddShoppingCart style={{ marginRight: 5 }} />
                Додати у кошик
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* RELATED ITEMS */}
      {(relatedProducts ?? []).length > 0 && (
        <Box justifyContent="center" my={3}>
          <Typography
            variant="h5"
            ml={2}
            pb={2}
            textAlign={isMobileView ? "center" : "left"}
          >
            Рекомендуємо вам також спробувати
          </Typography>

          <ProductsSection
            catalogue={[
              {
                products: relatedProducts
                  .filter((x) => x.id !== product.id)
                  .slice(0, 3),
              },
            ]}
            onItemAddToCart={(e) => handleAddToCart(e)}
            mobileView={isMobileView}
          />
        </Box>
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
    </Container>
  );
}
