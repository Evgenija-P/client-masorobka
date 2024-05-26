/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import PopupOverlay from "./UIKit/PopupOverlay";
import { Prev } from "../icons/iconComponent";
import Counter from "./UIKit/Counter";
import ButtonMain from "./UIKit/button";
import BlankImg from "../images/BlankPic.jpg";

import metaStore from "../store/meta";
import ordersStore from "../store/orders";

const ProductDetailInfoCard = observer(({ product, productQuantity, onClose, onPrev }) => {
  const [quantity, setQuantity] = useState(productQuantity);
  const isQuantityNotNull = quantity !== 0;
  const isProductInCart = ordersStore.checkProductInCart(product);

  const onGoToCart = () => {
    metaStore.toggleCartPopup();
    onClose();
  };

  return (
    <PopupOverlay onClose={onClose} closeByPressEsc overlayStyles="bg-[rgb(0,0,0,0.3)] overflow-x-auto">
      <div className="w-70 md:w-full xl:w-5/6 max-w-full xl:max-w-1/3 h-screen md:h-screen xl:h-[720px] rounded-3xl bg-bg-black overflow-y-auto shadow-popups p-10 mx-auto">
        {/* ------------------------POPUP HEADER------------------------ */}

        <div className="relative w-full h-[74px]">
          <button
            type="button"
            onClick={onPrev}
            className="group absolute left-10 bottom-[45%] translate-y-1/2 px-1 h-[40px] flex items-center gap-x-3 text-[#ffffff]"
          >
            <Prev className="stroke-[#ffffff]" />
            <span className="hidden md:inline md:text-xl md:font-bold md:group-hover:underline md:group-focus:underline">
              Повернутися
            </span>
          </button>

          <button
            type="button"
            onClick={onGoToCart}
            className="group absolute right-10 xl:right-28 bottom-[45%] translate-y-1/2 px-1 h-[40px] flex items-center gap-x-3 text-bg-light-grey"
          >
            <span className="hidden md:inline md:text-xl md:font-bold md:group-hover:underline md:group-focus:underline md:text-[#ffffff]">
              Кошик
            </span>
            <Prev className="rotate-180 stroke-[#ffffff]" />
          </button>
        </div>
        {/* ------------------------POPUP BODY------------------------ */}
        <div className="w-full h-[80%] flex flex-col xl:flex-row justify-between px-8 py-6 gap-x-4 text-txt-main-white">
          <div className="w-[280px] xl:w-[528px] flex justify-center items-center text-3xl ml-0 xl:ml-5">
       
              <img
                src={product.img || BlankImg}
                alt="product picture"
                className="w-[300px] h-[300px] xl:w-full xl:h-full mx-auto object-contain overflow-hidden"
              />
            
          </div>
          <div className="flex flex-col max-w-[300px] xl:max-w-[55%] h-full">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold text-txt-main-yellow">{`ціна за упаковку: від ${product.price} грн`}</p>
            <p className="mt-2 text-2xl font-bold text-txt-grey">упаковка вагою від 100г </p>
            <div className="flex flex-col xl:flex-row gap-4 mt-8 ">
              <Counter
                initialValue={quantity}
                size="m"
                outlinedControls
                disabled={isProductInCart}
                onChange={(value) => setQuantity(value)}
              />
              {isProductInCart ? (
                <ButtonMain
                  style="redLarge"
                  btnClass="ml-0 xl:ml-14"
                  onClick={() => ordersStore.deleteProduct(product.name)}
                >
                  Видалити з кошика
                </ButtonMain>
              ) : (
                <ButtonMain
                  style="redLarge"
                  btnClass="ml-0 xl:ml-14"
                  onClick={() => ordersStore.addToCart(product, quantity)}
                  disabled={!isQuantityNotNull}
                >
                  Додати до кошика
                </ButtonMain>
              )}
            </div>
            <p className="mt-8 text-2xl font-bold">Опис:</p>
            <p className="mt-2 text-xl font-semibold">{product.description}</p>
            <p className="mt-auto text-sm">
              * Товар ваговий. Вказано середню вагу упаковки продукту. Можливе відхилення у більшу чи меншу сторону. Про
              точну суму та вагу ми повідомимо вам напередодні доставки після збирання продукції на нашому складі.
            </p>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
});

ProductDetailInfoCard.propTypes = {
  // product: PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   category: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   img: PropTypes.string,
  //   price: PropTypes.number.isRequired,
  //   favorite: PropTypes.bool.isRequired,
  // }),
  onClose: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default ProductDetailInfoCard;
