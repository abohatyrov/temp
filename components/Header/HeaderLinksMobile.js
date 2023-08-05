import React from "react";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { ButtonBase, Typography } from "@mui/material";
import {
  AccountBox,
  DeliveryDining,
  Group,
  LocalActivity,
} from "@mui/icons-material";
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

const renderNavbarItem = (route, onClick) => (
  <Link href={`${route.route}`} onClick={() => onClick()}>
    <ImageButton
      focusRipple
      sx={{
        py: 1,
        pl: 4,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {typeof route.icon === "string" ? (
        <img src={route.icon} alt={route.name} style={{ height: 40, opacity: 1.0 }} />
      ) : (
        <>{route.icon}</>
      )}{" "}
      <Typography variant="h5" fontSize="1.2rem" color="white" ml={1}>
        {route.name}
      </Typography>
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
  {
    key: "promotions",
    icon: <LocalActivity fontSize="large" color="primary" />,
    name: "Акції",
    route: "/promotions",
  },
  {
    key: "about",
    icon: <Group fontSize="large" color="primary" />,
    name: "Про Нас",
    route: "/about",
  },
  {
    key: "delivery",
    icon: <DeliveryDining fontSize="large" color="primary" />,
    name: "Доставка",
    route: "/delivery",
  },
];

export default function HeaderLinksMobile({ onClick = () => {} }) {
  return (
    <List>
      {displayRoutes.map((route) => (
        <ListItem
          key={route.key}
          className="m-0 p-0 pr-6 text-left border border-solid border-b-white"
        >
          {renderNavbarItem(route, onClick)}
        </ListItem>
      ))}

      <ListItem className="m-0 p-0 pr-6 text-left">
        {renderNavbarItem(
          {
            icon: <AccountBox fontSize="large" color="primary" />,
            name: "Кабінет",
            route: "/cabinet",
          },
          onClick
        )}
      </ListItem>
    </List>
  );
}
