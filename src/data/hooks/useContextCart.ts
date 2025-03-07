import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const useContextCart = () => useContext(CartContext);

export default useContextCart;
