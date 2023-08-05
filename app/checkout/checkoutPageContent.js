"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import uaLocale from "date-fns/locale/uk";
import PhoneInput from "react-phone-input-2";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { ShowAlert, AlertTypes } from "/components/Alerts";
import BoxContainer from "/components/BoxContainer/BoxContainer";
import IncrementButtons from "/components/IncrementButtons/IncrementButtons";
import ShoppingCartList from "/components/ShoppingCartList/ShoppingCartList";

import DeliverySelfService from "/pages-sections/checkout/DeliverySelfService";
import DeliveryOnTime from "/pages-sections/checkout/DeliveryOnTime";
import DeliveryByAddress from "/pages-sections/checkout/DeliveryByAddress";

import useShoppingCart from "/hooks/useShoppingCart";
import useCheckoutAddress from "/hooks/useCheckoutAddress";

import SettingsService from "/api/SettingsService";
import PaymentService from "/api/PaymentService";

import { RedAreaMinDeliveryOrder } from "/helpers/priceCalc";
import isEmpty from "/helpers/strhelper";
import Analytics from "/helpers/Analytics";

import { appConfig } from "configs/config";
import PaymentMethods from "/consts/PaymentMethods";

import styles from "/styles/jss/nextjs-material-kit-pro/pages/checkoutStyle.js";
import "react-phone-input-2/lib/material.css";
import { LoadingButton } from "@mui/lab";
import { ShoppingCartCheckout } from "@mui/icons-material";

const useStyles = makeStyles(styles);
const currentTime = `${`0${new Date().getHours()}`.slice(
  -2
)}:${`0${new Date().getMinutes()}`.slice(-2)}`;

