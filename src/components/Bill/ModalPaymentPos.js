import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import {formatNumber} from "../../ultis/helpers"
import * as Types from "../../constants/ActionType";
import * as billAction from "../../actions/bill"
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining_amount: 0,
      balance: 0,
      cash: 0
    }
  }


  componentDidMount()
  {
    this.setState({remaining_amount : this.props.remaining_amount , cash: this.props.remaining_amount })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps , nextState);
    if (this.props.remaining_amount != nextProps.remaining_amount  || (nextProps.remaining_amount > 0 && nextState.remaining_amount ==0)) {
      console.log("vo ne")
      this.setState({ remaining_amount: nextProps.remaining_amount, cash: nextProps.remaining_amount })
    }
    return true
  }

  onChange = (e) => {
    var {value}  = e.target
    value = Number(formatNumber(value))
    var {remaining_amount} = this.state
    console.log(remaining_amount , value , isNaN(Number(value)))
    if(remaining_amount - value < 0 || value > remaining_amount || isNaN(Number(value)) )
    {
      return;
    }
    console.log("vo state")
    this.setState({ cash: value , balance : Number(remaining_amount) - Number(value) })
  }

  onSave = (e) =>{
    e.preventDefault()
    var {cash} = this.state
    if(cash == "" || cash == 0)
    {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Giá trị không hợp lệ",
        }, 
      });
    }
    else
    {
      var {order_code ,store_code} = this.props
      window.$(".modal").modal("hide");
      
      this.props.postCashRefund(order_code , {order_code : order_code , amount_money : cash} , store_code)
    }
  }

  render() {
    var { cash, balance, remaining_amount } = this.state;
    console.log(this.state , this.props.remaining_amount);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalPayment"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">

            <div class="modal-content">
              <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
                <h4 style={{ color: "white" }}>Thanh toán còn lại</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
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
                    <label for="product_name">Khách hàng cần thanh toán</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      value={new Intl.NumberFormat().format(formatNumber(remaining_amount))}
                      name="txtName"
                      placeholder="Số tiền KH cần thanh toán"
                      autocomplete="off"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label for="product_name">Khách hàng đưa</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tiền mặt</button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">Chuyển khoản</a>
                          <a class="dropdown-item" href="#">Tiền mặt</a>
                          <a class="dropdown-item" href="#">Quẹt thẻ</a>
                          <a class="dropdown-item" href="#">COD</a>

                        </div>
                      </div>
                      <input type="text" 
                         value={ new Intl.NumberFormat().format(formatNumber(cash))}
                         name="txtName"
                         placeholder="Số tiền KH đưa"
                         onChange = {this.onChange}
                      class="form-control" aria-label="Text input with dropdown button"/>
                    </div>

                  
                  </div>
                  <div class="form-group">
                    <label for="product_name">Tiền thừa</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      value={new Intl.NumberFormat().format(formatNumber(balance))}
                      name="txtName"
                      placeholder="Tiền thừa của KH"
                      autocomplete="off"
                      onChange={this.onChange}
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
                  <button onClick={this.onSave} type="submit" style={{ backgroundColor: themeData().backgroundColor }} class="btn btn-warning">
                    Thanh toán

                  </button>
                </div>
              </form>
            </div>




          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    postCashRefund: (order_code , data, store_code ) => {
      dispatch(billAction.postCashRefund(order_code , data, store_code));
  },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
