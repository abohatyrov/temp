"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import BoxContainer from "/components/BoxContainer/BoxContainer";
import { useRouter } from "next/navigation";
import isEmpty from "helpers/strhelper";
import { useEffect, useState } from "react";
import Image from "next/image";
import useShoppingCart from "hooks/useShoppingCart";
import ProductImage from "/components/Product/ProductImage";

export default function OrderPageContent({ orderStats = null }) {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
    if (
      orderStats?.order_status === "success" ||
      orderStats?.order_status === "success_offline"
    ) {
      clearCart();
    }
  }, []);

  const renderOrderStatus = () => {
    if (!isEmpty(orderStats?.order_status)) {
      switch (orderStats.order_status) {
        case "success_offline":
        case "success":
        case "submit":
          return (
            <BoxContainer className="p-2 grid justify-center">
              <div className="justify-center my-4">
                <Image
                  src="/assets/icons/success.png"
                  alt="Замовлення створено успішно"
                  width={50}
                  height={50}
                />
              </div>
              <Typography variant={"h5"}>
                Замовлення створено успішно!
              </Typography>
              {!orderStats.delivery_details.dontCall && (
                <Typography variant="h6" mb={3}>
                  Очікуйте дзвінка нашого оператора
                </Typography>
              )}
              {orderStats.delivery_details.type === "Доставка" && (
                <Typography variant="subtitle1">
                  {`Адреса доставки: ${orderStats.delivery_details.address} ${
                    !isEmpty(orderStats.delivery_details.apt)
                      ? `кв.${orderStats.delivery_details.apt}`
                      : ""
                  }`}
                </Typography>
              )}
              <div className="p-2 mt-3 max-w-xl space-x-2 ">
                <Typography variant="subtitle1">Ваше Замовлення</Typography>

                {(orderStats.order_details ?? []).map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div style={{ display: "flex" }}>
                      <ProductImage productId={item.id} />
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          textAlign: "left",
                          alignContent: "center",
                          paddingLeft: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignContent: "center",
                        paddingLeft: 1,
                      }}
                    >
                      x{item.qty}
                    </Typography>
                  </div>
                ))}
                <Divider />
                <div className="text-right">
                  {orderStats.payment_details?.paymentMethod === "Готівкою" && (
                    <Typography variant="h5">{`До сплати: ${(
                      parseFloat(orderStats.calculated_price.grand_total) / 100
                    ).toFixed(2)} грн`}</Typography>
                  )}

                  {orderStats.payment_details?.paymentMethod === "Онлайн" &&
                    orderStats.order_status === "success" && (
                      <Typography variant="subtitle1">{`Оплачено: ${(
                        parseFloat(orderStats.calculated_price.grand_total) /
                        100
                      ).toFixed(2)} грн`}</Typography>
                    )}

                  {orderStats.payment_details?.paymentMethod === "Онлайн" &&
                    orderStats.order_status === "submit" && (
                      <Typography variant="subtitle1">{`Очікує оплати (LiqPay): ${(
                        parseFloat(orderStats.calculated_price.grand_total) /
                        100
                      ).toFixed(2)} грн`}</Typography>
                    )}
                  {orderStats.calculated_price.discount > 0 && (
                    <Typography variant="subtitle1">{`Знижка: -${(
                      parseFloat(orderStats.calculated_price.discount) / 100
                    ).toFixed(2)} грн`}</Typography>
                  )}
                  {(orderStats.payment_details.bonusesToUse ?? 0) > 0 && (
                    <Typography variant="subtitle1">{`Бонусів використано: ${(
                      parseFloat(orderStats.payment_details.bonusesToUse) / 100
                    ).toFixed(2)}`}</Typography>
                  )}
                  <Typography variant="subtitle1">{`Нараховано Бонусів: ${(
                    parseFloat(orderStats.calculated_price.grand_total * 0.05) /
                    100
                  ).toFixed(2)}`}</Typography>
                </div>
              </div>
            </BoxContainer>
          );
        case "failure":
          return (
            <Typography variant="h2" className="my-6">
              Нажаль, не вдалося оплатити замовленя.
            </Typography>
          );
        default:
          return null;
      }
    } else {
      return (
        <Typography variant="h2" className="my-6">
          Замовлення не знайдено.
        </Typography>
      );
    }
  };

  return (
    <Container disableGutters={isMobileView} className="p-6 text-center">
      {renderOrderStatus()}
      <Button
        color="primary"
        variant="contained"
        className="my-4"
        onClick={() => router.push("/")}
      >
        Повернутись на головну сторінку
      </Button>
    </Container>
  );
}
