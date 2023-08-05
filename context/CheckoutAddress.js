'use client'
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

const CheckoutAddress = ({ children = null }) => {
  const getInitialAddress = () => JSON.parse(localStorage.getItem("checkout_address"));

  const [checkoutAddress, setCheckoutAddress] = useState({});

  useEffect(() => {
    const initialAddress = getInitialAddress();
    if (initialAddress) {
      setCheckoutAddress(initialAddress);
    }
  }, []);

  useEffect(() => {
    // write to local storage
    localStorage.setItem("checkout_address", JSON.stringify(checkoutAddress));
  }, [checkoutAddress]);

  const updateCheckoutAddress = (newAddress) => {
    setCheckoutAddress(newAddress);
  }


  const exposed = {
    checkoutAddress,
    updateCheckoutAddress,
    getInitialAddress,
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default CheckoutAddress;

CheckoutAddress.propTypes = {
  children: PropTypes.node,
};
