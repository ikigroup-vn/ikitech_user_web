import * as prizeCodeApi from "../data/remote/prize_code";
import * as Types from "../constants/ActionType";
import QRCode from "qrcode";
import XlsxPopulate from "xlsx-populate";

export const exportAllPrizeCodes = async (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });

    prizeCodeApi.fetchAllPrizeCode(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        if (typeof res.data.data != "undefined") {
          if (typeof res.data.data.data != "undefined") {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              let i = 1;
              for (const item of res.data.data.data) {
                let qrcode;
                QRCode.toDataURL(item.code)
                  .then((url) => {
                    qrcode = url;
                    var newItem = {};
                    var arangeKeyItem = {
                      stt: i,
                      code: item.code ?? "",
                      phone_number: item.phone_number ?? "",
                      product: item.product.name ?? "",
                      prize_product: item.productPrize.name ?? "",
                      qrcode,
                    };
                    Object.entries(arangeKeyItem).forEach(
                      ([key, value], index) => {
                        if (key == "stt") {
                          newItem["STT"] = value;
                        }
                        if (key == "code") {
                          newItem["Mã dự thưởng"] = value;
                        }
                        if (key == "phone_number") {
                          newItem["Số điện thoại"] = value;
                        }
                        if (key == "product") {
                          newItem["Sản phẩm"] = value;
                        }
                        if (key == "prize_product") {
                          newItem["Sản phẩm trúng"] = value;
                        }
                        if (key == "qrcode") {
                          newItem["Mã QR"] = value;
                        }
                      }
                    );
                    newArray.push(newItem);
                    i++;
                    var header = [];
                    if (newArray.length > 0) {
                      Object.entries(newArray[0]).forEach(
                        ([key, value], index) => {
                          header.push(key);
                        }
                      );
                    }
                    var data = newArray;
                    var data_header = header;
                    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
                      const sheet1 = workbook.sheet(0);
                      const sheetData = getSheetData(data, data_header);

                      const totalColumns = sheetData[0].length;
                      sheet1
                        .range(
                          "A1:" + String.fromCharCode(64 + totalColumns) + "1"
                        )
                        .merged(true);
                      sheet1.cell("A1").value(`Từ ${timeFrom} đến ${timeTo}`);
                      sheet1.cell("A2").value(sheetData);
                      sheet1.column("B").width(30);

                      for (
                        let rowIndex = 0;
                        rowIndex < newArray.length;
                        rowIndex++
                      ) {
                        const imageBuffer = Buffer.from(
                          newArray[rowIndex].qrcode.split(",")[1],
                          "base64"
                        ); // Chuyển base64 thành buffer
                        sheet1.addImage({
                          base64: newArray[rowIndex].qrcode, // URL base64 của hình ảnh QR code
                          type: "image/png",
                          left: 10, // Vị trí trái của hình ảnh
                          top: rowIndex * 40 + 20, // Vị trí trên của hình ảnh dựa trên chỉ số hàng
                          width: 100, // Chiều rộng của hình ảnh
                          height: 100, // Chiều cao của hình ảnh
                        });
                      }
                      const range = sheet1.usedRange();
                      const endColumn = "Z";
                      sheet1.row(1).style("bold", true);
                      range.style("border", true);
                      range.style("border", true);
                      return workbook.outputAsync().then((res) => {
                        saveAs(res, "BAO CAO THANH TOAN.xlsx");
                      });
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            }
          }
        }
      }
    });
  };
};

function getSheetData(data, header) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : "";
    });
  });
  sheetData.unshift(header);
  return sheetData;
}
