import * as Yup from "yup";
import constants from "../helpers/constants";

const orderShema = Yup.object({
  customer_name: Yup.string()
    .required(constants.REQUIRED_FIELD)
    .min(3, "Довжина поля має бути не менше 3 символів.")
    .max(30, "Довжина поля має бути не більше 30 символів."),
  phone_number: Yup.string()
    .required(constants.REQUIRED_FIELD)
    .matches(
      constants.PHONE_REGEX,
      "Поле має бути наступного формату +38 (0XX) XX-XXX-XX."
    ),
  delivery_address: Yup.string()
    .required(constants.REQUIRED_FIELD)
    .min(5, "Довжина поля має бути не менше 5 символів.")
    .max(300, "Довжина поля має бути не більше 300 символів."),
});

export default orderShema;
