import { Tab } from "@mui/material";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Detail from "../../components/Detail";
import Frame from "../../components/Frame";
import { fakeProduct, fakeProductReview, fakeRelatedProducts } from "./config";
import React, { useEffect, useState } from "react";
import ProductReview from "../../components/Product-Reviews";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProductDetail = () => {
  const [value, setValue] = React.useState("2");
  const count = useSelector((state: RootState) => state.product.count);
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [isShowButton, setIsShowButton] = useState(true);

  useEffect(() => {
    if (count >= fakeProductReview.length) {
      setIsShowButton(false);
    }
  }, [count]);
  return (
    <div>
      <hr className=" max-w-[90vw] md:max-w-[85vw] mx-auto bg-[#0000001A] h-[1px] " />
      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto">
        <div className="flex gap-x-1 mt-5 text-base items-center">
          <p className="opacity-60">Home</p>
          <ArrowForwardIosIcon sx={{ fontSize: 12, opacity: 0.6 }} />
          <p className="opacity-60">Shop</p>
          <ArrowForwardIosIcon sx={{ fontSize: 12, opacity: 0.6 }} />
          <p className="opacity-60">Men</p>
          <ArrowForwardIosIcon sx={{ fontSize: 12, opacity: 0.6 }} />
          <p>T-shirts</p>
        </div>
        <Detail {...fakeProduct} />
        <div className="mt-10">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": {
                    color: "#00000099",
                    fontSize: "20px",
                    backgroundColor: "white",
                    "@media (max-width: 768px)": {
                      backgroundColor: "white",
                      color: "#00000099",
                      fontSize: "14px",
                    },
                  },
                  "& .Mui-selected": {
                    color: "black",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "black",
                  },
                }}
              >
                <Tab label="Product Details" value="1" />
                <Tab label="Rating & Reviews" value="2" />
                <Tab label="FAQs" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" className="text-5xl font-bold">
              Product Details
            </TabPanel>
            <TabPanel value="2" className="!p-0">
              <ProductReview
                allReviews={fakeProductReview.slice(0, count)}
                isShowButton={isShowButton}
              />
            </TabPanel>
            <TabPanel value="3" className="text-5xl font-bold">
              FAQ
            </TabPanel>
          </TabContext>
        </div>

        <div className="max-w-[90vw] md:max-w-[85vw] mx-auto mt-10">
          <p className="text-center text-3xl md:text-5xl font-bold">
            YOU MIGHT ALSO LIKE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
            {fakeRelatedProducts.map((product, index) => (
              <Frame key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
