import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code) => {
  return callApi(`/store/${store_code}/banner_ads`, "get", null);
};



export const createBannerAds = (store_code,data) =>{
  return callApi(`/store/${store_code}/banner_ads`, "post", data);
}

export const updateBannerAds = (bannerAdsId, categoryB, store_code) =>{
  return callApi(`/store/${store_code}/banner_ads/${bannerAdsId}`, "put", categoryB);
}

export const destroyBannerAds = (store_code , bannerAdsId) =>{
  return callApi(`/store/${store_code}/banner_ads/${bannerAdsId}`, "delete", null);
}
