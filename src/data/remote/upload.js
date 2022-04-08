import callApi from "../../ultis/apiCaller";

export const upload = (file) => {
  return callApi(`/images`, "post", file);
};
