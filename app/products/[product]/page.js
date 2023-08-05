import ModalMessage from "../../../pages-sections/modalMessage/modalMessage";
import NonOperationalMessage from "../../../pages-sections/nonOperationalMessage/NonOperationalMessage";
import NonWorkingHoursMessage from "../../../pages-sections/nonworkingHoursMessage/NonWorkingHoursMessage";
import ProductPageContent from "./productPageContent";
import ProductsService from "/api/ProductsService";
import { getCategoryName } from "helpers/strhelper";
import isEmpty from "helpers/strhelper";

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

const fetchData = async (productId) => {
  try {
    const productsResponse = await ProductsService.getProducts();

    const position = productsResponse.find((x) => x.id === productId);
    let relatedProducts = [];
    if (position) {
      relatedProducts = productsResponse
        .filter(
          (x) =>
            x.category_name === position.category_name && x.id !== position.id
        )
        .slice(0, 4);
    }

    return { position: position, relatedProducts: relatedProducts };
  } catch (error) {
    console.error("Unable fetch page data", error);
  }
};

export async function generateMetadata({ params }) {
  const productsToShow = await fetchData(params.product);
  if (
    typeof productsToShow?.position !== "undefined" &&
    productsToShow?.position !== null
  ) {
    const positionTitle = isEmpty(productsToShow.position.ceoTitle)
      ? `SYODŌ - Cуші Львів. ${productsToShow.position.title}`
      : productsToShow.position.ceoTitle;
    const positionDescription = isEmpty(productsToShow.position.ceoDescription)
      ? "SYODŌ - майстерність поєднувати • " +
        productsToShow.position.description +
        " • Послуги доставки їжі • Трускавецька 2а - Телефонуйте ☎ +38 (067) 722 93 45 • Малоголосківська 28 - Телефонуйте ☎ +38 (063) 139 85 12"
      : productsToShow.position.ceoDescription;


    const pageSettings = {
      siteName: "SYODŌ - Доставка Cуші Львів. Замовити Суші Додому.",
      title: positionTitle,
      description: positionDescription,
      image: productsToShow.position.image,
      imageAlt: positionTitle,
      url: `https://syodo.com.ua/products/${productsToShow.position.id}`,
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
        description: pageSettings.description,
        images: [productsToShow[0]?.image ?? pageSettings.image],
      },
    };
  } else {
    return {};
  }
}

export default async function ProductPage({ params }) {
  const productsToShow = await fetchData(params.product);

  const positionTitle = isEmpty(productsToShow.position.ceoTitle)
      ? `SYODŌ - Cуші Львів. ${productsToShow.position.title}`
      : productsToShow.position.ceoTitle;
    const positionDescription = isEmpty(productsToShow.position.ceoDescription)
      ? "SYODŌ - майстерність поєднувати • " +
        productsToShow.position.description +
        " • Послуги доставки їжі • Трускавецька 2а - Телефонуйте ☎ +38 (067) 722 93 45 • Малоголосківська 28 - Телефонуйте ☎ +38 (063) 139 85 12"
      : productsToShow.position.ceoDescription;

  if (
    typeof productsToShow?.position !== "undefined" &&
    productsToShow?.position !== null
  ) {
    return (
      <div>
        {/* ld+json */}
        <script
          type="application/ld+json"
          id="ld-json-product"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "${positionTitle.replaceAll('"', '\\"')}",
                "description": "${positionDescription.replaceAll('"', '\\"')}",
                "image": "${productsToShow.position?.image ?? ""}",
                "brand": {
                  "@type": "Brand",
                  "name": "${productsToShow.position?.category_name ?? ""}"
                },
                "offers": {
                  "@type": "Offer",
                  "url": "${
                    "https://www.syodo.com.ua/products/" +
                    productsToShow.position?.id
                  }",
                  "priceCurrency": "UAH",
                  "price": "${(
                    parseFloat(productsToShow.position.price) / 100
                  ).toFixed(2)}"
                }
              }
              `,
          }}
        ></script>
        {/* <PromotionSection /> */}
        <ProductPageContent
          product={productsToShow.position}
          relatedProducts={productsToShow.relatedProducts}
        />

        <div className="descriptionBlock">
          <div className="flex justify-center mb-10">
            {productsToShow.position?.detailedDescription && (
              <div
                className="pb-10 p-4 max-w-7xl w-full backdrop-blur-md bg-white/50 rounded border-solid border border-black "
                dangerouslySetInnerHTML={{
                  __html: productsToShow.position?.detailedDescription,
                }}
              />
            )}
          </div>
        </div>

        <NonWorkingHoursMessage />
        <NonOperationalMessage />
        <ModalMessage />
      </div>
    );
  } else {
    return (
      <div className="place-content-center place-items-center min-h-screen">
        <h3 className="text-center text-2xl">Упс, товар не знайдено :(</h3>
      </div>
    );
  }
}
