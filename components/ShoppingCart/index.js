import PropTypes from "prop-types";
import { Box, Typography, Button, Divider } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import useShoppingCart from "/hooks/useShoppingCart";
import ShoppingCartList from "/components/ShoppingCartList/ShoppingCartList";
import Analytics from "helpers/Analytics";

function ShoppingCart({ onClose, mobileView }) {
  const { cart, removeItemFromCart, totalPrice, updateItemQty } =
    useShoppingCart();
  return (
    <Box
      width="100%"
      height="100%"
      overflow="auto"
      display="flex"
      flexDirection="column"
      shadow="xl"
      sx={{
        alignContent: "space-between",
        backgroundImage: `url("/assets/images/logos/Symbols_jp_3.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(50, 50, 50, 0.1)",
        p: { xs: 0.5, md: 2 },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1 }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: mobileView ? "1rem" : "1.5rem" }}
        >
          Ваше замовлення
        </Typography>
        <CloseIcon
          fontSize="medium"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            onClose();
          }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <div>
        {cart.length === 0 ? (
          <div className="p-3 text-center">
            <Typography variant="h4">Додайте товар в корзину</Typography>
            <Typography variant="h4">У нас все дуже смачне!</Typography>
          </div>
        ) : (
          <>
            <ShoppingCartList
              showDescriptions
              mobileView={mobileView}
              itemsList={cart}
              onQtyChange={(id, qty) => updateItemQty(id, qty)}
              onItemRemove={(item) => {
                removeItemFromCart(item);
                Analytics.removeFromShoppingCart(item);
              }}
            />

            <Divider sx={{ my: 2 }} />
            <div className={mobileView ? "px-2 text-center space-y-2" : "px-2 flex justify-between items-center"}>
              <Typography
                variant="h5"
                textAlign={mobileView ? "center" : "start"}
                sx={{ fontSize: mobileView ? "1rem" : "1.2rem" }}
              >
                Загалом:{" "}
                {((totalPrice.total - totalPrice.discount) / 100).toFixed(2)}
                грн
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={cart.length === 0}
                onClick={() => {
                  Analytics.beginCheckout(
                    cart,
                    (totalPrice.total - totalPrice.discount) / 100,
                    window
                  );
                  onClose({ navigateTo: `/checkout` });
                }}
              >
                Оформити замовлення
              </Button>
            </div>
          </>
        )}
      </div>
    </Box>
  );
}

ShoppingCart.defaultProps = {
  onClose: () => {},
};

ShoppingCart.propTypes = {
  onClose: PropTypes.func,
};

export default ShoppingCart;
