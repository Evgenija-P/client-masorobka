/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";

const ProuctCardImages = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [firstSwiper, setFirstSwiper] = useState();
  const [secondSwiper, setSecondSwiper] = useState();
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div className="max-w-[528px] h-[536px] flex flex-col relative justify-between images-swiper">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            swiper1Ref.current = swiper;
          }
        }}
        controller={{ control: secondSwiper }}
        spaceBetween={50}
        slidesPerView={1}
        grabCursor={true}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="w-full h-[400px] mySwiperOne rounded-lg flex"
      >
        {data.map((el, index) => (
          <SwiperSlide key={index + 1}>
            <img src={el} alt="swiper gallary" className="w-[400px] h-full mx-auto object-cover rounded-2xl" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        controller={{ control: firstSwiper }}
        loop={false}
        grabCursor={true}
        spaceBetween={32}
        slidesPerView={3}
        watchSlidesProgress
        touchRatio={0.2}
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Thumbs, Controller]}
        className="w-[376px] h-[104px] mySwiper "
      >
        {data.map((el, index) => (
          <SwiperSlide key={index + 1} className="opacity-70 ">
            <img src={el} alt="swiper gallary" className="w-[104px] h-full rounded-lg " />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
ProuctCardImages.propTypes = {
  data: PropTypes.string.isRequired,
};
export default ProuctCardImages;
