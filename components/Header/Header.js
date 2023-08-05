"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

import Menu from "@mui/icons-material/Menu";

import { Box, Grid, Typography, Badge } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import useShoppingCart from "hooks/useShoppingCart";

import Image from "next/image";
import HeaderLinks from "./HeaderLinks";
import HeaderLinksMobile from "./HeaderLinksMobile";
import Analytics from "helpers/Analytics";
import SidePanel from "/components/SidePanel/SidePanel";
import ShoppingCart from "/components/ShoppingCart";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);

  const onShoppinCartClick = () => {
    setShoppingCartOpen(true);
    Analytics.viewShoppingCart();
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const { totalPrice, itemsCount } = useShoppingCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
  }, []);

  return (
    <div>
      <AppBar id="appbar" enableColorOnDark className="bg-black items-center">
        <Toolbar
          className="flex flex-row justify-between items-center max-w-screen-2xl min-h-2 w-full"
          style={{ minHeight: 75 }}
        >
          <Link href="/">
            <Image
              priority
              src="/assets/images/logos/SYODOlogo_transparent2.png"
              alt="SYODŌ"
              width={isMobileView ? 150 : 255}
              height={isMobileView ? 50 : 85}
            />
          </Link>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <HeaderLinks dropdownHoverColor="primary" />
          </Box>

          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onShoppinCartClick();
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Badge badgeContent={itemsCount} color="primary">
                  <ShoppingCartIcon fontSize="medium" color="white" />
                </Badge>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="h6" color="white" fontSize="1.2rem">
                  {((totalPrice.total - totalPrice.discount) / 100).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              size="large"
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ display: { md: "none", xs: "block" } }}>
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            classes={{
              paper: "bg-black",
            }}
            onClose={handleDrawerToggle}
          >
            <div className="bg-black, mx-4">
              <HeaderLinksMobile
                dropdownHoverColor="primary"
                onClick={handleDrawerToggle}
              />
            </div>
          </Drawer>
        </Box>
      </AppBar>
      <SidePanel
        open={shoppingCartOpen}
        onClose={() => setShoppingCartOpen(false)}
      >
        <ShoppingCart
          mobileView={isMobileView}
          onClose={(e) => {
            setShoppingCartOpen(false);
            if (e?.navigateTo) {
              setTimeout(() => router.push(e?.navigateTo), 1000);
            }
          }}
        />
      </SidePanel>
    </div>
  );
}
