import { appConfig } from "configs/config";

const UsersService = {
  async GetOtp(phoneValue) {
    const path = "/users/otp";

    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": appConfig.API_KEY,
      },
      body: JSON.stringify({
        phone: phoneValue,
      }),
    });

    return response.json();
  },

  async Auth(phoneValue, otpValue) {
    const path = "/users/auth";
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": appConfig.API_KEY,
      },
      body: JSON.stringify({
        phone: phoneValue,
        otp: otpValue,
      }),
    });
    return response.json();
  },

  async getOrdersHistory(phone, securityToken) {
    const path = `/users/history?phone=${phone}`;
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
        "x-authorization": securityToken,
      },
    });
    return response.json();
  },
};

export default UsersService;
