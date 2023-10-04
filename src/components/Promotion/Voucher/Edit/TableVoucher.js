import React, { Component } from 'react';
import ModalCustom from '../../../../components/ModalCustom/ModalCustom.js';

class TableVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showButton: false,
      showModal: false,
    };
  }

  handleCheckboxChange = (id, e) => {
    const isChecked = e.target.checked;
    this.setState((prevState) => {
      let updatedSelectedItems;
      if (isChecked) {
        updatedSelectedItems = [...prevState.selectedItems, id];
      } else {
        updatedSelectedItems = prevState.selectedItems.filter((itemId) => itemId !== id);
      }
      const showButton = updatedSelectedItems.length > 0;
      return {
        selectedItems: updatedSelectedItems,
        showButton: showButton,
      };
    });
  };

  handleShowModal = () => {
    this.setState((prevState) => ({
      showModal: true,
    }));
  };

  showData = (vouchers) => {
    var result = null;
    if (typeof vouchers === 'undefined') {
      return result;
    }
    if (vouchers?.data?.length > 0) {
      result = vouchers.data.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>
              <input
                type="checkbox"
                onChange={(e) => this.handleCheckboxChange(data.id, e)}
                disabled={data.status === 2 ? true : false}
              />
            </td>
            <td>{index + 1}</td>
            <td>
              <span style={{ fontWeight: '600' }}>{data.code}</span>
            </td>
            <td>{data.customer || 'Chưa sử dụng'}</td>
            <td>{data.use_time || 'Chưa sử dụng'}</td>
            <td>{data.start_time}</td>
            <td>{data.end_time}</td>
            <td>{data.status === 0 ? 'Đã phát hành' : data.status === 1 ? 'Đã sử dụng' : 'Đã kết thúc'}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  handleChangeStatus = () => {
    const data = {
      voucher_code_ids: this.state.selectedItems,
    };
    this.props.fetChangeStatusVourcherCodes(this.props.store_code, this.props.vourcher_id, data, () => {
      this.setState({ showModal: false });
      this.props.fetchAllVoucherCodes(
        this.props.store_code,
        this.props.vourcher_id,
        this.props.page,
        this.props.searchValue,
        this.props.selectValue,
        this.props.perpage,
      );
      this.setState({ selectedItems: [] });
      this.setState({ showButton: false });
    });
  };

  render() {
    const { VoucherCodes } = this.props;
    return (
      <div class="table-responsive">
        {this.state.showModal && (
          <ModalCustom
            openModal={this.state.showModal}
            setOpenModal={() => this.setState({ showModal: false })}
            title="Bạn có chắc muốn vô hiệu hóa các mã giảm giá này không?"
          >
            <div>
              <div>
                <p style={{ color: '#71c371', padding: '6px 12px' }}>Lưu ý hành động này sẽ không thể hoàn tác!</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'end', marginTop: 75, paddingRight: 30 }}>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => this.setState({ showModal: false })}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ marginLeft: 16 }}
                  onClick={this.handleChangeStatus}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </ModalCustom>
        )}

        {this.state.showButton && (
          <button type="button" class="btn btn-primary" onClick={() => this.setState({ showModal: true })}>
            Vô hiệu
          </button>
        )}
        <table class="table table-border" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Mã vourcher</th>
              <th>Người sử dụng</th>
              <th>Ngày sử dụng</th>
              <th>Ngày phát hành</th>
              <th>Ngày hết hạn</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>{this.showData(VoucherCodes)}</tbody>
        </table>
      </div>
    );
  }
}

export default TableVoucher;
