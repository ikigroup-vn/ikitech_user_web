import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import Table from "../../../components/Promotion/Voucher/Table";
import Pagination from "../../../components/Promotion/Voucher/Pagination";
import { Link, Redirect } from "react-router-dom";
import * as voucherAction from "../../../actions/voucher";
import ModalDelete from "../../../components/Promotion/Voucher/Delete/Modal";
import ModalIsEnd from "../../../components/Promotion/Voucher/Edit/Modal";
import NotAccess from "../../../components/Partials/NotAccess";

import { getQueryParams, removeAscent } from "../../../ultis/helpers";

import Loading from "../../Loading";
import styled from "styled-components";

const VoucherStyles = styled.div`
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    .form-inputSearch {
      max-width: 25%;
      width: 100%;
      position: relative;
      input {
        width: 100%;
        padding-right: 30px !important;
      }
      .search-icon {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
class Voucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_end: 2,
      modal: {
        table: "",
        id: "",
        store_code: "",
      },
      modalIsEnd: {},
      searchValue: "",
      voucherProducts: [],
    };
  }

  setVoucherProducts = (vouchers) => {
    this.setState({
      voucherProducts: vouchers,
    });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = Number(target.value);
    this.setState({ [name]: value, searchValue: "" });
  };
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleIsEndCallback = (modal) => {
    this.setState({ modalIsEnd: modal });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.is_end !== this.state.is_end) {
      var { store_code } = this.props.match.params;
      var is_end = Number(nextState.is_end);
      switch (is_end) {
        case 0:
          this.props.fetchAllVoucher(store_code);
          break;
        case 1:
          this.props.fetchAllVoucherEnd(store_code);
          break;
        case 2:
          this.props.fetchAllVoucher(store_code);
          break;
        default:
          break;
      }
    }
    const { vouchers } = this.props;
    if (!shallowEqual(vouchers, nextProps.vouchers)) {
      this.setVoucherProducts(nextProps.vouchers);
    }
    return true;
  }

  componentDidMount() {
    var type = getQueryParams("type");
    var { store_code } = this.props.match.params;

    if ((type && type == 0) || type == 1 || type == 2) {
      var type = Number(type);

      switch (type) {
        case 0:
          this.props.fetchAllVoucher(store_code);
          break;
        case 1:
          this.props.fetchAllVoucherEnd(store_code);
          break;
        case 2:
          this.props.fetchAllVoucher(store_code);
          break;
        default:
          break;
      }
      this.setState({ is_end: type });
    } else {
      this.props.fetchAllVoucher(this.props.match.params.store_code);
    }
  }
  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var isShow = permissions.promotion;

      this.setState({
        isLoading: true,
        insert: true,
        update: true,
        _delete: true,
        isShow,
      });
    }
  }
  handleSearchValueChange = (e) => {
    const value = e.target.value;
    const { vouchers } = this.props;

    this.setState({
      searchValue: value,
    });
    if (value === "") {
      this.setVoucherProducts(vouchers);
    } else {
      let newVoucherProducts = JSON.parse(JSON.stringify(vouchers));
      if (Array.isArray(vouchers)) {
        newVoucherProducts = vouchers.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      } else {
        newVoucherProducts.data = vouchers.data.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      }
      this.setVoucherProducts(newVoucherProducts);
    }
  };
  render() {
    var { params } = this.props.match;
    var { is_end, modal, modalIsEnd } = this.state;
    var { vouchers } = this.props;
    var displayPag = is_end == 0 ? "hide" : null;
    var { store_code } = this.props.match.params;
    var { insert, update, _delete, isShow, voucherProducts, searchValue } =
      this.state;
    console.log(is_end);
    if (this.props.auth) {
      return (
        <VoucherStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={params.store_code} />
                {typeof isShow == "undefined" ? (
                  <div></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 class="h3 title_content mb-2 text-gray-800">
                        Voucher giảm giá
                      </h3>
                      <div>
                        <Link
                          style={{ marginRight: "10px" }}
                          to={`/voucher/create/store/${params.store_code}`}
                          class={`btn btn-warning btn-icon-split ${
                            insert == true ? "show" : "hide"
                          }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Tạo Voucher toàn shop</span>
                        </Link>
                        <Link
                          to={`/voucher/create/product/${params.store_code}`}
                          class={`btn btn-info btn-icon-split  ${
                            insert == true ? "show" : "hide"
                          }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Tạo Voucher sản phẩm</span>
                        </Link>
                      </div>
                    </div>

                    <div
                      class="form-group"
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <div className="form-header">
                        <div
                          class="col-sm-3"
                          style={{
                            paddingLeft: "0px",
                            paddingRight: 0,
                            maxWidth: "20%",
                          }}
                        >
                          <select
                            name="is_end"
                            id="input"
                            class="form-control"
                            required="required"
                            value={is_end}
                            onChange={this.onChange}
                          >
                            <option value="0">Chuẩn bị diễn ra</option>

                            <option value="2">Đang diễn ra</option>

                            <option value="1">Đã kết thúc</option>
                          </select>
                        </div>
                        <div className="form-inputSearch">
                          {is_end != 1 ? (
                            <>
                              <input
                                className="form-control"
                                value={searchValue}
                                onChange={this.handleSearchValueChange}
                                type="text"
                                placeholder="Tìm kiếm voucher..."
                              />
                              <span className="search-icon">
                                <i className="fa fa-search"></i>
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">
                          Danh sách Voucher
                        </h6>
                      </div>
                      <div class="card-body">
                        <Table
                          update={update}
                          _delete={_delete}
                          is_end={is_end}
                          handleIsEndCallback={this.handleIsEndCallback}
                          handleDelCallBack={this.handleDelCallBack}
                          params={params}
                          vouchers={voucherProducts}
                        />
                        <Pagination
                          display={displayPag}
                          params={params}
                          vouchers={voucherProducts}
                          store_code={store_code}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>
              <ModalDelete modal={modal} />
              <ModalIsEnd modal={modalIsEnd} />

              <Footer />
            </div>
          </div>
        </VoucherStyles>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    vouchers: state.voucherReducers.voucher.allVoucher,
    alert: state.voucherReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllVoucher: (store_code) => {
      dispatch(voucherAction.fetchAllVoucher(store_code));
    },
    fetchAllVoucherEnd: (store_code) => {
      dispatch(voucherAction.fetchAllVoucherEnd(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Voucher);
