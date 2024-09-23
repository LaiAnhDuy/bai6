import { useMemo, useState } from "react";
import { Drawer, Pagination } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IMAGE_PATH } from "../../constants/images";
import { fakeProducts } from "./config";
import Frame from "../../components/Frame";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Filter from "../../components/Filter";

const Shop = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const heightHeader = useSelector(
    (state: RootState) => state.product.heightHeader
  );

  const navigate = useNavigate();

  const itemsPerPage = 6;

  // calculate items per page
  const indexOfLastItem = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage]
  );

  const indexOfFirstItem = useMemo(
    () => indexOfLastItem - itemsPerPage,
    [indexOfLastItem]
  );

  const currentItems = useMemo(
    () => fakeProducts.slice(indexOfFirstItem, indexOfLastItem),
    [indexOfFirstItem, indexOfLastItem]
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <hr className=" max-w-[90vw] md:max-w-[85vw] mx-auto bg-[#0000001A] h-[1px] " />
      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto">
        <div className="flex gap-x-1 my-5 text-base items-center">
          <p className="opacity-60">Home</p>
          <ArrowForwardIosIcon sx={{ fontSize: 12, opacity: 0.6 }} />
          <p>Casual</p>
        </div>

        <div className="grid md:grid-cols-4 gap-x-5">
          {/* Fillter for screen > 768px*/}
          <div className="hidden md:block">
            <Filter />
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-2 items-end">
                <p className="font-bold text-2xl md:text-3xl">Casual</p>
                <span className="md:hidden text-[14px] opacity-60">
                  Showing {`${indexOfFirstItem + 1}-${indexOfLastItem}`} of{" "}
                  {`${fakeProducts.length}`} Products
                </span>
              </div>

              <button
                className="md:hidden p-2 rounded-full bg-[#F0F0F0]"
                onClick={() => setOpenFilter(true)}
              >
                <img src={IMAGE_PATH.ICON} className="w-4" />
              </button>

              <div className="hidden md:flex gap-x-2">
                <p className="opacity-60">
                  Showing {`${indexOfFirstItem + 1}-${indexOfLastItem}`} of{" "}
                  {`${fakeProducts.length}`} Products
                </p>
                <p className="cursor-pointer">
                  Sort by:{" "}
                  <span className="font-medium">
                    Most Popular <KeyboardArrowDownIcon />
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-10">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate("/product-detail");
                  }}
                >
                  <Frame {...item} />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] md:text-base">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border rounded-lg p-2 md:px-4 md:py-2 flex items-center active:bg-[#0000000F]"
              >
                <ArrowBackIcon
                  sx={{ fontSize: { xs: "12px", sm: "18px", md: "24px" } }}
                  className="mr-1"
                />
                Previous
              </button>

              <Pagination
                count={Math.ceil(fakeProducts.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                hidePrevButton
                hideNextButton
                sx={{
                  ".MuiPaginationItem-root": {
                    minWidth: { xs: "20px", sm: "32px", md: "40px" },
                    height: { xs: "20px", sm: "32px", md: "40px" },
                    padding: { xs: "4px", sm: "6px", md: "8px" },
                  },
                }}
              />

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(fakeProducts.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(fakeProducts.length / itemsPerPage)
                }
                className="border rounded-lg p-2 md:px-4 md:py-2 items-center active:bg-[#0000000F]"
              >
                Next
                <ArrowForwardIcon
                  sx={{ fontSize: { xs: "12px", sm: "18px", md: "24px" } }}
                  className="ml-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter for mobile */}
      <Drawer
        anchor={"bottom"}
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        PaperProps={{
          style: {
            height: `calc(100% - ${heightHeader + 20}px)`,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        }}
      >
        <Filter onclick={() => setOpenFilter(false)} />
      </Drawer>
    </div>
  );
};

export default Shop;
