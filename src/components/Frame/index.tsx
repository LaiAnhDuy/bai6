import { Rating } from "@mui/material";

export interface FrameProps {
  image: string;
  title: string;
  stars: number;
  price: number;
  discount?: number;
}

export default function Frame({
  image,
  title,
  stars,
  price,
  discount,
}: FrameProps) {
  return (
    <div>
      <img src={image} className="w-full"/>
      <p className="mt-3 font-bold text-xl">{title}</p>
      <Rating
        value={stars}
        precision={0.1}
        readOnly
        className="text-[#FFC633]"
      />
      <div className="flex gap-x-2 items-center mt-2">
        <p className="font-bold md:text-2xl">
          ${discount ? Math.round(price * (1 - discount / 100)) : price}
        </p>

        {discount ? (
          <div className="flex gap-x-2 items-center">
            <p className="font-bold md:text-2xl opacity-40 line-through">
              ${price}
            </p>
            <div className="bg-[#FF33331A] p-1 md:px-4 md:py-2 rounded-[62px] text-[#FF3333] text-xs">
              -{discount}%
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
