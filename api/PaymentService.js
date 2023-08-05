import { appConfig } from "configs/config";

const PaymentService = {
  // admin functions
  async submitCheckout(requestbody) {
    const path = "/payments/checkout";
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "POST",
      body: JSON.stringify(requestbody),
      headers: {
        "x-api-key": appConfig.API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Виникла помилка при опрацюванні замовлення");
    }
    return response.json();
  },

  async getOrderStatus(orderId) {
    const path = `/orders/${orderId}`;
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });
    return response.json();
  },

  async getPrice(order, deliveryDetails) {
    const path = "/price";
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "POST",
      body: JSON.stringify({
        order,
        deliveryDetails,
      }),
      headers: {
        "x-api-key": appConfig.API_KEY,
        "Content-Type": "application/json",
      },
    })
    return response.json();
  },
};

export default PaymentService;
