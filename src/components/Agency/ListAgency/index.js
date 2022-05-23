import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import Chat from "../../Chat"
import * as Env from "../../../ultis/default"
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";

class ListAgency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: "hide",
        };
    }

    handleShowChatBox = (agencyId, status) => {
        this.setState({
            showChatBox: status,
            agencyId: agencyId

        })
        var { store_code } = this.props
        this.props.fetchCustomerId(store_code, agencyId);

        this.props.fetchChatId(store_code, agencyId);
    }



    componentDidMount() {

        this.props.fetchAllAgency(this.props.store_code);
    }
    closeChatBox = (status) => {
        this.setState({
            showChatBox: status,
        })

    }
    render() {
        var { customer, chat, agencys, store_code, tabId,store_code , types } = this.props

        var customerImg = typeof customer.avatar_image == "undefined" || customer.avatar_image == null ? Env.IMG_NOT_FOUND : customer.avatar_image
        var customerId = typeof customer.id == "undefined" || customer.id == null ? null : customer.id;
        var customerName = typeof customer.name == "undefined" || customer.name == null ? "Trống" : customer.name;

        var { showChatBox } = this.state
        console.log(this.props.state)
        return (
            <div id="">
                <div className="card-body">
                    <Table types = {types}  tabId={tabId} showChatBox={showChatBox} handleShowChatBox={this.handleShowChatBox} store_code={store_code} agencys={agencys} />

                    <Pagination
                        store_code={store_code}
                        agencys={agencys}
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
        agencys: state.agencyReducers.agency.allAgency,
        auth: state.authReducers.login.authentication,
        chat: state.chatReducers.chat.chatID,
        customer: state.customerReducers.customer.customerID,
        types: state.agencyReducers.agency.allAgencyType,

        state
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllAgency: (store_code) => {
            dispatch(agencyAction.fetchAllAgency(store_code));
        },
        fetchCustomerId: (store_code, customerId) => {
            dispatch(customerAction.fetchCustomerId(store_code, customerId));
        },
        fetchChatId: (store_code, agencyId) => {
            dispatch(agencyAction.fetchChatId(store_code, agencyId));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListAgency);
