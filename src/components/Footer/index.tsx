import { IMAGE_PATH } from "../../constants/images";
import { listItem } from "./config";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [paddingTop, setPaddingTop] = useState(0);
  const itemFooterRef = useRef<HTMLDivElement | null>(null);

  const validationSchema = Yup.object({
    email: Yup.string().email("Địa chỉ email không hợp lệ"),
  });

  const updatePaddingTop = () => {
    if (itemFooterRef.current) {
      setPaddingTop(itemFooterRef.current.offsetHeight / 2 + 20);
    }
  };

  useEffect(() => {
    updatePaddingTop();

    window.addEventListener("resize", updatePaddingTop);

    return () => {
      window.removeEventListener("resize", updatePaddingTop);
    };
  }, []);

  return (
    <>
      <div
        ref={itemFooterRef}
        className="max-w-[90vw] md:max-w-[85vw] mx-auto bg-black md:grid md:grid-cols-5 md:gap-x-10 py-10 px-5 md:py-10 md:px-20 mt-10 rounded-[20px] relative z-10"
      >
        <p className="font-bold text-3xl md:text-5xl text-white col-span-3">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </p>
        <div className="col-span-2 mt-10 md:mt-0">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Paper
                  component="div"
                  className="flex items-center !rounded-[62px] !shadow-none p-2"
                >
                  <IconButton type="button" aria-label="email">
                    <MailOutlineIcon />
                  </IconButton>
                  <Field
                    as={InputBase}
                    name="email"
                    className="flex-1"
                    placeholder="Enter your email address"
                    inputProps={{ "aria-label": "email input" }}
                  />
                </Paper>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 mt-2 ml-5"
                />

                <button
                  type="submit"
                  className="bg-white mt-5 w-full cursor-pointer p-2 rounded-[62px] h-14"
                  disabled={isSubmitting || !isValid}
                >
                  Subscribe to Newsletter
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="bg-[#F0F0F0] md:p-0 relative">
        <div
          className="bg-[#F0F0F0] absolute left-0 right-0"
          style={{ height: `${paddingTop}px`, bottom: "100%" }}
        />
        <div className="max-w-[90vw] md:max-w-[85vw] mx-auto md:grid md:grid-cols-11 gap-x-10 mt-5">
          <div className="col-span-3">
            <p className="font-bold text-3xl">SHOP.CO</p>
            <p className="mt-2 text-[14px]">
              We have clothes that suits your style and <br /> which you’re
              proud to wear. <br /> From women to men.
            </p>
            <div className="flex gap-x-3 mt-5">
              <img src={IMAGE_PATH.LOGO_TWITTER} />
              <img src={IMAGE_PATH.LOGO_FB} />
              <img src={IMAGE_PATH.LOGO_INSTAGRAM} />
              <img src={IMAGE_PATH.LOGO_GITHUB} />
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10 text-base mt-5 md:mt-0">
            {listItem.map((item, index) => (
              <div key={index}>
                <h2 className="font-medium">{item.title}</h2>
                {item.content.map((content, index) => (
                  <div key={index} className="mt-5">
                    {content.subtitle}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <hr className="mt-10 col-span-11 h-[1px] bg-[#0000001A]" />
          <div className="mt-5 col-span-11 md:flex md:justify-between">
            <p className="text-[14px] font-[400] text-center">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex justify-center mt-3 md:mt-0">
              <img src={IMAGE_PATH.VISA} className="w-10 md:w-auto" />
              <img src={IMAGE_PATH.MASTERCARD} className="w-10 md:w-auto" />
              <img src={IMAGE_PATH.PAYPAL} className="w-10 md:w-auto" />
              <img src={IMAGE_PATH.PAY} className="w-10 md:w-auto" />
              <img src={IMAGE_PATH.GPAY} className="w-10 md:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
