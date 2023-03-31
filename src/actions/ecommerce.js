import * as Types from "../constants/ActionType";
import * as ecommerceApi from "../data/remote/ecommerce";

//Danh sách kết nối sàn
export const fetchListConnectEcommerce = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .fetchListConnectEcommerce(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_CONNECT_ECOMMERCE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Kết nối sàn
export const connectEcommerce = (platform, store_code, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .connectEcommerce(platform, store_code)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Cập nhật kết nối sàn
export const updateConnectEcommerce = (
  store_code,
  shop_id,
  data,
  funcModal
) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .updateConnectEcommerce(store_code, shop_id, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

//Danh sách sản phẩm theo store
export const fetchListProductEcommerce = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .fetchListProductEcommerce(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_PRODUCTS_ECOMMERCE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Đồng bộ sản phẩm
export const syncProductEcommerce = (store_code, data, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: true });
    ecommerceApi
      .syncProductEcommerce(store_code, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: false });
        if (res.data.code === 200) {
          dispatch({
            type: Types.SYNC_PRODUCTS_FROM_STORES,
            data: res.data.data,
          });
          funcModal(res.data.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: false });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Sửa giá sản phẩm
export const updatePriceProductEcommerce = (
  store_code,
  data,
  id,
  funcModal
) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .updatePriceProductEcommerce(store_code, data, id)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
