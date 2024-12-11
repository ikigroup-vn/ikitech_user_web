import * as Types from "../constants/ActionType";
import history from "../history";
import * as billApi from "../data/remote/bill";
import * as chatApi from "../data/remote/chat";
import * as uploadApi from "../data/remote/upload";
import {
  compressed,
  formatStringCharactor,
  getDetailAdress,
  getQueryParams,
} from "../ultis/helpers";
import { getBranchId } from "../ultis/branchUtils";
import moment from "moment";
import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";
import * as OrderFrom from "../ultis/order_from";
import handleBillMisa from "../data/handle_data/handle_bill_misa";

export const exportAllListOrder = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .fetchAllBill(store_code, page, branch_id, params, params_agency, true)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          if (typeof res.data.data != "undefined") {
            if (typeof res.data.data.data != "undefined") {
              if (res.data.data.data.length > 0) {
                var newArray = [];

                for (const item of res.data.data.data) {
                  var newItem = {};
                  var arangeKeyItem = {
                    branch: item.branch?.name ?? "",
                    order_code: item.order_code ?? "",
                    ship_code: item.ship_code ?? "",

                    created_at: item.created_at,
                    updated_at: item.updated_at,

                    receiver_customer_phone: item.customer_phone,
                    receiver_customer_name: item.customer_name,
                    receiver_customer_email: item.customer_email,
                    receiver_customer_wards: item.customer_wards_name,
                    receiver_customer_district: item.customer_district_name,
                    receiver_customer_province: item.customer_province_name,
                    receiver_customer_address_detail:
                      item.customer_address_detail,

                    orderer_customer_phone: item.customer?.phone_number,
                    orderer_customer_name: item.customer?.name,
                    orderer_customer_email: item.customer?.email,
                    orderer_customer_wards: item.customer?.wards_name,
                    orderer_customer_district: item.customer?.district_name,
                    orderer_customer_province: item.customer?.province_name,
                    orderer_customer_address_detail:
                      item.customer?.address_detail,

                    staffName: item.staff_name,
                    order_from:
                      item.order_from == OrderFrom.ORDER_FROM_APP
                        ? "App"
                        : item.order_from == OrderFrom.ORDER_FROM_POS_DELIVERY
                        ? "POS giao vận"
                        : item.order_from == OrderFrom.ORDER_FROM_POS_IN_STORE
                        ? "POS tại quầy"
                        : item.order_from == OrderFrom.ORDER_FROM_POS_SHIPPER
                        ? "POS vận chuyển"
                        : item.order_from == OrderFrom.ORDER_FROM_WEB
                        ? "Web"
                        : "POS tại quầy",

                    partner_shipper_name: item.partner_shipper_name,
                    customer_note: item.customer_note,

                    total_final: item.total_final,
                    remaining_amount: item.remaining_amount,

                    combo_discount_amount: item.combo_discount_amount,
                    product_discount_amount: item.product_discount_amount,
                    voucher_discount_amount: item.voucher_discount_amount,

                    total_before_discount: item.total_before_discount,
                    total_after_discount: item.total_after_discount,
                    discount: item.discount,
                    total_commission_order_for_customer:
                      item.total_commission_order_for_customer,

                    balance_collaborator_used: item.balance_collaborator_used,
                    bonus_points_amount_used: item.bonus_points_amount_used,

                    share_collaborator: item.share_collaborator,

                    reviewed: item.reviewed,

                    total_shipping_fee: item.total_shipping_fee,

                    payment_status: item.payment_status_name,

                    order_status: item.order_status_name,
                  };
                  Object.entries(arangeKeyItem).forEach(
                    ([key, value], index) => {
                      if (key == "branch") {
                        newItem["Chi nhánh"] = value;
                      }
                      if (key == "order_code") {
                        newItem["Mã đơn hàng"] = value;
                      }
                      if (key == "ship_code") {
                        newItem["Mã vận đơn"] = value;
                      }
                      if (key == "created_at") {
                        newItem["Ngày tạo"] = value;
                      }
                      if (key == "updated_at") {
                        newItem["Ngày cập nhật"] = value;
                      }
                      if (key == "staffName") {
                        newItem["Tên nhân viên"] = value;
                      }
                      if (key == "receiver_customer_phone") {
                        newItem["Số điện thoại người nhận"] = value;
                      }
                      if (key == "receiver_customer_name") {
                        newItem["Tên người nhận"] = value;
                      }
                      if (key == "receiver_customer_email") {
                        newItem["Email người nhận"] = value;
                      }
                      if (key == "receiver_customer_wards") {
                        newItem["Phường/Xã người nhận"] = value;
                      }
                      if (key == "receiver_customer_district") {
                        newItem["Quận/Huyện người nhận"] = value;
                      }
                      if (key == "receiver_customer_province") {
                        newItem["Tỉnh/TP người nhận"] = value;
                      }
                      if (key == "receiver_customer_address_detail") {
                        newItem["Chi tiết địa chỉ người nhận"] = value;
                      }
                      if (key == "receiver_customer_address_detail") {
                        newItem["Chi tiết địa chỉ người nhận"] = value;
                      }

                      if (key == "orderer_customer_phone") {
                        newItem["Số điện thoại khách hàng"] = value;
                      }
                      if (key == "orderer_customer_name") {
                        newItem["Tên khách hàng"] = value;
                      }
                      if (key == "orderer_customer_email") {
                        newItem["Email khách hàng"] = value;
                      }
                      if (key == "orderer_customer_wards") {
                        newItem["Phường/Xã khách hàng"] = value;
                      }
                      if (key == "orderer_customer_district") {
                        newItem["Quận/Huyện khách hàng"] = value;
                      }
                      if (key == "orderer_customer_province") {
                        newItem["Tỉnh/TP khách hàng"] = value;
                      }
                      if (key == "orderer_customer_address_detail") {
                        newItem["Chi tiết địa chỉ khách hàng"] = value;
                      }
                      if (key == "orderer_customer_address_detail") {
                        newItem["Chi tiết địa chỉ khách hàng"] = value;
                      }

                      if (key == "order_from") {
                        newItem["Đặt hàng từ"] = value;
                      }

                      if (key == "partner_shipper_name") {
                        newItem["Đơn vị vận chuyển"] = value;
                      }

                      if (key == "customer_note") {
                        newItem["Ghi chú"] = value;
                      }

                      if (key == "total_final") {
                        newItem["Tổng tiền"] = value;
                      }
                      if (key == "total_shipping_fee") {
                        newItem["Phí vận chuyển"] = value;
                      }

                      if (key == "remaining_amount") {
                        newItem["Thanh toán còn lại"] = value;
                      }

                      if (key == "payment_status") {
                        newItem["Trạng thái thanh toán"] = value ?? "";
                      }

                      if (key == "order_status") {
                        newItem["Trạng thái đơn hàng"] = value ?? "";
                      }

                      if (key == "combo_discount_amount") {
                        newItem["Giảm giá combo"] = value;
                      }

                      if (key == "product_discount_amount") {
                        newItem["Giảm giá sản phẩm"] = value;
                      }
                      if (key == "voucher_discount_amount") {
                        newItem["Giảm giá voucher"] = value;
                      }

                      if (key == "discount") {
                        newItem["Chiết khấu"] = value;
                      }

                      if (key == "total_commission_order_for_customer") {
                        newItem["Hoa hồng cho đại lý"] = value;
                      }

                      if (key == "total_before_discount") {
                        newItem["Trước khi giảm giá"] = value;
                      }

                      if (key == "total_after_discount") {
                        newItem["Sau khi giảm giá"] = value;
                      }

                      if (key == "balance_collaborator_used") {
                        newItem["Số dư CTV đã sử dụng"] = value;
                      }

                      if (key == "bonus_points_amount_used") {
                        newItem["Số xu đã sử dụng"] = value;
                      }

                      if (key == "share_collaborator") {
                        newItem["Số tiền chia sẻ cho CTV"] = value;
                      }
                    }
                  );

                  newArray.push(newItem);
                }
                var header = [];
                if (newArray.length > 0) {
                  Object.entries(newArray[0]).forEach(([key, value], index) => {
                    header.push(key);
                  });
                }
                console.log(header);
                saveAsExcel({ data: newArray, header: header });
              }
            }
          }
        }
      });
  };
};

