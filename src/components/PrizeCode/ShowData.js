import React, { Component } from "react";
import { connect } from "react-redux";
class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { checked, item, index, perPage, currentPage } = this.props;
    return (
      <tr className="hover-product">
        <td className={`show`}>
          <input
            style={{
              height: "initial",
            }}
            type="checkbox"
            checked={checked}
            onChange={(e) => this.props.onChangeSelected(e, item.id)}
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
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
