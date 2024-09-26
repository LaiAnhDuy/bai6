import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconButton, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputBase from "@mui/material/InputBase";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IMAGE_PATH } from "../../constants/images";
import { validationSchemaRegister } from "../../configs/validate";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="px-10 py-5 w-[500px]  border rounded-xl bg-slate-100">
      <Link to={"/"} className="text-4xl font-bold flex justify-center">
        SHOP.CO
      </Link>
      <div>
        <p className="text-2xl font-bold my-3">Đăng ký</p>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchemaRegister}
          onSubmit={(values, { setSubmitting }) => {
            navigate("/login");
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              {/* email */}
              <Paper component="div" className="flex items-center p-2">
                <IconButton type="button">
                  <MailOutlineIcon />
                </IconButton>
                <Field
                  as={InputBase}
                  name="email"
                  className="flex-1"
                  placeholder="Enter your email address"
                />
              </Paper>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 mt-2 ml-5"
              />

              {/* password */}
              <Paper component="div" className="flex items-center p-2 mt-5">
                <IconButton type="button">
                  <PasswordIcon />
                </IconButton>
                <Field
                  as={InputBase}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="flex-1"
                  placeholder="Enter your password"
                />
                <IconButton
                  onClick={handleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Paper>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 mt-2 ml-5"
              />

              {/* confirm password */}
              <Paper component="div" className="flex items-center p-2 mt-5">
                <IconButton type="button">
                  <PasswordIcon />
                </IconButton>
                <Field
                  as={InputBase}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="flex-1"
                  placeholder="Confirm your password"
                />
                <IconButton
                  onClick={handleShowConfirmPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </Paper>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-400 mt-2 ml-5"
              />

              <div className="flex gap-x-5 mt-5">
                <input type="checkbox" />
                <p>
                  Bằng việc Đăng ký, bạn đã đọc và đồng ý với{" "}
                  <span className="text-blue-400">Điều khoản sử dụng </span>
                  và <span className="text-blue-400">
                    Chính sách bảo mật
                  </span>{" "}
                  của SHOP.CO
                </p>
              </div>

              <button
                type="submit"
                className="bg-orange-500 text-white mt-5 w-full cursor-pointer p-3 rounded-md active:bg-orange-400"
                disabled={isSubmitting || !isValid}
              >
                Đăng ký
              </button>
            </Form>
          )}
        </Formik>
        <div className="grid grid-cols-4 items-center my-3">
          <hr className="h-[2px] bg-black" />
          <p className="col-span-2 text-center">Hoặc đăng nhập bằng</p>
          <hr className="h-[2px] bg-black" />
        </div>

        <div className="flex justify-between text-base font-bold">
          <button className="flex items-center gap-x-1 border border-stone-400 rounded-md px-3 py-2">
            <img src={IMAGE_PATH.FACEBOOK} className="w-5" />
            Facebook
          </button>
          <button className="flex items-center gap-x-1 border border-stone-400 rounded-md px-3 py-2">
            <img src={IMAGE_PATH.GOOGLE} className="w-4" />
            Google
          </button>
          <button className="flex items-center gap-x-1 border border-stone-400 rounded-md px-3 py-2">
            <img src={IMAGE_PATH.APPLE} className="w-4" />
            Apple ID
          </button>
        </div>

        <div className="mt-5 text-center">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
