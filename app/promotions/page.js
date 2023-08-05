
import PromotionsPageContent from "./promotionsPageContent";

const pageSettings = {
  siteName: "SYODŌ - Доставка Cуші Львів. Замовити Суші Додому.",
  title: "SYODŌ - Cуші Львів. Акції",
  description:
    "SYODŌ - майстерність поєднувати. Послуги доставки їжі. Ода•до•якості. Чисті і збалансовані смаки. Роли без рису і лактози. Трускавецька 2а - Телефонуйте ☎ +38 (067) 722 93 45. Малоголосківська 28 - Телефонуйте ☎ +38 (063) 139 85 12",
  image: "https://d2bj1fdxpytfk0.cloudfront.net/img/IMG_0589.jpg",
  imageAlt: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому - Львів",
  url: "https://syodo.com.ua/promotions",
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
  return (<PromotionsPageContent />);
}
