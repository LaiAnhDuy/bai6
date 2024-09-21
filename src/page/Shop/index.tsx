import { useState } from "react";
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Pagination,
} from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import ExpandLess from "@mui/icons-material/ExpandLess";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import { IMAGE_PATH } from "../../constants/images";
import { categorys, colors, dressStyle, fakeProducts, size } from "./config";
import Frame from "../../components/Frame";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Shop = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [openPrice, setOpenPrice] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openDressStyle, setOpenDressStyle] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [pickColor, setPickColor] = useState(colors[0]);
  const [pickSize, setPickSize] = useState<string>(size[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const heightHeader = useSelector(
    (state: RootState) => state.product.heightHeader
  );

  const [value, setValue] = useState<number[]>([50, 200]);

  const navigate = useNavigate();

  const handleClick = (itemName: string) => {
    setOpen((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const itemsPerPage = 6;

  // calculate number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fakeProducts.slice(indexOfFirstItem, indexOfLastItem);

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
          <div className="hidden md:block col-span-1 border rounded-[20px] p-5 h-max">
            <div className="flex justify-between">
              <p className="font-bold text-xl">Filters</p>
              <img src={IMAGE_PATH.ICON} className="opacity-40" />
            </div>

            <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

            {categorys.map((category) => (
              <List component="nav" key={category.itemName}>
                <ListItemButton onClick={() => handleClick(category.itemName)}>
                  <ListItemText primary={category.itemName} />
                  {open[category.itemName] ? (
                    <ExpandLess />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </ListItemButton>
                <Collapse
                  in={open[category.itemName]}
                  timeout="auto"
                  unmountOnExit
                >
                  {category.listChildren.map((item, index) => (
                    <List component="div" disablePadding key={index}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </List>
            ))}

            <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

            <List component="nav">
              <ListItemButton onClick={() => setOpenPrice(!openPrice)}>
                <ListItemText
                  primary="Price"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "20px",
                      fontWeight: 700,
                    },
                  }}
                />
                {openPrice ? <ExpandLess /> : <KeyboardArrowRightIcon />}
              </ListItemButton>
              <Collapse in={openPrice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Box className="w-full mt-5">
                    <Slider
                      min={0}
                      max={250}
                      value={value}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      disableSwap={true}
                      sx={{
                        color: "black",
                        "& .MuiSlider-track": {
                          backgroundColor: "black",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "gray",
                        },
                      }}
                    />
                  </Box>
                </List>
              </Collapse>
            </List>

            <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

            <List component="nav">
              <ListItemButton onClick={() => setOpenColors(!openColors)}>
                <ListItemText
                  primary="Color"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "20px",
                      fontWeight: 700,
                    },
                  }}
                />
                {openColors ? <ExpandLess /> : <KeyboardArrowRightIcon />}
              </ListItemButton>
              <Collapse in={openColors} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton>
                    <div className="flex flex-wrap gap-4">
                      {colors.map((color, index) => (
                        <div key={index} className="flex justify-center">
                          <button
                            className="w-9 h-9  rounded-full mt-2 flex justify-center items-center border border-[#00000033]"
                            style={{ backgroundColor: color }}
                            onClick={() => setPickColor(color)}
                          >
                            {color === pickColor &&
                              (color !== "#FFFFFF" ? (
                                <img src={IMAGE_PATH.CHECK} />
                              ) : (
                                <CheckIcon fontSize="small" />
                              ))}
                          </button>
                        </div>
                      ))}
                    </div>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>

            <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

            <List component="nav">
              <ListItemButton onClick={() => setOpenSize(!openSize)}>
                <ListItemText
                  primary="Size"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "20px",
                      fontWeight: 700,
                    },
                  }}
                />
                {openSize ? <ExpandLess /> : <KeyboardArrowRightIcon />}
              </ListItemButton>
              <Collapse in={openSize} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton>
                    <div className="flex flex-wrap gap-4">
                      {size.map((size, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 md:px-5 md:py-3 text-[14px]  mt-2 rounded-[62px]"
                          style={
                            size === pickSize
                              ? {
                                  backgroundColor: "#000000",
                                  color: "white",
                                }
                              : { backgroundColor: "#F0F0F0" }
                          }
                          onClick={() => setPickSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>

            <List component="nav">
              <ListItemButton
                onClick={() => setOpenDressStyle(!openDressStyle)}
              >
                <ListItemText
                  primary="Dress Style"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "20px",
                      fontWeight: 700,
                    },
                  }}
                />
                {openDressStyle ? <ExpandLess /> : <KeyboardArrowRightIcon />}
              </ListItemButton>
              <Collapse in={openDressStyle} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <div>
                    {dressStyle.map((dressStyle) => (
                      <List component="nav" key={dressStyle.itemName}>
                        <ListItemButton
                          onClick={() => handleClick(dressStyle.itemName)}
                        >
                          <ListItemText primary={dressStyle.itemName} />
                          {open[dressStyle.itemName] ? (
                            <ExpandLess />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={open[dressStyle.itemName]}
                          timeout="auto"
                          unmountOnExit
                        >
                          {dressStyle.listChildren.map((item, index) => (
                            <List component="div" disablePadding key={index}>
                              <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary={item} />
                              </ListItemButton>
                            </List>
                          ))}
                        </Collapse>
                      </List>
                    ))}
                  </div>
                </List>
              </Collapse>
            </List>
            <button className="text-white text-sm bg-black rounded-[62px] w-full text-center p-4 mt-5">
              Apply Filter
            </button>
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
                className="p-2 rounded-full bg-[#F0F0F0]"
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

      <Drawer
        anchor={"bottom"}
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        PaperProps={{
          style: {
            height: `calc(100% - ${heightHeader + 20}px)`,
          },
        }}
      >
        <div className="border rounded-[20px] p-5 h-max">
          <div className="flex justify-between">
            <p className="font-bold text-xl">Filters</p>
            <button onClick={() => setOpenFilter(false)}>
              <ClearIcon />
            </button>
          </div>

          <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

          {categorys.map((category) => (
            <List component="nav" key={category.itemName}>
              <ListItemButton onClick={() => handleClick(category.itemName)}>
                <ListItemText primary={category.itemName} />
                {open[category.itemName] ? (
                  <ExpandLess />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </ListItemButton>
              <Collapse
                in={open[category.itemName]}
                timeout="auto"
                unmountOnExit
              >
                {category.listChildren.map((item, index) => (
                  <List component="div" disablePadding key={index}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            </List>
          ))}

          <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

          <List component="nav">
            <ListItemButton onClick={() => setOpenPrice(!openPrice)}>
              <ListItemText
                primary="Price"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                }}
              />
              {openPrice ? <ExpandLess /> : <KeyboardArrowRightIcon />}
            </ListItemButton>
            <Collapse in={openPrice} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Box className="w-full mt-5">
                  <Slider
                    min={0}
                    max={250}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap={true}
                    sx={{
                      color: "black",
                      "& .MuiSlider-track": {
                        backgroundColor: "black",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "gray",
                      },
                    }}
                  />
                </Box>
              </List>
            </Collapse>
          </List>

          <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

          <List component="nav">
            <ListItemButton onClick={() => setOpenColors(!openColors)}>
              <ListItemText
                primary="Color"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                }}
              />
              {openColors ? <ExpandLess /> : <KeyboardArrowRightIcon />}
            </ListItemButton>
            <Collapse in={openColors} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton>
                  <div className="flex flex-wrap gap-4">
                    {colors.map((color, index) => (
                      <div key={index} className="flex justify-center">
                        <button
                          className="w-9 h-9  rounded-full mt-2 flex justify-center items-center border border-[#00000033]"
                          style={{ backgroundColor: color }}
                          onClick={() => setPickColor(color)}
                        >
                          {color === pickColor &&
                            (color !== "#FFFFFF" ? (
                              <img src={IMAGE_PATH.CHECK} />
                            ) : (
                              <CheckIcon fontSize="small" />
                            ))}
                        </button>
                      </div>
                    ))}
                  </div>
                </ListItemButton>
              </List>
            </Collapse>
          </List>

          <hr className="bg-[#0000001A] w-full h-[1px] my-5" />

          <List component="nav">
            <ListItemButton onClick={() => setOpenSize(!openSize)}>
              <ListItemText
                primary="Size"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                }}
              />
              {openSize ? <ExpandLess /> : <KeyboardArrowRightIcon />}
            </ListItemButton>
            <Collapse in={openSize} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton>
                  <div className="flex flex-wrap gap-4">
                    {size.map((size, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 md:px-5 md:py-3 text-[14px]  mt-2 rounded-[62px]"
                        style={
                          size === pickSize
                            ? {
                                backgroundColor: "#000000",
                                color: "white",
                              }
                            : { backgroundColor: "#F0F0F0" }
                        }
                        onClick={() => setPickSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </ListItemButton>
              </List>
            </Collapse>
          </List>

          <List component="nav">
            <ListItemButton onClick={() => setOpenDressStyle(!openDressStyle)}>
              <ListItemText
                primary="Dress Style"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                }}
              />
              {openDressStyle ? <ExpandLess /> : <KeyboardArrowRightIcon />}
            </ListItemButton>
            <Collapse in={openDressStyle} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <div>
                  {dressStyle.map((dressStyle) => (
                    <List component="nav" key={dressStyle.itemName}>
                      <ListItemButton
                        onClick={() => handleClick(dressStyle.itemName)}
                      >
                        <ListItemText primary={dressStyle.itemName} />
                        {open[dressStyle.itemName] ? (
                          <ExpandLess />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={open[dressStyle.itemName]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {dressStyle.listChildren.map((item, index) => (
                          <List component="div" disablePadding key={index}>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary={item} />
                            </ListItemButton>
                          </List>
                        ))}
                      </Collapse>
                    </List>
                  ))}
                </div>
              </List>
            </Collapse>
          </List>
          <button className="text-white text-sm bg-black rounded-[62px] w-full text-center p-4 mt-5">
            Apply Filter
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default Shop;
