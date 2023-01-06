import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import Table from "../../../components/Promotion/Combo/Table";
import Pagination from "../../../components/Promotion/Combo/Pagination";
import { Link, Redirect } from "react-router-dom";
import * as comboAction from "../../../actions/combo";
import ModalDelete from "../../../components/Promotion/Combo/Delete/Modal";
import ModalIsEnd from "../../../components/Promotion/Combo/Edit/Modal";
import NotAccess from "../../../components/Partials/NotAccess";
import { getQueryParams, removeAscent } from "../../../ultis/helpers";

import Loading from "../../Loading";
import styled from "styled-components";

const ComboStyles = styled.div`
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    .form-inputSearch {
      max-width: 25%;
      width: 100%;
      position: relative;
      input {
        width: 100%;
        padding-right: 30px !important;
      }
      .search-icon {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
class Combo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_end: 2,
      modal: {
        table: "",
        id: "",
        store_code: "",
      },
      modalIsEnd: {},
      searchValue: "",
      comboProducts: [],
    };
  }
  setComboProducts = (combos) => {
    this.setState({
      comboProducts: combos,
    });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = Number(target.value);
    this.setState({ [name]: value });
  };
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleIsEndCallback = (modal) => {
    this.setState({ modalIsEnd: modal });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.is_end !== this.state.is_end) {
      var { store_code } = this.props.match.params;
      var is_end = Number(nextState.is_end);
      switch (is_end) {
        case 0:
          this.props.fetchAllCombo(store_code);
          break;
        case 1:
          this.props.fetchAllComboEnd(store_code);
          break;
        case 2:
          this.props.fetchAllCombo(store_code);
          break;
        default:
          break;
      }
    }
    const { combos } = this.props;
    if (!shallowEqual(combos, nextProps.combos)) {
      this.setComboProducts(nextProps.combos);
    }
    return true;
  }

  componentDidMount() {
    var type = getQueryParams("type");
    var { store_code } = this.props.match.params;

    if ((type && type == 0) || type == 1 || type == 2) {
      var type = Number(type);

      switch (type) {
        case 0:
          this.props.fetchAllCombo(store_code);
          break;
        case 1:
          this.props.fetchAllComboEnd(store_code);
          break;
        case 2:
          this.props.fetchAllCombo(store_code);
          break;
        default:
          break;
      }
      this.setState({ is_end: type });
    } else {
      this.props.fetchAllCombo(this.props.match.params.store_code);
    }
  }
  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.promotion;

      this.setState({
        isLoading: true,
        insert: true,
        update: true,
        _delete: true,
        isShow,
      });
    }
  }
  handleSearchValueChange = (e) => {
    const value = e.target.value;
    const { combos } = this.props;

    this.setState({
      searchValue: value,
    });
    if (value === "") {
      this.setComboProducts(combos);
    } else {
      let newComboProducts = JSON.parse(JSON.stringify(combos));
      if (Array.isArray(combos)) {
        newComboProducts = combos.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      } else {
        newComboProducts.data = combos.data.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      }
      this.setComboProducts(newComboProducts);
    }
  };
  render() {
    var { params } = this.props.match;
    var { is_end, modal, modalIsEnd, searchValue, comboProducts } = this.state;
    var { combos } = this.props;
    var displayPag = is_end == 0 ? "hide" : null;
    var { store_code } = this.props.match.params;
    var { insert, update, _delete, isShow } = this.state;

    if (this.props.auth) {
      return (
        <ComboStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={params.store_code} />
                {typeof isShow == "undefined" ? (
                  <div></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 class="h3 title_content mb-2 text-gray-800">
                        Combo giảm giá
                      </h3>
                      <Link
                        to={`/combo/create/${params.store_code}`}
                        class={`btn btn-info btn-icon-split  ${
                          insert == true ? "show" : "hide"
                        }`}
                      >
                        <span
                          style={{
                            display: "flex",
                            margin: "auto",
                            height: "100%",
                            "justify-content": "center",
                            "align-items": "center",
                          }}
                          class="icon text-white-50"
                        >
                          <i class="fas fa-plus"></i>
                        </span>
                        <span style={{ margin: "auto" }} class="text">
                          Tạo combo giảm giá
                        </span>
                      </Link>
                    </div>

                    <div
                      class="form-group"
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <div className="form-header">
                        <div
                          class="col-sm-3"
                          style={{
                            paddingLeft: "0px",
                            paddingRight: 0,
                            maxWidth: "20%",
                          }}
                        >
                          <select
                            name="is_end"
                            id="input"
                            class="form-control"
                            required="required"
                            value={is_end}
                            onChange={this.onChange}
                          >
                            {" "}
                            <option value="0">Chuẩn bị diễn ra</option>
                            <option value="2">Đang diễn ra</option>
                            <option value="1">Đã kết thúc</option>
                          </select>
                        </div>
                        <div className="form-inputSearch">
                          {is_end != 1 ? (
                            <>
                              <input
                                className="form-control"
                                value={searchValue}
                                onChange={this.handleSearchValueChange}
                                type="text"
                                placeholder="Tìm kiếm combo..."
                              />
                              <span className="search-icon">
                                <i className="fa fa-search"></i>
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">
                          Danh sách combo
                        </h6>
                      </div>
                      <div class="card-body">
                        <Table
                          update={update}
                          _delete={_delete}
                          is_end={is_end}
                          handleIsEndCallback={this.handleIsEndCallback}
                          handleDelCallBack={this.handleDelCallBack}
                          params={params}
                          combos={comboProducts}
                        />
                        <Pagination
                          display={displayPag}
                          params={params}
                          combos={comboProducts}
                          store_code={store_code}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>
              <ModalDelete modal={modal} />
              <ModalIsEnd modal={modalIsEnd} />

              <Footer />
            </div>
          </div>
        </ComboStyles>
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
    auth: state.authReducers.login.authentication,
    combos: state.comboReducers.combo.allCombo,
    alert: state.comboReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCombo: (store_code) => {
      dispatch(comboAction.fetchAllCombo(store_code));
    },
    fetchAllComboEnd: (store_code) => {
      dispatch(comboAction.fetchAllComboEnd(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Combo);
