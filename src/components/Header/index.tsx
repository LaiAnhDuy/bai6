import { Link, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { menuItems } from "./config";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeightHeader } from "../../redux/slices/productSlice";
import AccountIcon from "./AccountIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
  const navigate = useNavigate();
  const [openSignUp, setOpenSignUp] = useState(false);
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const openMenu = Boolean(anchorElMenu);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const headerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const updateHeight = useCallback(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      dispatch(setHeightHeader(height));
    }
  }, [dispatch]);

  const handleGoToCard = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [updateHeight]);

  return (
    <div ref={headerRef}>
      <div className="bg-black text-white">
        <div
          className={`max-w-[90vw] md:max-w-[85vw] mx-auto flex justify-between items-center ${
            openSignUp || isAuthenticated ? "hidden" : ""
          } `}
        >
          <div className="flex justify-center text-[10px] py-2 flex-1 gap-x-2">
            <p className="font-[400]">
              Sign up and get 20% off to your first order.
            </p>
            <Link to="/register" className="underline font-[500]">
              Sign Up Now
            </Link>
          </div>
          <ClearIcon
            className="cursor-pointer"
            onClick={() => setOpenSignUp(true)}
          />
        </div>
      </div>
      <div className=" max-w-[90vw] md:max-w-[85vw] mx-auto flex justify-between md:grid md:grid-cols-12 gap-x-10 my-5 md:my-10 items-center">
        <div className="flex md:col-span-6 md:gap-x-10 items-center gap-x-3">
          {/* menu in screen mobile */}
          <div className="md:hidden">
            <div onClick={handleOpenMenu}>
              <MenuIcon className="text-black" />
            </div>
            <Menu
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={handleCloseMenu}
              TransitionComponent={Fade}
              className="mt-6"
            >
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleNavigate(item.route);
                    handleCloseMenu();
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Link
            to="/"
            className="col-span-2 font-bold text-2xl md:text-3xl cursor-pointer"
          >
            SHOP.CO
          </Link>

          {/* menu in screen > 768px */}
          <div className="col-span-4 hidden md:flex md:flex-1 justify-between">
            {menuItems.map((item, index) => (
              <button key={index} onClick={() => handleNavigate(item.route)}>
                {item.name}
                {item.name === "Shop" ? <KeyboardArrowDownIcon /> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-5 hidden md:block">
          <Paper
            component="form"
            className="flex items-center !bg-[#F2F0F1] !rounded-[62px] !shadow-none p-2 "
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

        <div className="col-span-1 flex justify-end gap-x-2 items-end">
          <SearchIcon className="md:!hidden cursor-pointer" />
          <button onClick={() => handleGoToCard()}>
            <ShoppingCartOutlinedIcon className="cursor-pointer" />
          </button>
          <AccountIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
