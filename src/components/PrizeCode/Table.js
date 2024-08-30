import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import getChannel, { IKITECH } from "../../ultis/channel";

const TableStyles = styled.div`
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showData = (data, perPage, currentPage) => {
    return data.map((item, index) => (
      <tr className="hover-product">
        <td>{perPage * (currentPage - 1) + (index + 1)}</td>
        <td>{item.code}</td>
        <td>{item.phone_number}</td>
        <td>{item.province}</td>
        <td>
          {item.latitude && item.longitude && (
            <a
              href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
              target="_blank"
            >
              Xem
            </a>
          )}
        </td>
        <td>{item?.product?.name}</td>
        <td>{item?.product_prize?.name}</td>
        <td>{item?.customer?.name ?? ""}</td>
        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#listProductPrizeModal"
            onClick={() => {
              this.props.handleGetRowItem(item);
            }}
          >
            Đặt thưởng
          </button>
        </td>
      </tr>
    ));
  };

  onChangeSelectAll = (e) => {};

  resetSelected = () => {
    this.setState({ selected: [] });
  };

  render() {
    const { prizeCodes, currentPage, perPage } = this.props;

    return (
      <TableStyles>
        {/* <div
          style={{
            display: "flex",
            columnGap: "20px",
          }}
        >
          <button
            onClick={(e) => {}}
            data-toggle="modal"
            data-target="#removeMultiModal"
            style={{ marginLeft: "10px" }}
            class={`btn btn-danger btn-sm show`}
          >
            <i class="fa fa-trash"></i> Xóa 1 sản phẩm
          </button>
        </div> */}
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              {/* <th
                className="show"
                style={{
                  verticalAlign: "middle",
                }}
              >
                <input type="checkbox" onChange={() => {}} />
              </th> */}
              <th>STT</th>
              <th>Mã dự thưởng</th>
              <th>SĐT</th>
              <th>Tỉnh</th>
              <th>Vị trí</th>
              <th>Sản phẩm</th>
              <th>Sản phẩm trúng</th>
              <th>Khách hàng</th>
              <th></th>
              {/* {getChannel() == IKITECH && <th>Đặt thưởng</th>} */}
            </tr>
          </thead>
          <tbody>{this.showData(prizeCodes, perPage, currentPage)}</tbody>
        </table>
      </TableStyles>
    );
  }
}

export default connect(null, null)(Table);
