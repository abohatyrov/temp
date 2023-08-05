import PropTypes from "prop-types";
import { useState } from "react";
import {
  Switch,
  Button,
  Box,
  Typography,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Divider,
} from "@mui/material";

import IncrementButtons from "/components/IncrementButtons/IncrementButtons";
import { styled } from "@mui/material/styles";

import isEmpty from "helpers/strhelper";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

function CardCatalogueMobile({
  image,
  id,
  linkedPosition,
  title,
  description,
  weight,
  price,
  linkedPrice,
  onAction,
}) {
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
    <Box
      sx={{
        padding: 1,
        border: "1px solid #aaaaaa",
        backgroundColor: "#ffffff",
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box
            sx={{
              cursor: "pointer",
              border: "1px solid #000000",
              backgroundColor: "white",
              zIndex: 2,
              boxShadow: "2px 2px 15px rgba(0, 0, 0, .3)",
              position: "relative",
              aspectRatio: "1/1",
              width: "100%",
            }}
            onClick={() => {
              router.push(`/products/${id}`);
            }}
          >
            <Image src={image} alt={title} fill />
          </Box>
          <Typography variant="caption" color="text" component="span">
            {weight}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <div>
            <Typography
              variant="h5"
              fontSize="1.2rem"
              sx={{ display: "inline-block", cursor: "pointer" }}
              onClick={() => router.push(`/products/${id}`)}
            >
              {title}
            </Typography>
          </div>
          <Typography
            variant="caption"
            color="text"
            component="span"
            sx={{ fontSize: "12px" }}
          >
            {description?.split("\n").map((x) => (
              <p key={x}>{x}</p>
            ))}
          </Typography>

          {!isEmpty(linkedPosition) && (
            <Box px={2} style={{ textAlign: "left" }}>
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
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
          >
            <Typography variant="h5" sx={{ fontSize: "1.5rem", pt: 1 }}>
              {parseFloat(
                (milkOff === true ? linkedPrice : price) / 100
              ).toFixed(0)}
              грн
            </Typography>
            <IncrementButtons
              initValue={count}
              onChange={(prop) => setCount(prop)}
              size="medium"
            />
          </Box>
          <Divider sx={{ my: 1 }} />

          <Button
            sx={{ width: "100%" }}
            color="primary"
            variant="contained"
            onClick={() => {
              onAddToCart();
            }}
          >
            <Icon>add_shopping_cart</Icon> Додати в кошик
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

CardCatalogueMobile.defaultProps = {
  raised: true,
  weight: "",
  description: "",
  price: 0,
  additionalPrice: 0,
  discountPrice: 0,
  positionOfTheWeek: false,
  showAsNew: false,
  onAction: () => {},
};

CardCatalogueMobile.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  weight: PropTypes.string,
  price: PropTypes.string,
  positionOfTheWeek: PropTypes.bool,
  showAsNew: PropTypes.bool,
  raised: PropTypes.bool,
  onAction: PropTypes.func,
};

export default CardCatalogueMobile;
