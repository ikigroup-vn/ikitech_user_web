import React, { Component } from "react";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalCreate from "../../components/Agency/Config/ModalCreate";
import ModalUpdate from "../../components/Agency/Config/ModalUpdate";
import ModalRemove from "../../components/Agency/Config/ModalRemove";

import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Config from "../../components/Agency/Config";
import ListAgency from "../../components/Agency/ListAgency";
import TopReport from "../../components/Agency/TopReport";
import RequestPayment from "../../components/Agency/RequestPayment";
import Type from "../../components/Agency/Type";

import NotAccess from "../../components/Partials/NotAccess";
import BonusProgram from "../../components/Agency/BonusProgram";

class agency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
      },
      modalupdate: {},
      tabId: 0,
    };
    this.defaultIndex = this.props.match.params.action == "request_payment" ? 2 : 0
  }

  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };


  handleEditCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };
  fetchDataOnTap = (index) => {
    this.setState({ tabId: index });
    // var urlParams = new URLSearchParams(window.location.search);
    // urlParams.set('tab-index', index);
    // window.location.search = urlParams;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      var payment_request_list = permissions.agency_payment_request_list
      var config = permissions.agency_config
      var payment_request_history = permissions.agency_payment_request_history
      var agency_list = permissions.agency_list
      var payment_request_solve = permissions.agency_payment_request_solve

      var isShow = payment_request_list == false && config == false && payment_request_history == false && agency_list == false ? false : true

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      var tabIndex = urlParams.get('tab-index');
      if (!tabIndex) {
        tabIndex = 0;
      }
      this.defaultIndex = tabIndex;

      this.setState({
        isLoading: true, 
        agency_list: true, 
        payment_request_list: true, 
        config: true, 
        payment_request_history: true, 
        payment_request_solve: true, 
        isShow: true,
        bonus_program:true
      })
    }

  }
  render() {
    var { store_code, id } = this.props.match.params;
    var { tabId, 
      tabDefault, 
      agency_list, 
      payment_request_list, 
      config, 
      payment_request_history, 
      payment_request_solve, 
      bonus_program,
      isShow } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? <div style={{ height: "500px" }}></div> :
                isShow == true ?

                  <div className="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Đại lý
                      </h4>{" "}
                    </div>
                    <br></br>

                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <Tabs
                          defaultIndex={this.defaultIndex}
                          onSelect={(index) => this.fetchDataOnTap(index)}
                        >
                          <TabList>
                            {/* {
                              config == true ? <Tab>
                                <i class="fa fa-cog"></i>
                                <span>Cấu hình hoa hồng</span>
                              </Tab> : null
                            } */}
                            {
                              config == true ? <Tab>
                                <i class="fa fa-list"></i>
                                <span>Cấu hình đại lý</span>
                              </Tab> : null
                            }
                            {
                              agency_list == true ? <Tab>
                                <i class="fa fa-list"></i>
                                <span>Danh sách đại lý</span>
                              </Tab> : null
                            }

                            {
                              payment_request_list == true ? <Tab>
                                <i class="fa fa-list"></i>
                                <span> Top doanh số</span>
                              </Tab> : null
                            }

                            {   
                              bonus_program == true ? <Tab>
                                <i class="fa fa-list"></i>
                                <span>Chương trình thưởng</span>
                              </Tab> : null
                            }
                            {/* {
                              payment_request_history == true ? <Tab>
                                <i class="fa fa-money"></i>
                                <span> Lịch sử yêu cầu thanh toàn</span>
                              </Tab> : null
                            } */}



                          </TabList>

                          {/* {config == true ? <TabPanel>
                            <Config
                              tabId={tabId}
                              store_code={store_code}
                              handleEditCallBack={this.handleEditCallBack}
                              handleDelCallBack={this.handleDelCallBack}
                            />
                          </TabPanel> : null} */}
                          {agency_list == true ? <TabPanel>
                            <Type tabId={tabId} store_code={store_code} />
                          </TabPanel> : null}
                          {agency_list == true ? <TabPanel>
                            <ListAgency tabId={tabId} store_code={store_code} />
                          </TabPanel> : null}
                          {payment_request_list == true ? <TabPanel>
                            <TopReport paramId={id} tabId={tabId} store_code={store_code} payment_request_solve={payment_request_solve} />
                          </TabPanel> : null}
                          {bonus_program == true ? <TabPanel>
                            <BonusProgram paramId={id} tabId={tabId} store_code={store_code} payment_request_solve={payment_request_solve} />
                          </TabPanel> : null}
                          {/* {payment_request_history == true ? <TabPanel>
                            <HistoryPayment tabId={tabId} store_code={store_code} />
                          </TabPanel> : null} */}




                        </Tabs>
                      </div>
                    </div>
                  </div>
                  : <NotAccess />}

            </div>
            <ModalCreate store_code={store_code} />
            <ModalRemove modal={this.state.modalremove} store_code={store_code} />
            <ModalUpdate modal={this.state.modalupdate} store_code={store_code} />

            <Footer />
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    alert: state.agencyReducers.alert.alert_uid_config,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(agency);