export const exportAllListOrderV2 = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .fetchAllBillV2(store_code, page, branch_id, params, params_agency, true)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        exportExcel(res.data.data);
      });
  };
};

// Hàm xuất Excel
// Hàm xuất Excel
function exportExcel(data) {
  XlsxPopulate.fromBlankAsync()
    .then((workbook) => {
      const sheet = workbook.sheet(0);

      const handleGetPaymentMethodName = (paymentMethodId) => {
        const payment = [
          { id: 0, name: "Thanh toán khi nhận hàng" },
          { id: 1, name: "Chuyển khoản đến tài khoản ngân hàng" },
          { id: 2, name: "Thanh toán bằng VNPay" },
          { id: 3, name: "Thanh toán bằng OnePay" },
          { id: 4, name: "Thanh toán bằng Momo" },
        ];
        return payment.find((item) => item.id === paymentMethodId)?.name;
      };
      // Thiết lập tiêu đề
      const headers = [
        "Ngày",
        "Mã đơn hàng",
        "Tên khách hàng",
        "Địa chỉ",
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Số lượng",
        "Giá bán",
        "Doanh thu",
        "Giảm giá",
        "Thành tiền",
        "Phí vận chuyển",
        "Tổng thanh toán",
        "Trạng thái thanh toán",
        "Trạng thái đơn hàng",
        "Địa chỉ lấy hàng",
        "Giá trị voucher",
        "Giảm giá",
        "Hình thức thanh toán",
      ];
      headers.forEach((header, index) => {
        sheet.cell(1, index + 1).value(header);
      });
      sheet.range("A1:S1").style({ fill: "FFFFF0", bold: true });

      // Điền dữ liệu
      let currentRow = 2; // Bắt đầu từ dòng 2, sau tiêu đề
      let totalQuantityOverall = 0; // Tổng số lượng
      let totalRevenueOverall = 0; // Tổng doanh thu
      let totalDiscountOverall = 0; // Tổng doanh thu

      data.forEach((order) => {
        const totalQuantity = order.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalDoanhThu = order.items.reduce(
          (sum, item) => sum + item.quantity * item.product?.price,
          0
        );
        const totalDiscount = order.items.reduce(
          (sum, item) => sum + item.discount_price,
          // (item.quantity * (item.product?.price || 0) - item.discount_price)
          0
        );
        const totalFinal = order.items.reduce(
          (sum, item) =>
            sum + item.quantity * item.product?.price - item.discount_price,
          0
        );

        // Cộng dồn vào tổng chung
        totalQuantityOverall += totalQuantity;
        totalRevenueOverall += totalDoanhThu;
        totalDiscountOverall += totalDiscount;
        // Dòng đầu của mỗi nhóm (thông tin đơn hàng)
        sheet.cell(currentRow, 1).value(formatDate(order.created_at));
        sheet.cell(currentRow, 2).value(order.order_code);
        sheet.cell(currentRow, 3).value(order.customer_name);
        sheet.cell(currentRow, 4).value(
          [
            order.customer_address_detail,
            order.customer_wards_name,
            order.customer_district_name,
            order.customer_province_name,
          ]
            .filter((field) => field != null && field !== "") // Loại bỏ các giá trị null hoặc rỗng
            .join(" ,") // Kết hợp các trường không null thành chuỗi
        );

        sheet.cell(currentRow, 6).value(
          [
            order.branch?.address_detail,
            order.branch?.wards_name,
            order.branch?.district_name,
            order.branch?.province_name,
          ]
            .filter((field) => field != null && field !== "") // Loại bỏ các giá trị null hoặc rỗng
            .join(" ,")
        );
        sheet.cell(currentRow, 7).value(totalQuantity);
        sheet.cell(currentRow, 9).value(totalDoanhThu);
        sheet.cell(currentRow, 10).value(totalDiscount);
        sheet.cell(currentRow, 11).value(totalFinal);
        sheet.cell(currentRow, 12).value(order.total_shipping_fee);
        sheet.cell(currentRow, 13).value(order.total_final);
        sheet
          .cell(currentRow, 14)
          .value(checkStatusPayment(order.payment_status));
        sheet.cell(currentRow, 15).value(checkStatusOrder(order.order_status));
        sheet.cell(currentRow, 16).value(order.branch?.branch_code);
        sheet.cell(currentRow, 17).value(order.voucher_discount_amount);
        sheet.cell(currentRow, 18).value(order.discounts[0]?.name);
        sheet
          .cell(currentRow, 19)
          .value(handleGetPaymentMethodName(order.payment_method_id));
        // Tô màu nền cho dòng đầu tiên của nhóm
        sheet
          .range(`A${currentRow}:S${currentRow}`)
          .style({ fill: "FCF5E6", bold: true });
        currentRow++;

        // Thông tin sản phẩm
        order.items.forEach((item) => {
          sheet.cell(currentRow, 5).value(item.product?.sku);
          sheet.cell(currentRow, 6).value(item.product?.name);
          sheet.cell(currentRow, 7).value(item.quantity);
          sheet.cell(currentRow, 8).value(item.product?.price);
          sheet.cell(currentRow, 9).value(item.quantity * item.product?.price);
          sheet.cell(currentRow, 10).value(item.discount_price);
          sheet
            .cell(currentRow, 11)
            .value(item.quantity * item.product?.price - item.discount_price);
          currentRow++; // Tăng dòng sau khi thêm thông tin sản phẩm
        });
      });

      // Thêm dòng tổng cộng
      sheet.cell(currentRow, 6).value("Tổng cộng"); // Tên sản phẩm
      sheet.cell(currentRow, 7).value(totalQuantityOverall); // Tổng số lượng
      sheet.cell(currentRow, 9).value(totalRevenueOverall); // Tổng doanh thu
      sheet.cell(currentRow, 10).value(totalDiscountOverall); // Tổng doanh thu

      // Tô màu nền cho dòng tổng cộng
      sheet
        .range(`A${currentRow}:S${currentRow}`)
        .style({ fill: "FAFAD2", bold: true });

      // Thiết lập viền đậm cho tất cả các ô có chứa dữ liệu, bao gồm dòng tổng cộng
      sheet.range(`A1:S${currentRow}`).style({
        border: true, // Đặt viền cho tất cả các cạnh
        borderColor: "000000", // Màu đen
        borderStyle: "thin", // Độ dày viền
      });

      // Xuất file dưới dạng Blob
      return workbook.outputAsync();
    })
    .then((blob) => {
      // Sử dụng saveAs để tải xuống file
      saveAs(blob, "BANG KE DON HANG.xlsx");
    })
    .then(() => {
      console.log("Tệp Excel đã được xuất thành công!");
    })
    .catch((error) => {
      console.error("Đã xảy ra lỗi:", error);
    });
}

