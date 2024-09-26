import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function AccountIcon() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated && user ? (
        <div
          className="bg-violet-700 w-6 h-6 text-white font-medium rounded-full text-center cursor-pointer"
          onClick={handleOpen}
        >
          {user.email.charAt(0).toUpperCase()}
        </div>
      ) : (
        <button onClick={handleOpen}>
          <AccountCircleOutlinedIcon />
        </button>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className="mt-6 md:mt-14"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <div>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/login");
              }}
            >
              Sign in
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("register");
              }}
            >
              Sign up
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}
