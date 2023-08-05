"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

export default function PromotionSectionContent({
  banners = [],
  // mobileView,
  mobileSetting,
  desktopSetting,
}) {
  const [mobileView, setMobileView] = useState(true);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setMobileView(window.innerWidth <= 750);
    setSettings(window.innerWidth <= 750 ? mobileSetting : desktopSetting);
  }, []);

  return (
    <Slider {...settings}>
      {banners.map((slide) => (
        <div key={slide.id}>
          <div style={{ paddingLeft: 5, paddingRight: 5 }}>
            <div
              style={{
                border: "2px solid black",
                position: "relative",
                width: "100%",
                aspectRatio: mobileView ? "2/2.5" : "3/2",
              }}
            >
              <Image
                src={(mobileView ? slide.image_mob : slide.image) ?? ""}
                alt="акція"
                fill
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
