import moment from "moment";
import Compressor from "compressorjs";
import * as Config from "../constants/Config";
export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const compressed = (file, maxWitdh = 1024, maxHeight = 1024) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5,
      maxWitdh,
      maxHeight,
      success: (compressedResult) => {
        resolve(compressedResult);
      },
    });
  });
};

export const isPhone = (phone) => {
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return vnf_regex.test(phone);
};
function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

export const isSpecialCharactor = (string) => {
  var vnf_regex = /^[a-zA-Z0-9- ]*$/;
  return vnf_regex.test(removeAscent(string));
};

export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formatStringCharactor = (data) => {
  return typeof data !== "undefined" && data !== null
    ? data.toString().replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, "")
    : "";
};

export const isEmpty = (data) => {
  if (data == null) return false;
  return data.toString().replace(/ /g, "").length > 0;
};

export const callUrl = () => {
  var hostname = window.location.hostname;
  var name = "";
  if (
    hostname.includes("localhost") ||
    hostname.includes("ikiglobal.com") ||
    hostname.includes("isempai.net")
  )
    name = Config.API_URL_DEV;
  else name = Config.API_URL_MAIN;
  return name;
};
export const callUrlSocket = () => {
  var hostname = window.location.hostname;
  var name = "";
  if (
    hostname.includes("localhost") ||
    hostname.includes("ikiglobal.com") ||
    hostname.includes("isempai.net")
  )
    name = Config.API_URL_SOCKET_DEV;
  else name = Config.API_URL_SOCKET_MAIN;
  return name;
};

export const loadFileInput = (name, upload = "#") => {
  window.$(`#${name}`).fileinput({
    theme: "fa",
    overwriteInitial: true,
    uploadUrl: upload,
    allowedFileExtensions: ["jpg", "png", "jpeg"],
    maxFilesNum: 10,
    slugCallback: function (filename) {
      return filename.replace("(", "_").replace("]", "_");
    },
  });
};

export const formatVND = (str) => {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
};

export const filter_arr = (variable) => {
  return typeof variable == "undefined" || variable == null || variable == ""
    ? []
    : variable;
};

export const filter_var = (variable) => {
  return typeof variable == "undefined" || variable == null ? "" : variable;
};

export const format = (number) => {
  var num = Number(number);
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const formatNoD = (number) => {

  if (number == "") number = 0
  var number = number.toString().replace(/\./g, ',')

  var number = Number(number == "" ? 0 : number);
  let dollarUSLocale = Intl.NumberFormat('en-US');
  return dollarUSLocale.format(number)
};

export const loadExpandTable = () => {
  window.$(".exploder").unbind("click");
  window.$(".exploder").click(function () {
    window.$(this).toggleClass("btn-success btn-danger");

    window.$(this).children("span").toggleClass("fa-plus fa-minus");

    window.$(this).closest("tr").next("tr").toggleClass("hide");

    if (window.$(this).closest("tr").next("tr").hasClass("hide")) {
      window.$(this).closest("tr").next("tr").children("td").slideUp();
    } else {
      window.$(this).closest("tr").next("tr").children("td").slideDown(350);
    }
  });
};

export const getDateForChartHour = () => {
  var from = moment().format("YYYY-MM-DD");
  var to = from;
  return {
    from,
    to,
  };
};

export const formatNumber = (value) => {
  var _value = value;
  return typeof _value !== "undefined"
    ? _value.toString().replace(/\./g, "").replace(/,/g, "").replace(/-/g, "")
    : "";
};

export const removeSignNumber = (value) => {
  var _value = value;
  var numStr = typeof _value !== "undefined"
    ? _value.toString().replace(/\./g, "").replace(/,/g, "").replace(/-/g, "")
    : "";
  var numStr = parseFloat(numStr);
  return isNaN(numStr) ? 0 : numStr
};

export const getDateForChartDay = () => {
  console.log(moment().day());

  return {
    from: moment().format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
  };
};

export const getDateForChartWeek = () => {
  console.log(moment().day());
  if (moment().day() == 0) {
    return {
      from: moment().subtract(6, "days").format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
    };
  }
  var weekStart = moment().clone().weekday(1).format("YYYY-MM-DD");
  var from = weekStart;
  var to = moment().format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
export const getDateForChartMonth = () => {
  var monthStart = moment().startOf("month").format("YYYY-MM-DD");
  console.log("monstart", monthStart);
  var from = monthStart;
  var to = moment().format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
export const getDateForChartYear = () => {
  var monthStart = moment().format("YYYY");
  var from = "01-01-" + monthStart;
  var to = moment().format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
