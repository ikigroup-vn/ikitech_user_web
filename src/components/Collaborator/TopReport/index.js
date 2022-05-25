import React, { Component } from "react";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import Chat from "../../Chat"
import * as Env from "../../../ultis/default"
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from "moment";
import * as helper from "../../../ultis/helpers"
import SDateRangePicker from "../../../components/DatePicker/DateRangePicker"
class ListAgency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: "hide",
        };
    }



    componentDidMount() {

        var date = helper.getDateForChartMonth()
        var params = `&date_from=${date.from}&date_to=${date.to}`
        this.props.fetchAllTopReport(this.props.store_code, 1, params);
    }
    closeChatBox = (status) => {
        this.setState({
            showChatBox: status,
        })

    }
    onchangeDateFromTo = (e) => {
        var from = "";
        var to = "";
        try {
            from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD")
            to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD")
        } catch (error) {
            from = null
            to = null
        }
        var params = `&date_from=${from}&date_to=${to}`
        this.props.fetchAllTopReport(this.props.store_code, 1, params);


    }
    onChangeDateFromComponent = (date) => {
        // var from = "";
        // var to = "";
        // try {
        //   from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD")
        //   to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD")
        // } catch (error) {
        //     from = null
        //     to = null
        // }
        var params = `&date_from=${date.from}&date_to=${date.to}`
        this.props.fetchAllTopReport(this.props.store_code, 1, params);


    }
    render() {
        var { customer, chat, topReport, store_code, tabId, store_code, types } = this.props

        var customerImg = typeof customer.avatar_image == "undefined" || customer.avatar_image == null ? Env.IMG_NOT_FOUND : customer.avatar_image
        var customerId = typeof customer.id == "undefined" || customer.id == null ? null : customer.id;
        var customerName = typeof customer.name == "undefined" || customer.name == null ? "Trống" : customer.name;

        var { showChatBox } = this.state
        console.log(this.props.topReport)
        return (
            <div id="wrapper">
                <div className="card-body">

                    <SDateRangePicker onChangeDate={this.onChangeDateFromComponent} />
                   
                    <Table types={types} tabId={tabId} showChatBox={showChatBox} handleShowChatBox={this.handleShowChatBox} store_code={store_code} topReport={topReport} />

                    <Pagination
                        store_code={store_code}
                        topReport={topReport}
                    />
                </div>

                <Chat
                    customerName={customerName}
                    customerImg={customerImg}
                    customerId={customerId}
                    chat={chat}
                    store_code={store_code}
                    closeChatBox={this.closeChatBox}
                    showChatBox={showChatBox}></Chat>



            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        topReport: state.collaboratorReducers.collaborator.topReport,
        auth: state.authReducers.login.authentication,
        chat: state.chatReducers.chat.chatID,
        customer: state.customerReducers.customer.customerID,
        types: state.collaboratorReducers.collaborator.allAgencyType,

        state
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllTopReport: (store_code, page, params) => {
            dispatch(collaboratorAction.fetchAllTopReport(store_code, page, params));
        },
        fetchCustomerId: (store_code, customerId) => {
            dispatch(customerAction.fetchCustomerId(store_code, customerId));
        },
        fetchChatId: (store_code, collaboratorId) => {
            dispatch(collaboratorAction.fetchChatId(store_code, collaboratorId));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListAgency);
