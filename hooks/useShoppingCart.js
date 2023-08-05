import { useContext } from "react";
import { Context } from "/context/Cart";

const useShoppingCart = () => useContext(Context);

export default useShoppingCart;
