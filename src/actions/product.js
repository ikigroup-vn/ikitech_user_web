import * as Types from "../constants/ActionType";
import history from "../history";
import * as productApi from "../data/remote/product";
import * as attributePApi from "../data/remote/attribute_product";
import * as uploadApi from "../data/remote/upload";
import { compressed, formatStringCharactor } from "../ultis/helpers";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import { getBranchId, getBranchIds } from "../ultis/branchUtils";

export const fetchAllProduct = (
  store_code,
  page = 1,
  params,
  agency_type_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllData(store_code, page, params, agency_type_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllProductV2 = (
  store_code,
  branch_id,
  page = 1,
  params,
  agency_type_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllProductV2(store_code, branch_id, page, params, agency_type_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllProductEcommerce = (store_code, page = 1, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchAllProductEcommerce(store_code, page, data).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        if (data.provider == "tiki") {
          dispatch({
            type: Types.FETCH_ALL_PRODUCT_TIKI,
            data: res.data.data,
          });
        } else if (data.provider == "shopee") {
          {
            dispatch({
              type: Types.FETCH_ALL_PRODUCT_SHOPEE,
              data: res.data.data,
            });
          }
        } else {
          {
            dispatch({
              type: Types.FETCH_ALL_PRODUCT_SENDO,
              data: res.data.data,
            });
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

async function saveAsExcel(value, nameFile = "Danh sách sản phẩm") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);

    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);
    const listColumn = [
      {
        name: "A",
        width: 14,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "B",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "C",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "D",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "E",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "F",
        width: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "G",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "H",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "I",
        width: 5,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "J",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "K",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "L",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "M",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "N",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "O",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "P",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "Q",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "R",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "S",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "T",
        width: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "U",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "V",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "W",
        width: 12,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
    ];
    for (let column of listColumn) {
      sheet1.column(column.name).style(column.style);
      sheet1.column(column.name).width(column.width);
    }

    sheet1.range("A1:" + endColumn + "1").style({
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
    });
    const row = sheet1.row(1);
    row.height(50);
    sheet1.range("A1:P1").style("fill", "deebf7");
    sheet1.range("Q1:" + endColumn + "1").style("fill", "f6f9d4");
    // range.style("border", true);
    sheet1.freezePanes(1, 1);
    return workbook.outputAsync().then((res) => {
      saveAs(res, `${nameFile}.xlsx`);
    });
  });
}

async function saveAsSheetInventoryExcel(value, nameFile = "DS_kiem_kho") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);

    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);

    const listColumn = [
      {
        name: "A",
        width: 18,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "B",
        width: 30,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "C",
        width: 12,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "D",
        width: 15,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "E",
        width: 20,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
    ];
    for (let column of listColumn) {
      sheet1.column(column.name).style(column.style);
      sheet1.column(column.name).width(column.width);
    }

    sheet1.range("A1:" + endColumn + "1").style({
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
    });
    const row = sheet1.row(1);
    row.height(50);

    // range.style("border", true);
    sheet1.freezePanes(1, 1);
    return workbook.outputAsync().then((res) => {
      saveAs(res, `${nameFile}.xlsx`);
    });
  });
}

