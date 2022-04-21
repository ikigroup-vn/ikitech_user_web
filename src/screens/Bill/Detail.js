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
import ComponentToPrintPos from "./ComponentToPrintPos"
import getChannel, { IKITECH , IKIPOS } from "../../ultis/channel";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: "show"
        }
    }
    componentDidMount() {
        var { store_code, order_code, billId } = this.props.match.params
        this.props.fetchBillId(store_code, order_code);
        this.props.fetchHistoryPay(store_code, order_code);

        
    }

    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps.bill, this.props.bill)) {
            var { store_code } = this.props.match.params
            var customerId = nextProps.bill.customer_id

            if (nextProps.bill.customer != null) {
                this.props.fetchChatId(store_code, customerId);
                const branch_id = localStorage.getItem("branch_id")
                this.props.fetchAllBill(store_code, 1, branch_id, null, `&phone_number=${nextProps.bill.phone_number}`);

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

        var { store_code, order_code, billId } = this.props.match.params
        var { bill, billHistoty, chat, stores, badges,historyPay , bills , currentBranch } = this.props
        var { showChatBox, chat_allow, isShow, order_allow_change_status } = this.state
        console.log(this.props.currentBranch)
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

                                                    <button style={{ marginRight: "10px" }} type="button" onClick={this.goBack} class="btn btn-primary  btn-sm"><i class="fas fa-arrow-left"></i>&nbsp;Quay lại</button>

                                                    <ReactToPrint
                                                        trigger={() => {

                                                            return <button type="button" class="btn btn-danger  btn-sm"><i class="fas fa-print"></i>&nbsp;In hóa đơn</button>;
                                                        }}
                                                        content={() => this.componentRef}
                                                    />
                                                    <div className="print-source " style={{ display: "none" }} >

                                                        {
                                                           getChannel() == IKITECH && currentBranch != null && stores.length  > 0 &&
                                                            <ComponentToPrint 
                                                            badges={badges} 
                                                            bill={bill} 
                                                            store_code={store_code} 
                                                            stores={stores} 
                                                            ref={el => (this.componentRef = el)}
                                                            currentBranch={this.props.currentBranch}
                                                             />
                                                        }
                                                           {
                                                           getChannel() == IKIPOS && currentBranch != null && stores.length  > 0 &&
                                                            <ComponentToPrintPos 
                                                            badges={badges} 
                                                            bill={bill} 
                                                            store_code={store_code} 
                                                            stores={stores} 
                                                            ref={el => (this.componentRef = el)}
                                                            currentBranch={this.props.currentBranch}
                                                             />
                                                        }
                                                    </div>

                                                </div>
                                            </div>

                                            <br></br>

                                            <Form bills = {bills} historyPay= {historyPay} chat_allow={chat_allow} order_allow_change_status={order_allow_change_status} showChatBox={showChatBox} chat={chat} billId={billId} order_code={order_code} store_code={store_code} bill={bill} billHistoty={billHistoty}></Form>

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
        bills: state.billReducers.bill.allBill,

        bill: state.billReducers.bill.billID,
        auth: state.authReducers.login.authentication,
        billHistoty: state.billReducers.bill.billHistory,
        historyPay: state.billReducers.bill.historyPay,
        alert: state.billReducers.alert.alert_uid,
        chat: state.chatReducers.chat.chatID,
        permission: state.authReducers.permission.data,
        stores: state.storeReducers.store.allStore,
        badges: state.badgeReducers.allBadge,
        currentBranch: state.branchReducers.branch.currentBranch,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchBillId: (store_code, billId) => {
            dispatch(billAction.fetchBillId(store_code, billId));
        },
        fetchHistoryPay: (store_code, order_code) => {
            dispatch(billAction.fetchHistoryPay(store_code, order_code));
        },
        fetchBillHistory: (store_code, billId) => {
            dispatch(billAction.fetchBillHistory(store_code, billId));
        },
        fetchChatId: (store_code, customerId) => {
            dispatch(billAction.fetchChatId(store_code, customerId));
        },
        fetchAllBill: (id, page, branch_id, params, params_agency) => {
            dispatch(billAction.fetchAllBill(id, page, branch_id, params, params_agency));
          },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
