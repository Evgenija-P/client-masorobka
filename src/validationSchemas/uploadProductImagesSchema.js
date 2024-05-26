import * as Yup from "yup";

const FILE_MAX_SIZE = 8388608;
const ACCEPTABLE_MIMETYPES = ["image/jpg", "image/jpeg", "image/png"];

const uploadProductImagesSchema = Yup.object({
  images: Yup.mixed()

    .test(
      "MIME_TYPE",
      "Файли повиннi бути наступного формату: jpeg/jpg/png. ",
      (values) => {
  
        return values.every((value) => {
          if (typeof value === "string") {
            return true;
          }

          return value ? ACCEPTABLE_MIMETYPES.includes(value.type) : true;
        });
      }
    )
    .test(
      "FILE_SIZE",
      "Розмір файлу не повинен перевищувати 8mb.",
      (values) => {
        return values.every((value) => {
          if (typeof value === "string") {
            return true;
          }

          return value ? value.size < FILE_MAX_SIZE : true;
        });
      }
    ),
});

export default uploadProductImagesSchema;