export const fetchAllListProduct = (store_code, search) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchAllListProduct(store_code, search).then((res) => {
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
                var isCheckedDistribute = false;
                var arangeKeyItem = {
                  name: item.name,
                  barcode: item.barcode,
                  check_inventory: item.check_inventory,
                  shelf_position: item.shelf_position,
                  quantity_in_stock: item.quantity_in_stock,
                  categories: item.categories,
                  attributes: item.attributes,
                  attribute_search_children: item.attribute_search_children,
                  weight: item.weight,
                  type_share_collaborator_number:
                    item.type_share_collaborator_number,
                  percent_collaborator: item.percent_collaborator,
                  point_for_agency: item.point_for_agency,
                  full_description: item.full_description,
                  content_for_collaborator: item.content_for_collaborator,
                  status: item.status,
                  seo_title: item.seo_title,
                  seo_description: item.seo_description,
                  distributes: item.distributes,
                  sku: item.sku,
                  images: item.images,
                  money_amount_collaborator: item.money_amount_collaborator,
                };
                // eslint-disable-next-line no-loop-func
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "full_description") {
                    if (value != null && value.length < 32000) {
                      newItem["Mô tả"] = value;
                    } else {
                      newItem["Mô tả"] = "";
                    }
                  }

                  if (key == "name") {
                    newItem["Tên sản phẩm"] = formatStringCharactor(value);
                    // newItem["Tên sản phẩm"] = value
                  }

                  if (key == "type_share_collaborator_number" && value == 0) {
                    newItem[
                      "Hoa hồng CTV (%/VND)"
                    ] = `${arangeKeyItem["percent_collaborator"]}(%)`;
                  } else if (
                    key == "type_share_collaborator_number" &&
                    value == 1
                  ) {
                    newItem[
                      "Hoa hồng CTV (%/VND)"
                    ] = `${arangeKeyItem["money_amount_collaborator"]}(VND)`;
                  }
                  if (key == "shelf_position") {
                    newItem["Vị trí kệ hàng"] = value;
                  }

                  if (key == "categories") {
                    if (Array.isArray(value)) {
                      var stringCategory = "";
                      for (const [index, category] of value.entries()) {
                        if (
                          category.name != null &&
                          typeof category.name != "undefined"
                        ) {
                          var stringCategoryChild = "";
                          for (const [
                            index,
                            categoryChild,
                          ] of category.category_children.entries()) {
                            if (categoryChild.name) {
                              stringCategoryChild += `${formatStringCharactor(
                                categoryChild.name
                              )}${
                                index == category.category_children.length - 1
                                  ? ""
                                  : ","
                              }`;
                            }
                          }
                          if (index == value.length - 1) {
                            stringCategory =
                              stringCategory +
                              formatStringCharactor(category.name) +
                              `${
                                stringCategoryChild != ""
                                  ? `[${stringCategoryChild}]`
                                  : ""
                              }`;
                          } else {
                            stringCategory =
                              stringCategory +
                              formatStringCharactor(category.name) +
                              `${
                                stringCategoryChild != ""
                                  ? `[${stringCategoryChild}]`
                                  : ""
                              }` +
                              ";";
                          }
                        }
                      }
                      newItem["Danh mục"] = stringCategory;
                    }
                  }

                  if (key == "attribute_search_children") {
                    if (Array.isArray(value)) {
                      var stringAttributeSearch = "";
                      for (const [index, attribute_search] of value.entries()) {
                        if (
                          attribute_search.name &&
                          typeof attribute_search.name != "undefined"
                        ) {
                          if (index == value.length - 1) {
                            stringAttributeSearch += formatStringCharactor(
                              attribute_search.name
                            );
                          } else {
                            stringAttributeSearch +=
                              formatStringCharactor(attribute_search.name) +
                              ",";
                          }
                        }
                      }
                      newItem["Thuộc tính tìm kiếm"] = stringAttributeSearch;
                    }
                  }

                  if (key == "weight") {
                    newItem["Cân nặng"] = value;
                  }

                  if (key == "sku") {
                    newItem["Mã SKU"] = value;
                  }

                  if (key == "images") {
                    if (Array.isArray(value)) {
                      var stringImg = "";
                      for (const [index, img] of value.entries()) {
                        if (
                          img.image_url != null &&
                          typeof img.image_url != "undefined"
                        ) {
                          if (index == value.length - 1) {
                            stringImg = stringImg + img.image_url;
                          } else {
                            stringImg = stringImg + img.image_url + ",";
                          }
                        }
                      }
                      newItem["Hình ảnh"] = stringImg;
                    }
                  }
                  if (key == "barcode") {
                    newItem["Mã BARCODE"] = value;
                  }
                  if (key == "check_inventory") {
                    newItem["Theo dõi kho (Có/Không)"] = `${
                      value ? "Có" : "Không"
                    }`;
                  }
                  if (key == "point_for_agency") {
                    newItem["Xu cho đại lý"] = `${value ? value : 0}`;
                  }
                  if (key == "content_for_collaborator") {
                    newItem["Nội dung cho CTV"] = `${value ? value : ""}`;
                  }
                  if (key == "status") {
                    newItem["Trạng thái (Ẩn/Hiện)"] = `${
                      value == 0 ? "Hiện" : "Ẩn"
                    }`;
                  }
                  if (key == "seo_title") {
                    newItem["Tiêu đề SEO"] = `${value ? value : ""}`;
                  }
                  if (key == "seo_description") {
                    newItem["Miêu tả SEO"] = `${value ? value : ""}`;
                  }
                  if (key == "attributes") {
                    if (Array.isArray(value)) {
                      var stringAttribute = "";
                      for (const [index, attribute] of value.entries()) {
                        if (
                          attribute.name != null &&
                          typeof attribute.name != "undefined"
                        ) {
                          if (index == value.length - 1) {
                            stringAttribute += `${formatStringCharactor(
                              attribute.name
                            )}:${attribute.value}`;
                          } else {
                            stringAttribute += `${formatStringCharactor(
                              attribute.name
                            )}:${attribute.value};`;
                          }
                        }
                      }
                      newItem["Thuộc tính"] = stringAttribute;
                    }
                  }
                  if (key == "distributes") {
                    if (value.length > 0) {
                      isCheckedDistribute = true;
                      const typeDistributeOrigin = value[0].name;
                      const typeDistributeSub = value[0]
                        .sub_element_distribute_name
                        ? `${value[0].sub_element_distribute_name}`
                        : "";
                      if (value[0].element_distributes.length > 0) {
                        for (const [
                          index,
                          element,
                        ] of value[0].element_distributes.entries()) {
                          let checkedDistributeExist = false;
                          let checkedDistributeExist2 = false;
                          if (element.sub_element_distributes?.length > 0) {
                            for (const [
                              index2,
                              elementSub,
                            ] of element.sub_element_distributes.entries()) {
                              if (
                                index == 0 &&
                                checkedDistributeExist === false &&
                                checkedDistributeExist2 === false
                              ) {
                                newItem["Phân loại (Có/Không)"] = "Có";
                                newItem["Phân loại chính"] =
                                  typeDistributeOrigin;
                                newItem["Phân loại phụ"] = typeDistributeSub;
                                newItem["DS phân loại"] = "";
                                newItem["Giá bán lẻ"] = "";
                                newItem["Giá nhập"] = "";
                                newItem["Mã SKU"] = "";
                                if (checkedDistributeExist === false) {
                                  newItem["Hình ảnh"] = "";
                                }
                                newArray.push(newItem);

                                const newItemEmpty = {};
                                for (const key of Object.keys(arangeKeyItem)) {
                                  newItemEmpty[key] = "";
                                }
                                newItemEmpty["DS phân loại"] = `${
                                  element.name
                                },${elementSub.name}${
                                  index !== element.length - 1 ? "" : ","
                                }`;
                                newItemEmpty["Giá bán lẻ"] = `${
                                  elementSub.price ? elementSub.price : "0"
                                }`;
                                newItemEmpty["Giá nhập"] = `${
                                  elementSub.import_price
                                    ? elementSub.import_price
                                    : "0"
                                }`;
                                newItemEmpty["Mã SKU"] = `${
                                  elementSub.sku ? elementSub.sku : ""
                                }`;
                                if (checkedDistributeExist2 === false) {
                                  newItemEmpty["Hình ảnh"] = element.image_url
                                    ? element.image_url
                                    : "";
                                  checkedDistributeExist2 = true;
                                }
                                newArray.push(newItemEmpty);
                              } else {
                                const newItemEmpty = {};

                                for (const key of Object.keys(arangeKeyItem)) {
                                  newItemEmpty[key] = "";
                                }
                                newItemEmpty["DS phân loại"] = `${
                                  element.name
                                },${elementSub.name}${
                                  index !== element.length - 1 ? "" : ","
                                }`;

                                newItemEmpty["Giá bán lẻ"] = `${
                                  elementSub.price ? elementSub.price : "0"
                                }`;
                                newItemEmpty["Giá nhập"] = `${
                                  elementSub.import_price
                                    ? elementSub.import_price
                                    : "0"
                                }`;
                                newItemEmpty["Mã SKU"] = `${
                                  elementSub.sku ? elementSub.sku : ""
                                }`;
                                newItemEmpty["Hình ảnh"] = element.image_url
                                  ? element.image_url
                                  : "";
                                newArray.push(newItemEmpty);
                              }
                            }
                          } else {
                            if (index == 0) {
                              newItem["Phân loại (Có/Không)"] = "Có";
                              newItem["Phân loại chính"] = typeDistributeOrigin;
                              newItem["Phân loại phụ"] = typeDistributeSub;
                              newItem["DS phân loại"] = "";

                              newItem["Giá bán lẻ"] = "";
                              newItem["Giá nhập"] = "";
                              newItem["Mã SKU"] = "";
                              newItem["Hình ảnh"] = "";
                              newArray.push(newItem);

                              const newItemEmpty = {};

                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["Giá bán lẻ"] = `${
                                element.price ? element.price : "0"
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                element.import_price
                                  ? element.import_price
                                  : "0"
                              }`;
                              newItemEmpty["DS phân loại"] = `${element.name}`;
                              newItemEmpty["Mã SKU"] = element.sku
                                ? element.sku
                                : "";
                              newItemEmpty["Hình ảnh"] = element.image_url
                                ? element.image_url
                                : "";
                              newArray.push(newItemEmpty);
                            } else {
                              const newItemEmpty = {};

                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["DS phân loại"] = `${element.name}`;
                              newItemEmpty["Giá bán lẻ"] = `${
                                element.price ? element.price : "0"
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                element.import_price
                                  ? element.import_price
                                  : "0"
                              }`;
                              newItemEmpty["Mã SKU"] = element.sku
                                ? element.sku
                                : "";
                              newItemEmpty["Hình ảnh"] = element.image_url
                                ? element.image_url
                                : "";
                              newArray.push(newItemEmpty);
                            }
                          }
                        }
                      }
                    } else {
                      newItem["Phân loại (Có/Không)"] = "Không";
                      newItem["Phân loại chính"] = "";
                      newItem["Phân loại phụ"] = "";
                      newItem["DS phân loại"] = "";
                      newItem["Giá bán lẻ"] = `${
                        item.price ? item.price : "0"
                      }`;
                      newItem["Giá nhập"] = `${
                        item.import_price ? item.import_price : "0"
                      }`;
                      newItem["Mã SKU"] = "";
                      newItem["Hình ảnh"] = "";
                    }
                  }
                });
                if (!isCheckedDistribute) {
                  newArray.push(newItem);
                }
              }
              var header = [];
              if (newArray.length > 0) {
                Object.entries(newArray[0]).forEach(([key, value], index) => {
                  header.push(key);
                });
              }
              saveAsExcel({ data: newArray, header: header });
            }
          }
        }
      }
    });
  };
};

