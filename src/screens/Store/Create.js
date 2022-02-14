import React, { Component } from "react";
import Sidebar from "../../components/Home/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Types from "../../constants/ActionType";

import Alert from "../../components/Partials/Alert";
import { isEmpty } from "../../ultis/helpers"

import Loading from "../Loading";
import * as dashboardAction from "../../actions/dashboard";


class StoreCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtId: "",
      txtName: "",
      txtAddress: "",
      txtType: "",
      careers: [],
      txtCareer: "",
    };
    this.isLoading = false

  }

  componentDidMount() {
    this.props.fetchAllTypeStore();
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (name == "txtType") {
      this.fetchAllCareer(value)
    }
    this.setState({
      [name]: value,
    });
  };


  fetchAllCareer = (typeId) => {
    var { types } = this.props

    for (const item of types) {
      if (item.id == typeId) {
        if (typeof item.childs != "undefined")
        this.setState({ careers: item.childs })
      }
    }
  }



  onSave = (e) => {
    e.preventDefault();
    if (this.state.txtName == null || !isEmpty(this.state.txtName)) {
      this.props.showError({

        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên cửa hàng không được để trống",
        },
      }
      )
      return;
    }
    this.props.createStore({
      name: this.state.txtName,
      store_code: this.state.txtId,
      address: this.state.txtAddress,
      id_type_of_store: 1,
      career: this.state.txtCareer

    });
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  showAllTypeStore = (types) => {
    var result = null;
    if (types.length > 0) {
      if (this.isLoading == false) {
        this.isLoading = true
        this.setState({ txtType: types[0].id })
        this.fetchAllCareer(types[0].id)
      }
      result = types.map((type, index) => {
        return <option value={type.id}>{type.name}</option>;
      });
    } else {
      return result;
    }
    return result;
  };

  showAllCareer = (careers) => {
    var result = null;
    if (careers.length > 0) {
      result = careers.map((item, index) => {
        return <option value={item.id}>{item.name}</option>;
      });
    } else {
      return result;
    }
    return result;
  }

  render() {
    var { txtName, txtId, txtAddress, txtType, txtCareer, careers } = this.state;
    var { types } = this.props
    var disableCareer = txtType == "" ? "hide" : "show"
    if (this.props.auth) {
      return (
        <div id="wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar isHome={true} />

              <div class="container-fluid">
                <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Thêm cửa hàng
                  </h4>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                    <section class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div id="messages"></div>

                          <div class="box">
                            <form
                              role="form"
                              onSubmit={this.onSave}
                              method="post"
                            >
                              <div class="box-body">
                                <div class="form-group">

                                </div>
                                <div class="form-group">
                                  <label for="product_name">Mã cửa hàng</label>
                                  <div class="input-group">
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="txtId"
                                      placeholder="Nhập mã cửa hàng"
                                      autocomplete="off"
                                      value={txtId}
                                      onChange={this.onChange}
                                      name="txtId"
                                    />
                                    <div class="input-group-append">
                                      <span class="input-group-text" id="basic-addon2">.mydoapp.vn</span>
                                    </div>
                                  </div>
                                  <strong>
                                    (Mã này là tên miền truy cập trang web bán hàng)
                                  </strong>
                                </div>

                                <div class="form-group">
                                  <label for="product_name">Tên cửa hàng</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="txtName"
                                    name="txtName"
                                    placeholder="Nhập tên cửa hàng"
                                    autocomplete="off"
                                    value={txtName}
                                    onChange={this.onChange}
                                    name="txtName"
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="product_name">Địa chỉ</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="txtAddress"
                                    name="txtAddress"
                                    placeholder="Nhập địa chỉ"
                                    autocomplete="off"
                                    value={txtAddress}
                                    onChange={this.onChange}
                                    name="txtAddress"
                                  />
                                </div>
                                <div class="form-group hide">
                                  <label for="product_name">Lĩnh vực</label>

                                  <select
                                    id="input"
                                    class="form-control"
                                    value={txtType}
                                    onChange={this.onChange}
                                    name="txtType"
                                  >

                                    {this.showAllTypeStore(types)}
                                  </select>
                                </div>

                                <div class={`form-group ${disableCareer}`}>
                                  <label for="product_name">Nghề nghiệp</label>

                                  <select
                                    id="input"
                                    class="form-control"
                                    value={txtCareer}
                                    onChange={this.onChange}
                                    name="txtCareer"
                                  >
                                    <option value="">
                                      -- Chọn ngành nghề --
                                    </option>
                                    {this.showAllCareer(careers)}
                                  </select>
                                </div>
                              </div>

                              <div class="box-footer">
                                <button class="btn btn-info btn-icon-split  btn-sm">
                                  <span class="icon text-white-50">
                                    <i class="fas fa-save"></i>
                                  </span>
                                  <span class="text">Tạo</span>
                                </button>
                                <a
                                  style={{ marginLeft: "10px" }}
                                  onClick={this.goBack}
                                  class="btn btn-warning"
                                  class="btn btn-warning btn-icon-split  btn-sm"
                                >
                                  <span class="icon text-white-50">
                                    <i class="fas fa-arrow-left"></i>
                                  </span>
                                  <span class="text"> Trở về</span>
                                </a>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.storeReducers.store.type,
    auth: state.authReducers.login.authentication,
    alert: state.storeReducers.alert.alert_uid,




  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error)
    },
    createStore: (form) => {
      dispatch(dashboardAction.createStore(form));
    },
    fetchAllTypeStore: () => {
      dispatch(dashboardAction.fetchAllTypeStore());
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreCreate);
