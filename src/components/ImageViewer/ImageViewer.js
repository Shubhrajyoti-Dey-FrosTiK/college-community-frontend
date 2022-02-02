import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ImageViewer(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {props.images && props.images.length > 0 && (
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            borderRadius: "10px",
          }}
          // loop={true}
          spaceBetween={10}
          navigation={props.images.length > 1 ? true : false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {props.images &&
            props.images.map((image, index) => {
              console.log(image);
              return (
                <SwiperSlide>
                  <img src={image} alt="Pic" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </>
  );
}