export const fetchProductInventory = (store_code, branch_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllProductV2(store_code, branch_id, null, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          if (res.data.data.data.length > 0) {
            var newArray = [];

            for (const item of res.data.data.data) {
              var newItem = {};
              var isCheckedDistribute = false;
              var arangeKeyItem = {
                name: item.name,
                sku: item.sku,
                barcode: item.barcode,
                check_inventory: item.check_inventory,
                shelf_position: item.shelf_position,
                distributes: item.inventory.distributes,
              };
              // eslint-disable-next-line no-loop-func
              Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                if (key == "name") {
                  newItem["Tên sản phẩm"] = formatStringCharactor(value);
                }
                if (key == "sku") {
                  newItem["Mã SKU"] = value;
                }
                if (key == "barcode") {
                  newItem["Mã BARCODE"] = value;
                }
                if (key == "check_inventory") {
                  newItem["Theo dõi kho (Có/Không)"] = `${
                    value ? "Có" : "Không"
                  }`;
                }
                if (key == "shelf_position") {
                  newItem["Vị trí kệ hàng"] = value;
                }
                if (key == "distributes") {
                  if (value.length > 0) {
                    isCheckedDistribute = true;
                    if (value[0].element_distributes.length > 0) {
                      for (const [
                        index,
                        element,
                      ] of value[0].element_distributes.entries()) {
                        let checkedDistributeExist = false;
                        let checkedDistributeExist2 = false;
                        if (element.sub_element_distributes?.length > 0) {
                          for (const [
                            index2,
                            elementSub,
                          ] of element.sub_element_distributes.entries()) {
                            if (
                              index == 0 &&
                              checkedDistributeExist === false &&
                              checkedDistributeExist2 === false
                            ) {
                              newItem["Phân loại (Có/Không)"] = "Có";
                              newItem["DS phân loại"] = "";
                              newItem["Giá bán lẻ"] = "";
                              newItem["Giá vốn"] = "";
                              newItem["Giá nhập"] = "";
                              newItem["Tồn kho"] = "";
                              newArray.push(newItem);

                              const newItemEmpty = {};
                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["DS phân loại"] = `${element.name},${
                                elementSub.name
                              }${index !== element.length - 1 ? "" : ","}`;
                              newItemEmpty["Giá bán lẻ"] = `${
                                elementSub.price ? elementSub.price : "0"
                              }`;
                              newItemEmpty["Giá vốn"] = `${
                                elementSub.cost_of_capital
                                  ? elementSub.cost_of_capital
                                  : "0"
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                elementSub.import_price
                                  ? elementSub.import_price
                                  : "0"
                              }`;
                              newItemEmpty["Tồn kho"] = `${elementSub.stock}`;
                              newArray.push(newItemEmpty);
                            } else {
                              const newItemEmpty = {};

                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["DS phân loại"] = `${element.name},${
                                elementSub.name
                              }${index !== element.length - 1 ? "" : ","}`;

                              newItemEmpty["Giá bán lẻ"] = `${
                                elementSub.price ? elementSub.price : "0"
                              }`;
                              newItemEmpty["Giá vốn"] = `${
                                elementSub.cost_of_capital
                                  ? elementSub.cost_of_capital
                                  : "0"
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                elementSub.import_price
                                  ? elementSub.import_price
                                  : "0"
                              }`;
                              newItemEmpty["Tồn kho"] = `${elementSub.stock}`;
                              newArray.push(newItemEmpty);
                            }
                          }
                        } else {
                          if (index == 0) {
                            newItem["Phân loại (Có/Không)"] = "Có";
                            newItem["DS phân loại"] = "";
                            newItem["Giá bán lẻ"] = "";
                            newItem["Giá vốn"] = "";
                            newItem["Giá nhập"] = "";
                            newItem["Tồn kho"] = "";
                            newArray.push(newItem);

                            const newItemEmpty = {};

                            for (const key of Object.keys(arangeKeyItem)) {
                              newItemEmpty[key] = "";
                            }
                            newItemEmpty["Giá bán lẻ"] = `${
                              element.price ? element.price : "0"
                            }`;
                            newItemEmpty["Giá vốn"] = `${
                              element.cost_of_capital
                                ? element.cost_of_capital
                                : "0"
                            }`;
                            newItemEmpty["Giá nhập"] = `${
                              element.import_price ? element.import_price : "0"
                            }`;
                            newItemEmpty["DS phân loại"] = `${element.name}`;
                            newItemEmpty["Tồn kho"] = `${element.stock}`;
                            newArray.push(newItemEmpty);
                          } else {
                            const newItemEmpty = {};

                            for (const key of Object.keys(arangeKeyItem)) {
                              newItemEmpty[key] = "";
                            }
                            newItemEmpty["DS phân loại"] = `${element.name}`;
                            newItemEmpty["Giá bán lẻ"] = `${
                              element.price ? element.price : "0"
                            }`;
                            newItemEmpty["Giá vốn"] = `${
                              element.cost_of_capital
                                ? element.cost_of_capital
                                : "0"
                            }`;
                            newItemEmpty["Giá nhập"] = `${
                              element.import_price ? element.import_price : "0"
                            }`;
                            newItemEmpty["Tồn kho"] = `${element.stock}`;
                            newArray.push(newItemEmpty);
                          }
                        }
                      }
                    }
                  } else {
                    newItem["Phân loại (Có/Không)"] = "Không";
                    newItem["DS phân loại"] = "";
                    newItem["Giá bán lẻ"] = `${item.price ? item.price : "0"}`;
                    newItem[
                      "Giá vốn"
                    ] = `${item.inventory.main_cost_of_capital}`;
                    newItem["Giá nhập"] = `${
                      item.import_price ? item.import_price : "0"
                    }`;
                    newItem["Tồn kho"] = `${item.inventory.main_stock}`;
                  }
                }
              });
              if (!isCheckedDistribute) {
                newArray.push(newItem);
              }
            }
            var header = [];
            if (newArray.length > 0) {
              Object.entries(newArray[0]).forEach(([key, value], index) => {
                header.push(key);
              });
            }
            saveAsExcel(
              { data: newArray, header: header },
              "Danh sách sản phẩm theo kho"
            );
          }
        }
      });
  };
};

