import * as Yup from "yup";

import constants from "../helpers/constants";

const addProductSchema = Yup.object({
  name: Yup.string().max(200, "Максимум 200 символів").required(constants.REQUIRED_FIELD),

  category: Yup.string().max(50, "Максимум 50 символів").required(constants.REQUIRED_FIELD),

  price: Yup.string().required(constants.REQUIRED_FIELD),

  unit: Yup.string().max(20, "Максимум 20 символів").required(constants.REQUIRED_FIELD),

  info: Yup.string().max(50, "Максимум 50 символів").required(constants.REQUIRED_FIELD),

  description: Yup.string().max(200, "Максимум 200 символів"),
});

export default addProductSchema;
