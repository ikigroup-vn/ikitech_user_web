import { Component } from "react";
import styled from "styled-components";
import ModalCustom from "../../ModalCustom/ModalCustom";
import $ from "jquery";
import * as XLSX from "xlsx";
import * as Types from "../../../constants/ActionType";
import { fields as fieldsProduct } from "./fields";
import { connect, shallowEqual } from "react-redux";
import * as productAction from "../../../actions/product";
const ModalChooseTypeImportStyles = styled.div`
  margin-top: 30px;
  .modalImport__content {
    .modalImport__btn {
      display: flex;
      justify-content: center;
      column-gap: 10px;
    }
    .modalImport__override {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
      label {
        margin-bottom: 0;
      }
    }
  }
`;

class ModalChooseTypeImport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { messageImport, setOpenModal } = this.props;
    if (
      Object.entries(nextProps).length > 0 &&
      !shallowEqual(messageImport, nextProps.messageImport)
    ) {
      setOpenModal(false);
    }

    return true;
  }

  handleImportOutSide = () => {
    $("#file-excel-import").trigger("click");
    this.props.setOpenModal(false);
  };
  handleImportIki = () => {
    $("#import_file_iki").trigger("click");
  };
  handleChangeOverride = (e) => {
    const { setAllowSkipSameName } = this.props;
    setAllowSkipSameName(e.target.checked);
  };
  handleChangeFile = (e) => {
    const { showError } = this.props;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const xlsxFields = data[0];

      //Check Valid XLSX Field
      let isCheckedValidField = true;
      if (fieldsProduct.length > xlsxFields.length) {
        isCheckedValidField = false;
      } else {
        fieldsProduct.forEach((field, index) => {
          if (field !== xlsxFields[index]) {
            isCheckedValidField = false;
            return;
          }
        });
      }
      if (!isCheckedValidField) {
        showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Các trường trong file không hợp lệ!",
          },
        });
        return;
      }
      //Filter Data
      //Index: 0: "Tên sản phẩm", 1: "Mã SKU", 2: "Mã BARCODE", 3: "Theo dõi kho", 4: "Danh mục", 5: "Thuộc tính", 6: "Có phân loại", 7: "Phân loại chính", 8: "Phân loại phụ", 9: "DS phân loại", 10: "Giá bán lẻ", 11: "Giá nhập", 12: "Hình ảnh", 13: "Hoa hồng CTV (%)", 14: "Xu cho đại lý", 15: "Mô tả", 16: "Nội dung cho CTV", 17: "Trạng thái", 18: "Tiêu đề SEO", 19: "Miêu tả SEO",
      const dataXlsxEmptyTitle = data.slice(1);
      const newProducts = [];

      let newDistributes = [];
      let isDistributeProduct = false;
      let nameElementDistribute = "";
      let newProductHasDistribute = {};
      let positionDistributeProduct = -1;
      dataXlsxEmptyTitle.forEach((product, index) => {
        const newProduct = {};

        if (product[6] === "false") {
          newProduct["name"] = product[0];
          newProduct["sku"] = product[1];
          newProduct["barcode"] = product[2];
          newProduct["percent_collaborator"] = product[13];
          newProduct["point_for_agency"] = product[14];
          newProduct["description"] = product[15];
          newProduct["content_for_collaborator"] = product[16];
          newProduct["status"] = product[17] == "true" ? 0 : -1;
          newProduct["seo_title"] = product[18];
          newProduct["seo_description"] = product[19];
          newProduct["check_inventory"] = product[3] === "true" ? true : false;
          // Hanlde Categories
          newProduct["list_category"] = product[4]
            ? product[4].split(";").reduce((prevCategory, currentCategory) => {
                const newCategory = {};
                const childs = currentCategory.substring(
                  currentCategory.indexOf("[") + 1,
                  currentCategory.lastIndexOf("]")
                );

                newCategory.name = currentCategory.split("[")[0];
                newCategory.childs = !childs
                  ? []
                  : childs.split(",").map((childCategory) => childCategory);
                return [...prevCategory, newCategory];
              }, [])
            : [];

          // Handle Attributes
          newProduct["list_attribute"] = !product[5]
            ? []
            : product[5]
                .split(";")
                .reduce((prevAttribute, currentAttribute) => {
                  const newAttribute = {};
                  newAttribute.name = currentAttribute.split(":")[0];
                  newAttribute.value = currentAttribute.split(":")[1];
                  return [...prevAttribute, newAttribute];
                }, []);
          newProduct["distributes"] = [];
          newProduct["images"] = !product[12] ? [] : product[12].split(",");
          newProduct["price"] = !product[10] ? 0 : Number(product[10]);
          newProduct["import_price"] = !product[11] ? 0 : Number(product[11]);

          newProducts.push(newProduct);
        } else if (product[6] === "true") {
          newProductHasDistribute["name"] = product[0];
          newProductHasDistribute["sku"] = product[1];
          newProductHasDistribute["barcode"] = product[2];
          newProductHasDistribute["percent_collaborator"] = product[13];
          newProductHasDistribute["point_for_agency"] = product[14];
          newProductHasDistribute["description"] = product[15];
          newProductHasDistribute["content_for_collaborator"] = product[16];
          newProductHasDistribute["status"] = product[17] == "true" ? 0 : -1;
          newProductHasDistribute["seo_title"] = product[18];
          newProductHasDistribute["seo_description"] = product[19];
          newProductHasDistribute["check_inventory"] =
            product[3] === "true" ? true : false;
          // Hanlde Categories
          newProductHasDistribute["list_category"] = product[4]
            ? product[4].split(";").reduce((prevCategory, currentCategory) => {
                const newCategory = {};
                const childs = currentCategory.substring(
                  currentCategory.indexOf("[") + 1,
                  currentCategory.lastIndexOf("]")
                );

                newCategory.name = currentCategory.split("[")[0];
                newCategory.childs = !childs
                  ? []
                  : childs.split(",").map((childCategory) => childCategory);
                return [...prevCategory, newCategory];
              }, [])
            : [];

          // Handle Attributes
          newProductHasDistribute["list_attribute"] = !product[5]
            ? []
            : product[5]
                .split(";")
                .reduce((prevAttribute, currentAttribute) => {
                  const newAttribute = {};
                  newAttribute.name = currentAttribute.split(":")[0];
                  newAttribute.value = currentAttribute.split(":")[1];
                  return [...prevAttribute, newAttribute];
                }, []);
          const dataDistribute = {
            name: product[7],
            sub_distributes_name: !product[8] ? "" : product[8],
            element_distributes: [],
          };
          newDistributes.push(dataDistribute);
        } else {
          const nameProductDistributeTemp = product[9]
            ? product[9].split(",")[0]
            : "";
          const nameProductSubDistributeTemp = product[9]
            ? product[9].split(",")[1]
            : "";
          const imagesProductDistributeTemp = !product[12]
            ? []
            : product[12].split(",");
          isDistributeProduct = true;
          if (nameElementDistribute !== nameProductDistributeTemp) {
            positionDistributeProduct++;
            newDistributes[0]["element_distributes"].push({
              name: nameProductDistributeTemp,
              price: nameProductSubDistributeTemp
                ? !product[10]
                  ? 0
                  : Number(product[10])
                : 0,
              import_price: nameProductSubDistributeTemp
                ? !product[11]
                  ? 0
                  : Number(product[11])
                : 0,
              images: imagesProductDistributeTemp,
              element_sub_distributes: [],
            });
            nameElementDistribute = nameProductDistributeTemp;
          }
          if (nameProductSubDistributeTemp) {
            newDistributes[0]["element_distributes"][positionDistributeProduct][
              "element_sub_distributes"
            ].push({
              name: nameProductSubDistributeTemp,
              price: !product[10] ? 0 : Number(product[10]),
              import_price: !product[11] ? 0 : Number(product[11]),
            });
          }
        }
        if (
          isDistributeProduct === true &&
          index !== dataXlsxEmptyTitle.length - 1 &&
          dataXlsxEmptyTitle[index + 1][0]
        ) {
          newProductHasDistribute["distributes"] = newDistributes;
          newProducts.push({ ...newProductHasDistribute });
          newDistributes = [];
          isDistributeProduct = false;
          nameElementDistribute = "";
          positionDistributeProduct = -1;
          newProduct["distributes"] = [];
        } else if (
          isDistributeProduct === true &&
          index === dataXlsxEmptyTitle.length - 1
        ) {
          newProductHasDistribute["distributes"] = newDistributes;
          newProducts.push({ ...newProductHasDistribute });
          newDistributes = [];
          isDistributeProduct = false;
          nameElementDistribute = "";
          positionDistributeProduct = -1;
          newProduct["distributes"] = [];
        }
      });

      //Add products to server
      const { store_code, allow_skip_same_name, postMultiProduct } = this.props;
      const dataPostProducts = {
        allow_skip_same_name,
        list: newProducts,
      };
      console.log(JSON.stringify(dataPostProducts));
      postMultiProduct(store_code, dataPostProducts);
    };
    document.getElementById("import_file_iki").value = null;
    reader.readAsBinaryString(file);
  };
  render() {
    const { openModal, setOpenModal } = this.props;
    return (
      <ModalCustom
        title="Chọn loại import"
        openModal={openModal}
        setOpenModal={setOpenModal}
        style={{
          height: "200px",
        }}
      >
        <ModalChooseTypeImportStyles>
          <div className="modalImport__content">
            <input
              type="file"
              id="import_file_iki"
              hidden
              onChange={this.handleChangeFile}
            />
            <div className="modalImport__btn">
              <button
                className="btn btn-outline-success"
                onClick={this.handleImportIki}
              >
                Import từ IKITECH
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={this.handleImportOutSide}
              >
                Import từ bên ngoài
              </button>
            </div>
            <div className="modalImport__override">
              <input
                type="checkbox"
                onChange={this.handleChangeOverride}
                id="overridePermission"
              />
              <label for="overridePermission">
                Cho phép bỏ qua các sản phẩm trùng tên
              </label>
            </div>
          </div>
        </ModalChooseTypeImportStyles>
      </ModalCustom>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    messageImport: state.productReducers.product.messageImport,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    postMultiProduct: (store_code, data) => {
      dispatch(productAction.postMultiProduct(store_code, data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalChooseTypeImport);
