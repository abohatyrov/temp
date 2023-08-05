import { redirect } from "next/navigation";
import CabinetPageContent from "./cabinetPageContent";
import { cookies } from "next/headers";
import isEmpty from "helpers/strhelper";

const pageSettings = {
  title: "SYODŌ - Особистий Кабінет",
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

export default async function CabinetPage() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const token = cookieStore.get("token");

  if (isEmpty(user?.value) || isEmpty(token?.value)) {
    redirect("/login");
  } else {
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

    // console.log("profileDetails", profileDetails);
    return (
      <div>
        <CabinetPageContent
          user={user.value}
          token={token.value}
          userName={`${profileDetails?.lastname} ${profileDetails?.firstname}`}
          bonus={profileDetails?.bonus}
        />
      </div>
    );
  }
}
