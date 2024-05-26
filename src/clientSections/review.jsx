import hotPepper from "../images/hot-pepper_1.png";
import rosemary from "../images/rosemary-big.png";
import ReviewCard from "../components/reviewCard";
import { MTitle } from "../components/Title";
import { titleAnimation } from "../helpers/stylesHelpers";
import reviews from "../data/reviews.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "../components/productSwiper.css";

import * as icons from "../icons/iconComponent";

const Review = () => {
  return (
    <div className="bg-bg-white h-[860px] pt-10 pb-28 relative">
      <img src={hotPepper} alt="hot pepper" className="absolute top-[-40px] right-0" />
      <div className="max-w-[1440px] mx-auto px-[10px] relative">
        <MTitle tClass="mb-14" type="black" variants={titleAnimation} initial="hidden" whileInView="visible">
          Відгуки про нашу працю
        </MTitle>

        <div className="w-full py-4 relative mx-auto reviews">
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              rewind={true}
              pagination={{
                clickable: true,
                el: ".review-pagination",
              }}
              navigation={{
                nextEl: ".review-button-next",
                prevEl: ".review-button-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                760: {
                  slidesPerView: 2,
                },
                1000: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviews.map((el) => (
                <SwiperSlide key={el.id} className="mx-auto">
                  <ReviewCard review={el} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
          <div className="w-full mt-1 relative mx-auto flex justify-center items-center">
            <button className="review-button-prev hover:shadow-swiperReview">
              <icons.Left />
            </button>
            <div className="review-pagination flex justify-center gap-x-4 mx-6 w-[200px] h-full z-20"></div>
            <button className="review-button-next hover:shadow-swiperReview">
              <icons.Right />
            </button>
          </div>
        </div>
        <img
          src={rosemary}
          alt="rosemary"
          className="h-[60px] w-[360px] md:h-[82px] md:w-[480px] lg:h-[137px] lg:w-[800px] absolute bottom-[-80px] left-0 md:bottom-[-140px] md:left-[136px] lg:bottom-[-150px] lg:left-[130px]  xl:bottom-[-137px] xl:left-[295px] z-[2]"
        />
      </div>
    </div>
  );
};
export default Review;
