import callApi from "../../ultis/apiCaller";

export const fetchAppointments = (store_code, page, start_date, end_date) => {
  let query = '';
  if (start_date && end_date)
    query = `&start_date=${start_date}&end_date=${end_date}`;
  if (start_date && !end_date)
    query = `&start_date=${start_date}`;
  if (!start_date && end_date)
    query = `&end_date=${end_date}`;
  return callApi(`/store/${store_code}/appointments?page=${page}${query}`, "get", null);
};