export const exportSheetInventory = (
  store_code,
  branch_id,
  params,
  sheetInventory
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    if (!sheetInventory) {
      productApi
        .fetchAllListProduct(store_code, "")
        .then((res) => {
          if (res.data.code !== 401) {
            if (res.data.data.data.length > 0) {
              let dataSheetInventory = [];
              for (const item of res.data.data.data) {
                const distribute =
                  item.inventory?.distributes !== null &&
                  item.inventory?.distributes.length > 0
                    ? item.inventory?.distributes[0]
                    : null;

                if (distribute === null) {
                  let _data = {
                    product_id: item.id,
                    name: item.name,
                    reality_exist: 0,
                    distribute_name: null,
                    element_distribute_name: null,
                    sub_element_distribute_name: null,
                  };

                  dataSheetInventory.push(_data);
                } else {
                  if (distribute.element_distributes?.length > 0) {
                    distribute.element_distributes.forEach(
                      (element, _index) => {
                        if (
                          distribute.element_distributes[0]
                            ?.sub_element_distributes?.length > 0
                        ) {
                          distribute.element_distributes[0].sub_element_distributes.forEach(
                            (sub_element) => {
                              dataSheetInventory.push({
                                product_id: item.id,
                                name: item.name,
                                reality_exist: 0,
                                distribute_name: distribute.name,
                                element_distribute_name: element.name,
                                sub_element_distribute_name: sub_element.name,
                              });
                            }
                          );
                        } else {
                          let _data = {
                            product_id: item.id,
                            name: item.name,
                            reality_exist: 0,
                            distribute_name: distribute.name,
                            element_distribute_name: element.name,
                            sub_element_distribute_name: null,
                          };

                          dataSheetInventory.push(_data);
                        }
                      }
                    );
                  }
                }
              }

              componentExportSheet(dataSheetInventory);
            }
          }
        })
        .finally(() => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        });
    } else {
      componentExportSheet(sheetInventory);
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
    }
  };
};

