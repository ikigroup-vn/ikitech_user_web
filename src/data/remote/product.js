import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code , page , params , agency_type_id) => {

  if(agency_type_id)
  {
    return params ? callApi(`/store/${store_code}/products?page=${page}${params}&agency_type_id=${agency_type_id}`, "get", null) 
    :callApi(`/store/${store_code}/products?page=${page}&agency_type_id=${agency_type_id}`, "get", null)
  }

  return params ? callApi(`/store/${store_code}/products?page=${page}${params}&agency_type_id=${agency_type_id}`, "get", null) 
  :callApi(`/store/${store_code}/products?page=${page}&agency_type_id=${agency_type_id}`, "get", null)

};
export const fetchAllProductV2 = (store_code,branch_id , page , params , agency_type_id) => {

  if(agency_type_id)
  {
    return params ? callApi(`/store_v2/${store_code}/${branch_id}/products?page=${page}${params}&agency_type_id=${agency_type_id}`, "get", null) 
    :callApi(`/store_v2/${store_code}/${branch_id}/products?page=${page}&agency_type_id=${agency_type_id}`, "get", null)
  }

  return params ? callApi(`/store_v2/${store_code}/${branch_id}/products?page=${page}${params}&agency_type_id=${agency_type_id}`, "get", null) 
  :callApi(`/store_v2/${store_code}/${branch_id}/products?page=${page}&agency_type_id=${agency_type_id}`, "get", null)

};

export const fetchProductId = (store_code , id) => {
  return callApi(`/store/${store_code}/products/${id}`, "get", null);
};

export const createProduct = (store_code,data) =>{
  return callApi(`/store/${store_code}/products`, "post", data);
}
export const createProductV2 = (store_code,branch_id,data) =>{
  return callApi(`/store_v2/${store_code}/${branch_id}/products`, "post", data);
}

export const updateProduct = (store_code,data,id) =>{
  return callApi(`/store/${store_code}/products/${id}`, "put", data);
}

export const destroyProduct = (store_code, id) =>{
  return callApi(`/store/${store_code}/products/${id}`, "delete", null);
}

export const upload = (file) =>{
  return callApi(`/images`, "post", file);
}

export const destroyMultiProduct = (store_code, data) =>{
  return callApi(`/store/${store_code}/products`, "delete", data);
}

export const createMultiProduct = (store_code,data) =>{
  return callApi(`/store/${store_code}/products/all`, "post", data);
}

export const fetchAllListProduct = (store_code , search) => {
  return callApi(`/store/${store_code}/products?is_show_description=${true}&is_get_all=${true}&search=${search}`, "get", null);
};

export const fetchAllProductEcommerce = (store_code , page , data) =>{
 return callApi(`/store/${store_code}/ecommerce/products?page=${page}`, "post", data)
}
export const fetchProductAgencyPrice = (store_code , id, agency_id) => {
  return callApi(`/store/${store_code}/products/${id}/agency_price?agency_type_id=${agency_id}`, "get", null);
};


export const updateAgencyPrice = (store_code,data,id) =>{
  return callApi(`/store/${store_code}/products/${id}/agency_price`, "put", data);
}


export const editStock = (store_code,branch_id,data) =>{
  return callApi(`/store/${store_code}/${branch_id}/inventory/update_balance`, "put", data);
}