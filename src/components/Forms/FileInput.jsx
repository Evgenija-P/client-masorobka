/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { PlusInCircle, DnD } from "../../icons/iconComponent";
import addProductSchema from "../../validationSchemas/uploadProductImagesSchema";

const FileInput = ({
  name,
  control,
  disabled,
  maxFiles,
  onInputChange,
  onValidationError,
}) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController({ name, control });

  const onDropFile = async (files) => {
    try {
      onValidationError(null);
      const result = await addProductSchema.validate({ images: files });
      onInputChange(result.images);
    } catch ({ errors }) {
      onValidationError(errors[0]);
    }
  };

  // DROP ZONE
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDropAccepted: onDropFile,
    onDropRejected: () =>
      onValidationError("Максимальна кількість файлів для завантаження - 8."),
    // onFileDialogCancel: () => onInputChange(""),
    noDrag: disabled,
    multiple: true,
    maxFiles: maxFiles,
  });

  return (
    <div className="relative flex justify-center">
      <div
        {...getRootProps({ tabIndex: disabled ? -1 : 0 })}
        className={`group/file flex justify-center items-center w-[160px] h-[192px] rounded-3xl cursor-pointer 
          text-txt-main-black font-bold bg-bg-white outline-none ${
            disabled && "opacity-70 cursor-auto"
          }`}
      >
        {isDragActive ? (
          <DnD className="w-2/3 h-2/3 text-bg-orange border-[3px]border-bg-orange" />
        ) : (
          <div
            className={`flex flex-col gap-4 items-center ${
              !disabled &&
              "group-hover/file:text-bg-orange group-focus/file:text-bg-orange"
            } transition-all duration-250`}
          >
            <PlusInCircle className="fill-[tomato]" />
            <p className="text-xl text-center">Додати зображення</p>
          </div>
        )}
      </div>
      <input
        type="file"
        value={""}
        {...field}
        {...getInputProps({ disabled: disabled })}
        className="sr-only"
      />
      {fieldState.error ? (
        <p className="absolute w-[300%] left-0 bottom-0 translate-y-full text-sm font-bold text-[red]">
          {fieldState.error.message}
        </p>
      ) : (
        <p className="absolute w-[300%] left-0 bottom-0 translate-y-full text-sm text-txt-main-white ">
          Клацніть по кнопці або перетягніть файли
        </p>
      )}
    </div>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  maxFiles: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onValidationError: PropTypes.func.isRequired,
};

export default FileInput;