const componentExportSheet = (dataSheetInventory) => {
  var newArray = [];

  for (const item of dataSheetInventory) {
    var newItem = {};
    var arangeKeyItem = {
      product_id: item.product_id,
      name: item.name,
      distribute_name: item.distribute_name,
      element_distribute_name: item.element_distribute_name,
      sub_element_distribute_name: item.sub_element_distribute_name,
      reality_exist: 0,
    };
    // eslint-disable-next-line no-loop-func
    Object.entries(arangeKeyItem).forEach(([key, value], index) => {
      if (key == "product_id") {
        newItem["Mã sản phẩm"] = formatStringCharactor(value);
      }
      if (key == "name") {
        newItem["Tên sản phẩm"] = formatStringCharactor(value);
      }
      if (key == "distribute_name") {
        newItem["Tên phân loại chính"] = value;

        if (item["sub_element_distribute_name"]) {
          newItem[
            "DS phân loại"
          ] = `${item["element_distribute_name"]},${item["sub_element_distribute_name"]}`;
        } else {
          newItem["DS phân loại"] = `${item["element_distribute_name"] ?? ""}`;
        }
      }
      if (key == "reality_exist") {
        newItem["Tồn kho thực tế"] = value;
      }
    });

    newArray.push(newItem);
  }
  var header = [];
  if (newArray.length > 0) {
    Object.entries(newArray[0]).forEach(([key, value], index) => {
      header.push(key);
    });
  }
  saveAsSheetInventoryExcel({ data: newArray, header: header }, "DS_kiem_kho");
};