function checkStatusPayment(status) {
  if (status == 0) {
    return "Chưa thanh toán";
  } else if (status == 1) {
    return "Chờ xử lý";
  } else if (status == 2) {
    return "Đã thanh toán";
  } else if (status == 3) {
    return "Đã thanh toán một phần";
  } else if (status == 5) {
    return "Hoàn tiền";
  }
}

function checkStatusOrder(status) {
  if (status == 0) {
    return "Chờ xử lý";
  } else if (status == 1) {
    return "Đang chuyển bị hàng";
  } else if (status == 2) {
    return "Hết hàng";
  } else if (status == 3) {
    return "Shop hủy";
  } else if (status == 4) {
    return "Khách hủy";
  } else if (status == 5) {
    return "Đang giao hàng";
  } else if (status == 6) {
    return "Lỗi giao hàng";
  } else if (status == 7) {
    return "Chờ trả hàng";
  } else if (status == 8) {
    return "Đã trả hàng";
  } else if (status == 9) {
    return "Đợi thanh toán";
  } else if (status == 10) {
    return "Hoàn thành";
  } else if (status == 11) {
    return "Đã nhận hàng";
  } else if (status == 12) {
    return "Đang tìm tài xế";
  } else if (status == 13) {
    return "Đã tìm thấy tài xế";
  } else if (status == 14) {
    return "Tài xế đã lấy hàng";
  }
}

