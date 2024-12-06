import { Component } from "react";
import themeData from "../../ultis/theme_data";
import * as billAction from "../../actions/bill";
import * as shipmentAction from "../../actions/shipment";
import styled from "styled-components";
import { connect } from "react-redux";

const ModalDeleteOrderStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .modal-dialog {
    animation: popup 1s ease-in-out 1;
  }
  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    50% {
      opacity: 1;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

class ModalShipAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_code: this.props.order_code,
      selectedItem: this.props.listShipmentAddress[0], // Địa chỉ được chọn ban đầu
      searchQuery: "", // Từ khóa tìm kiếm
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listShipmentAddress !== this.props.listShipmentAddress) {
      this.setState({ selectedItem: nextProps.listShipmentAddress[0] });
    }
  }

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, () => {
      // Sau khi cập nhật searchQuery, chọn giá trị đầu tiên trong danh sách lọc
      const filteredData = this.filterData();
      if (filteredData.length > 0) {
        this.setState({ selectedItem: filteredData[0] });
      }
    });
  };

  handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedItem = this.props.listShipmentAddress.find(
      (item) => item.storeId === selectedValue
    );
    this.setState({ selectedItem });
  };

  handleSubmit = () => {
    const { store_code, order_code } = this.props;
    const { selectedItem } = this.state;

    if (!selectedItem) {
      alert("Vui lòng chọn một địa chỉ trước khi xác nhận!");
      return;
    }

    const dataBody = {
      order_code: this.state.order_code,
      pickup: selectedItem,
    };

    this.props.createShipAhamove(store_code, dataBody);
    this.handleCloseModalDeleteOrder();
    setTimeout(() => {
      this.props.fetchBillId(store_code, order_code);
    }, 5000);
  };

  handleCloseModalDeleteOrder = () => {
    this.props.setCloseModalShipAddress(false);
  };

  filterData = () => {
    const { searchQuery } = this.state;
    const { listShipmentAddress } = this.props;

    if (!searchQuery) return listShipmentAddress;

    return listShipmentAddress.filter((item) =>
      item.storeAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  render() {
    const { selectedItem, searchQuery } = this.state;

    const filteredData = this.filterData();

    return (
      <ModalDeleteOrderStyles
        className="modal"
        style={{
          display: "block",
        }}
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chọn Bakery</h4>
              <button
                type="button"
                onClick={this.handleCloseModalDeleteOrder}
                className="close"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Tìm kiếm địa chỉ"
                className="form-control mb-3"
                value={searchQuery}
                onChange={this.handleSearch}
              />
              <select
                id="input"
                className="form-control border-input"
                name="store"
                onChange={this.handleSelectChange}
                value={selectedItem?.storeId || ""}
              >
                {filteredData.map((data, index) => (
                  <option
                    value={data.storeId}
                    key={index}
                    className={
                      data.is_default_order_online
                        ? "active-branch-default"
                        : ""
                    }
                  >
                    {data.storeAddress}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.handleCloseModalDeleteOrder}
              >
                Đóng
              </button>
              <button onClick={this.handleSubmit} className="btn btn-warning">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </ModalDeleteOrderStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statusDeleteOrder: state.billReducers.bill.statusDeleteOrder,
    listShipmentAddress: state.shipmentReducers.shipment.listShipmentAddress,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (store_code, order_code) => {
      dispatch(billAction.deleteOrder(store_code, order_code));
    },
    fetchBillId: (store_code, billId) => {
      dispatch(billAction.fetchBillId(store_code, billId));
    },
    fetchAllShipAddress: (store_code, address) => {
      dispatch(shipmentAction.fetchAllShipAddress(store_code, address));
    },
    createShipAhamove: (store_code, data) => {
      dispatch(shipmentAction.createShipAhamove(store_code, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalShipAddress);
