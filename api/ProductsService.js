import { appConfig } from "configs/config";
import isEmpty from "helpers/strhelper";

const ProductsService = {
  async getProducts(category) {
    let path = "/products";

    if (!isEmpty(category)) {
      path += "?category=" + category;
    }

    const response = await fetch(appConfig.API_GATEWAY + path, {
      // next: { revalidate: 300 },
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
      cache: 'no-cache'
    });
    const responseJson = await response.json();

    const result = responseJson
      .filter(
        (x) => x.category_id !== "14" && x.hidePosition !== true // Без лактози
      )
      .sort((a, b) =>
        a.positionOfTheWeek === b.positionOfTheWeek
          ? 0
          : !a.positionOfTheWeek
          ? 1
          : -1
      )
      .map((element) => ({
        ...element,
        linkedPrice: responseJson.find((x) => x.id === element.linkedPosition)
          ?.price,
      }));

    return result;
  },

  async getProductsById(id) {
    const path = `/products?id=` + id;
    const response = await fetch(appConfig.API_GATEWAY + path, {
      next: { revalidate: 300 },
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });

    return response.json();
  },
};

export default ProductsService;