export const fetchAllAttributeP = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi.fetchAllData(store_code).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
        data: res.data.data,
      });
    });
  };
};

export const updateAttributeP = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi
      .updateAttributeP(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributePApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
              data: res.data.data,
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

export const destroyAttributeP = ($this, store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi

      .updateAttributeP(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributePApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
              data: res.data.data,
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
          if (typeof $this.list_attribute[$this.name] !== "undefined") {
            delete $this.list_attribute[$this.name];
            $this._this.setState({ list_attribute: $this.list_attribute });
          }
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
export const uploadAvataProduct = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi
      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.UPLOAD_PRODUCT_IMG,
          data: res.data.data,
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

export const editStock = (
  store_code,
  branch_id,
  data,
  page = 1,
  params = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .editStock(store_code, branch_id, data)
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
        productApi
          .fetchAllProductV2(store_code, branch_id, page, params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const editListStock = (
  store_code,
  branch_id,
  data,
  page = 1,
  params = null,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .editListStock(store_code, branch_id, data)
      .then((res) => {
        if (onSuccess) onSuccess();
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
        productApi
          .fetchAllProductV2(store_code, branch_id, page, params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const uploadListImgProduct = function (files) {
  return async (dispatch) => {
    var images = [];
    dispatch({
      type: Types.LOADING_UPLOAD_ALL_PRODUCT_IMG,
      loading: true,
    });
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append(`image`, await compressed(files[i]));
      try {
        var res = await uploadApi.upload(fd);
      } catch (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "hide",
            content: error?.response?.data?.msg,
          },
        });
      }
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
        images.push(res.data.data);
      }
      if (i == files.length - 1) {
        dispatch({
          type: Types.UPLOAD_ALL_PRODUCT_IMG,
          data: images,
        });
      }
    }
    dispatch({
      type: Types.LOADING_UPLOAD_ALL_PRODUCT_IMG,
      loading: false,
    });
  };
};
export const uploadListImgProductV2 = function (files) {
  return async (dispatch) => {
    var images = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();

      fd.append(`image`, await compressed(files[i]));
      try {
        var res = await uploadApi.upload(fd);
      } catch (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "hide",
            content: error?.response?.data?.msg,
          },
        });
      }
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
        images.push(res.data.data);
      }
      if (i == files.length - 1) {
        dispatch({
          type: Types.UPLOAD_ALL_PRODUCT_IMG_V2,
          data: images,
        });
      }
    }
  };
};

