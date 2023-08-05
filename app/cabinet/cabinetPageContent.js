"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoxContainer from "/components/BoxContainer/BoxContainer";

import ProductsService from "api/ProductsService";
import UsersService from "api/UsersService";

import useShoppingCart from "hooks/useShoppingCart";

import OrderCard from "/pages-sections/cabinet/OrderCard";
import CabinetLoader from "/pages-sections/cabinet/CabinetLoader";
import "react-phone-input-2/lib/material.css";
import { useRouter } from "next/navigation";

export default function CabinetPageContent({ user, token, bonus, userName }) {
  const router = useRouter();
  const { clearCart, fillCart } = useShoppingCart();

  const [isMobile, setIsMobile] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [expandedSection, setExpandedSection] = useState("history");
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? panel : false);
  };

  const getImageUrl = (id) => {
    return productsList.find((x) => x.id === id)?.image ?? "";
  };

  const cleanupToken = () => {
    document.cookie = `token=; Secure`;
    document.cookie = `user=; Secure`;
    router.push('/');
  };

  const fetchOrdersHistory = async (phone, securityToken) => {
    try {
      const productsResponse = await ProductsService.getProducts();
      setProductsList(productsResponse);

      const response = await UsersService.getOrdersHistory(
        phone,
        securityToken
      );
      const sortedHistory = response.sort((a, b) =>
        a.submit_date > b.submit_date ? -1 : 1
      );

      setOrdersHistory(sortedHistory);
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) {
        // cleanupToken();
      }
    }
  };

  const handleReOrder = (prevOrder) => {
    //check for availability
    clearCart();

    // filter according to availability
    const itemsInOrder = prevOrder.order_details.reduce((acc, element) => {
      if (productsList.some((x) => x.id === element.id)) {
        const item = productsList.find((x) => x.id === element.id);
        const itemId = item.milkOff ? `${item.id}-nomilk` : item.id;
        acc.push({ ...item, itemId, qty: element.qty });
      }
      return acc;
    }, []);

    fillCart(itemsInOrder);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    setIsMobile(window.innerWidth < 750);

    try {
      fetchOrdersHistory(user, token);
    } catch {
    } finally {
      setPageIsLoading(false);
    }
  }, []);

  return (
    <Container sx={{ pt: 6, pb: 10 }} disableGutters={isMobile}>
      <BoxContainer p={isMobile ? 1 : 3}>
        <Typography
          variant="h5"
          textTransform="uppercase"
          sx={{ textAlign: "center", color: "primary", pb: 2 }}
        >
          {`Привіт, ${userName}`}
        </Typography>
        <div className="p-2">
          <Typography>{`Бали отримані за покупки: ${(bonus / 100).toFixed(
            2
          )} балів`}</Typography>
        </div>

        <Accordion
          expanded={expandedSection === "history"}
          onChange={handleChange("history")}
          variant="outlined"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Твоя Історія Замовлень</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CabinetLoader isLoading={pageIsLoading} />
            {!pageIsLoading && (
              <div className="space-y-2">
                {ordersHistory.map((item) => (
                  <Accordion key={item.id} variant="outlined">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {isMobile ? (
                        <Typography variant="button" sx={{ color: "#aaaaaa" }}>
                          {item.id_label}
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#aaaaaa" }}
                          >
                            {item.id_label}
                          </Typography>
                          <Box display="flex" sx={{ alignContent: "center" }}>
                            <Typography variant="h6" mx={2}>
                              {(
                                item.calculated_price.grand_total / 100
                              ).toFixed(2)}{" "}
                              грн
                            </Typography>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                handleReOrder(item);
                              }}
                            >
                              ПОВТОРИТИ
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.order_details.map((orderItem) => (
                        <OrderCard
                          item={{
                            ...orderItem,
                            image: getImageUrl(orderItem.id),
                          }}
                          key={item.id + orderItem.id}
                        />
                      ))}
                      {isMobile && (
                        <Box sx={{ textAlign: "center" }}>
                          <Divider style={{ marginBottom: 10 }} />
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              handleReOrder(item);
                            }}
                          >
                            ПОВТОРИТИ
                          </Button>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        <Box textAlign="center">
          <Button
            color="primary"
            sx={{
              ml: isMobile ? 0 : 2,
              mt: isMobile ? 1 : 0,
              width: isMobile ? "100%" : 250,
            }}
            onClick={cleanupToken}
          >
            Вийти з кабінету
          </Button>
        </Box>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center", mt: 2 }}
        >
          <img
            src="/assets/images/oda_1.png"
            alt="Ода - до - деталей"
            style={{ width: "75%" }}
          />
        </Grid>
      </BoxContainer>
    </Container>
  );
}