export default function CheckoutPageContent({ availableBonuses = 0 }) {
  const formRef = useRef();
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const submitForm = () => {};
  const router = useRouter();
  const { checkoutAddress, updateCheckoutAddress } = useCheckoutAddress();

  const [checkoutData, setCheckoutData] = useState("");
  const [checkoutSignature, setCheckoutSignature] = useState("");

  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);

  const {
    cart,
    removeItemFromCart,
    updateItemQty,
    totalPrice,
    paymentMethod,
    setPaymentMethod,
    deliveryOption,
    changeDeliveryOption,
    serviceArea,
    selectedPromotion,
    changeSelectedPromotion,
  } = useShoppingCart();

  const [userName, setUserName] = useState("");
  const [userNameValid, setUserNameValid] = useState(true);

  const [userPhone, setUserPhone] = useState("");
  const [userPhoneValid, setUserPhoneValid] = useState(true);

  const [completeDeliveryAddress, setCompleteDeliveryAddress] = useState(null);

  const [streetValid, setStreetValid] = useState(true);
  const [buildingValid, setBuildingValid] = useState(true);

  const [comments, setComments] = useState("");
  const [dontCallChecked, setDontCallChecked] = useState(false);
  const [addCommentChecked, setAddCommentChecked] = useState(false);
  const [noNapkinsChecked, setNoNapkinsChecked] = useState(false);

  const [restFrom, setRestFrom] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState("");

  const [persons, setPersons] = useState(1);
  const [trainingPersons, setTrainingPersons] = useState(0);
  const [allowShopping, setAllowShopping] = useState(true);

  const [pickupLocation, setPickUpLocation] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [includeBonuses, setIncludeBonuses] = useState(true);

  const submitOrder = async () => {
    try {
      setRequestLoading(true);

      const valObj = {};

      valObj.userName = !isEmpty(userName);
      valObj.userPhone = (userPhone ?? "").length === 12;
      valObj.street = !isEmpty(completeDeliveryAddress?.street);
      valObj.building = !isEmpty(completeDeliveryAddress?.building);

      setUserNameValid(valObj.userName);
      setUserPhoneValid(valObj.userPhone);
      setStreetValid(valObj.street);
      setBuildingValid(valObj.building);

      if (
        valObj.userName &&
        valObj.userPhone &&
        (deliveryOption === "Самовивіз" || (valObj.street && valObj.building))
      ) {
        if (deliveryOption === "Заздалегідь" && isEmpty(deliveryTime)) {
          ShowAlert("Обов'язкові поля не заповнені", AlertTypes.Error);
          return;
        }
        const checkoutRequest = {
          description: `Замовлення: ${format(new Date(), "yyyy-MM-dd HH:mm")}`,
          currency: "UAH",
          language: "ua",
          contactDetails: {
            name: userName,
            phone: userPhone,
          },
          deliveryDetails: {
            type: deliveryOption,
            pickupLocation:
              deliveryOption === "Самовивіз" ? pickupLocation : null,
            date: format(deliveryDate, "yyyy-MM-dd", { locale: uaLocale }),
            time: deliveryTime,
            dontCall: dontCallChecked,
            comments,
            address:
              deliveryOption !== "Самовивіз"
                ? `${completeDeliveryAddress.street}, ${completeDeliveryAddress.building}`
                : "",
            entrance: completeDeliveryAddress.entrance,
            floor: completeDeliveryAddress.floor,
            apt: completeDeliveryAddress.apartment,
            eCode: completeDeliveryAddress.eCode,
            point:
              deliveryOption !== "Самовивіз"
                ? completeDeliveryAddress.deliveryPoint
                : null,
          },
          orderDetails: cart.map((x) => ({
            id: x.milkOff === true ? x.linkedPosition : x.id,
            category_id: x.category_id,
            title: x.title + (x.milkOff === true ? "(Без Лактози)" : ""),
            qty: x.qty,
          })),
          paymentDetails: {
            paymentMethod,
            restFrom,
            bonusesToUse: includeBonuses
              ? Math.min(totalPrice.grand_total, availableBonuses)
              : 0,
          },
          info: {
            noNapkins: noNapkinsChecked,
            persons,
            trainingPersons,
          },
          selectedPromotion: selectedPromotion,
        };

        // save address localy for next time reuse
        if (deliveryOption !== "Самовивіз") {
          updateCheckoutAddress({
            name: userName,
            phone: userPhone,
            city: "Львів",
            street: completeDeliveryAddress.street,
            building: completeDeliveryAddress.building,
            entrance: completeDeliveryAddress.entrance,
            floor: completeDeliveryAddress.floor,
            apt: completeDeliveryAddress.apartment,
            eCode: completeDeliveryAddress.eCode,
          });
        }

        try {
          Analytics.purchase(cart);
          // console.log("response", checkoutRequest);
          const response = await PaymentService.submitCheckout(checkoutRequest);
          // console.log("response", response);
          if (paymentMethod === "Онлайн") {
            setCheckoutData(response.data);
            setCheckoutSignature(response.signature);
          } else {
            router.push("/orders/" + (response ?? ""));
          }
        } catch (error) {
          console.error(error);
          ShowAlert(
            "Сталась помилка при опрацюванні замовлення. Перевірте правильність введених даних",
            AlertTypes.Error
          );
        }
      } else {
        ShowAlert("Обов'язкові поля не заповнені", AlertTypes.Error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRequestLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const settingsResponse = await SettingsService.getGeneralSettings(
        "shopsettings"
      );
      setAllowShopping(settingsResponse?.values?.allowShopping ?? true);
    } catch (error) {
      console.error("Unable fetch page data", error);
    } finally {
      setPageIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
    fetchSettings();
  }, []);

  useEffect(() => {
    if (checkoutAddress) {
      setUserName(checkoutAddress.name);
      setUserPhone(checkoutAddress.phone);
    }
  }, [checkoutAddress]);

  useEffect(() => {
    if (!isEmpty(checkoutData) && !isEmpty(checkoutSignature)) {
      //  console.log('response.data', response.data)
      formRef.current.submit();
    }
  }, [checkoutData, checkoutSignature]);

  return (
    <div>
      <div hidden>
        <form
          ref={formRef}
          onSubmit={handleSubmit(submitForm)}
          method="POST"
          //  target="_blank"
          action="https://www.liqpay.ua/api/3/checkout"
          acceptCharset="utf-8"
        >
          <input type="hidden" name="data" value={checkoutData} />
          <input type="hidden" name="signature" value={checkoutSignature} />
        </form>
      </div>
      <Box pb={6} px={{ xs: 0, md: 3 }}>
        <Grid container spacing={1} mb={10}>
          <Grid item xs={12} lg={6}>
            <BoxContainer p={2}>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Typography>Спосіб доставки</Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <FormControl>
                    <RadioGroup
                      row
                      name="deliveryOptionGroup"
                      value={deliveryOption}
                      onChange={(e) => {
                        changeDeliveryOption(e.target.value);
                        if (
                          e.target.value !== "Самовивіз" &&
                          selectedPromotion === "Самовивіз"
                        ) {
                          changeSelectedPromotion("");
                        } else if (
                          e.target.value === "Самовивіз" &&
                          selectedPromotion === ""
                        ) {
                          setPickUpLocation("");
                          // changeSelectedPromotion("Самовивіз");
                        }
                        // handleServiceAreaChange("");
                        if (paymentMethod === PaymentMethods.Terminal) {
                          setPaymentMethod(PaymentMethods.Offline);
                        }
                      }}
                    >
                      <FormControlLabel
                        value="Доставка"
                        control={<Radio />}
                        label={
                          <div>
                            <img
                              src="/assets/icons/deliveryorder.png"
                              style={{ width: "35px", height: "35px" }}
                              alt="Доставка"
                            />
                            <Typography
                              variant="button"
                              ml={1}
                              className="text-black text-left"
                            >
                              Доставка
                            </Typography>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="Самовивіз"
                        control={<Radio />}
                        label={
                          <div>
                            <img
                              src="/assets/icons/selforder.png"
                              style={{ width: "35px", height: "35px" }}
                              alt="Самовивіз"
                            />
                            <Typography
                              variant="button"
                              ml={1}
                              className="text-black text-left"
                            >
                              Самовивіз
                            </Typography>
                          </div>
                        }
                      />

                      <FormControlLabel
                        // disabled
                        value="Заздалегідь"
                        control={<Radio />}
                        label={
                          <div>
                            <img
                              src="/assets/icons/deliveryorder.png"
                              style={{ width: "35px", height: "35px" }}
                              alt="Заздалегідь"
                            />
                            <Typography
                              variant="button"
                              ml={1}
                              className="text-black text-left"
                            >
                              Заздалегідь
                            </Typography>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ваше Ім'я*"
                    inputProps={{
                      autoComplete: "name",
                    }}
                    error={!userNameValid}
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setUserNameValid(true);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    inputStyle={{
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      width: "100%",
                    }}
                    inputProps={{
                      autoComplete: "tel",
                    }}
                    specialLabel=""
                    placeholder=""
                    errorMessage="Невірний телефон"
                    country="ua"
                    label=""
                    value={userPhone}
                    onChange={(phone) => {
                      setUserPhone(phone);
                      setUserPhoneValid(true);
                    }}
                    isValid={userPhoneValid}
                  />
                </Grid>

                {deliveryOption === "Самовивіз" && (
                  <Grid item xs={12}>
                    <DeliverySelfService
                      value={pickupLocation}
                      onSelect={(e) => {
                        setPickUpLocation(e);
                      }}
                    />
                  </Grid>
                )}

                {deliveryOption === "Заздалегідь" && (
                  <Grid item xs={12}>
                    <DeliveryOnTime
                      deliveryDate={deliveryDate}
                      onDeliveryDateChange={(e) => setDeliveryDate(e)}
                      deliveryTime={deliveryTime}
                      onDeliveryTimeChange={(e) => setDeliveryTime(e)}
                    />
                  </Grid>
                )}

                {(deliveryOption === "Доставка" ||
                  deliveryOption === "Заздалегідь") && (
                  <Grid item xs={12}>
                    <DeliveryByAddress
                      streetIsValid={streetValid}
                      buildingIsValid={buildingValid}
                      onAddressChange={(e) => {
                        setCompleteDeliveryAddress(e);
                        if (!isEmpty(e?.street)) {
                          setStreetValid(true);
                        }
                        if (!isEmpty(e?.building)) {
                          setBuildingValid(true);
                        }
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </BoxContainer>
          </Grid>
          <Grid item xs={12} lg={6}>
            <BoxContainer p={2}>
              {cart.length > 0 ? (
                <ShoppingCartList
                  showDescriptions
                  mobileView={isMobileView}
                  itemsList={cart}
                  onQtyChange={(id, qty) => {
                    updateItemQty(id, qty);

                    const positionsForPromotion = cart.filter(
                      (x) => x.category_name === "Роли"
                    );
                    const applicable41 =
                      positionsForPromotion.reduce(
                        (value, obj) => value + obj.qty,
                        0
                      ) > 4;

                    if (!applicable41 && selectedPromotion === "4+1") {
                      changeSelectedPromotion("");
                    }
                  }}
                  onItemRemove={(id) => {
                    removeItemFromCart(id);

                    const positionsForPromotion = cart.filter(
                      (x) => x.category_name === "Роли"
                    );
                    const applicable41 =
                      positionsForPromotion.reduce(
                        (value, obj) => value + obj.qty,
                        0
                      ) > 4;

                    if (!applicable41 && selectedPromotion === "4+1") {
                      changeSelectedPromotion("");
                    }
                  }}
                />
              ) : (
                <Typography variant="h5" sx={{ px: 2, py: 3 }}>
                  Додайте товар в корзину
                </Typography>
              )}
            </BoxContainer>

            {/* PAYMENTS */}
            <BoxContainer p={2} mt={1}>
              <FormControl fullWidth>
                <InputLabel
                  id="promotion-label"
                  className={classes.primaryHint}
                >
                  Оберіть Акцію
                </InputLabel>
                <Select
                  labelId="promotion-label"
                  value={selectedPromotion ?? ""}
                  label="Акція"
                  onChange={(e) => {
                    try {
                      if (e.target.value === "Самовивіз") {
                        changeDeliveryOption("Самовивіз");
                      } else if (e.target.value === "4+1") {
                        const positionsForPromotion = cart.filter(
                          (x) => x.category_name === "Роли"
                        );
                        const applicable41 =
                          positionsForPromotion.reduce(
                            (value, obj) => value + obj.qty,
                            0
                          ) > 4;

                        // check cart
                        if (!applicable41) {
                          ShowAlert(
                            `Для акції "Роли 4+1" будь ласка додайте більше ролів в корзину`,
                            AlertTypes.Info
                          );
                          return;
                        }
                      }
                      changeSelectedPromotion(e.target.value);
                    } catch (error) {
                      console.error("error", error);
                    }
                  }}
                >
                  <MenuItem value="">Відсутня</MenuItem>
                  <MenuItem value="4+1">Роли 4+1</MenuItem>
                  {/* <MenuItem value="Самовивіз">Самовивіз -10%</MenuItem> */}
                </Select>
              </FormControl>
              <div className="flex  justify-between items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeBonuses}
                      onChange={(e) => {
                        setIncludeBonuses(e.target.checked);
                      }}
                    />
                  }
                  label={
                    <div className="grid">
                    <Typography variant="button">
                      {`Використати бонуси`}
                    </Typography>
                    {isMobileView && (
                  <Typography variant="caption">{`(Доступно ${(
                    availableBonuses / 100
                  ).toFixed(2)} бонусів)`}</Typography>
                )}
                    </div>
                  }
                />
                {!isMobileView && (
                  <Typography variant="button">{`Доступно ${(
                    availableBonuses / 100
                  ).toFixed(2)} бонусів`}</Typography>
                )}
              </div>
              <Typography sx={{ mt: 3 }}>Спосіб Оплати</Typography>
              <div>
                <FormControl>
                  <RadioGroup
                    row
                    name="paymentsOptionGroup"
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={PaymentMethods.Offline}
                      control={<Radio />}
                      label={
                        <Typography
                          variant="button"
                          className="text-black text-left"
                        >
                          {PaymentMethods.Offline}
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value={PaymentMethods.Online}
                      control={<Radio />}
                      label={
                        <Typography
                          variant="button"
                          className="text-black text-left"
                        >
                          {PaymentMethods.Online}
                        </Typography>
                      }
                    />
                    {deliveryOption === "Самовивіз" && (
                      <FormControlLabel
                        value={PaymentMethods.Terminal}
                        disabled={deliveryOption !== "Самовивіз"}
                        control={<Radio />}
                        label={
                          <Typography variant="button">
                            {`${PaymentMethods.Terminal}`}
                          </Typography>
                        }
                      />
                    )}
                  </RadioGroup>
                </FormControl>
              </div>
              {paymentMethod === "Готівкою" && (
                <TextField
                  label="Підготувати решту з"
                  fullWidth
                  sx={{ my: 1 }}
                  value={restFrom}
                  onChange={(e) => setRestFrom(e.target.value)}
                />
              )}

              {/* ADDITIONAL INFO */}
              <Typography mt={3}>Додаткова інформація</Typography>

              <Box display={{ xs: "grid" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={noNapkinsChecked}
                        onChange={(e) => setNoNapkinsChecked(e.target.checked)}
                      />
                    }
                    label={
                      <Typography
                        variant="button"
                        className="text-black text-left"
                      >
                        Без серветок
                      </Typography>
                    }
                  />
                </FormGroup>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  mb={1}
                >
                  <IncrementButtons
                    initValue={persons}
                    onChange={(prop) => setPersons(prop)}
                    allowZero
                    size="medium"
                  />
                  <Typography
                    variant="button"
                    mx={2}
                    className="text-black text-left"
                  >
                    Кількість приборів
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  mb={1}
                >
                  <IncrementButtons
                    initValue={trainingPersons}
                    onChange={(prop) => setTrainingPersons(prop)}
                    allowZero
                    size="medium"
                  />
                  <Typography
                    variant="button"
                    mx={2}
                    className="text-black text-left"
                  >
                    Кількість навчальних приборів
                  </Typography>
                </Box>
              </Box>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dontCallChecked}
                        onChange={(e) => setDontCallChecked(e.target.checked)}
                      />
                    }
                    label={
                      <Typography
                        variant="button"
                        className="text-black text-left"
                      >
                        Не телефонуйте мені
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addCommentChecked}
                        onChange={(e) => setAddCommentChecked(e.target.checked)}
                      />
                    }
                    label={
                      <Typography variant="button">
                        Додати коментар до замовлення
                      </Typography>
                    }
                  />
                </FormGroup>
                {addCommentChecked && (
                  <TextField
                    label="Коментар до замовлення"
                    fullWidth
                    multiline
                    rows={5}
                    value={comments}
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
                  />
                )}
              </div>
              <Divider sx={{ backgroundColor: "#838383", my: 2 }} />

              {/* TOTAL PAYMENTS */}
              <div className="text-right pr-2">
                <Typography
                  variant="h5"
                  color="primary"
                  fontSize="1.2rem"
                >{`Загалом: ${(totalPrice.total / 100).toFixed(
                  2
                )} грн`}</Typography>

                {deliveryOption !== "Самовивіз" && (
                  <Typography variant="h5" color="primary" fontSize="1.2rem">
                    Доставка: {(totalPrice.delivery / 100).toFixed(2)}
                    {" грн"}
                  </Typography>
                )}
                {totalPrice.promotion && (
                  <Typography
                    variant="h5"
                    color="secondary"
                    fontSize="1.2rem"
                  >{`Акція ${totalPrice.promotion.name}: -${(
                    totalPrice.discount / 100
                  ).toFixed(2)} грн`}</Typography>
                )}
                {includeBonuses && (
                  <Typography
                    variant="h5"
                    color="secondary"
                    fontSize="1.2rem"
                  >{`Оплата бонусами: -${(
                    Math.min(totalPrice.grand_total, availableBonuses) / 100
                  ).toFixed(2)} грн`}</Typography>
                )}
                <Typography variant="h5" color="dark" fontSize="1.2rem">
                  {`Разом до сплати: ${Math.max(
                    (totalPrice.grand_total -
                      (includeBonuses ? availableBonuses : 0)) /
                      100,
                    0
                  ).toFixed(2)} грн`}
                </Typography>
              </div>

              <Divider sx={{ backgroundColor: "#838383", my: 2 }} />

              <Box display="flex" justifyContent="flex-end">
                <LoadingButton
                  id="order_checkout_btn"
                  loading={requestLoading}
                  variant="contained"
                  color="primary"
                  loadingPosition="start"
                  startIcon={<ShoppingCartCheckout />}
                  disabled={
                    cart.length === 0 ||
                    !allowShopping ||
                    (deliveryOption !== "Самовивіз" &&
                      serviceArea === "red" &&
                      totalPrice.total - totalPrice.discount <
                        RedAreaMinDeliveryOrder) ||
                    // (deliveryOption !== "Самовивіз" &&
                    //   serviceArea === "yellow" &&
                    //   totalPrice.total - totalPrice.discount < YellowAreaMinDeliveryOrder) ||
                    // (deliveryOption !== "Самовивіз" &&
                    //   serviceArea === "green" &&
                    //   totalPrice.total - totalPrice.discount < GreenAreaMinDeliveryOrder) ||
                    (deliveryOption !== "Самовивіз" && isEmpty(serviceArea)) ||
                    (deliveryOption === "Самовивіз" &&
                      isEmpty(pickupLocation)) ||
                    currentTime < `${appConfig.WORKING_HOURS.FROM}` ||
                    currentTime >= `${appConfig.WORKING_HOURS.TO}`
                  }
                  onClick={() => {
                    submitOrder();
                  }}
                >
                  Оформити Замовлення
                </LoadingButton>
              </Box>
            </BoxContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
