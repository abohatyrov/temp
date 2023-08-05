import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

import {
  Switch,
  Button,
  Box,
  Typography,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import IncrementButtons from "/components/IncrementButtons/IncrementButtons";
import PromotionBanner from "/components/PromotionBanner";
import NewBanner from "/components/PromotionBanner/newBanner";
import isEmpty from "helpers/strhelper";

import styles from "/styles/jss/nextjs-material-kit-pro/components/cardCatalogueStyle.js";
import { AddShoppingCart } from "@mui/icons-material";

const useStyles = makeStyles(styles);

function CardCatalogue({
  mobileView = false,
  image,
  id,
  linkedPosition,
  title,
  description = "",
  weight = "",
  price = 0,
  linkedPrice,
  positionOfTheWeek = false,
  showAsNew = false,

  onAction = () => {},
}) {
  const classes = useStyles();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [milkOff, setMilkOff] = useState(false);

  const onAddToCart = () => {
    onAction({
      qty: count,
      milkOff,
    });
    setCount(1);
  };

  return (
    <div className="p-4 mt-5 w-full flex flex-col bg-white rounded border border-solid border-[#aaaaaa] drop-shadow-md">
      <div className="-mt-10">
        {positionOfTheWeek === true && (
          <PromotionBanner
            title={title}
            sx={{
              zIndex: 3,
              position: "absolute",
            }}
          />
        )}
        {showAsNew === true && (
          <NewBanner
            title={title}
            sx={{
              zIndex: 3,
              position: "absolute",
            }}
          />
        )}
        <div
          className="cursor-pointer aspect-square relative w-full bg-white border border-solid border-black drop-shadow-lg"
          onClick={() => {
            router.push(`/products/${id}`);
          }}
        >
          <Image
            src={image}
            alt={title}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div px={2} style={{ textAlign: "left" }}>
        <Typography
          variant="h5"
          sx={{ display: "inline-block", cursor: "pointer", pt: 1 }}
          onClick={() => router.push(`/products/${id}`)}
        >
          {title}
        </Typography>

        <Typography variant="body2" color="text" component="span">
          {description?.split("\n").map((x) => (
            <p key={x}>{x}</p>
          ))}
        </Typography>
      </div>

      <div className="flex justify-between items-center">
        <div>
          {!isEmpty(linkedPosition) && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    className={classes.lactozaSwitch}
                    checked={milkOff}
                    onChange={(e) => {
                      setMilkOff(e.target.checked);
                    }}
                  />
                }
                label={
                  milkOff ? (
                    <Typography variant="caption" color="primary">
                      БЕЗ ЛАКТОЗИ
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="primary">
                      МІСТИТЬ ЛАКТОЗУ
                    </Typography>
                  )
                }
              />
            </FormGroup>
          )}
        </div>
        <Typography variant="subtitle2">{`Вага: ${weight}`}</Typography>
      </div>

      <div
        className="mt-auto flex justify-between items-center"
        // px={2}
        // pb={2}
        // display="flex"
        // justifyContent="space-between"
        // alignItems="center"
        // sx={{ width: "100%" }}
      >
        <Typography variant="h5" fontSize="1.2rem" ml={1}>
          {parseFloat((milkOff === true ? linkedPrice : price) / 100).toFixed(
            0
          )}
          грн
        </Typography>

        <IncrementButtons
          initValue={count}
          onChange={(prop) => setCount(prop)}
          size="medium"
        />

        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            onAddToCart();
          }}
        >
          <AddShoppingCart />
          {window?.innerWidth > 325 ? "Додати" : ""}
        </Button>
      </div>
    </div>
  );
}

CardCatalogue.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  weight: PropTypes.string,
  price: PropTypes.string,
  positionOfTheWeek: PropTypes.bool,
  showAsNew: PropTypes.bool,

  onAction: PropTypes.func,
};

export default CardCatalogue;
