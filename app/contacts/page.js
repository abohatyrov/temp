import ContactsPageContent from "./contactsPageContent";



const pageSettings = {
  title: "SYODŌ - Контакти",
  description:
    "SYODŌ - майстерність поєднувати. Послуги доставки їжі. Ода•до•якості. Чисті і збалансовані смаки. Роли без рису і лактози. Трускавецька 2а - Телефонуйте ☎ +38 (067) 722 93 45. Малоголосківська 28 - Телефонуйте ☎ +38 (063) 139 85 12",
  image: "https://d2bj1fdxpytfk0.cloudfront.net/logo/SYODOlogo_black.png",
  imageAlt: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому",
  url: "https://syodo.com.ua/contacts"
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

export default function ContactsPage() {
  return (<ContactsPageContent />);
}
