import React from "react";
import Link from "next/link";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import { appConfig } from "configs/config";
import { styled } from "@mui/material/styles";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
  },
  ".MuiBox-root": {
    border: "1px solid #00000000",
    transition: "border-color 0.3s linear",
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiBox-root": {
      border: "1px solid white",
    },
  },
}));

const renderNavbarItem = (route) => (
  <Link href={`${route.route}`} key={route.key}>
    <ImageButton focusRipple>
      <div className="p-1 grid transition duration-500 border border-solid border-black hover:border hover:border-solid hover:border-white">
        <div className="grid justify-items-center min-w-[65px]">
          {typeof route.icon === "string" ? (
            <img
              src={route.icon}
              alt={route.name}
              style={{ height: 40, opacity: 1.0 }}
            />
          ) : (
            <>{route.icon}</>
          )}
          <Typography variant="caption" fontWeight="bold" color="white">
            {route.name}
          </Typography>
        </div>
      </div>
    </ImageButton>
  </Link>
);

const displayRoutes = [
  {
    key: "sushi",
    icon: "/assets/icons/susi_white.png",
    name: "Суші",
    route: "/menu/sushi",
  },
  {
    key: "rols",
    icon: "/assets/icons/rols_white.png",
    name: "Роли",
    route: "/menu/rols",
  },
  {
    key: "sets",
    icon: "/assets/icons/sets_white.png",
    name: "Сети",
    route: "/menu/sets",
  },
  {
    key: "drinks",
    icon: "/assets/icons/drinks_white.png",
    name: "Напої",
    route: "/menu/drinks",
  },
  {
    key: "sauces",
    icon: "/assets/icons/souce.png",
    name: "Соуси",
    route: "/menu/sauces",
  },
  {
    key: "desserts",
    icon: "/assets/icons/deserts_white.png",
    name: "Десерти",
    route: "/menu/desserts",
  },
];

export default function HeaderLinks() {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {displayRoutes.map((route) => renderNavbarItem(route))}

      <Box
        style={{
          textAlign: "center",
          minWidth: 110,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        display={{ xs: "none", lg: "grid" }}
      >
        <Typography variant="caption" mb={0.75}>
          Телефонуйте та замовляйте:
        </Typography>

        <Link href="tel:+380677229345" className="text-sm">
          +38 (067) 722 93 45
        </Link>

        <Link href="tel:+380631398512" className="text-sm">
          +38 (063) 139 85 12
        </Link>

        <Typography variant="caption" mb={0.75}>
          пн-нд: {appConfig.WORKING_HOURS.FROM}-{appConfig.WORKING_HOURS.TO}
        </Typography>
      </Box>

      <Box
        style={{ textAlign: "center", marginLeft: 15, minWidth: 120 }}
        display={{ xs: "none", lg: "grid" }}
      >
        <Link href="/promotions" className="font-bold text-white text-xs mb-2">
          Акції
        </Link>

        <Link href="/about" className="font-bold text-white text-xs mb-2">
          Про Нас
        </Link>

        <Link href="/delivery" className="font-bold text-white text-xs mb-2">
          Оплата та доставка
        </Link>
      </Box>

      {renderNavbarItem({
        icon: <AccountBox fontSize="large" color="primary" />,
        name: "Кабінет",
        route: "/cabinet",
      })}
    </div>
  );
}
