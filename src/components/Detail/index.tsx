import { Rating } from "@mui/material";
import { useState } from "react";
import { IMAGE_PATH } from "../../constants/images";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cartSlices";

interface DetailProps {
  images: Array<string>;
  title: string;
  stars: number;
  originalPrice: number;
  discount: number;
  content: string;
  colors: Array<string>;
  size: Array<string>;
}

export default function Detail({
  images,
  title,
  stars,
  originalPrice,
  discount,
  content,
  colors,
  size,
}: DetailProps) {
  const [centerImage, setCenterImage] = useState<string>(images[0]);
  const [pickColor, setPickColor] = useState<string>(colors[0]);
  const [pickSize, setPickSize] = useState<string>(size[0]);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else if (user) {
      dispatch(
        addProduct({
          userEmail: user?.email,
          product: {
            image: images[0],
            title: title,
            color: pickColor,
            size: pickSize,
            price: originalPrice,
            quantity: count,
            id: 0
          },
        })
      );
      navigate("/cart");
    }
  };
  return (
    <div className="flex flex-col md:grid md:grid-cols-8 mt-10 md:gap-x-5">
      <div className="order-2 md:order-1 flex md:flex-col gap-5 mt-5 md:mt-0 col-span-1 max-h-[80vh] overflow-auto">
        {images.map((image, index) => (
          <div key={index} className="shrink-0">
            <img
              src={image}
              className={`w-[90px] md:w-full rounded-[20px] ${
                image === centerImage ? "border border-black" : ""
              }`}
              onClick={() => setCenterImage(image)}
            />
          </div>
        ))}
      </div>

      <div className="order-1 md:col-span-3">
        <img src={centerImage} className="w-full" />
      </div>

      <div className="order-3 col-span-4">
        <p className="font-bold text-2xl md:text-4xl">{title}</p>
        <Rating
          value={stars}
          precision={0.1}
          readOnly
          className="text-[#FFC633]"
        />
        <div className="flex gap-x-5 items-center">
          <p className="font-bold text-2xl md:text-3xl">
            ${originalPrice * (1 - discount / 100)}
          </p>
          <p className="font-bold text-2xl md:text-3xl opacity-30 line-through">
            ${originalPrice}
          </p>
          <div className="bg-[#FF33331A] px-4 py-2 rounded-[62px] text-[#FF3333] text-[14px]">
            -{discount}%
          </div>
        </div>
        <p className="mt-5 opacity-60 text-base">{content}</p>
        <hr className="bg-[#0000001A] h-[1px] my-5" />
        <p className="text-base opacity-60">Select Colors</p>
        <div className="flex gap-x-4">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-9 h-9 rounded-full mt-2 flex justify-center items-center"
              style={{ backgroundColor: color }}
              onClick={() => setPickColor(color)}
            >
              {color === pickColor && <img src={IMAGE_PATH.CHECK} />}
            </button>
          ))}
        </div>
        <hr className="bg-[#0000001A] h-[1px] my-5" />
        <p className="text-base opacity-60">Choose Size</p>
        <div className="flex gap-x-1 md:gap-x-5">
          {size.map((size, index) => (
            <button
              key={index}
              className="px-3 py-1 md:px-5 md:py-3 text-[14px]  mt-2 rounded-[62px]"
              style={
                size === pickSize
                  ? { backgroundColor: "#000000", color: "white" }
                  : { backgroundColor: "#F0F0F0" }
              }
              onClick={() => setPickSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <hr className="bg-[#0000001A] h-[1px] my-5" />
        <div className="flex gap-x-5">
          <div className="flex justify-between gap-x-3 md:gap-x-10 items-center text-base px-5 py-4 rounded-[62px] bg-[#F0F0F0]">
            <button
              className="text-3xl"
              onClick={() => {
                if (count > 1) setCount((prev) => prev - 1);
              }}
            >
              -
            </button>
            {count}
            <button
              className="text-3xl"
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            className="py-4 text-white bg-black flex-1 rounded-[62px]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
