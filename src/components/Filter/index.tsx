import { useState } from "react";
import { IMAGE_PATH } from "../../constants/images";
import {
  categorys,
  colors,
  dressStyle,
  size,
} from "../../components/Filter/config";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Slider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const Filter = ({ onclick }: { onclick?: () => void }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [openPrice, setOpenPrice] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openDressStyle, setOpenDressStyle] = useState(false);
  const [pickColor, setPickColor] = useState(colors[0]);
  const [pickSize, setPickSize] = useState<string>(size[0]);

  const [value, setValue] = useState<number[]>([50, 200]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleClick = (itemName: string) => {
    setOpen((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };
  return (
    <div className="col-span-1 border rounded-[20px] p-5 h-max">
      <div className="flex justify-between">
        <p className="font-bold text-xl">Filters</p>
        <img src={IMAGE_PATH.ICON} className="opacity-40 hidden md:block" />
        <button onClick={onclick} className="md:hidden">
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
          <Collapse in={open[category.itemName]} timeout="auto" unmountOnExit>
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
              <div className="flex flex-wrap gap-3">
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
  );
};

export default Filter;
