import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";

const TableStyles = styled.div``;

class TableCustomerOfSale extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showData = (customers) => {
    var result = null;
    if (customers.length > 0) {
      result = customers.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>{(this.props.customers.current_page - 1) * 20 + index + 1}</td>
            <td>{data.name}</td>
            <td>{data.phone_number}</td>
            <td>
              {" "}
              {data.province_name == null
                ? "Chưa cập nhật"
                : data.province_name}
            </td>
            <td>{getDDMMYYYHis(data.created_at)}</td>
            <td>
              {data.points ? new Intl.NumberFormat().format(data.points) : 0}
            </td>
            <td>
              {" "}
              {data.total_after_discount_no_use_bonus_with_date
                ? `${new Intl.NumberFormat().format(
                    data.total_after_discount_no_use_bonus_with_date
                  )}`
                : "0 ₫"}
            </td>
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
            >
              {data.is_collaborator === true
                ? "Cộng tác viên"
                : data.is_agency === true
                ? `Đại lý${
                    data.agency_type ? `(${data.agency_type?.name})` : ""
                  }`
                : "Khách hàng"}
              {/* {customerSelected?.id !== data.id ? null : (
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
                  )} */}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    const { data } = this.props;

    return (
      <TableStyles class="table-responsive">
        <table class="table" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Tỉnh thành</th>
              <th>Ngày đăng ký</th>
              <th>Số xu</th>
              <th>Doanh số</th>
              <th>Vai trò</th>
            </tr>
          </thead>

          <tbody>{this.showData(data)}</tbody>
        </table>
      </TableStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customers: state.customerReducers.customer.allCustomer,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCustomerOfSale);
