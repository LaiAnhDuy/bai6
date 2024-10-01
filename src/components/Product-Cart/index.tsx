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

type ActionType = "remove" | "increment" | "decrement";

const colors: Record<string, string> = {
  "#4F4631": "Brown",
  "#314F4A": "Green",
  "#31344F": "Blue",
};

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

  const handleActionClick = (
    actionType: ActionType,
    user: { email: string } | null,
    id: number,
    quantity?: number
  ) => {
    if (!user) return;

    const actions = {
      remove: () => dispatch(removeProduct({ userEmail: user.email, id })),
      increment: () =>
        dispatch(incrementQuantity({ userEmail: user.email, id })),
      decrement: () => {
        if (quantity && quantity > 1) {
          dispatch(reduceQuantity({ userEmail: user.email, id }));
        }
      },
    };

    actions[actionType]?.();
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5">
      <img src={image} className="col-span-1 h-full" />
      <div className="col-span-2 md:col-span-4">
        <div className="flex justify-between items-start gap-x-5">
          <div>
            <p className="font-bold text-base md:text-xl">{title}</p>
            <p className="text-[12px]">
              Size: <span className="opacity-60">{size}</span>
            </p>
            <p className="text-[12px]">
              Color: <span className="opacity-60">{colors[color]}</span>
            </p>
          </div>
          <button onClick={() => handleActionClick("remove", user, id)}>
            <img src={IMAGE_PATH.RECYCLE_ICON} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-xl md:text-2xl font-bold">${price}</p>
          <div className="flex justify-between items-center gap-x-2 md:gap-x-5 px-3 md:px-5 md:py-2 rounded-[62px] bg-[#F0F0F0]">
            <button
              className="text-3xl"
              onClick={() => handleActionClick("decrement", user, id, quantity)}
            >
              -
            </button>
            {quantity}
            <button
              className="text-3xl"
              onClick={() => handleActionClick("increment", user, id, quantity)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
