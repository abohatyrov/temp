"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { add } from "date-fns";

import BoxContainer from "/components/BoxContainer/BoxContainer";
import { ShowAlert, AlertTypes } from "components/Alerts";

import UsersService from "api/UsersService";

import isEmpty from "helpers/strhelper";

import "react-phone-input-2/lib/material.css";
import { useRouter } from "next/navigation";
// import { cookies } from 'next/headers'

export default function LoginPageContent() {
  const router = useRouter();
  var timerCouldown = null;

  const [isMobile, setIsMobile] = useState(false);
  const [couldownValue, setCouldownValue] = useState(30);

  const [token, setToken] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [userPhoneValid, setUserPhoneValid] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const [requestInProgress, setRequestInProgress] = useState(false);
  const [showInvalidCodeMessage, setShowInvalidCodeMessage] = useState(false);

  const cleanupToken = () => {
    document.cookie = `token=; Secure`;
    document.cookie = `user=; Secure`;
    setToken("");
    setOtpValue("");
  };

  const handleOtpRequest = async () => {
    try {
      setRequestInProgress(true);
      setOtpValue("");
      setShowInvalidCodeMessage(false);
      setCouldownValue(30);

      //todo perform request
      await UsersService.GetOtp(phoneValue);
      setOtpRequested(true);
      timerCouldown = setInterval(() => {
        setCouldownValue((curent) => {
          if (curent <= 1) {
            clearInterval(timerCouldown);
          }
          return curent - 1;
        });
      }, 1000);
    } catch {
      ShowAlert("Сталась помилка при опрацюванні запиту", AlertTypes.Error);
    } finally {
      setRequestInProgress(false);
    }
  };

  const handleAuthRequest = async (phone, otp) => {
    setRequestInProgress(true);
    try {
      const authRessponse = await UsersService.Auth(phone, otp);

      if (!isEmpty(authRessponse.token)) {
        const timestamp = add(new Date(), {
          days: 60,
        }).toUTCString();
        const tokenCookie = `token=${authRessponse.token}; expires=${timestamp}; Secure`;
        const userCookie = `user=${phone}; expires=${timestamp}; Secure`;
        document.cookie = tokenCookie;
        document.cookie = userCookie;
        // cookies().set('token', authRessponse.token, { secure: true, expires: timestamp })
        // cookies().set('user', phone, { secure: true, expires: timestamp })
        router.push("/cabinet");
      }
    } catch (error) {
      console.log(error);
      cleanupToken();
      if (error.response?.status === 401) {
        setShowInvalidCodeMessage(true);
      } else {
        ShowAlert("Сталась помилка при опрацюванні запиту", AlertTypes.Error);
      }
    } finally {
      setRequestInProgress(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    setIsMobile(window.innerWidth < 750);
  }, []);

  return (
    <Container sx={{ pt: 6, pb: 10 }} disableGutters={isMobile}>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <BoxContainer className="max-w-xl"
          >
            <Typography variant="h4" pb={2} textAlign="center">
              Вхід в кабінет
            </Typography>
            <Box
              display={isMobile ? "grid" : "flex"}
              sx={{ textAlign: isMobile ? "center" : null }}
            >
              <PhoneInput
                inputStyle={{
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                inputProps={{
                  autoComplete: "tel",
                }}
                specialLabel=""
                placeholder=""
                errorMessage="Невірний телефон"
                country="ua"
                onlyCountries={["ua"]}
                label=""
                value={phoneValue}
                onChange={(phone) => {
                  setPhoneValue(phone);
                  setUserPhoneValid((phone ?? "").length === 12);
                }}
                isValid={userPhoneValid}
              />
              <Button
                color="primary"
                variant="contained"
                sx={{
                  ml: isMobile ? 0 : 2,
                  mt: isMobile ? 1 : 0,
                  width: "100%",
                }}
                disabled={!userPhoneValid || otpRequested}
                onClick={handleOtpRequest}
              >
                Вхід
              </Button>
            </Box>

            {otpRequested && (
              <Box display="grid">
                <Typography textAlign="center" variant="body2" mt={4} mb={2}>
                  {
                    "На Ваш номер надіслано СМС повідомлення з підтвердженням телефону. "
                  }
                </Typography>
                <Box textAlign="center" display="flex" justifyContent="center">
                  <TextField
                    label="Код підтвердження"
                    value={otpValue}
                    onChange={(e) => {
                      setShowInvalidCodeMessage(false);
                      setOtpValue(e.target.value);
                      if (e.target.value?.length >= 5) {
                        handleAuthRequest(phoneValue, e.target.value);
                      }
                    }}
                  />
                  {couldownValue > 0 ? (
                    <Typography
                      variant="button"
                      sx={{ color: "#aaaaaa", width: 200, ml: 2, pt: 1.5 }}
                    >
                      Надіслати знову{" "}
                      {couldownValue > 0 ? `(${couldownValue})` : null}
                    </Typography>
                  ) : (
                    <Button
                      color="primary"
                      sx={{ width: 180, ml: 2 }}
                      disabled={!userPhoneValid}
                      onClick={handleOtpRequest}
                    >
                      Надіслати знову
                    </Button>
                  )}
                </Box>
                {showInvalidCodeMessage && (
                  <Typography p={1} variant="h6" color="error">
                    Код підтвердження невірний.
                  </Typography>
                )}
              </Box>
            )}
          </BoxContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
