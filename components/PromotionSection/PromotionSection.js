import ConfigurationService from "../../api/ConfigurationService";
import PromotionSectionContent from "./PromotionSectionContent";

export default async function PromotionSection() {
  const banners = await ConfigurationService.getBanners();

  const desktopSetting = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 10000,
  };

  const mobileSetting = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 10000,
  };

  return (
    <PromotionSectionContent
      banners={banners}
      // mobileView={mobileView}
      mobileSetting={mobileSetting}
      desktopSetting={desktopSetting}
      // settings={mobileView ? mobileSetting : desktopSetting}
    />
  );
}