export const uploadImgDistribute = (file, imageId, listImages) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi

      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        var listImg = [...listImages];
        var item = {
          data: res.data.data,
          index: imageId.index,
          // key: imageId.key,
          // keyItem: imageId.keyItem,
        };
        listImg[0] = item;
        dispatch({
          type: Types.UPLOAD_ALL_DISTRIBUTE_IMG,
          data: listImg,
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

export const postProduct = (store_code, data) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Giá tiền sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createProduct(store_code, data)
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
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const postProductV2 = (store_code, branch_id, data, funcModal) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Giá tiền sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createProductV2(store_code, branch_id, data)
      .then((res) => {
        if (funcModal) {
          funcModal(res.data.data?.id);
        }
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
        var content = "";
        // if (typeof error.response.data.msg == "undefined")
        //   content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        // else
        // content = error.response.data.msg_code;
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
            content: "Lỗi hệ thống",
          },
        });
      });
  };
};

export const postMultiProduct = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createMultiProduct(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({ type: Types.IMPORT_FILE_PRODUCTS, data: res.data.data });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: `<div>
            <span>- Tổng số lượng import: ${res.data.data.total_products_request} </span></br>
            <span>     - Tổng số bỏ qua khi trùng tên: ${res.data.data.total_skip_same_name}</span></br>
            <span>  - Tổng số thay đổi khi trùng tên: ${res.data.data.total_changed_same_name}</span></br>
            <span>   - Tổng số thất bại: ${res.data.data.total_failed}</span></br>
            <span> - Tổng số được thêm mới: ${res.data.data.total_new_add}</span>
                      </div>
            `,
          },
        });
        productApi.fetchAllData(store_code, 1, null).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_PRODUCT,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng kiểm tra lại các trường dữ liệu";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateAgencyPrice = (
  store_code,
  data,
  productId,
  page,
  url = null,
  isNotReplace = true,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    if (data.main_price) {
      const _value_price = data.main_price.toString().replace(/,/g, "");
      if (isNaN(Number(_value_price))) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi ",
            disable: "show",
            content: "Sai định dạng hoặc bị để trống",
          },
        });
        return;
      }
    }

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateAgencyPrice(store_code, data, productId)
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
        if (isNotReplace) {
          if (url) history.replace(url);
          // history.push(`/product/index/${store_code}/${page}`);
          else history.goBack();
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updatePriceOneProduct = (store_code, productId, price) => {
  const data = {
    price: price,
  };
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updatePriceOneProduct(store_code, productId, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST,
          data: res.data.data,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
          },
        });
      });
  };
};

