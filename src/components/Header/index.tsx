import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { menuItems } from "./config";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  return (
    <>
      <div className="h-10 bg-black text-white">
        <div
          className={`max-w-6xl mx-auto flex justify-between items-center ${
            openSignUp ? "hidden" : ""
          } `}
        >
          <div className="flex justify-center flex-1 gap-x-2">
            <p className="font-[400]">
              Sign up and get 20% off to your first order.
            </p>
            <Link to="/sign-up" className="underline font-[500]">
              Sign Up Now
            </Link>
          </div>
          <ClearIcon
            className="cursor-pointer"
            onClick={() => setOpenSignUp(true)}
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-x-5 my-10 items-center">
        <Link to="/" className="col-span-2 font-bold text-3xl cursor-pointer">
          SHOP.CO
        </Link>
        <div className="col-span-4 flex justify-between">
          {menuItems.map((item, index) => (
            <button key={index}>
              {item.name}{" "}
              {item.name === "Shop" ? <KeyboardArrowDownIcon /> : null}{" "}
            </button>
          ))}
        </div>
        <div className="col-span-5">
          <Paper
            component="form"
            className="flex items-center !bg-[#F2F0F1] !rounded-[62px] !shadow-none p-2"
          >
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              className="flex-1"
              placeholder="Search for products..."
              inputProps={{ "aria-label": "search for products" }}
            />
          </Paper>
        </div>
        <div className="col-span-1 flex justify-end gap-x-2">
        <ShoppingCartOutlinedIcon />
        <AccountCircleOutlinedIcon />
        </div>
      </div>
    </>
  );
};

export default Header;
