
import moment from "moment";
export const getYYYYMMDDNow = () => {
    return moment().format("YYYY-MM-DD");
  };

  export const getDDMMYYYNow = () => {
    return moment().format("DD-MM-YYYY");
  };