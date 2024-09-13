import { Rating } from "@mui/material";

interface FrameProps {
  image: string;
  title: string;
  stars: number;
  price: number;
}

export default function Frame({ image, title, stars, price }: FrameProps) {
  return (
    <div>
      <img src={image} />
      <p className="mt-3 font-bold text-xl">{title}</p>
      <Rating
        value={stars}
        precision={0.1}
        readOnly
        className="text-[#FFC633]"
      />
      <div className="font-bold text-2xl mt-2">${price}</div>
    </div>
  );
}
