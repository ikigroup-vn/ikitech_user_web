import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Alert from "../../components/Partials/Alert"
import * as Types from "../../constants/ActionType"
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as billAction from "../../actions/bill";
import Form from "../../components/Bill/Form"
import { shallowEqual } from "../../ultis/shallowEqual";
import NotAccess from "../../components/Partials/NotAccess";
import ReactToPrint from 'react-to-print';
import ComponentToPrint from "./ComponentToPrint"
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: "show"

        }

    }

    componentDidMount() {
        var { store_code, order_code, billId} = this.props.match.params
        this.props.fetchBillId(store_code, order_code);
    
    }

    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps.bill, this.props.bill)) {
            var { store_code } = this.props.match.params
            var customerId = nextProps.bill.customer_id

            if(nextProps.bill.customer != null) {
                this.props.fetchChatId(store_code, customerId);
            }
           

        }
        if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
            var permissions = nextProps.permission
            var isShow = permissions.order_list
            var chat_allow = permissions.chat_allow
            var order_allow_change_status = permissions.order_allow_change_status

            this.setState({ isLoading: true, chat_allow, isShow, order_allow_change_status })
        }
    }

    goBack = () => {
        var { history } = this.props;
        history.goBack();
    };
    render() {

        var { store_code, order_code, billId  } = this.props.match.params
        var { bill, billHistoty, chat , stores  , badges} = this.props
        var { showChatBox, chat_allow, isShow, order_allow_change_status } = this.state
        if (this.props.auth) {
            return (
                <div id="wrapper">
                    <Sidebar store_code={store_code} />
                    <div className="col-10 col-10-wrapper">

                        <div id="content-wrapper" className="d-flex flex-column">
                            <div style={{ marginBottom: "25px" }} id="content">
                                <Topbar store_code={store_code} />
                                {typeof isShow == "undefined" ? <div style={{ height: "500px" }}></div> :
                                    isShow == true ?
                                        <div className="container-fluid">

                                            <Alert
                                                type={Types.ALERT_UID_STATUS}
                                                alert={this.props.alert}
                                            />
                                            <div
                                                style={{ display: "flex", justifyContent: "space-between" }}
                                            >
                                                <h4 className="h4 title_content mb-0 text-gray-800">
                                                    Chi tiết đơn hàng
                                                </h4>{" "}

                                                <div>
                                                
                                                <button style = {{marginRight : "10px"}} type="button" onClick={this.goBack} class="btn btn-primary  btn-sm"><i class="fas fa-arrow-left"></i>&nbsp;Quay lại</button>
                                               
                                                <ReactToPrint
          trigger={() => {
    
            return   <button type="button"  class="btn btn-danger  btn-sm"><i class="fas fa-print"></i>&nbsp;In hóa đơn</button>;
          }}
          content={() => this.componentRef}
        />
                <div className = "print-source " style = {{display : "none"}} >

          {
              stores != null && stores.length > 0 &&
              <ComponentToPrint badges  = {badges} bill = {bill} store_code = {store_code} stores = {stores} ref={el => (this.componentRef = el)} />
       
          }
       </div>

                                                    </div>
                                            </div>

                                            <br></br>

                                            <Form chat_allow = {chat_allow} order_allow_change_status = {order_allow_change_status} showChatBox={showChatBox} chat={chat} billId={billId} order_code={order_code} store_code={store_code} bill={bill} billHistoty={billHistoty}></Form>

                                        </div>
                                        : <NotAccess />}

                            </div>

                            <Footer />
                        </div>
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
        bill: state.billReducers.bill.billID,
        auth: state.authReducers.login.authentication,
        billHistoty: state.billReducers.bill.billHistory,
        alert: state.billReducers.alert.alert_uid,
        chat: state.chatReducers.chat.chatID,
        permission: state.authReducers.permission.data,
        stores: state.storeReducers.store.allStore,
        badges: state.badgeReducers.allBadge,



    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchBillId: (store_code, billId) => {
            dispatch(billAction.fetchBillId(store_code, billId));
        },
        fetchBillHistory: (store_code, billId) => {
            dispatch(billAction.fetchBillHistory(store_code, billId));
        },
        fetchChatId: (store_code, customerId) => {
            dispatch(billAction.fetchChatId(store_code, customerId));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
