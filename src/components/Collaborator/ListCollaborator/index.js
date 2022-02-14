import React, { Component } from "react";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import Chat from "../../Chat"
import * as Env from "../../../ultis/default"
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";

class ListCollaborator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: "hide",
        };
    }

    handleShowChatBox = (collaboratorId, status) => {
        this.setState({
            showChatBox: status,
            collaboratorId: collaboratorId

        })
        var { store_code } = this.props
        this.props.fetchCustomerId(store_code, collaboratorId);

        this.props.fetchChatId(store_code, collaboratorId);
    }



    componentDidMount() {

        this.props.fetchAllCollaborator(this.props.store_code);
    }
    closeChatBox = (status) => {
        this.setState({
            showChatBox: status,
        })

    }
    render() {
        var { customer, chat, collaborators, store_code, tabId,store_code } = this.props

        var customerImg = typeof customer.avatar_image == "undefined" || customer.avatar_image == null ? Env.IMG_NOT_FOUND : customer.avatar_image
        var customerId = typeof customer.id == "undefined" || customer.id == null ? null : customer.id;
        var customerName = typeof customer.name == "undefined" || customer.name == null ? "Trống" : customer.name;

        var { showChatBox } = this.state
        console.log(this.props.state)
        return (
            <div id="wrapper">
                <div className="card-body">
                    <Table store_code = {store_code} tabId={tabId} showChatBox={showChatBox} handleShowChatBox={this.handleShowChatBox} store_code={store_code} collaborators={collaborators} />

                    <Pagination
                        store_code={store_code}
                        collaborators={collaborators}
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
        collaborators: state.collaboratorReducers.collaborator.allCollaborator,
        auth: state.authReducers.login.authentication,
        chat: state.chatReducers.chat.chatID,
        customer: state.customerReducers.customer.customerID,
        state
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCollaborator: (store_code) => {
            dispatch(collaboratorAction.fetchAllCollaborator(store_code));
        },
        fetchCustomerId: (store_code, customerId) => {
            dispatch(customerAction.fetchCustomerId(store_code, customerId));
        },
        fetchChatId: (store_code, collaboratorId) => {
            dispatch(collaboratorAction.fetchChatId(store_code, collaboratorId));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCollaborator);
