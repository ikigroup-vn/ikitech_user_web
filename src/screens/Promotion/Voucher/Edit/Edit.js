import React, { Component } from 'react';

import Form from '../../../../components/Promotion/Voucher/Edit/Form';
import * as Types from '../../../../constants/ActionType';

import Alert from '../../../../components/Partials/Alert';

import { connect, shallowEqual } from 'react-redux';
import * as voucherAction from '../../../../actions/voucher';
import * as productAction from '../../../../actions/product';
import * as CategoryPAction from '../../../../actions/category_product';
import TableVoucher from '../../../../components/Promotion/Voucher/Edit/TableVoucher.js';
import _ from 'lodash';
import Pagination from './Pagination.js';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectValue: '',
      page: 1,
      perpage: 10,
    };
  }

  componentDidMount() {
    const { store_code, voucherId } = this.props;
    this.props.fetchVoucherId(store_code, voucherId);
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllVoucher(store_code);
    this.props.fetchAllCategoryP(store_code);
    this.props.fetchVoucherCodes(store_code, voucherId, '', '', '', this.state.perpage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !shallowEqual(this.state.selectValue, prevState.selectValue) ||
      !shallowEqual(this.state.searchValue, prevState.searchValue) ||
      !shallowEqual(this.state.page, prevState.page) ||
      !shallowEqual(this.state.perpage, prevState.perpage)
    ) {
      const { store_code, voucherId } = this.props;
      const { searchValue, selectValue, page, perpage } = this.state;
      this.props.fetchVoucherCodes(store_code, voucherId, page, searchValue, selectValue, perpage);
    }
  }

  onSearch = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  onSelectChange = (e) => {
    this.setState({
      selectValue: e.target.value,
    });
  };

  onPerpageChange = (e) => {
    this.setState({
      perpage: e.target.value,
    });
  };

  handleExportVoucherCodes = () => {
    const { store_code, voucherId } = this.props;
    this.props.fetchExportCodes(store_code, voucherId);
  };

  render() {
    var { voucher, products, history, vouchers, listVoucherCodes } = this.props;
    var { store_code, voucherId } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 className="h4 title_content mb-0 text-gray-800">Chỉnh sửa chương trình</h4>
        </div>
        <br></br>
        <div class="card shadow mb-4">
          <div class="card-body">
            <section class="content">
              <div class="row">
                <div class="col-md-12 col-xs-12">
                  <div id="messages"></div>

                  <div class="box">
                    <Form
                      store_code={store_code}
                      history={history}
                      voucherId={voucherId}
                      products={products}
                      voucher={voucher}
                      vouchers={vouchers}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Danh sách voucher được phát hành từ chương trình <span style={{ fontWeight: '600' }}>{voucher.name}</span>
          </h4>
        </div>
        <br></br>
        <div class="card shadow mb-4">
          {1 ? (
            <div class="card-body">
              <section class="content">
                <div class="row">
                  <div class="col-md-12 col-xs-12">
                    <div id="messages"></div>

                    <div className="box">
                      <div
                        class="form-group"
                        style={{
                          marginTop: '20px',
                          display: 'flex',
                        }}
                      >
                        <div
                          className="col-lg-3 col-sm-3 col-md-6"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #dcc9c9',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            justifyContent: 'space-between',
                            height: '38px',
                          }}
                        >
                          <input
                            value={this.state.searchValue}
                            onChange={this.onSearch}
                            type="text"
                            placeholder="Tìm kiếm chương trình..."
                          />
                          <span className="search-icon">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                        <div>
                          <div
                            class="col-sm-3"
                            style={{
                              width: '100%',
                              marginLeft: '20px',
                            }}
                          >
                            <select
                              name="is_end"
                              id="input"
                              class="form-control"
                              style={{ width: '180px' }}
                              required="required"
                              value={this.state.selectValue}
                              onChange={this.onSelectChange}
                            >
                              <option value="" selected disabled hidden>
                                Trạng thái
                              </option>
                              <option value="">Tất cả</option>
                              <option value="0">Đã phát hành</option>
                              <option value="1">Đã sử dụng</option>
                              <option value="2">Đã kết thúc</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <TableVoucher
                        VoucherCodes={listVoucherCodes}
                        store_code={store_code}
                        vourcher_id={voucherId}
                        fetChangeStatusVourcherCodes={this.props.fetchChangeStatusCodes}
                        fetchAllVoucherCodes={this.props.fetchVoucherCodes}
                        page={this.state.page}
                        searchValue={this.state.searchValue}
                        selectValue={this.state.selectValue}
                        perpage={this.state.perpage}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '30px auto' }}
              >
                <div style={{ width: '60%' }}><Pagination store_code={store_code} listVoucherCodes={this.props.listVoucherCodes} vourcher_id={voucherId}/></div>
                <div style={{ width: '45%', display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                  <div>
                    <span>Số lượng bản ghi mỗi trang: </span>
                  </div>
                  <div
                    class="col-sm-3"
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    <select
                      name="is_end"
                      id="input"
                      class="form-control"
                      style={{ width: '70px' }}
                      required="required"
                      value={this.state.perpage}
                      onChange={this.onPerpageChange}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <div
                    style={{
                      background: 'grey',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                    onClick={this.handleExportVoucherCodes}
                  >
                    <i class="fas fa-file-export"></i>
                    <span style={{ paddingLeft: '4px' }}>Xuất File</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    voucher: state.voucherReducers.voucher.voucherId,
    products: state.productReducers.product.allProduct,
    vouchers: state.voucherReducers.voucher.allVoucher,
    listVoucherCodes: state.voucherReducers.voucher.listVoucherCodes,
    linkExportFile: state.voucherReducers.voucher.linkExport,
    alert: state.voucherReducers.alert.alert_uid,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchVoucherId: (store_code, voucherId) => {
      dispatch(voucherAction.fetchVoucherId(store_code, voucherId));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllVoucher: (store_code) => {
      dispatch(voucherAction.fetchAllVoucher(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },

    fetchVoucherCodes: (store_code, vourcher_id, page, search_value, status, perpage) => {
      dispatch(voucherAction.fetchAllVoucherCodes(store_code, vourcher_id, page, search_value, status, perpage));
    },
    fetchExportCodes: (store_code, vourcher_id) => {
      dispatch(voucherAction.fetchExportVoucherCodes(store_code, vourcher_id));
    },
    fetchChangeStatusCodes: (store_code, vourcher_id, data, onSuccess) => {
      dispatch(voucherAction.changeStatuVourcherCodes(store_code, vourcher_id, data, onSuccess));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
