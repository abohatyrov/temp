"use client";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import BoxContainer from "/components/BoxContainer/BoxContainer";
import GoogleMapWithZones from "/components/GoogleMapWithZones/GoogleMapWithZones";
import {
  GreenAreaDeliveryCost,
  GreenAreaMinDeliveryOrder,
  YellowAreaMinDeliveryOrder,
  YellowAreaDeliveryCost,
  RedAreaMinDeliveryOrder,
  RedAreaDeliveryCost,
  RedAreaDeliveryTime,
  YellowAreaDeliveryTime,
  GreenAreaDeliveryTime,
} from "helpers/priceCalc";

export default function DeliveryPageContent() {
  return (
    <Container sx={{ pt: 6, pb: 10 }}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} xl={6}>
          <BoxContainer p={3}>
            <Typography variant="h4" textTransform="uppercase">
              Доставка
            </Typography>
            <Divider />
            <Typography
              variant="h6"
              textTransform="uppercase"
              mt={2}
              color="success"
            >
              ЗЕЛЕНА ЗОНА
            </Typography>
            <Typography variant="body2">
              Орієнтовний час доставки {GreenAreaDeliveryTime} хвилин
            </Typography>
            <Typography variant="body2">
              При замовленні від {GreenAreaMinDeliveryOrder / 100} грн привеземо
              БЕЗКОШТОВНО
            </Typography>
            <Typography variant="body2">
              При замовленні до {GreenAreaMinDeliveryOrder / 100} грн вартість
              доставки {GreenAreaDeliveryCost / 100} грн
            </Typography>

            <Typography
              variant="h6"
              textTransform="uppercase"
              mt={3}
              color="warning"
            >
              ЖОВТА ЗОНА
            </Typography>
            <Typography variant="body2">
              Орієнтовний час доставки {YellowAreaDeliveryTime} хвилин
            </Typography>
            <Typography variant="body2">
              При замовленні від {YellowAreaMinDeliveryOrder / 100} грн
              привеземо БЕЗКОШТОВНО
            </Typography>
            <Typography variant="body2">
              При замовленні до {YellowAreaMinDeliveryOrder / 100} грн вартість
              доставки {YellowAreaDeliveryCost / 100} грн
            </Typography>

            <Typography
              variant="h6"
              textTransform="uppercase"
              mt={3}
              color="error"
            >
              ЧЕРВОНА ЗОНА
            </Typography>
            <Typography variant="body2">
              Орієнтовний час доставки {RedAreaDeliveryTime} хвилин
            </Typography>
            <Typography variant="body2">
              Мінімальна сума замовлення {RedAreaMinDeliveryOrder / 100} грн
            </Typography>
            <Typography variant="body2">
              Вартість доставки {RedAreaDeliveryCost / 100} грн
            </Typography>

            <Typography variant="body2" mt={3} color="error">
              * Через погодні умови та затори в місті час доставки може бути
              збільшений
            </Typography>
          </BoxContainer>
        </Grid>
        <Grid item xs={12} xl={6}  >
          <BoxContainer>
            <div style={{minHeight: 500}}>
            <GoogleMapWithZones />
            </div>
          </BoxContainer>
        </Grid>
        <Grid item xs={12}>
          <BoxContainer p={3}>
            <Typography variant="h4" textTransform="uppercase" px={2} mb={3}>
              Оплата
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} md={4} px={2}>
                <Box px={2}>
                  <img
                    src="/assets/icons/creditcard.png"
                    alt="Оплата через LiqPay"
                    style={{ height: 55, opacity: 1.0 }}
                  />

                  <Typography variant="h6" textTransform="uppercase">
                    оплата LiqPay
                  </Typography>
                  <Typography variant="body2">
                    розраховуйся онлайн за своє замовлення через сервіс liqpay
                    на сайті
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box px={2}>
                  <img
                    src="/assets/icons/payment.png"
                    alt="Оплата через термінал"
                    style={{ height: 55, opacity: 1.0 }}
                  />
                  <Typography variant="h6" textTransform="uppercase">
                    оплата через термінал
                  </Typography>
                  <Typography variant="body2">
                    наш кур’єр має з собою термінал та приймає карту для оплати
                  </Typography>
                  <Typography variant="body2">
                    (тимчасово доступно тільки при розрахунку в закладі)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box px={2}>
                  <img
                    src="/assets/icons/money.png"
                    alt="Оплата готівкою"
                    style={{ height: 55, opacity: 1.0 }}
                  />
                  <Typography variant="h6" textTransform="uppercase">
                    оплата готівкою
                  </Typography>
                  <Typography variant="body2">
                    сплачуй готівкою при отриманні замовлення, попередь якщо
                    потрібна решта
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </BoxContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
