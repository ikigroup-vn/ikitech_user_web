import callApi from "../../ultis/apiCaller";

export const listPosOrder = (store_code,branch_id) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list`, "get", null);
  };

  export const addProductInCart = (store_code,branch_id,id,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id}/items`, "post", data);
  };

  export const deleteOneCart = (store_code,branch_id,id) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id}`, "delete", null);
  };

  export const createOneTab = (store_code,branch_id,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list`, "post", data);
  };

  export const fetchInfoOneCart = (store_code,branch_id,id) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id}`, "get", null);
  };

  export const addQuantityProduct = (store_code,branch_id,id_cart,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id_cart}/items`, "put", data);
  };
  export const subQuantityProduct = (store_code,branch_id,id_cart,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id_cart}/items`, "put", data);
  };

  export const destroyOneProduct = (store_code,branch_id,id_cart,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id_cart}/items`, "put", data);
  };

  export const updateInfoCart = (store_code,branch_id,id_cart,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id_cart}`, "put", data);
  };

  export const paymentOrderPos = (store_code,branch_id,id_cart,data) => {
    return callApi(`/store/${store_code}/carts/${branch_id}/list/${id_cart}/order`, "post", data);
  };