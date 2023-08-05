import LoginPageContent from "./loginPageContent";

const pageSettings = {
  title: "SYODŌ - Вхід в Кабінет",
  description:
    "Доставка суші Львів. Ода•до•якості. Чисті і збалансовані смаки. Роли без рису і лактози.",
  image: "https://d2bj1fdxpytfk0.cloudfront.net/logo/SYODOlogo_black.png",
  imageAlt: "SYODŌ - Доставка суші Львів",
  url: "https://syodo.com.ua/cabinet",
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
    siteName: "SYODŌ - Доставка Cуші Львів. Замовити Суші Додому.",
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

export default async function LoginPage() {
  return <LoginPageContent />;
}
