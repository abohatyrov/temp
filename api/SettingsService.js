import { appConfig } from "configs/config";

const SettingsService = {
  async getPageSettings(pagename, department) {
    const pageid = pagename + (department ? `_${department}` : "");
    const path = `/config/pages/${pageid}`;

    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson[0];
    }
    return {};
  },

  async getSectionSettings(department, sectionName) {
    const sectionid = sectionName + (department ? `_${department}` : "");
    const path = `/config/sections/${sectionid}`;

    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson[0];
    }
    return {};
  },

  async getGeneralSettings(settingKey) {
    const path = `/generalsettings/` + settingKey;
    const response = await fetch(appConfig.API_GATEWAY + path, {
      method: "GET",
      headers: {
        "x-api-key": appConfig.API_KEY,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson[0];
    }

    return {};
  },
};

export default SettingsService;
