import callApi from "../../ultis/apiCaller";

export const fetchAllBill = (store_code , page=1 ,branch_id, params , params_agency) => {
  var stringURL = `/store/${store_code}/orders?page=${page}`

  if(branch_id)
  stringURL = stringURL + `&branch_id=${branch_id}`
  if(params)
  stringURL = stringURL + params
  if(params_agency)
  stringURL = stringURL + params_agency
  
  // if(branch_id == null)
  // {
  //   return params ? callApi(`/store/${store_code}/orders?page=${page}${params}${params_agency}`, "get", null) 
  //   :callApi(`/store/${store_code}/orders?page=${page}${params_agency}`, "get", null)
  // }
  // return params ? callApi(`/store/${store_code}/orders?page=${page}&branch_id=${branch_id}${params}${params_agency}`, "get", null) 
  // :callApi(`/store/${store_code}/orders?page=${page}&branch_id=${branch_id}${params_agency}`, "get", null)


  return callApi(stringURL, "get", null) 

};

export const fetchBillId = (store_code  , order_code) => {
  return callApi(`/store/${store_code}/orders/${order_code}`, "get", null);
};

export const fetchBillHistory = (store_code  , billId) => {
  return callApi(`/store/${store_code}/orders/status_records/${billId}`, "get", null);
};

export const fetchHistoryPay = (store_code  , order_code) => {
  return callApi(`/store/${store_code}/orders/history_pay/${order_code}`, "get", null);
};

export const updateStatusOrder = (store_code , data) =>{
  console.log(data);
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

export const postRefund = (data,store_code, branch_id) =>{
  return callApi(`/store_v2/${store_code}/${branch_id}/pos/refund`, "post", data);
}
export const postCashRefund = (order_code , data,store_code, branch_id) =>{
  return callApi(`/store_v2/${store_code}/${branch_id}/orders/pay_order/${order_code}`, "post", data);
}



export const getCalculate = (store_code , data, branch_id) =>{
  return callApi(`/store_v2/${store_code}/${branch_id}/pos/refund/calculate`, "post", data);
}


export const syncShipment = (store_code , order_code , data) =>{
  return callApi(`/store/${store_code}/shipper/order_and_payment_status/${order_code}`, "post", data);
}
