
import DeliveryPageContent from "./deliveryPageContent";

const pageSettings = {
  siteName: "SYODŌ - Доставка Cуші Львів. Замовити Суші Додому.",
  title: "SYODŌ - Cуші Львів. Оплата та Доставка",
  description:
    " SYODŌ – доставка японської кухні, що поважає деталі! Наші суші не існують окремо від свіжих продуктів, професійний сервіс супроводжує ввічливість, а традиційні рецепти стають основою сучасних смакових інтерпретацій. Секрет у тому, що команда SYODŌ осягнула мистецтво поєднувати.",
  image: "https://d2bj1fdxpytfk0.cloudfront.net/img/IMG_0589.jpg",
  imageAlt: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому - Львів",
  url: "https://syodo.com.ua/delivery",
};

export const metadata = {
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
        url: pageSettings.image,
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
    images: [pageSettings.image],
  },
};

export default function OfertaPage() {
  return (<DeliveryPageContent />);
}
