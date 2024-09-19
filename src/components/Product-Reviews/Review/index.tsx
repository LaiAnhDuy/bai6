import { Rating } from "@mui/material";
import { IMAGE_PATH } from "../../../constants/images";

export interface ReviewProps {
  stars: number;
  name: string;
  content: string;
  date: string;
}

export default function Review({ stars, name, content, date }: ReviewProps) {
  return (
    <div className="p-3 md:p-7 border rounded-[20px] h-72 transition-all duration-300 ease-in-out overflow-y-auto mt-5 md:mt-0">
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
      <p className="mt-5">Posted on {date}</p>
    </div>
  );
}
