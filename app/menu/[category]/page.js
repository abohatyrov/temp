import ModalMessage from "../../../pages-sections/modalMessage/modalMessage";
import NonOperationalMessage from "../../../pages-sections/nonOperationalMessage/NonOperationalMessage";
import NonWorkingHoursMessage from "../../../pages-sections/nonworkingHoursMessage/NonWorkingHoursMessage";
import CategoryPageContent from "./categoryPageContent";
import ConfigurationService from "/api/ConfigurationService";
import ProductsService from "/api/ProductsService";
import PromotionSection from "/components/PromotionSection/PromotionSection";
import isEmpty from "/helpers/strhelper";
import { getCategoryName } from "helpers/strhelper";

const getCatCode = (c) => {
  switch (c) {
    case "sushi":
      return "13";
    case "rols":
      return "7";
    case "sets":
      return "8";
    case "drinks":
      return "9";
    case "sauces":
      return "10";
    case "desserts":
      return "11";

    default:
      return "";
  }
};

const fetchData = async (category) => {
  try {
    const productsResponse = await ProductsService.getProducts(
      getCatCode(category)
    );

    // group by category
    const grouped = productsResponse.reduce((obj, item) => {
      const key = isEmpty(item.subcategory) ? "Інше" : item.subcategory;
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push(item);
      return obj;
    }, {});

    // console.log('grouped', grouped);
    if (Object.keys(grouped).length > 1) {
      let settingsResponse = await ConfigurationService.getGeneralSettings(
        "subcategories"
      );

      settingsResponse = settingsResponse.sort((a, b) =>
        a.sortorder > b.sortorder ? 1 : -1
      );

      let sortedBySubCategory = [];
      for (let index = 0; index < settingsResponse.length; index++) {
        const elementKey = settingsResponse[index];
        if (grouped[elementKey.title]) {
          sortedBySubCategory.push({
            key: elementKey.title,
            products: grouped[elementKey.title],
          });
        }
      }
      return sortedBySubCategory;
    } else {
      return [
        {
          key: "Інше",
          products: grouped["Інше"],
        },
      ];
    }
  } catch (error) {
    console.error("Unable fetch page data", error);
  }
};

export async function generateMetadata({ params }) {
  const productsToShow = await ProductsService.getProducts(
    getCatCode(params.category)
  );

  const pageSettings = {
    siteName: "SYODŌ - Доставка Cуші Львів. Замовити Суші Додому.",
    title: `SYODŌ - Cуші Львів. ${getCategoryName(params.category)}`,
    description:
      " SYODŌ – доставка японської кухні, що поважає деталі! Наші суші не існують окремо від свіжих продуктів, професійний сервіс супроводжує ввічливість, а традиційні рецепти стають основою сучасних смакових інтерпретацій. Секрет у тому, що команда SYODŌ осягнула мистецтво поєднувати.",
    image: "https://d2bj1fdxpytfk0.cloudfront.net/img/IMG_0589.jpg",
    imageAlt: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому - Львів",
    url: `https://syodo.com.ua/menu/${params.category}`,
  };

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

export default async function MenuPage({ params }) {
  const productsToShow = await fetchData(params.category);
  return (
    <div>
      <script
        type="application/ld+json"
        id="ld-json-carousel"
        dangerouslySetInnerHTML={{
          __html: `
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "${`SYODŌ - Cуші Львів. ${getCategoryName(
                  params.category
                )}`}",
                "itemListElement": [
                  ${(productsToShow[0]?.products ?? []).map(
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
      <CategoryPageContent
        category={params.category}
        catalogue={productsToShow}
      />
       <NonWorkingHoursMessage />
       <NonOperationalMessage />
       <ModalMessage />
    </div>
  );
}
