import { Rating } from "@mui/material";
import { IMAGE_PATH } from "../../constants/images";

interface ReviewProps {
  stars: number;
  name: string;
  content: string;
}

export default function Review({ stars, name, content }: ReviewProps) {
  return (
    <div className="px-8 py-7 border rounded-[20px] h-72 transition-all duration-300 ease-in-out overflow-y-auto">
      <Rating
        value={stars}
        precision={0.1}
        readOnly
        className="text-[#FFC633]"
      />
      <div className="flex gap-x-1 font-bold text-xl my-2">
        {name}
        <img src={IMAGE_PATH.TICK} />
      </div>
      <p>{content}</p>
    </div>
  );
}
