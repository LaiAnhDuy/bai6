import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ProductCart from "../../components/Product-Cart";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMemo } from "react";
import { ProductProps } from "../../redux/slices/cartSlices";

const Cart = () => {
  const email = useSelector((state: RootState) => state.auth.user?.email);
  const cart = useSelector((state: RootState) => {
    const curentEmail = email || "";
    return state.cart[curentEmail];
  });

  const subtotal = useMemo(() => {
    return cart.reduce((total: number, product: ProductProps) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [cart]);

  return (
    <div>
      <hr className=" max-w-[90vw] md:max-w-[85vw] mx-auto bg-[#0000001A] h-[1px] " />
      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto">
        <div className="flex gap-x-1 my-5 text-base items-center">
          <p className="opacity-60">Home</p>
          <ArrowForwardIosIcon sx={{ fontSize: 12, opacity: 0.6 }} />
          <p>Cart</p>
        </div>

        <p className="font-bold text-4xl">YOUR CART</p>
        <div className="lg:grid lg:grid-cols-5 mt-5 gap-x-5">
          <div className="col-span-3 border rounded-3xl px-2 md:px-6 py-5">
            {cart.map((product, index) => (
              <div key={index}>
                {index > 0 && (
                  <hr className="bg-[#0000001A] h-[1px] w-full my-5 md:my-10" />
                )}
                <ProductCart {...product} id={index} />
              </div>
            ))}
          </div>

          <div className="col-span-2 border rounded-3xl px-6 py-5 h-max">
            <p className="text-xl md:text-2xl font-bold">Order Summary</p>
            <div className="md:text-xl">
              <div className="flex justify-between mt-5">
                <p className="opacity-60">Subtotal</p>
                <p className="font-bold">${subtotal}</p>
              </div>
              <div className="flex justify-between mt-5">
                <p className="opacity-60">Discount (-20%)</p>
                <p className="font-bold text-red-500">-${subtotal*0.2}</p>
              </div>
              <div className="flex justify-between mt-5">
                <p className="opacity-60">Delivery Fee</p>
                <p className="font-bold">$15</p>
              </div>

              <hr className="w-full bg-[#0000001A] h-[1px] my-5" />

              <div className="flex justify-between">
                <p>Total</p>
                <p className="font-bold">${subtotal*0.8 + 15}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-between gap-x-2 md:gap-x-5 text-[14px] md:text-base">
              <button className="lg:pl-5 rounded-[62px] bg-stone-400 opacity-40 flex-1 flex justify-center lg:justify-start gap-x-1 items-center">
                <LocalOfferOutlinedIcon style={{ fontSize: 16 }} />
                Add promo code
              </button>
              <button className="px-4 sm:px-10 py-3 rounded-[62px] bg-black text-white">
                Apply
              </button>
            </div>

            <button className="px-10 py-3 rounded-[62px] bg-black text-white w-full mt-5 flex justify-center gap-x-2 items-center">
              Go to Checkout
              <ArrowForwardOutlinedIcon style={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
