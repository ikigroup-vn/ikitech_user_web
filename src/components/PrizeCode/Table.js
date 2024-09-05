import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import getChannel, { IKITECH } from "../../ultis/channel";
import ShowData from "./ShowData";

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
    this.state = {
      selected: [],
    };
  }

  checkSelected = (id) => {
    var selected = [...this.props.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item == id) {
          return true;
        }
      }

      return false;
    } else {
      return false;
    }
  };

  onChangeSelected = (e, id) => {
    var { checked } = e.target;
    var selected = [...this.props.selected];
    if (checked == true) {
      selected.push(id);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item == id) {
          selected.splice(index, 1);
        }
      }
    }
    // this.setState({ selected });
    this.props.handleSetSelected(selected);
  };

  showData = (data, perPage, currentPage) => {
    return data.map((item, index) => {
      var checked = this.checkSelected(item.id);
      return (
        <tr className="hover-product">
          <td className={`show`}>
            <input
              style={{
                height: "initial",
              }}
              type="checkbox"
              checked={checked}
              onChange={(e) => this.onChangeSelected(e, item.id)}
            />
          </td>
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
      );
    });
  };

  resetSelected = () => {
    this.setState({ selected: [] });
  };

  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { prizeCodes } = this.props;
    var _selected = [...this.props.selected];
    if (prizeCodes.length > 0) {
      if (checked == false) {
        // this.setState({ selected: [] });
        this.props.handleSetSelected([]);
      } else {
        _selected = [];
        prizeCodes.forEach((prizeCode) => {
          _selected.push(prizeCode.id);
        });

        // this.setState({ selected: _selected });
        this.props.handleSetSelected(_selected);
      }
    }
  };

  handleMultiDelCallBack = (e, data) => {
    var { store_code } = this.props;
    e.preventDefault();
    this.props.handleMultiDelCallBack({
      table: "mã dự thưởng",
      data: data,
      store_code: store_code,
    });
  };

  render() {
    const { prizeCodes, currentPage, perPage } = this.props;
    const { selected } = this.props;
    const _selected =
      selected.length > 0 && selected.length == prizeCodes.length
        ? true
        : false;
    var multiDelete = selected.length > 0 ? "show" : "hide";

    return (
      <TableStyles>
        <div
          style={{
            display: "flex",
            columnGap: "20px",
            margin: "16px 0",
          }}
        >
          <button
            onClick={(e) => this.handleMultiDelCallBack(e, selected)}
            data-toggle="modal"
            data-target="#removeMultiModal"
            style={{ marginLeft: "10px" }}
            class={`btn btn-danger btn-sm ${multiDelete}`}
          >
            <i class="fa fa-trash"></i> Xóa {selected.length} mã dự thưởng
          </button>
          {selected.length > 0 ? (
            <div
              className="btn btn-sm btn-success"
              data-toggle="modal"
              data-target="#listProductPrizeMultiModal"
            >
              Đặt thưởng cho ({selected.length}) mã
            </div>
          ) : null}
        </div>
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th className={"show"}>
                <input
                  type="checkbox"
                  checked={_selected}
                  onChange={this.onChangeSelectAll}
                />
              </th>
              <th>STT</th>
              <th>Mã dự thưởng</th>
              <th>SĐT</th>
              <th>Tỉnh</th>
              <th>Vị trí</th>
              <th>Sản phẩm</th>
              <th>Sản phẩm trúng</th>
              <th>Khách hàng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.showData(prizeCodes, perPage, currentPage)}</tbody>
        </table>
      </TableStyles>
    );
  }
}

export default connect(null, null)(Table);
