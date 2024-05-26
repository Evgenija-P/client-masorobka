/* eslint-disable react/prop-types */
import { useState } from "react";

import FullSizeImagePopup from "./popups/FullSizeImagePopup";
import { Cross } from "../icons/iconComponent";

const PreviewImage = ({ image, onDelete }) => {
  const [preview, setPreview] = useState("");
  const [isDelBtnShown, setIsDelBtnShown] = useState(false);
  const [isImagePopupShown, setIsImagePopupsShown] = useState(false);

  const isBlob = typeof image === "object";
  if (isBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => setPreview(reader.result);
  }

  const onImageDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return image ? (
    <>
      <div
        onMouseOver={() => setIsDelBtnShown(true)}
        onMouseLeave={() => setIsDelBtnShown(false)}
        onClick={() => setIsImagePopupsShown(true)}
        className="relative cursor-pointer"
      >
        {isDelBtnShown && (
          <button
            type="button"
            onClick={onImageDelete}
            className="group absolute top-1.5 right-1.5 w-5 h-5 flex justify-center items-center rounded-[8px] rounded-tr-[12px] bg-[#00000077]"
          >
            <Cross className="fill-[#ffffffaa] group-hover:fill-[#ffffff]" />
          </button>
        )}
        <img
          src={isBlob ? preview : image}
          alt="preview image"
          className={
            "border border-txt-main-white text-txt-main-white text-center w-[88px] h-[88px] object-cover rounded-3xl"
          }
        />
      </div>
      {isImagePopupShown && (
        <FullSizeImagePopup
          image={isBlob ? preview : image}
          onClose={() => setIsImagePopupsShown(false)}
        />
      )}
    </>
  ) : null;
};

export default PreviewImage;
