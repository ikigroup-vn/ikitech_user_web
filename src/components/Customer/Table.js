import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import history from "../../history";
import { filter_arr, format, getQueryParams } from "../../ultis/helpers";
import Pagination from "../../components/RevenueExpenditures/Pagination";
import { formatDDMMYYYY, getDDMMYYYHis } from "../../ultis/date";
import styled from "styled-components";
import ModalChangeRoleCustomer from "./ModalChangeRoleCustomer";
import { connect, shallowEqual } from "react-redux";
import * as customerAction from "../../actions/customer";
import * as agencyAction from "../../actions/agency";
import * as helper from "../../ultis/helpers";
import ModalChangePoint from "./ModalChangePoint";

const typeRoleCustomer = [
  {
    id: 1,
    sale_type: 0,
    name: "Khách hàng",
  },
  {
    id: 2,
    sale_type: 1,
    name: "Cộng tác viên",
  },
  {
    id: 3,
    sale_type: 2,
    name: "Đại lý",
  },
];

const TableStyles = styled.div`
  .select-role {
    &:hover {
      text-decoration: underline;
    }
  }
  .select-role-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
    & > div {
      & > div {
        padding: 8px 18px;
        color: black;
        white-space: nowrap;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        &:not(:last-child) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .list-agencies {
    position: absolute;
    top: 0;
    right: 100%;
    z-index: 10;
    background-color: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
    & > div {
      padding: 8px 18px;
      color: black;
      white-space: nowrap;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
  .exploder {
    border: 1px solid;
    border-radius: 3px;
    span {
      margin: 3px 0;
      &:hover {
        color: white;
      }
    }
  }
  .collaborators_balance {
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: #2980b9;
    &:hover {
      color: #3498db;
    }
  }
  .btn-exploder {
    span {
      margin: 3px 0;
      &:hover {
        color: white;
      }
    }
  }
  .explode__info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 10px;
    .explode__item {
      display: flex;
      align-items: center;
      & > span {
        &:first-child {
          width: 100px;
          display: inline-block;
        }
      }
      .explode__point {
        display: flex;
      }
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerSelected: null,
      openModalChangeRole: false,
      typeSaleCustomer: null,
      showListAgencies: false,
      typeAgency: null,
      nameCustomer: "",
      customerSelectedPoint: {},
      isSub: true,
    };
  }

  componentDidMount() {
    const { fetchAllAgencyType, store_code } = this.props;
    fetchAllAgencyType(store_code);
    helper.loadExpandTable();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { customers } = this.props;
    const { customers: customersNext } = nextProps;

    if (!shallowEqual(customers, customersNext)) {
      this.setOpenShowModalChangeRole(false);
      this.setCustomerSelected(null);
      this.setTypeSaleCustomer(null);
      this.setTypeAgency(null);
      this.setShowListAgencies(false);
      this.setCustomerSelectedPoint({});
    }
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (!shallowEqual(prevProps.customers, this.props.customers)) {
      helper.loadExpandTable();
    }
  }

  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };
  handleSetInfor = (item) => {
    this.props.handleSetInfor(item);
  };
  changePage = (store_code, customerId, e) => {
    const { searchValue } = this.props;
    if (
      e.target.className !== "total_referral" &&
      !e.target.closest(".select-role") &&
      !e.target.closest(".exploder")
    ) {
      var { paginate } = this.props;
      if (e.target.name == "action") return;
      history.push(
        `/customer/detail/${store_code}/${customerId}?page=${paginate}&search=${searchValue}`
      );
    }
  };
  handleShowCustomersByReferralPhone = (customerInfo) => {
    const { setCustomerInfo, setShowCustomersByReferralPhone } = this.props;
    setCustomerInfo(customerInfo);
    setShowCustomersByReferralPhone(true);
  };

  handleChangeSaleType = (typeSale, typeAgency) => {
    this.setTypeSaleCustomer(typeSale);
    this.setOpenShowModalChangeRole(true);
    if (typeAgency === undefined) return;
    this.setTypeAgency(typeAgency);
  };

  handlleCustomerSelected = (e, customer) => {
    if (e.target.closest(".select-role-dropdown")) return;
    this.setState({
      customerSelected:
        customer.id === this.state.customerSelected?.id ? null : customer,
    });
  };
  setCustomerSelected = (customer) => {
    this.setState({
      customerSelected: customer,
    });
  };

  setOpenShowModalChangeRole = (showModal) => {
    this.setState({
      openModalChangeRole: showModal,
    });
  };

  setTypeSaleCustomer = (typeSale) => {
    this.setState({
      typeSaleCustomer: typeSale,
    });
  };
  setShowListAgencies = (isShowedListAgencies) => {
    this.setState({
      showListAgencies: isShowedListAgencies,
    });
  };
  setTypeAgency = (typeAgency) => {
    this.setState({
      typeAgency,
    });
  };

  handleShowListAgencies = (e) => {
    const { showListAgencies } = this.state;
    if (e.target.closest(".list-agencies")) return;
    this.setShowListAgencies(!showListAgencies);
  };
  setIsSub = (isSub) => {
    this.setState({ isSub });
  };
  setCustomerSelectedPoint = (customer) => {
    this.setState({
      customerSelectedPoint: customer,
    });
  };
  handleOpenModalChangePoint = (customer, isSub) => {
    this.setState({
      customerSelectedPoint: customer,
      isSub,
    });
  };

  showData = (customer) => {
    var { store_code, paginate, types } = this.props;
    const { customerSelected } = this.state;
    var result = null;
    if (customer.length > 0) {
      result = customer.map((data, index) => {
        return (
          <>
            <tr
              className="hover-product"
              onClick={(e) => this.changePage(store_code, data.id, e)}
            >
              <td className="btn-exploder">
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className="btn-outline-success exploder"
                >
                  <span class="fa fa-plus"></span>
                </button>
              </td>{" "}
              <td>
                {(this.props.customers.current_page - 1) * 20 + index + 1}
              </td>
              <td>{data.name}</td>
              <td>{data.phone_number}</td>
              {/* <td>{data.email == null ? "Chưa cập nhật" : data.email}</td> */}
              <td>
                {data.province_name == null
                  ? "Chưa cập nhật"
                  : data.province_name}
              </td>
              <td>{getDDMMYYYHis(data.created_at)}</td>
              <td
                className="total_referral"
                onClick={() => this.handleShowCustomersByReferralPhone(data)}
              >
                {data.total_referrals}
              </td>
              <td>
                {data.points ? new Intl.NumberFormat().format(data.points) : 0}
              </td>
              <td>
                {data.total_final_without_refund
                  ? new Intl.NumberFormat().format(
                      data.total_final_without_refund
                    )
                  : 0}
              </td>
              <td>
                {data.debt ? new Intl.NumberFormat().format(data.debt) : 0}
              </td>
              {getChannel() == IKITECH && (
                <td
                  className={`${
                    data.is_collaborator === true
                      ? "warning"
                      : data.is_agency === true
                      ? "danger"
                      : "primary"
                  } select-role`}
                  style={{
                    position: "relative",
                  }}
                  onClick={(e) => this.handlleCustomerSelected(e, data)}
                >
                  {data.is_collaborator === true
                    ? "Cộng tác viên"
                    : data.is_agency === true
                    ? "Đại lý"
                    : "Khách hàng"}
                  {customerSelected?.id !== data.id ? null : (
                    <div class="select-role-dropdown">
                      {typeRoleCustomer.map((customer) => (
                        <div key={customer.id}>
                          {customer.sale_type !== 2 ? (
                            <div
                              onClick={() =>
                                this.handleChangeSaleType(customer.sale_type)
                              }
                            >
                              {customer.name}
                            </div>
                          ) : (
                            <>
                              {types.length === 0 ? (
                                <div
                                  onClick={() =>
                                    this.handleChangeSaleType(
                                      customer.sale_type
                                    )
                                  }
                                >
                                  {customer.name}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    position: "relative",
                                  }}
                                  onClick={this.handleShowListAgencies}
                                >
                                  {customer.name}
                                  {this.state.showListAgencies ? (
                                    <div className="list-agencies">
                                      {types.map((type) => (
                                        <div
                                          key={type.id}
                                          onClick={() =>
                                            this.handleChangeSaleType(
                                              customer.sale_type,
                                              type.id
                                            )
                                          }
                                        >
                                          {type.name}
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              )}
              {getChannel() == IKIPOS && (
                <td className="">
                  {getChannel() == IKIPOS && (
                    <Link
                      to={`/customer/detail/${store_code}/${data.id}?pag=${paginate}`}
                      style={{ marginLeft: "10px" }}
                      class={`btn btn-warning btn-sm`}
                    >
                      <i class="fa fa-edit"></i> Sửa
                    </Link>
                  )}
                </td>
              )}
            </tr>
            <tr class="explode hide">
              <td colSpan={11}>
                <div className="explode__info">
                  <div className="explode__item">
                    <span>Họ tên:</span>
                    <span>{data.name}</span>
                  </div>
                  <div className="explode__item">
                    <span>Giới tính:</span>
                    <span>
                      {data.sex == 1
                        ? "Nam"
                        : data.sex == 2
                        ? "Nữ"
                        : data.sex == 0
                        ? "Khác"
                        : ""}
                    </span>
                  </div>
                  <div className="explode__item">
                    <span>Email:</span>
                    <span>{data.email}</span>
                  </div>
                  <div className="explode__item">
                    <span>Số điện thoại:</span>
                    <span>{data.phone_number}</span>
                  </div>
                  <div className="explode__item">
                    <span>Ngày sinh:</span>
                    <span>{data.date_of_birth}</span>
                  </div>
                  <div className="explode__item">
                    <span>Ngày đăng ký:</span>
                    <span>{data.created_at}</span>
                  </div>
                  <div className="explode__item">
                    <span>Số xu:</span>
                    <div className="explode__point">
                      <span
                        style={{
                          color: "#2980b9",
                        }}
                      >
                        {data.points}
                      </span>
                      <div
                        style={{
                          marginLeft: "15px",
                          display: "flex",
                          alignItems: "center",
                          columnGap: "5px",
                        }}
                      >
                        <button
                          type="button"
                          style={{ width: "25px" }}
                          className=" btn-outline-success btn-exploder"
                          onClick={() =>
                            this.handleOpenModalChangePoint(data, false)
                          }
                        >
                          <span className="fa fa-plus"></span>
                        </button>
                        <button
                          type="button"
                          style={{ width: "25px" }}
                          className=" btn-outline-danger btn-exploder"
                          onClick={() =>
                            this.handleOpenModalChangePoint(data, true)
                          }
                        >
                          <span className="fa fa-minus"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;

    var { store_code } = this.props;
    const {
      openModalChangeRole,
      customerSelected,
      typeSaleCustomer,
      typeAgency,
      customerSelectedPoint,
    } = this.state;

    return (
      <TableStyles class="table-responsive">
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Họ tên</th>

              <th>Số điện thoại</th>

              <th>Tỉnh / Thành phố</th>
              <th>Ngày đăng ký</th>
              <th>Giới thiệu</th>
              <th>Xu</th>
              <th>Tổng mua</th>
              <th>Số nợ hiện tại</th>

              {getChannel() == IKITECH && <th>Vai trò</th>}

              {/* {getChannel() == IKIPOS &&   <th>Hành động</th>} */}
            </tr>
          </thead>
          <tbody>{this.showData(customers)}</tbody>
        </table>
        {openModalChangeRole ? (
          <ModalChangeRoleCustomer
            setOpenShowModalChangeRole={this.setOpenShowModalChangeRole}
            setCustomerSelected={this.setCustomerSelected}
            setTypeSaleCustomer={this.setTypeSaleCustomer}
            setShowListAgencies={this.setShowListAgencies}
            setTypeAgency={this.setTypeAgency}
            customerSelected={customerSelected}
            typeSaleCustomer={typeSaleCustomer}
            typeAgency={typeAgency}
            store_code={store_code}
          ></ModalChangeRoleCustomer>
        ) : null}
        {Object.entries(customerSelectedPoint).length > 0 ? (
          <ModalChangePoint
            store_code={store_code}
            isSub={this.state.isSub}
            customerSelectedPoint={customerSelectedPoint}
            setCustomerSelectedPoint={this.setCustomerSelectedPoint}
          />
        ) : null}
      </TableStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerReducers.customer.allCustomer,
    types: state.agencyReducers.agency.allAgencyType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAgencyType: (store_code) => {
      dispatch(agencyAction.fetchAllAgencyType(store_code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
