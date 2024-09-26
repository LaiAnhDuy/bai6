import * as Yup from "yup";



export const validationSchema = Yup.object({
    email: Yup.string().email("Địa chỉ email không hợp lệ"),
  });

export const validationSchemaRegister = Yup.object({
    email: Yup.string()
      .email("Địa chỉ email không hợp lệ")
      .required("Email là bắt buộc"),

    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),

    confirmPassword: Yup.string()
      .required("Xác nhận mật khẩu là bắt buộc")
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
  });

export  const validationSchemaLogin = Yup.object({
    email: Yup.string()
      .email("Địa chỉ email không hợp lệ")
      .required("Email là bắt buộc"),

    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),
  });