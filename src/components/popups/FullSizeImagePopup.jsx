import PropTypes from "prop-types";

import PopupOverlay from "../UIKit/PopupOverlay";

const FullSizeImagePopup = ({ onClose, image }) => {
  return (
    <PopupOverlay
      onClose={onClose}
      closeByClickOnOverlay
      closeByPressEsc
      hasCloseBtn
      overlayStyles="bg-[rgb(0,0,0,0.3)]"
    >
      <img
        src={image}
        className="w-[1100px] h-[770px] object-contain bg-[#131313] rounded-2xl overflow-hidden"
      />
    </PopupOverlay>
  );
};

FullSizeImagePopup.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FullSizeImagePopup;