function formatDate(dateString) {
  // Chuyển đổi chuỗi ngày giờ sang đối tượng Date
  const date = new Date(dateString);

  // Lấy các thành phần ngày, tháng và năm
  const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Trả về định dạng dd/MM/yyyy
  return `${day}/${month}/${year}`;
}

export const exportReportProductSold = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  return (dispatch) => {
    const timeFrom = getQueryParams("time_from") || "";
    const timeTo = getQueryParams("time_to") || "";
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .fetchReportProducSold(
        store_code,
        page,
        branch_id,
        params,
        params_agency,
        true
      )
      .then((res) => {
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
                  console.log("item", item);
                  var newItem = {};
                  var arangeKeyItem = {
                    stt: i,
                    name: item.name ?? "",
                    quantity: item.quantity ?? "",
                  };
                  Object.entries(arangeKeyItem).forEach(
                    ([key, value], index) => {
                      if (key == "stt") {
                        newItem["STT"] = value;
                      }
                      if (key == "name") {
                        newItem["Tên sản phẩm"] = value;
                      }
                      if (key == "quantity") {
                        newItem["Số lượng bán"] = value;
                      }
                    }
                  );
                  newArray.push(newItem);
                  i++;
                }
                var header = [];
                if (newArray.length > 0) {
                  Object.entries(newArray[0]).forEach(([key, value], index) => {
                    header.push(key);
                  });
                }
                // saveAsExcel({ data: newArray, header: header });
                var data = newArray;
                var data_header = header;
                XlsxPopulate.fromBlankAsync().then(async (workbook) => {
                  const sheet1 = workbook.sheet(0);
                  const sheetData = getSheetData(data, data_header);

                  const totalColumns = sheetData[0].length;
                  sheet1
                    .range("A1:" + String.fromCharCode(64 + totalColumns) + "1")
                    .merged(true);
                  sheet1.cell("A1").value(`Từ ${timeFrom} đến ${timeTo}`);
                  sheet1.cell("A2").value(sheetData);
                  sheet1.column("B").width(100);
                  const range = sheet1.usedRange();
                  // const endColumn = String.fromCharCode(64 + totalColumns);

                  const endColumn = "Z";
                  sheet1.row(1).style("bold", true);

                  sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
                  range.style("border", true);

                  sheet1.range("AA1:AJ1").style("fill", "F4D03F");
                  range.style("border", true);

                  return workbook.outputAsync().then((res) => {
                    saveAs(res, "BAO CAO SAN PHAM DA BAN.xlsx");
                  });
                });
              }
            }
          }
        }
      });
  };
};

export const exportReportProductSoldV2 = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  return (dispatch) => {
    const timeFrom = getQueryParams("time_from") || "";
    const timeTo = getQueryParams("time_to") || "";
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .fetchReportProducSoldV2(
        store_code,
        page,
        branch_id,
        params,
        params_agency,
        true
      )
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        console.log("res.data.data====", res.data);
        exportToExcel(res.data, timeFrom, timeTo);
      });
  };
};

