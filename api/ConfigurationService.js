import { appConfig } from "configs/config";

const ConfigurationService = {
  async getBanners() {
    const path = "/banners";
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      return responseJson.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    return [];
  },

  async getGeneralSettings(id) {
    const path = `/generalsettings/${id}`;

    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      return responseJson[0].values;
    }
    return null;
  },

  async getBlogs(){
    const path = "/blogs";
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
      cache: 'no-store'
    });

    return response.json();
  },
  
  async getBlogById(id){
    const path = "/blogs?id=" + id;
    const response = await fetch(appConfig.API_GATEWAY + path, {
      // next: { revalidate: 10 },
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
      cache: 'no-store'
    });
    const blogResponse = await response.json();
    return blogResponse[0];
  },
};

export default ConfigurationService;
