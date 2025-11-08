import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmail, isEmpty, isPhone } from "../../ultis/helpers";
import Validator from "../../ultis/validator";
import themeData from "../../ultis/theme_data";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      isLoaded: false,
     
      txtNumber: "",
      txtType: "",
      txtSeat_count: "",
      error_seat_count: { status: false, text: "" },
      errors: {},
      error_name: { status: false, text: "" },
    };
    const rules = [
      {
        field: "txtNumber",
        method: "isEmpty",
        validWhen: false,
        message: "Biển số không được để trống.",
      },
      {
        field: "txtType",
        method: "isEmpty",
        validWhen: false,
        message: "Loại xe không được để trống.",
      },
      {
        field: "txtSeat_count",
        method: "isEmpty",
        validWhen: false,
        message: "Số ghế không được để trống.",
      },
    ];
    this.validator = new Validator(rules);
  }
  listErrors = () => {
    return {
      error_seat_count: { status: false, text: "" },
      error_name: { status: false, text: "" },
    };
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };


  componentWillReceiveProps(nextProps, nextState) {
    if (nextState.isLoaded === true) {
      this.setState({
        listWards: nextProps.wards,
        listDistrict: nextProps.district,
        isLoaded: false,
      });
    }

    if (
      !shallowEqual(nextProps.wards, this.props.wards) ||
      !shallowEqual(this.props.district, nextProps.district)
    ) {
      this.setState({
        listWards: nextProps.wards,
        listDistrict: nextProps.district,
      });
    }
    if (nextProps.openModal == true) {
      this.setState({
        isLoaded: false,
        txtNumber: "",
        txtType: "",
        txtSeat_count: "",
        ...this.listErrors(),
      });
      this.props.resetModal();
    }
  }
  handleOnClick = () => {

    const errors = this.validator.validate(this.state);

    var {
      txtNumber,
      txtType,
      txtSeat_count
    } = this.state;

    var error = false;
    this.setState({
      errors: errors,
    });
    console.log('errors=====',errors);
    if (Object.keys(errors).length > 0) {
      error = true;
    }

    if (error == true) return;

    const { store_code } = this.props;
    const Formdata = {
      number: txtNumber,
      type: txtType,
      seat_count: txtSeat_count
    };

    this.props.createCar(store_code, Formdata, this, function () {
      window.$(".modal").modal("hide");
    });
  };
  
  render() {
    var { province } = this.props;
    var {
      errors,
      error_name,
    } = this.state;
    var {
      txtNumber,
      txtType,
      txtSeat_count
    } = this.state;
    return (
      <>
        {this.state.status && (
          <div
            class="alert alert-danger alert-dismissible"
            style={{ position: "fixed", top: "10px" }}
          >
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Chưa nhập đủ thông tin xe</strong>
          </div>
        )}

        <div class="modal" id="modalAddress">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: themeData().backgroundColor,
                }}
              >
                <h4 style={{ color: "white", margin: "10px" }}>
                  Thêm xe
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <React.Fragment>
                  <form role="form">
                    <div className="row">
                      <div className="col-6 box-body-left">
                        <div class="form-group">
                          <label for="product_name">Biển số</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtNumber"
                            placeholder="Nhập tên xe"
                            autoComplete="off"
                            value={txtNumber || ""}
                            onChange={this.onChange}
                            name="txtNumber"
                          />
                          {errors.txtNumber && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtNumber}
                            </div>
                          )}
                          {error_name.status && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {error_name.text}
                            </div>
                          )}
                        
                        </div>
                        <div class="form-group">
                          <label for="product_name">Loại xe</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtType"
                            placeholder="Nhập loại xe"
                            autoComplete="off"
                            value={txtType || ""}
                            onChange={this.onChange}
                            name="txtType"
                          />
                           {errors.txtType && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtType}
                            </div>
                          )}
                         
                        </div>

                        <div class="form-group">
                          <label for="product_name">Số ghế</label>
                          <input
                            type="number"
                            class="form-control"
                            id="txtSeat_count"
                            placeholder="Nhập loại xe"
                            autoComplete="off"
                            value={txtSeat_count || ""}
                            onChange={this.onChange}
                            name="txtSeat_count"
                          />
                          {errors.txtSeat_count && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtSeat_count}
                            </div>
                          )}
                        </div>
                       

                       
                      </div>
                     
                    </div>
                  </form>
                </React.Fragment>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  onClick={this.handleOnClick}
                  class="btn btn-warning"
                >
                  Tạo
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    createCar: (id, form, $this, funcModal) => {
      dispatch(dashboardAction.createCar(id, form, $this, funcModal));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalCreate);