function exportToExcel(responseData, startDate, endDate) {
  const excelData = [];
  let stt = 1;

  // Duyệt qua từng SKU trong dữ liệu response
  for (const sku in responseData.data) {
    if (responseData.data.hasOwnProperty(sku)) {
      const products = responseData.data[sku];

      // Duyệt qua từng sản phẩm với cùng SKU
      products.forEach((product, index) => {
        excelData.push({
          STT: index === 0 ? stt : "", // Chỉ đặt STT cho dòng đầu tiên
          "Mã sản phẩm": sku,
          "Tên sản phẩm": product.name,
          "Số lượng bán": product.quantity,
          "Giá bán": product.price,
          "Thành tiền": product.amount,
        });
      });
      stt++; // Tăng số thứ tự cho nhóm SKU tiếp theo
    }
  }

  // Tạo file Excel với XlsxPopulate
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    const sheet = workbook.sheet(0);

    // Thêm dòng đầu tiên với nội dung "Từ [ngày bắt đầu] đến [ngày kết thúc]" và bôi vàng
    sheet.cell("A1").value(`Từ ${startDate} đến ${endDate}`);
    sheet.range("A1:F1").merged(true).style("fill", "F4D03F");
    // sheet.range("A1:" + endColumn + "1").style("fill", "F4D03F");

    // Thiết lập tiêu đề cột
    const headers = [
      "STT",
      "Mã sản phẩm",
      "Tên sản phẩm",
      "Số lượng bán",
      "Giá bán",
      "Thành tiền",
    ];
    headers.forEach((header, index) => {
      sheet
        .cell(2, index + 1)
        .value(header)
        .style("bold", true); // Đặt in đậm cho tiêu đề
    });

    // Ghi dữ liệu vào các dòng Excel, bắt đầu từ dòng thứ 3
    excelData.forEach((data, rowIndex) => {
      Object.values(data).forEach((value, colIndex) => {
        sheet.cell(rowIndex + 3, colIndex + 1).value(value);
      });
    });

    // Xuất file
    workbook.outputAsync().then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "BAO CAO SAN PHAM DA BAN.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  });
}
export const exportAllBillByMethodPayment = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null,
  methodPaymentId
) => {
  return (dispatch) => {
    const timeFrom = getQueryParams("time_from") || "";
    const timeTo = getQueryParams("time_to") || "";

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .fetchAllBillByMethodPayment(
        store_code,
        page,
        branch_id,
        params,
        params_agency,
        methodPaymentId,
        true
      )
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        const handleGetPaymentMethodName = (paymentMethodId) => {
          const payment = [
            { id: 0, name: "Thanh toán khi nhận hàng" },
            { id: 1, name: "Chuyển khoản đến tài khoản ngân hàng" },
            { id: 2, name: "Thanh toán bằng VNPay" },
            { id: 3, name: "Thanh toán bằng OnePay" },
            { id: 4, name: "Thanh toán bằng Momo" },
          ];
          return payment.find((item) => item.id === paymentMethodId)?.name;
        };
        if (res.data.code !== 401) {
          if (typeof res.data.data != "undefined") {
            if (typeof res.data.data.data != "undefined") {
              if (res.data.data.data.length > 0) {
                var newArray = [];

                let i = 1;
                for (const item of res.data.data.data) {
                  var newItem = {};
                  var arangeKeyItem = {
                    stt: i,
                    code: item.order_code ?? "",
                    customer: item.customer_name ?? "",
                    totalPrice: item.total_final,
                    methodPayment: handleGetPaymentMethodName(
                      item.payment_method_id
                    ),
                    createAt: item.created_at,
                  };
                  Object.entries(arangeKeyItem).forEach(
                    ([key, value], index) => {
                      if (key == "stt") {
                        newItem["STT"] = value;
                      }
                      if (key == "code") {
                        newItem["Mã đơn"] = value;
                      }
                      if (key == "customer") {
                        newItem["Tên người nhận"] = value;
                      }
                      if (key == "totalPrice") {
                        newItem["Tổng tiền"] = value;
                      }
                      if (key == "methodPayment") {
                        newItem["Phương thức thanh toán"] = value;
                      }
                      if (key == "createAt") {
                        newItem["Thời gian tạo đơn"] = value;
                      }
                      if (key == "createAt") {
                        newItem["Thời gian tạo đơn"] = value;
                      }
                    }
                  );
                  newArray.push(newItem);
                  i++;
                }
                var header = [];
                if (newArray.length > 0) {
                  Object.entries(newArray[0]).forEach(([key, value], index) => {
                    header.push(key);
                  });
                }
                var data = newArray;
                var data_header = header;
                XlsxPopulate.fromBlankAsync().then(async (workbook) => {
                  const sheet1 = workbook.sheet(0);
                  const sheetData = getSheetData(data, data_header);

                  const totalColumns = sheetData[0].length;
                  sheet1
                    .range("A1:" + String.fromCharCode(64 + totalColumns) + "1")
                    .merged(true);
                  sheet1.cell("A1").value(`Từ ${timeFrom} đến ${timeTo}`);
                  sheet1.cell("A2").value(sheetData);
                  sheet1.column("B").width(30);
                  const range = sheet1.usedRange();
                  // const endColumn = String.fromCharCode(64 + totalColumns);

                  const endColumn = "Z";
                  sheet1.row(1).style("bold", true);

                  // sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
                  range.style("border", true);

                  // sheet1.range("AA1:AJ1").style("fill", "F4D03F");
                  range.style("border", true);

                  return workbook.outputAsync().then((res) => {
                    saveAs(res, "BAO CAO THANH TOAN.xlsx");
                  });
                });
              }
            }
          }
        }
      });
  };
};

