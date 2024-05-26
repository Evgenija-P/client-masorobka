import PropTypes from "prop-types";
import { useEffect } from "react";

import Portal from "./Portal";
import useScrollBlock from "../../hooks/useScrollBlock";
import metaStorage from "../../store/meta";
import { Cross2 } from "../../icons/iconComponent";

const PopupOverlay = ({
  closeByClickOnOverlay, // true if you need it
  closeByPressEsc, // true if you need it
  hasCloseBtn,
  onClose, // fn changing state - show modal
  overlayStyles = "",
  children,
}) => {
  const [blockScroll, unblockScroll] = useScrollBlock();

  const onOverlayClick = (e) => {
    e.stopPropagation();
    if (!closeByClickOnOverlay) {
      return;
    }

    const isClickOnTheOverlay = e.target === e.currentTarget;

    if (isClickOnTheOverlay) {
      onClose();
    }
  };

  useEffect(() => {
    if (!closeByPressEsc) {
      return;
    }

    const onPressEsc = ({ code }) => {
      if (code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onPressEsc);

    return () => {
      window.removeEventListener("keydown", onPressEsc);
    };
  }, [closeByPressEsc, onClose]);

  useEffect(() => {
    if (!metaStorage.popupNestingLevel) {
      blockScroll();
    }

    metaStorage.incrementPopupNestingLevel();

    return () => {
      metaStorage.decrementPopupNestingLevel();

      if (!metaStorage.popupNestingLevel) {
        unblockScroll();
      }
    };
  }, [blockScroll, unblockScroll]);

  return (
    <>
      <Portal>
        <div
          className={`group fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-[100] ${
            closeByClickOnOverlay && "cursor-pointer"
          } ${overlayStyles}`}
          onClick={onOverlayClick}
        >
          <div className="peer cursor-default">{children}</div>
          {hasCloseBtn && (
            <button
              onClick={onClose}
              className={`absolute top-5 right-10 w-10 h-10 text-[#a1a1a1] hover:text-[#ffffff] hover:cursor-pointer ${
                closeByClickOnOverlay &&
                "group-hover:text-[#ffffff] peer-hover:text-[#a1a1a1]"
              } transition-all duration-250`}
            >
              <Cross2 className={`w-full h-full `} />
            </button>
          )}
        </div>
      </Portal>
    </>
  );
};

PopupOverlay.propTypes = {
  closeByClickOnOverlay: PropTypes.bool,
  closeByPressEsc: PropTypes.bool,
  hasCloseBtn: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  overlayStyles: PropTypes.string,
  children: PropTypes.node,
};

export default PopupOverlay;
