import React, { Component } from "react";
import * as CategoryPAction from "../../actions/category_product";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_name: "",
      account_number: "",
      bank: "",
      branch: ""
    };
  }



  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault()
    window.$('.modal').modal('hide');

    var payment = this.state
    this.props.addPayment({
      account_name: payment.account_name,
      account_number: payment.account_number,
      bank: payment.bank,
      branch: payment.branch
    })

  };
  render() {
    var { account_name,
      account_number,
      bank,
      branch } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" >
              <h4 class="modal-title">Thêm tài khoản</h4>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên chủ tài khoản</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập tên chủ tài khoản"
                    autocomplete="off"
                    value={account_name}
                    onChange={this.onChange}
                    name="account_name"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Số tài khoản</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập số tài khoản"
                    autocomplete="off"
                    value={account_number}
                    onChange={this.onChange}
                    name="account_number"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Ngân hàng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập ngân hàng"
                    autocomplete="off"
                    value={bank}
                    onChange={this.onChange}
                    name="bank"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Chi nhánh</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập chi nhánh"
                    autocomplete="off"
                    value={branch}
                    onChange={this.onChange}
                    name="branch"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-info">
                  Tạo
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch, props) => {
  return {
    createCategoryP: (id, form) => {
      dispatch(CategoryPAction.createCategoryP(id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
