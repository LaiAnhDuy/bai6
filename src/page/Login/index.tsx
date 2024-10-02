import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputBase from "@mui/material/InputBase";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IMAGE_PATH } from "../../constants/images";
import { validationSchemaLogin } from "../../configs/validate";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const users = [
  { email: "duy@gmail.com", password: "123456" },
  { email: "long@gmail.com", password: "123456" },
  { email: "test@gmail.com", password: "123456" },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (values: { email: string; password: string }) => {
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      dispatch(login({ email: user.email }));
      const from = location.state?.from || "/";
      navigate(from);
    } else {
      setLoginError("Email or password is incorrect");
    }
  };

  return (
    <div className="px-10 py-5 w-[500px]  border rounded-xl bg-slate-100">
      <Link to={"/"} className="text-4xl font-bold flex justify-center">
        SHOP.CO
      </Link>
      <div>
        <p className="text-2xl font-bold my-3">Đăng nhập</p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchemaLogin}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
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

              {loginError && (
                <div className="text-red-500 mt-5 text-center">
                  {loginError}
                </div>
              )}

              <p className="text-blue-500 mt-5">Quên mật khẩu?</p>

              <button
                type="submit"
                className="bg-orange-500 text-white mt-5 w-full cursor-pointer p-3 rounded-md active:bg-orange-400"
                disabled={isSubmitting || !isValid}
              >
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>

        <div className="grid grid-cols-4 items-center my-5">
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
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
