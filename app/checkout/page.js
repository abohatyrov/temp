import { cookies } from "next/headers";
import ModalMessage from "../../pages-sections/modalMessage/modalMessage";
import NonOperationalMessage from "../../pages-sections/nonOperationalMessage/NonOperationalMessage";
import NonWorkingHoursMessage from "../../pages-sections/nonworkingHoursMessage/NonWorkingHoursMessage";
import CheckoutPageContent from "./checkoutPageContent";
import isEmpty from "helpers/strhelper";

const pageSettings = {
  title: "SYODŌ - Оформленя Замовлення",
  description:
    "SYODŌ - майстерність поєднувати. Послуги доставки їжі. Ода•до•якості. Чисті і збалансовані смаки. Роли без рису і лактози. Трускавецька 2а - Телефонуйте ☎ +38 (067) 722 93 45. Малоголосківська 28 - Телефонуйте ☎ +38 (063) 139 85 12",
  image: "https://media.syodo.com.ua/img/IMG_1773.jpg",
  imageAlt: "SYODŌ - Доставка суші Львів - Замовити Суші Додому",
  url: "https://syodo.com.ua/checkout",
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

export default async function CheckoutPage() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const token = cookieStore.get("token");
  let bonuses = 0;
  if (!isEmpty(user?.value) && !isEmpty(token?.value)) {
    const response = await fetch(
      "https://joinposter.com/api/clients.getClients?token=914860:81284453cccbdf74abc88b3d92be49f5&phone=" +
        user.value,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "x-api-key": appConfig.API_KEY,
        },
      }
    );

    const profiles = await response.json();
    const profileDetails =
      profiles.response && profiles.response.length > 0
        ? profiles.response[0]
        : {};
    bonuses = profileDetails.bonus;
  }
  return (
    <div>
      <CheckoutPageContent availableBonuses={bonuses} />
      <NonWorkingHoursMessage />
      <NonOperationalMessage />
      <ModalMessage />
    </div>
  );
}
