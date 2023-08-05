import React, { Suspense } from "react";

import ProductsService from "api/ProductsService";
import ConfigurationService from "api/ConfigurationService";

import PromotionSection from "/components/PromotionSection/PromotionSection";
import MainPageContent from "./mainPageContent";
import MainPageContentLoading from "./mainPageContentLoading";
import NonWorkingHoursMessage from "../pages-sections/nonworkingHoursMessage/NonWorkingHoursMessage";
import NonOperationalMessage from "../pages-sections/nonOperationalMessage/NonOperationalMessage";
import ModalMessage from "../pages-sections/modalMessage/modalMessage";
import isEmpty from "../helpers/strhelper";

const pageSettings = {
  title: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому",
  description:
    "SYODŌ - майстерність поєднувати. Послуги доставки їжі. Ода•до•якості. Чисті і збалансовані смаки. Роли без рису і лактози. Трускавецька 2а - Телефонуйте ☎ +38 (067) 722 93 45. Малоголосківська 28 - Телефонуйте ☎ +38 (063) 139 85 12",
  image: "https://media.syodo.com.ua/img/IMG_1773.jpg",
  imageAlt: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому",
  url: `https://syodo.com.ua/`,
};

const fetchSubCategorySettings = async () => {
  const settingsResponse = await ConfigurationService.getGeneralSettings(
    "subcategories"
  );
  return settingsResponse;
};

const fetchCeoSettings = async () => {
  const settingsResponse = await ConfigurationService.getGeneralSettings(
    "ceomain"
  );
  return settingsResponse;
};

const fetchData = async () => {
  try {
    let productsResponse = await ProductsService.getProducts();
    productsResponse = productsResponse.filter((i) => i.showOnMain);

    // group by category
    const groupedProducts = productsResponse.reduce((obj, item) => {
      const key = item.category_id;
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push(item);
      return obj;
    }, {});

    return groupedProducts;
  } catch (error) {
    console.error("Unable fetch page data", error);
  }
};

export async function generateMetadata() {
  const productsToShow = await ProductsService.getProducts();

  return {
    title: pageSettings.title,
    description: pageSettings.description,
    themeColor: "black",
    robots: {
      googleBot: {
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: pageSettings.url,
    },
    openGraph: {
      title: pageSettings.title,
      description: pageSettings.description,
      url: pageSettings.url,
      siteName: pageSettings.siteName,
      images: [
        {
          url: productsToShow[0]?.image ?? pageSettings.image,
          alt: pageSettings.imageAlt,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageSettings.title,
      description: pageSettings.title,
      images: [productsToShow[0]?.image ?? pageSettings.image],
    },
  };
}

export default async function IndexPage() {
  const productsToShowData = fetchData();
  const subcategorySettingsData = fetchSubCategorySettings();
  const pageCeoData = fetchCeoSettings();

  // Wait for the promises to resolve
  const [productsToShow, subcategorySettings, ceoSettings] = await Promise.all([
    productsToShowData,
    subcategorySettingsData,
    pageCeoData,
  ]);
console.log('subcategorySettingsData', subcategorySettings);
  // const headersList = headers();
  // const userAgent = headersList.get('user-agent');
  // console.log('headersList', JSON.stringify(headersList))
  // console.log('userAgent', userAgent)
  // let isMobileView = userAgent.match(
  //   /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  // );

  return (
    <div>
      {/* Show Rols Catalogue in search */}
      <script
        type="application/ld+json"
        id="ld-json-carousel"
        dangerouslySetInnerHTML={{
          __html: `
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому",
                "itemListElement": [
                  ${(productsToShow["7"] ?? []).map(
                    (product, index) => `
                    {
                      "@type": "ListItem",
                      "position": ${index},
                      "url": "https://syodo.com.ua/products/${product.id}",
                      "name": "${product.title}",
                      "image": "${product.image}"
                    }
                    `
                  )}         
                ]
              }
              `,
        }}
      ></script>

      <PromotionSection />

      <Suspense fallback={<MainPageContentLoading />}>
        <MainPageContent
          catalogue={productsToShow}
          subcategorySettings={subcategorySettings}
        />
      </Suspense>
      {!isEmpty(ceoSettings?.body) && (
        <div className="descriptionBlock">
          <div className="flex justify-center mb-10">
            <div className="pb-10 p-4 max-w-screen-xl w-full backdrop-blur-md bg-white/50 rounded border-solid border border-black ">
              <h3>{ceoSettings.title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: ceoSettings.body ?? "",
                }}
              />
            </div>
          </div>
        </div>
      )}
      <NonWorkingHoursMessage />
      <NonOperationalMessage />
      <ModalMessage />
    </div>
  );
}
