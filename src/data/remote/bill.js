import callApi from "../../ultis/apiCaller";

export const fetchAllBill = (store_code , page=1 , params , params_agency) => {
  if(params_agency != null)
  {
    return params ? callApi(`/store/${store_code}/orders?page=${page}${params}${params_agency}`, "get", null) 
    :callApi(`/store/${store_code}/orders?page=${page}${params_agency}`, "get", null)
  }
  return params ? callApi(`/store/${store_code}/orders?page=${page}${params}`, "get", null) 
  :callApi(`/store/${store_code}/orders?page=${page}`, "get", null)
};

export const fetchBillId = (store_code  , order_code) => {
  return callApi(`/store/${store_code}/orders/${order_code}`, "get", null);
};

export const fetchBillHistory = (store_code  , billId) => {
  return callApi(`/store/${store_code}/orders/status_records/${billId}`, "get", null);
};

export const updateStatusOrder = (store_code , data) =>{
  return callApi(`/store/${store_code}/orders/change_order_status`, "post", data);


}
export const updateStatusPayment = (store_code , data) =>{
  return callApi(`/store/${store_code}/orders/change_payment_status`, "post", data);
}

  export const sendOrderToDelivery = (store_code , data) =>{
    return callApi(`/store/${store_code}/shipper/send_order`, "post", data);
}

export const getHistoryDeliveryStatus = (store_code , data) =>{
  return callApi(`/store/${store_code}/shipper/history_order_status`, "post", data);
}

export const updateOrder = (data,store_code, order_code, ) =>{
  return callApi(`/store/${store_code}/orders/update/${order_code}`, "put", data);
}