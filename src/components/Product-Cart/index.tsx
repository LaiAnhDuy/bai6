import { useSelector } from "react-redux";
import { IMAGE_PATH } from "../../constants/images";
import {
  incrementQuantity,
  ProductProps,
  reduceQuantity,
  removeProduct,
} from "../../redux/slices/cartSlices";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

export default function ProductCart({
  image,
  title,
  size,
  color,
  price,
  quantity,
  id,
}: ProductProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5">
      <img src={image} className="col-span-1 h-full"/>
      <div className="col-span-2 md:col-span-4">
        <div className="flex justify-between items-start gap-x-5">
          <div>
            <p className="font-bold text-base md:text-xl">{title}</p>
            <p className="text-[12px]">
              Size: <span className="opacity-60">{size}</span>
            </p>
            <p className="text-[12px]">
              Color:{" "}
              <span className="opacity-60">
                {color === "#4F4631"
                  ? "Brown"
                  : color === "#314F4A"
                  ? "Green"
                  : "Blue"}
              </span>
            </p>
          </div>
          <button
            onClick={() => {
              if (user) {
                dispatch(removeProduct({ userEmail: user.email, id: id }));
              }
            }}
          >
            <img src={IMAGE_PATH.RECYCLE_ICON} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-xl md:text-2xl font-bold">${price}</p>
          <div className="flex justify-between items-center gap-x-2 md:gap-x-5 px-3 md:px-5 md:py-2 rounded-[62px] bg-[#F0F0F0]">
            <button
              className="text-3xl"
              onClick={() => {
                if (quantity > 1 && user) {
                  dispatch(reduceQuantity({ userEmail: user?.email, id: id }));
                }
              }}
            >
              -
            </button>
            {quantity}
            <button
              className="text-3xl"
              onClick={() => {
                if (user) {
                  dispatch(
                    incrementQuantity({ userEmail: user?.email, id: id })
                  );
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
