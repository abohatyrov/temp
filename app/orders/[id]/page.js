
import OrderPageContent from "./orderPageContent";
import PaymentService from "api/PaymentService";

const pageSettings = {
  title: "SYODŌ - Cуші Львів. Статус замовлення.",
  description:
    "SYODŌ – доставка японської кухні, що поважає деталі! Наші суші не існують окремо від свіжих продуктів, професійний сервіс супроводжує ввічливість, а традиційні рецепти стають основою сучасних смакових інтерпретацій. Секрет у тому, що команда SYODŌ осягнула мистецтво поєднувати.",
  image: "https://d2bj1fdxpytfk0.cloudfront.net/logo/SYODOlogo_black.png",
  imageAlt: "SYODŌ - Доставка Cуші Львів - Замовити Суші Додому - Львів",
  url: "https://syodo.com.ua/success/",
};

export const metadata = {
  title: pageSettings.title,
  description: pageSettings.description,
  themeColor: "black",
  robots: "noindex",

  alternates: {
    canonical: pageSettings.url,
  },
};

export default async function OrdersPage({ params }) {
 
  const orderid = params.id;

  let order = null;
  if (orderid) {
    const response = await PaymentService.getOrderStatus(orderid);
    order = (response ?? []).length > 0 ? response[0] : null;
  }
  console.log('order', order)
  return <OrderPageContent orderStats={order} />;
}
