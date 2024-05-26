/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { toJS } from "mobx";

import addProductSchema from "../../validationSchemas/addProductSchema";
import productStore from "../../store/products";
import ButtonMain from "../UIKit/button";
import FileInput from "./FileInput";
import PreviewImage from "../PreviewImage";

const MAX_IMAGES_NUM = 8;
const NEW_CATEGORY = "+ додати нову категорію +";
const commonInputStyle =
  "h-8 px-4 text-base font-normal bg-bg-main outline-none border border-transparent focus:border-b-txt-main-yellow transition-all duration-250";

const AddProductForm = observer(({ closePopup }) => {
  const { editProduct, products, createProductAction, updateProductAction } =
    productStore;

  const defaultValues = {
    images: editProduct?.images || [],
    name: editProduct?.name || "",
    category: editProduct?.category || "",
    price: editProduct?.price || "",
    unit: editProduct?.unit || "",
    info: editProduct?.discount_price || "",
    description: editProduct?.description || "",
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addProductSchema),
    mode: "all",
  });

  const categories = [NEW_CATEGORY];

  toJS(products).forEach((el) => {
    if (!categories.includes(el.category)) {
      categories.push(el.category);
    }
  });

  // EVENT HANDLERS

  const onSubmit = async ({ selectCategory, ...data }) => {

    const newProduct = {
      ...data,
      price: data.price,
      discount_price: data.info,
      available: true,
      favourite: false,
      archived: false,
    };

  

    let result;
    if (editProduct) {
      result = await updateProductAction(editProduct._id, newProduct);
    } else {
      result = await createProductAction(newProduct);
    }
    if (result) {
      closePopup();
    }
  };

  const onSelect = ({ currentTarget: { value } }) => {
    const newValue = value === NEW_CATEGORY ? "" : value;
    setValue("category", newValue);
  };

  const onFileInputChange = (files) =>
    setValue("images", [...images, ...files], { shouldValidate: true });

  const onFileValidationError = (errorMsg) => {
    setError("images", {
      type: "FileValidationError",
      message: errorMsg,
    });
  };

  // /EVENT HANDLERS

  const { images, selectCategory } = watch();
  const isAddingFilesRefuse = images.length >= MAX_IMAGES_NUM;
  const imageList = [];

  for (let i = 0; i < MAX_IMAGES_NUM; i++) {
    imageList.push(
      <div key={i}>
        {images[i] ? (
          <PreviewImage
            image={images[i]}
            onDelete={() => {
              const newImages = images.filter((image) => image !== images[i]);
              setValue("images", newImages, { shouldValidate: true });
            }}
          />
        ) : (
          <div className="w-[88px] h-[88px] flex justify-center items-center rounded-3xl bg-bg-white">
            <div className="w-9 h-9 flex justify-center items-center rounded-full bg-bg-black text-xl font-bold text-txt-main-white">
              {i + 1}
            </div>
          </div>
        )}
      </div>
    );
  }



  return (
    <form
      className="flex flex-col text-txt-main-white pt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col mb-5">
        <div className="w-full flex gap-x-4 mb-8">
          <FileInput
            name="images"
            control={control}
            disabled={isAddingFilesRefuse}
            maxFiles={MAX_IMAGES_NUM - images.length}
            onInputChange={onFileInputChange}
            onValidationError={onFileValidationError}
          />
          <div className="flex flex-wrap gap-4">{imageList}</div>
        </div>
      </div>

      {/* ----------------------------------------------- */}

      <div className="flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="name"
            className="text-base font-medium text-txt-main-white"
          >
            Назва товару
            <span className="text-[#ff0000]"> * </span>
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              autoComplete="off"
              className={`w-full ${commonInputStyle} ${
                errors.name && "border-b-[#ff0000] focus:border-b-[#ff0000]"
              } `}
              placeholder="Приклад: Підгорок мраморний"
              {...register("name")}
            />
            {errors.name && (
              <p className="absolute text-xs font-bold text-[red]">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------- */}

        <div>
          <div>
            <label
              className="text-base font-medium text-txt-main-white"
              htmlFor="selectCategory"
            >
              Виберіть
            </label>
            <span> або </span>
            <label
              className="text-base font-medium text-txt-main-white"
              htmlFor="category"
            >
              придумайте категорію
              <span className="text-[#ff0000]"> * </span>
            </label>
          </div>
          <div className="flex justify-between">
            <select
              id="selectCategory"
              {...register("selectCategory", {
                onChange: onSelect,
              })}
              className={`${commonInputStyle} w-[282px] text-center`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* -------------------------------------------------------- */}

            <div className="relative">
              <input
                id="category"
                type="text"
                autoComplete="off"
                disabled={selectCategory !== NEW_CATEGORY}
                className={`w-[282px] ${commonInputStyle} ${
                  errors.category &&
                  "border-b-[#ff0000] focus:border-b-[#ff0000]"
                } `}
                placeholder="Назвіть категорію"
                {...register("category")}
              />
              {errors.category && (
                <p className="absolute text-xs font-bold text-[red]">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- */}

        <div className="flex gap-x-4">
          <div>
            <label
              className="text-base font-medium text-txt-main-white"
              htmlFor="price"
            >
              Ціна
            </label>
            <span> та </span>
            <label
              className="text-base font-medium text-txt-main-white"
              htmlFor="unit"
            >
              одиниця виміру
              <span className="text-[#ff0000]"> * </span>
            </label>
            <div className="flex gap-x-3">
              <div className="relative">
                <input
                  id="price"
                  type="number"
                  autoComplete="off"
                  min={0}
                  className={`w-[128px] text-center ${commonInputStyle} ${
                    errors.price &&
                    "border-b-[#ff0000] focus:border-b-[#ff0000]"
                  }`}
                  placeholder="100"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="absolute w-[110%] text-xs font-bold text-[red]">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* ------------------------------------------------- */}

              <div className="relative">
                <input
                  id="unit"
                  type="text"
                  autoComplete="off"
                  className={`w-[128px] text-center ${commonInputStyle} ${
                    errors.unit && "border-b-[#ff0000] focus:border-b-[#ff0000]"
                  } `}
                  placeholder="шматок"
                  {...register("unit")}
                />
                {errors.unit && (
                  <p className="absolute w-[110%] text-xs font-bold text-[red]">
                    {errors.unit.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------- */}

          <div className="w-[282px] flex flex-col ml-auto">
            <label
              className="text-base font-medium text-txt-main-white"
              htmlFor="info"
            >
              Доп інфо
              <span className="text-[#ff0000]"> * </span>
            </label>
            <div className="relativ">
              <input
                id="info"
                type="text"
                autoComplete="off"
                className={`w-full ${commonInputStyle}  ${
                  errors.info && "border-b-[#ff0000] focus:border-b-[#ff0000]"
                }`}
                placeholder="100"
                {...register("info")}
              />
              {errors.info && (
                <p className="absolute text-xs font-bold text-[red]">
                  {errors.info.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------- */}

        <div className="relative mb-4">
          <label
            className="text-base font-medium text-txt-main-white"
            htmlFor="description"
          >
            Придумайте опис
          </label>
          <textarea
            id="description"
            autoComplete="off"
            {...register("description")}
            className={`block w-full bg-bg-main px-4 resize-none overflow-auto outline-none border border-transparent 
        focus:border-b-txt-main-yellow transition-all duration-250 ${
          errors.description && "border-b-[#ff0000] focus:border-b-[#ff0000]"
        }`}
          />
        </div>
      </div>

      <ButtonMain style="redLarge" btnType="submit">
        {editProduct ? "Редагувати" : "Додати"}
      </ButtonMain>
    </form>
  );
  // };
});
export default AddProductForm;
