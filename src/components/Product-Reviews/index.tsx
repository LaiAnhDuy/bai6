import { IMAGE_PATH } from "../../constants/images";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Review, { ReviewProps } from "./Review";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/slices/productSlice";


interface ProductReviewProps {
  allReviews: ReviewProps[];
  isShowButton: boolean;
}

export default function ProductReview({ allReviews, isShowButton }: ProductReviewProps) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-between my-5 items-center">
        <p className="font-bold text-base md:text-2xl">All Reviews</p>
        <div className="flex gap-x-3 md:gap-x-5 text-base">
          <div className="flex justify-center items-center rounded-full bg-[#F0F0F0] p-2 md:p-4">
            <img src={IMAGE_PATH.ICON} className="w-5 md:w-auto" />
          </div>
          <p className="bg-[#F0F0F0] font-medium rounded-[62px] p-4 hidden md:block">
            Latest <KeyboardArrowDownIcon />
          </p>
          <button className="text-white text-[12px] md:text-base bg-black rounded-[62px] px-4">
            Write a Review
          </button>
        </div>
      </div>

      <div className="md:grid grid-cols-2 gap-5 mt-5">
        {allReviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </div>
      <div className={`flex justify-center ${isShowButton ? 'block' : 'hidden'}`}>
        <button
          className="mt-5 rounded-[62px] px-14 py-4 border"
          onClick={() => dispatch(increment())}
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
}
