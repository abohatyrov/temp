import { useContext } from "react";
import { Context } from "/context/CheckoutAddress";

const useCheckoutAddress = () => useContext(Context);

export default useCheckoutAddress;