async function saveAsExcelMisa(value) {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();
    sheet1.row(1).style("bold", true);
    sheet1.range("A1:AO1").style("fill", "ccccff");
    sheet1.range("AP1:AV1").style("fill", "ccffff");
    range.style("border", true);

    return workbook.outputAsync().then((res) => {
      saveAs(res, "Ban_hang_VNĐ MẪU NHẬP MISA.xlsx");
    });
  });
}
export const exportAllListOrderMisa = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .fetchAllBill(store_code, page, branch_id, params, params_agency, true)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        const handleAddress = (
          address_detail,
          wards_name,
          district_name,
          province_name
        ) => {
          let addressDefault = "";
          if (address_detail) {
            addressDefault += address_detail ? `${address_detail}, ` : "";
          }
          if (wards_name) {
            addressDefault += wards_name ? `${wards_name}, ` : "";
          }
          if (district_name) {
            addressDefault += district_name ? `${district_name}, ` : "";
          }
          if (province_name) {
            addressDefault += province_name ? `${province_name}` : "";
          }
          return addressDefault;
        };
        if (res.data.code !== 401) {
          if (typeof res.data.data != "undefined") {
            if (typeof res.data.data.data != "undefined") {
              if (res.data.data.data.length > 0) {
                var newArray = [];

                for (const item of res.data.data.data) {
                  if (item.line_items_at_time?.length > 0) {
                    for (var product of item.line_items_at_time) {
                      var newItem = {};
                      var arangeKeyItem = {
                        voucherNumber: "",
                        accountDate: "",
                        voucherDate: "",
                        staffId: item.staff_username,
                        staffName: item.staff_name,
                        customerCode: "",
                        customerName: item.customer_name,
                        address: handleAddress(
                          item.customer_address_detail,
                          item.customer_wards_name,
                          item.customer_district_name,
                          item.customer_province_name
                        ),

                        taxCode: "",
                        phone_number: item.phone_number,
                        mobile_phone: "",
                        paraphrasing: item.customer_note,
                        customerName2: item.customer_name,
                        total_before_discount: item.total_before_discount,
                        discountMoney: item.discount,
                        gtgt: "",
                        discount_total:
                          item.total_final - item.total_before_discount,
                        total_final: item.total_final,
                        invoiced: "Chưa lập",
                        checkInvoice: "TRUE",
                        shipped: "Đã xuất",
                        typeOfDocument: "",
                        businessUnit: "",
                        orderer_customer_province: item.customer_province_name,
                        orderer_customer_district: item.customer_district_name,
                        orderer_customer_wards: item.customer_wards_name,

                        extend1: "",
                        extend2: "",
                        extend3: "",
                        extend4: "",
                        extend5: "",
                        extend6: "",
                        extend7: "",
                        extend8: "",
                        extend9: "",
                        extend10: "",
                        person_make: "",
                        time_make: item.created_at,

                        created_at: item.created_at,
                        person_edit: "",
                        updated_at: item.updated_at,
                        voucherNumber2: "",
                        invoiceNumber: item.order_code,
                        line_items_at_time: item.line_items_at_time,
                      };

                      newItem = handleBillMisa(newItem, arangeKeyItem, product);

                      newArray.push(newItem);
                    }
                  }
                }
                var header = [];
                if (newArray.length > 0) {
                  Object.entries(newArray[0]).forEach(([key, value]) => {
                    header.push(key);
                  });
                }
                saveAsExcelMisa({ data: newArray, header: header });
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

async function saveAsExcel(value) {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);

    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();
    // const endColumn = String.fromCharCode(64 + totalColumns);

    const endColumn = "Z";
    sheet1.row(1).style("bold", true);

    sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
    range.style("border", true);

    sheet1.range("AA1:AJ1").style("fill", "F4D03F");
    range.style("border", true);

    return workbook.outputAsync().then((res) => {
      saveAs(res, "DANH SACH DON HANG.xlsx");
    });
  });
}

export const fetchAllBill = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  if (branch_id != null) {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "show",
      });
      billApi
        .fetchAllBill(store_code, page, branch_id, params, params_agency)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_BILL,
              data: res.data.data,
            });
        })
        .catch(function (error) {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
        });
    };
  }
};

export const fetchReportProducSold = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null
) => {
  if (branch_id != null) {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "show",
      });
      billApi
        .fetchReportProducSold(
          store_code,
          page,
          branch_id,
          params,
          params_agency
        )
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_BILL,
              data: res.data.data,
            });
        })
        .catch(function (error) {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
        });
    };
  }
};

export const fetchAllBillByMethodPayment = (
  store_code,
  page = 1,
  branch_id,
  params = null,
  params_agency = null,
  methodPaymentId
) => {
  if (branch_id != null) {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "show",
      });
      billApi
        .fetchAllBillByMethodPayment(
          store_code,
          page,
          branch_id,
          params,
          params_agency,
          methodPaymentId
        )
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_BILL,
              data: res.data.data,
            });
        })
        .catch(function (error) {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
        });
    };
  }
};

