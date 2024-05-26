import ProductList from "../components/productList";
import hotPepper from "../images/hot-pepper.png";
import rosemary from "../images/rosemary.png";
import { MTitle } from "../components/Title";
import { titleAnimation } from "../helpers/stylesHelpers";

const Favourite = () => {
  return (
    <div className="bg-bg-black relative pb-[58px] min-h-[600px]">
      <img src={hotPepper} alt="hot pepper" className="absolute top-[-64px]" />
      <img src={rosemary} alt="rosemary" className="absolute right-4 bottom-0" />
      <div className="max-w-[1440px] mx-auto px-[10px] pt-12">
        <MTitle
          tClass="z-10 relative mb-8"
          type="white"
          variants={titleAnimation}
          initial="hidden"
          whileInView="visible"
        >
          Найулюбленіші смаколики покупців
        </MTitle>

        <ProductList favourite />
      </div>
    </div>
  );
};
export default Favourite;
