'use client'
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import getPrice from "helpers/priceCalc";

export const Context = createContext();

const defaultTotalPrice = {
  total: 0,
  promotion: null,
  delivery: 0,
  discount: 0,
};
const Cart = ({ children = null }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [positionOfTheWeekAdded, setPositionOfTheWeekAdded] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(defaultTotalPrice);
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("Доставка");
  const [serviceArea, setServiceArea] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Онлайн");
  const [selectedPromotion, setSelectedPromotion] = useState("");

  useEffect(() => {
    const initialCart = getInitialCart();
    if (initialCart) {
      setCart(initialCart);
      let tQty = 0;
      for (let index = 0; index < initialCart.length; index++) {
        tQty += initialCart[index].qty;
      }

      setTotalPrice(getPrice(initialCart, { type: deliveryOption, area: serviceArea }, selectedPromotion));
      setItemsCount(tQty);
      if (initialCart.find((x) => x.positionOfTheWeek === true)) {
        setPositionOfTheWeekAdded(true);
      }
    }
  }, []);

  useEffect(() => {
    // write to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addItemToCart = (product) => {
    try {
      // only one promo position in cart
      if (product.positionOfTheWeek === true) {
        if (positionOfTheWeekAdded) {
          return;
        } else {
          setPositionOfTheWeekAdded(true);
        }
      }

      let newCart = [...cart];

      let itemId = product.id;
      if (product.milkOff === true) {
        itemId += "-nomilk";
      }
      const item = cart.find((i) => i.itemId === itemId);
      if (item) {
        // increase qty
        item.qty += product?.qty ?? 1;
        newCart = [...newCart];
      } else {
        newCart.push({
          itemId,
          ...product,
          qty: product?.qty ?? 1,
          milkOff: product?.milkOff ?? false,
        });
      }

      setCart(newCart);
      setItemsCount(
        newCart.reduce((value, obj) => {
          return value + obj.qty;
        }, 0)
      );
      const priceResults = getPrice(newCart, { type: deliveryOption, area: serviceArea }, selectedPromotion);
      setTotalPrice(priceResults);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItemFromCart = (position) => {
    if (position.positionOfTheWeek) {
      setPositionOfTheWeekAdded(false);
    }
    let itemId = position.id;
    if (position.milkOff === true) {
      itemId += "-nomilk";
    }
    const newCart = cart.filter((item) => item.itemId !== itemId);
    setCart(newCart);
    setItemsCount(itemsCount - position.qty);
    setTotalPrice(getPrice(newCart, { type: deliveryOption, area: serviceArea }, selectedPromotion));
  };

  const updateItemQty = (itemId, qty) => {
    const newCart = [...cart];
    const item = newCart.find((i) => i.itemId === itemId);
    if (item) {
      // increase qty
      item.qty = qty;
      setCart(newCart);
    }

    setItemsCount(
      newCart.reduce((value, obj) => {
        return value + obj.qty;
      }, 0)
    );
    setTotalPrice(getPrice(newCart, { type: deliveryOption, area: serviceArea }, selectedPromotion));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setItemsCount(0);
    setTotalPrice(defaultTotalPrice);
  };

  const fillCart = (items) => {
    // localStorage.removeItem("cart");
    // setCart([]);
    // setItemsCount(0);
    setTotalPrice(defaultTotalPrice);

    let newCart = [...items];

    // let itemId = product.id;
    // if (product.milkOff === true) {
    //   itemId += "-nomilk";
    // }
    // const item = cart.find((i) => i.itemId === itemId);
    // if (item) {
    //   // increase qty
    //   item.qty += product?.qty ?? 1;
    //   newCart = [...newCart];
    // } else {
    //   newCart.push({
    //     itemId,
    //     ...product,
    //     qty: product?.qty ?? 1,
    //     milkOff: product?.milkOff ?? false,
    //   });
    // }

    setCart(newCart);
    setItemsCount(
      newCart.reduce((value, obj) => {
        return value + obj.qty;
      }, 0)
    );
    const priceResults = getPrice(newCart, { type: deliveryOption, area: serviceArea }, selectedPromotion);
    setTotalPrice(priceResults);
  }

  const changeDeliveryOption = (e) => {
    setDeliveryOption(e);
    setTotalPrice(getPrice([...cart], { type: e, area: serviceArea }, selectedPromotion));
  };

  const changeServiceArea = (e) => {
    setServiceArea(e);
    setTotalPrice(getPrice([...cart], { type: deliveryOption, area: e }, selectedPromotion));
  };

  const changeSelectedPromotion = (e) => {
    setSelectedPromotion(e);
    setTotalPrice(getPrice([...cart], { type: deliveryOption, area: serviceArea }, e));
  };

  const exposed = {
    cart,
    itemsCount,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    updateItemQty,
    openCart,
    closeCart,
    isOpen,
    deliveryOption,
    changeDeliveryOption,
    serviceArea,
    changeServiceArea,
    paymentMethod,
    setPaymentMethod,
    selectedPromotion,
    changeSelectedPromotion,
    fillCart,
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default Cart;

Cart.propTypes = {
  children: PropTypes.node,
};