export const fetchBillId = (store_code, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi.fetchBillId(store_code, order_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_ID_BILL,
          data: res.data.data,
        });

        billApi.fetchBillHistory(store_code, res.data.data.id).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_BILL_HISTORY,
              data: res.data.data,
            });
        });

        billApi
          .getHistoryDeliveryStatus(store_code, {
            order_code: res.data.data.order_code,
          })
          .then((res) => {
            if (res.data.code === 200)
              dispatch({
                type: Types.FETCH_DELIVERY_HISTORY,
                data: res.data.data,
              });
          });
      }
    });
  };
};

export const getCalculate = (store_code, data, branch_id = getBranchId()) => {
  return (dispatch) => {
    billApi
      .getCalculate(store_code, data, (branch_id = getBranchId()))
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        console.log(res);
        if (res.data.code !== 401)
          dispatch({
            type: Types.GET_CALCULATE,
            data: res.data.data,
          });
        else
          dispatch({
            type: Types.GET_CALCULATE,
            data: {},
          });
      })
      .catch(function (error) {
        dispatch({
          type: Types.GET_CALCULATE,
          data: {},
        });

        if (error?.response?.data?.msg_code !== "NO_LINE_ITEMS") {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        }
      });
  };
};

export const fetchBillHistory = (store_code, billId) => {
  if (
    billId == undefined ||
    billId == null ||
    billId == "undefined" ||
    billId == 0
  ) {
    return;
  }

  return (dispatch) => {
    billApi.fetchBillHistory(store_code, billId).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_BILL_HISTORY,
          data: res.data.data,
        });
    });
  };
};

export const fetchHistoryPay = (store_code, order_code) => {
  if (
    order_code == undefined ||
    order_code == null ||
    order_code == "undefined" ||
    order_code == 0
  ) {
    return;
  }

  return (dispatch) => {
    billApi.fetchHistoryPay(store_code, order_code).then((res) => {
      if (res.data.code === 200)
        dispatch({
          type: Types.FETCH_ALL_HISTORY_PAY,
          data: res.data.data,
        });
    });
  };
};

export const updateStatusOrder = (data, store_code, billId, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateStatusOrder(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
        if (
          billId == undefined ||
          billId == null ||
          billId == "undefined" ||
          billId == 0
        ) {
          return;
        } else {
          billApi.fetchBillHistory(store_code, billId).then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_BILL_HISTORY,
                data: res.data.data,
              });
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const updateListStatusOrder = (
  data,
  store_code,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateListStatusOrder(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        onSuccess();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const updateStatusPayment = (data, store_code, billId, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateStatusPayment(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
        billApi.fetchBillHistory(store_code, billId).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_BILL_HISTORY,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const sendOrderToDelivery = (
  data,
  store_code,
  billId,
  order_code,
  order_status_code,
  bill
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .sendOrderToDelivery(store_code, {
        order_code: order_code,
      })
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        if (bill.order_status_code === "SHIPPING") {
          billApi.fetchBillId(store_code, order_code).then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ID_BILL,
                data: res.data.data,
              });
          });
        } else {
          billApi
            .updateStatusOrder(store_code, {
              order_code: order_code,
              order_status_code: order_status_code,
            })
            .then((res) => {
              billApi.fetchBillId(store_code, order_code).then((res) => {
                if (res.data.code !== 401)
                  dispatch({
                    type: Types.FETCH_ID_BILL,
                    data: res.data.data,
                  });
              });
              if (
                billId == undefined ||
                billId == null ||
                billId == "undefined" ||
                billId == 0
              ) {
                return;
              } else {
                billApi.fetchBillHistory(store_code, billId).then((res) => {
                  if (res.data.code !== 401)
                    dispatch({
                      type: Types.FETCH_BILL_HISTORY,
                      data: res.data.data,
                    });
                });
              }
            })
            .catch(function (error) {
              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "danger",
                  title: "Lỗi",
                  disable: "show",
                  content: error?.response?.data?.msg,
                },
              });
            });

          billApi.getHistoryDeliveryStatus(store_code, data).then((res) => {
            if (res.data.code === 200)
              dispatch({
                type: Types.FETCH_DELIVERY_HISTORY,
                data: res.data.data,
              });
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const cancelConnectToDelivery = (
  store_code,
  billId,
  order_code,
  order_status_code
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .cancelConnectToDelivery(store_code, order_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const updateOrder = (data, store_code, order_code, onSuccess) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });

    billApi
      .updateOrder(data, store_code, order_code)
      .then((res) => {
        if (res.data.code === 200) {
          if (onSuccess) onSuccess();
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          billApi.fetchBillId(store_code, order_code).then((res) => {
            if (res.data.code === 200)
              dispatch({
                type: Types.FETCH_ID_BILL,
                data: res.data.data,
              });
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const syncShipment = (store_code, order_code, data, syncArr) => {
  return (dispatch) => {
    billApi
      .syncShipment(store_code, order_code, data)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_STATUS_SYNC_SHIPMENT,
            data: syncArr?.map((v) => {
              if (v.order_code === order_code) {
                return {
                  order_code: order_code,
                  payment_status: res.data.payment_status,
                  order_status: res.data.order_status,
                  status: Types.SUCCESS,
                };
              } else {
                return v;
              }
            }),
          });
        }
      })
      .catch(function (error) {
        console.log(order_code, syncArr);

        dispatch({
          type: Types.UPDATE_STATUS_SYNC_SHIPMENT,
          data: syncArr?.map((v) => {
            if (v.order_code === order_code) {
              return {
                order_code: order_code,
                payment_status: null,
                order_status: null,
                status: Types.FAILURE,
              };
            } else {
              return v;
            }
          }),
        });
      });
  };
};

export const getHistoryDeliveryStatus = (data, store_code) => {
  return (dispatch) => {
    billApi
      .getHistoryDeliveryStatus(store_code, data)
      .then((res) => {
        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_DELIVERY_HISTORY,
            data: res.data.data,
          });
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };
};

export const fetchChatId = (store_code, customerId, pag = 1) => {
  return (dispatch) => {
    chatApi
      .fetchChatId(store_code, customerId, pag)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_CHAT,
            data: res.data.data,
          });
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };
};
export const sendMessage = (store_code, customerId, message) => {
  console.log(store_code, customerId, message);
  return (dispatch) => {
    chatApi
      .postMessage(store_code, customerId, { content: message })
      .then((res) => {
        console.log(res);
        if (res.data.code !== 401) {
          if (res.data.code == 400) {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: res.data.msg,
              },
            });
          } else {
            dispatch({
              type: Types.FETCH_ID_CHAT_USER,
              data: {
                customer_id: customerId,
                content: message,
                link_images: null,
                is_user: true,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
              },
            });
          }
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.FETCH_ID_CHAT_USER,
          data: {},
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

function getSizeImg(file, url) {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    var width = 0,
      height = 0,
      size = 0;
    if (file) {
      var img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function () {
        var _width = img.naturalWidth,
          _height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        console.log(_width, _height);
        height = _height;
        width = _width;
        size = file.size;
        resolve({
          link_images: url,

          height: height,
          width: width,
          size: size,
        });
      };
    }
  });
}

