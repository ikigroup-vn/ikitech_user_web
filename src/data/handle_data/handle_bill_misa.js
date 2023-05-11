export default function handleBillMisa(newItem, arangeKeyItem) {
  Object.entries(arangeKeyItem).forEach(([key, value], index) => {
    if (key == "number") {
      newItem["Hiển thị trên số"] = value;
    }
    if (key == "sale_from") {
      newItem["Hình thức bán hàng"] = value;
    }
    if (key == "payment_status") {
      newItem["Phương thức thanh toán"] = value;
    }
    if (key == "checkExportInventory") {
      newItem["Kiêm phiếu xuất kho"] = value;
    }
    if (key == "exportTariffArea") {
      newItem["XK vào khu phi thuế quan và các TH được coi như XK"] = value;
    }
    if (key == "invoiceAttached") {
      newItem["Lập kèm hóa đơn"] = value;
    }
    if (key == "billed") {
      newItem["Đã lập hóa đơn"] = value;
    }
    if (key == "accountDate") {
      newItem["Ngày hạch toán (*)"] = value;
    }
    if (key == "voucherDate") {
      newItem["Ngày chứng từ (*)"] = value;
    }
    if (key == "shipped") {
      newItem["Đã ship hàng"] = value;
    }
    if (key == "voucherNumber2") {
      newItem["Số chứng từ (Sổ TC)"] = value;
    }
    if (key == "voucherNumber") {
      newItem["Số chứng từ"] = value;
    }

    if (key == "person_make") {
      newItem["Người tạo"] = value;
    }
    if (key == "person_edit") {
      newItem["Người sửa"] = value;
    }

    if (key == "orderer_customer_wards") {
      newItem["Phường/Xã"] = value;
    }
    if (key == "orderer_customer_district") {
      newItem["Quận/Huyện"] = value;
    }
    if (key == "orderer_customer_province") {
      newItem["Tỉnh/TP"] = value;
    }

    if (key == "order_from") {
      newItem["Đặt hàng từ"] = value;
    }
    if (key == "extend1") {
      newItem["Trường mở rộng 1"] = value;
    }
    if (key == "extend2") {
      newItem["Trường mở rộng 2"] = value;
    }
    if (key == "extend3") {
      newItem["Trường mở rộng 3"] = value;
    }
    if (key == "extend4") {
      newItem["Trường mở rộng 4"] = value;
    }
    if (key == "extend5") {
      newItem["Trường mở rộng 5"] = value;
    }
    if (key == "extend6") {
      newItem["Trường mở rộng 6"] = value;
    }
    if (key == "extend7") {
      newItem["Trường mở rộng 7"] = value;
    }
    if (key == "extend8") {
      newItem["Trường mở rộng 8"] = value;
    }
    if (key == "extend9") {
      newItem["Trường mở rộng 9"] = value;
    }
    if (key == "extend10") {
      newItem["Trường mở rộng 10"] = value;
    }

    if (key == "voteIssued") {
      newItem["Số phiếu xuất"] = value;
    }
    if (key == "reasonExport") {
      newItem["Lý do xuất"] = value;
    }
    if (key == "invoiceNumber") {
      newItem["Số hóa đơn"] = value;
    }
    if (key == "invoiceDate") {
      newItem["Ngày hóa đơn"] = value;
    }
    if (key == "staffId") {
      newItem["Mã nhân viên"] = value;
    }
    if (key == "businessUnit") {
      newItem["Đơn vị kinh doanh"] = value;
    }
    if (key == "invoiced") {
      newItem["Đã lập hóa đơn"] = value;
    }
    if (key == "typeOfDocument") {
      newItem["Loại chứng từ"] = value;
    }
    if (key == "customerCode") {
      newItem["Mã khách hàng"] = value;
    }
    if (key == "customerName") {
      newItem["Tên khách hàng"] = value;
    }
    if (key == "customerName2") {
      newItem["Người mua hàng"] = value;
    }
    if (key == "address") {
      newItem["Địa chỉ"] = value;
    }
    if (key == "taxCode") {
      newItem["Mã số thuế"] = value;
    }
    if (key == "paraphrasing") {
      newItem["Diễn giải"] = value;
    }
    if (key == "submitAccount") {
      newItem["Nộp vào TK"] = value;
    }
    if (key == "saleStaff") {
      newItem["NV bán hàng"] = value;
    }
    if (key == "sku") {
      newItem["Mã hàng (*)"] = value;
    }
    if (key == "productName") {
      newItem["Tên hàng"] = value;
    }

    if (key == "promotionallGoods") {
      newItem["Hàng khuyến mại"] = value;
    }
    if (key == "cashExpensesDebitsAccount") {
      newItem["TK Tiền/Chi phí/Nợ (*)"] = value;
    }
    if (key == "accountRevenue") {
      newItem["TK Doanh thu/Có (*)"] = value;
    }
    if (key == "unit") {
      newItem["ĐVT"] = value;
    }
    if (key == "quantity") {
      newItem["Số lượng"] = value;
    }
    if (key == "unitPriceAfterTax") {
      newItem["Đơn giá sau thuế"] = value;
    }
    if (key == "unitPrice") {
      newItem["Đơn giá"] = value;
    }
    if (key == "intoMoney") {
      newItem["Thành tiền"] = value;
    }

    if (key == "discountRate") {
      newItem["Tỷ lệ CK (%)"] = value;
    }

    if (key == "discountMoney") {
      newItem["Tiền chiết khấu"] = value;
    }

    if (key == "discountAccount") {
      newItem["TK chiết khấu"] = value;
    }

    if (key == "warehouse") {
      newItem["Kho"] = value;
    }
    if (key == "staffName") {
      newItem["Tên nhân viên"] = value;
    }
    if (key == "costAccount") {
      newItem["TK giá vốn"] = value;
    }

    if (key == "warehouseAccount") {
      newItem["TK Kho"] = value;
    }

    if (key == "unitPriceCapital") {
      newItem["Đơn giá vốn"] = value ?? "";
    }

    if (key == "funds") {
      newItem["Tiền vốn"] = value;
    }

    if (key == "gtgt") {
      newItem["Tiền thuế GTGT"] = value;
    }

    if (key == "updated_at") {
      newItem["Ngày sửa"] = value;
    }

    if (key == "goodsKeepSell") {
      newItem["Hàng hóa giữ hộ/bán hộ"] = value;
    }
  });

  return newItem;
}