export const updateNameOneProduct = (store_code, productId, name) => {
  const data = {
    name: name,
  };
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateNameOneProduct(store_code, productId, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST,
          data: res.data.data,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
          },
        });
      });
  };
};

export const updateOneFieldProduct = (
  store_code,
  name_field,
  value_field,
  productId,
  page
) => {
  const data = {
    one_field: true,
    name_field,
    value_field,
  };
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateProduct(store_code, data, productId, page)
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
        history.push(`/product/index/${store_code}?page=${page}`);
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateProduct = (
  store_code,
  data,
  productId,
  page,
  params,
  funcModal
) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateProduct(store_code, data, productId)
      .then((res) => {
        funcModal();
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
        // history.goBack();
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateDistribute = (
  store_code,
  data,
  productId,
  branchId,
  form,
  page,
  params,
  funcModal
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateDistribute(store_code, data, productId, branchId)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch(
          updateProduct(store_code, form, productId, page, params, funcModal)
        );
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg || error,
          },
        });
      });
    // .finally(() => {
    //   dispatch(
    //     updateProduct(store_code, form, productId, page, params, funcModal)
    //   );
    // });
  };
};

export const updateDistributeWithoutBranch = (store_code, data, productId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateDistributeWithoutBranch(store_code, data, productId)
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

        dispatch({
          type: Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST,
          data: res.data.product,
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg || error,
          },
        });
      })
      .finally(() => {});
  };
};

export const removeItemImgDis = (data) => {
  return {
    type: Types.UPLOAD_ALL_DISTRIBUTE_IMG,
    data: data,
  };
};

export const destroyProduct = (store_code, id, brandId, page, params) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .destroyProduct(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        productApi
          .fetchAllProductV2(store_code, branchIds, page, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
                data: res.data.data,
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

export const destroyMultiProduct = (store_code, data, page, params) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .destroyMultiProduct(store_code, { list_id: data })
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        productApi
          .fetchAllProductV2(store_code, branchIds, page, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
                data: res.data.data,
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

export const fetchProductAgencyPrice = (store_code, id, agency_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchProductAgencyPrice(store_code, id, agency_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_PRODUCT_AGENCY_PRICE,
            data: res.data.data,
          });
      });
  };
};

export const fetchProductId = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchProductId(store_code, id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_PRODUCT,
          data: res.data.data,
        });
    });
  };
};
export const uploadVideoProduct = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi
      .uploadVideo(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.UPLOAD_PRODUCT_VIDEO,
          data: res.data.data,
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

export const changePercentCol = (store_code, data, onSuccess = () => {}) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .changePercentCol(store_code, data)
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
        if (onSuccess) onSuccess();
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

export const getAmountProductNearlyOutStock = (store_code, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .getAmountProductNearlyOutStock(store_code, branch_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_AMOUNT_PRODUCT_NEARLY_OUT_STOCK,
            data: res.data.data?.total_product_or_discount_nearly_out_stock,
          });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        // dispatch({
        //   type: Types.ALERT_UID_STATUS,
        //   alert: {
        //     type: "danger",
        //     title: "Lỗi",
        //     disable: "show",
        //     content: error?.response?.data?.msg,
        //   },
        // });
      });
  };
};

export const getProductRetailSteps = (store_code, branch_id, idProduct) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .getProductRetailSteps(store_code, branch_id, idProduct)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT_RETAIL_STEPS,
            data: res.data.data,
          });
      })
      .finally(() => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};