export const uploadImgChat = function (store_code, customerId, files) {
  return async (dispatch) => {
    var images = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      var _file = await compressed(files[i]);
      fd.append(`image`, _file);
      try {
        var res = await uploadApi.upload(fd);

        if (res.data.code == 400) {
          {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: res.data.msg,
              },
            });
          }
        } else {
          images.push(await getSizeImg(_file, res.data.data));
        }
        if (i == files.length - 1) {
          var link_images = JSON.stringify(images);
          chatApi
            .postMessage(store_code, customerId, { link_images: link_images })
            .then((res) => {
              console.log(link_images);
              if (res.data.code !== 401)
                if (res.data.code == 400) {
                  dispatch({
                    type: Types.ALERT_UID_STATUS,
                    alert: {
                      type: "danger",
                      title: "Lỗi",
                      disable: "show",
                      content: res.data.msg,
                    },
                  });
                } else {
                  dispatch({
                    type: Types.FETCH_ID_CHAT_USER,
                    data: {
                      customer_id: customerId,
                      content: null,
                      link_images: link_images,
                      is_user: true,
                      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    },
                  });
                }
            })
            .catch(() => {
              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "danger",
                  title: "Lỗi",
                  disable: "show",
                  content: res.data.msg,
                },
              });
            });
        }
      } catch (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      }
    }
  };
};

export const postRefund = (data, store_code, branch = getBranchId()) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .postRefund(data, store_code, branch)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        history.goBack();
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const postCashRefund = (
  order_code,
  data,
  store_code,
  branch = getBranchId()
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .postCashRefund(order_code, data, store_code, branch)
      .then((res) => {
        billApi.fetchBillId(store_code, order_code).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401) {
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });

            billApi
              .fetchBillHistory(store_code, res.data.data.id)
              .then((res) => {
                if (res.data.code !== 401)
                  dispatch({
                    type: Types.FETCH_BILL_HISTORY,
                    data: res.data.data,
                  });
              });
            billApi.fetchHistoryPay(store_code, order_code).then((res) => {
              if (res.data.code === 200)
                dispatch({
                  type: Types.FETCH_ALL_HISTORY_PAY,
                  data: res.data.data,
                });
            });

            billApi
              .getHistoryDeliveryStatus(store_code, {
                order_code: res.data.data.order_code,
              })
              .then((res) => {
                if (res.data.code === 200)
                  dispatch({
                    type: Types.FETCH_DELIVERY_HISTORY,
                    data: res.data.data,
                  });
              });
          }
        });

        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        // history.goBack();
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const deleteOrder = (store_code, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .deleteOrder(store_code, order_code)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          dispatch({
            type: Types.DELETE_ORDER,
            data: res.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const updateShippingPackage = (
  store_code,
  order_code,
  data,
  funcModal = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateShippingPackage(store_code, order_code, data)
      .then((res) => {
        if (funcModal) funcModal();
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
