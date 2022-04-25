
import moment from "moment";
export const getYYYYMMDDNow = () => {
    return moment().format("YYYY-MM-DD");
  };

  export const getDDMMYYYNow = () => {
    return moment().format("DD-MM-YYYY");
  };

  export function getDDMMYYYDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}