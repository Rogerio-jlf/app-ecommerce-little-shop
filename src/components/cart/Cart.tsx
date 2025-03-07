import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import useContextCart from "@/data/hooks/useContextCart";

const CartComponent = () => {
  const { quantity } = useContextCart();
  return (
    <>
      <Link href="/cart">
        <div className="flex relative">
          <FaShoppingCart className="w-6 h-6 text-white" />
          <Badge className="absolute bg-red-600 rounded-full h-6 w-6 -top-4 -right-4 text-white text-center text-md">
            {quantity}
          </Badge>
        </div>
      </Link>
    </>
  );
};

export default CartComponent;
