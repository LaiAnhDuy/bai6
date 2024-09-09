import { IMAGE_PATH } from "../../constants/images";
import { listItem } from "./config";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import * as Yup from "yup";

const Footer = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Địa chỉ email không hợp lệ"),
  });
  return (
    <>
      <div className="max-w-[1240px] mx-auto bg-black grid grid-cols-5 py-10 px-20 relative top-24 rounded-[20px]">
        <p className="font-bold text-5xl leading-snug text-white col-span-3">
          STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
        </p>
        <div className="col-span-2">
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
      <div className="bg-[#F0F0F0] pb-10 pt-32">
        <div className="max-w-[1240px] mx-auto grid grid-cols-11 gap-x-10">
          <div className="col-span-3">
            <p className="font-bold text-4xl">SHOP.CO</p>
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
          <div className="col-span-8 flex justify-between gap-x-10 text-base">
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
          <div className="mt-5 col-span-11 flex justify-between ">
            <p className="text-[14px] font-[400]">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex">
              <img src={IMAGE_PATH.VISA} />
              <img src={IMAGE_PATH.MASTERCARD} />
              <img src={IMAGE_PATH.PAYPAL} />
              <img src={IMAGE_PATH.PAY} />
              <img src={IMAGE_PATH.GPAY} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
