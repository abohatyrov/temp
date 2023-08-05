import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function BannerSection({ slides = [] }) {
  const [bannerSettings, setBannerSettings] = useState({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 10000,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function resizeBanner() {
      if (window.innerWidth < 750) {
        setIsMobile(true);
        // setBannerHeight(Math.round((window.innerWidth * 5) / 4));
        setBannerSettings({
          ...bannerSettings,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      } else {
        setIsMobile(false);
        // setBannerHeight(Math.round((window.innerWidth * 1) / 3));
        setBannerSettings({
          ...bannerSettings,
          slidesToShow: 2,
          slidesToScroll: 2,
        });
      }
    }

    window.addEventListener("resize", resizeBanner);

    resizeBanner();

    return () => window.removeEventListener("resize", resizeBanner);
  }, []);
  return (
    <div style={{}}>
      <Slider {...bannerSettings}>
        {(slides ?? []).map((slide) => (
          <div key={slide.id}>
            <div style={{ paddingLeft: 5, paddingRight: 5 }}>
              <div
               
               style={{
                  border: "2px solid black",
                  position: "relative",
                  width: "100%",
                  aspectRatio: isMobile ? "2/2.5" : "3/2",
                }}
              >
                <Image
                  src={(isMobile ? slide.image_mob : slide.image) ?? ""}
                  alt="акція"
                  fill
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Typechecking props for the DefaultNavbar
BannerSection.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object),
};
