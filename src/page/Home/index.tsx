import { useEffect, useRef, useState } from "react";
import Frame from "../../components/Frame";
import { IMAGE_PATH } from "../../constants/images";
import { fakeProducts, fakeReviews, styles } from "./config";
import Review from "../../components/Review";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ROUTE from "../../constants/route";
import { IconButton } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleNewArrivals, setVisibleNewArrivals] = useState(4);
  const [visibleTopSelling, setVisibleTopSelling] = useState<number>(4);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState(0);

  const updateVisibleNewArrivals = () => {
    if (window.innerWidth <= 640) {
      setVisibleNewArrivals(2);
      setVisibleTopSelling(2);
    } else {
      setVisibleNewArrivals(4);
      setVisibleTopSelling(4);
    }
  };

  // Set initial product display
  useEffect(() => {
    updateVisibleNewArrivals();
    window.addEventListener("resize", updateVisibleNewArrivals);
    return () => {
      window.removeEventListener("resize", updateVisibleNewArrivals);
    };
  }, []);

  const handleViewAll = () => {
    setVisibleNewArrivals(fakeProducts.length);
  };

  const handleViewAllTopSelling = () => {
    setVisibleTopSelling(fakeProducts.length);
  };

  // Calculate width component Review
  useEffect(() => {
    const hanldeResize = () => {
      if (window.innerWidth <= 768 && containerRef.current) {
        setItemWidth(containerRef.current.clientWidth);
      } else if (containerRef.current) {
        setItemWidth((containerRef.current.clientWidth - 40) / 3);
      }
    };
    hanldeResize();
    window.addEventListener("resize", hanldeResize);

    return () => {
      window.removeEventListener("resize", hanldeResize);
    };
  }, []);

  return (
    <>
      <div className="bg-[#F2F0F1]">
        <div className="max-w-[90vw] md:max-w-[85vw] mx-auto md:flex justify-between items-end xl:gap-x-20 pt-14">
          <div>
            <p className="text-4xl md:text-6xl font-bold">
              FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
            </p>
            <p className="my-12 md:max-w-[42vw]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <button
              className="bg-black text-white rounded-[62px] px-16 py-4"
              onClick={() => {
                navigate(ROUTE.SHOP);
              }}
            >
              Shop Now
            </button>
            <div className="flex flex-wrap justify-center gap-x-10 md:justify-around mt-12 mb-5">
              <img
                src={IMAGE_PATH.INTERNATIONAL_BRANDS}
                className="w-28 lg:w-32"
              />
              <div className="w-[1px] bg-[#0000001A]"></div>
              <img
                src={IMAGE_PATH.HIGH_QUALITY_PRODUCTS}
                className="w-28 lg:w-32"
              />
              <div className="w-[1px] bg-[#0000001A] hidden sm:block md:hidden lg:block"></div>
              <img
                src={IMAGE_PATH.HAPPY_CUSTOMERS}
                className="mt-5 md:mt-0 w-28 lg:w-32"
              />
            </div>
          </div>
          <img src={IMAGE_PATH.SAMPLE} className="flex-1 hidden md:block" />
        </div>
        <img src={IMAGE_PATH.SAMPLE} className=" w-full mt-10 md:hidden" />
      </div>

      <div className="bg-black">
        <div className="max-w-[90vw] md:max-w-[85vw] mx-auto grid grid-cols-6 md:flex md:flex-wrap md:justify-around gap-5 py-5 md:py-14">
          <img
            src={IMAGE_PATH.VERSACE}
            className="w-full md:w-auto h-5 md:h-10 col-span-2"
          />
          <img
            src={IMAGE_PATH.ZARA}
            className="w-full md:w-auto h-5 md:h-10 col-span-2"
          />
          <img
            src={IMAGE_PATH.GUCCI}
            className="w-full md:w-auto h-5 md:h-10 col-span-2"
          />
          <div className="col-span-1 md:hidden"></div>
          <img
            src={IMAGE_PATH.PRADA}
            className="w-full md:w-auto h-5 md:h-10 col-span-2"
          />
          <img
            src={IMAGE_PATH.CALVIN_KLEIN}
            className="w-full md:w-auto h-5 md:h-10 col-span-2"
          />
          <div className="col-span-1 md:hidden"></div>
        </div>
      </div>

      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto mt-10">
        <p className="text-center text-3xl md:text-5xl font-bold">
          NEW ARRIVALS
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10 overflow-hidden">
          {fakeProducts.slice(0, visibleNewArrivals).map((product, index) => (
            <div
              key={index}
              onClick={() => {
                navigate("/product-detail");
              }}
            >
              <Frame {...product} />
            </div>
          ))}
        </div>
        {visibleNewArrivals < fakeProducts.length && (
          <div className="mt-10 flex justify-center text-center col-span-4">
            <button
              onClick={handleViewAll}
              className="py-4 px-14 w-full md:w-max rounded-[62px] border"
            >
              View all
            </button>
          </div>
        )}
        <hr className="bg-[#0000001A] h-[1px] my-10 md:my-20" />
      </div>

      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto">
        <p className="text-center text-3xl md:text-5xl font-bold">
          TOP SELLING
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10 overflow-hidden">
          {fakeProducts.slice(0, visibleTopSelling).map((product, index) => (
            <div
              key={index}
              onClick={() => {
                navigate("/product-detail");
              }}
            >
              <Frame {...product} />
            </div>
          ))}
        </div>
        {visibleTopSelling < fakeProducts.length && (
          <div className="mt-10 flex justify-center text-center col-span-4">
            <button
              onClick={handleViewAllTopSelling}
              className="py-4 px-14 w-full md:w-max rounded-[62px] border"
            >
              View all
            </button>
          </div>
        )}
      </div>

      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto mt-20 bg-[#F0F0F0] rounded-[40px] px-3 py-8 md:px-10 md:py-10">
        <p className="font-bold text-3xl md:text-5xl text-center">
          BROWSE BY dress STYLE
        </p>
        <div className="grid md:grid-cols-5 gap-5 mt-10">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`bg-cover bg-center h-48 md:h-72 rounded-[20px] ${
                index % 4 === 0 || index % 4 === 3
                  ? "md:col-span-2"
                  : "md:col-span-3"
              }`}
              style={{ backgroundImage: `url(${style.image})` }}
            >
              <p className="pl-5 pt-5 font-bold text-2xl md:text-4xl">
                {style.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="max-w-[90vw] md:max-w-[85vw] mx-auto mt-20 flex justify-between items-center">
          <p className="font-bold text-3xl md:text-5xl">OUR HAPPY CUSTOMERS</p>
          <div className="flex items-end">
            <IconButton
              className="mr-3"
              onClick={() => {
                const slidePerView = window.innerWidth <= 768 ? 1 : 3;
                setCurrentIndex((val) =>
                  val === 0 ? fakeReviews.length - slidePerView : val - 1
                );
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              className="cursor-pointer"
              onClick={() => {
                const slidePerView = window.innerWidth <= 768 ? 1 : 3;
                setCurrentIndex((val) =>
                  val === fakeReviews.length - slidePerView ? 0 : val + 1
                );
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </div>

        <div
          className="mt-8 max-w-[90vw] md:max-w-[85vw]  mx-auto"
          ref={containerRef}
        >
          <div
            className="flex gap-x-5 transition-all duration-300 ease-in-out"
            style={{ marginLeft: `-${currentIndex * (itemWidth + 20)}px` }}
          >
            {fakeReviews.map((review, index) => (
              <div
                key={index}
                className={`${
                  index < currentIndex || index > currentIndex + 2
                    ? "blur-sm opacity-50"
                    : ""
                }`}
                style={{
                  width: "100%",
                  minWidth: itemWidth,
                  maxWidth: itemWidth,
                }}
              >
                <Review {...review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
