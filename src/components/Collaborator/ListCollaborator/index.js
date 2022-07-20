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
            searchValue: "",

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
    exportListCollaborator = () =>{
        var { searchValue } = this.state;
        var params = this.getParams(searchValue);
        this.props.exportListCollaborator(this.props.store_code, 1 , params);

    }
    getParams = (searchValue) => {
        var params = ``;

        if (searchValue != "" && searchValue != null) {
            params = params + `&search=${searchValue}`;
        }
   
        return params
    }
    searchData = (e) => {
        e.preventDefault();
        var { searchValue } = this.state;
        var params = this.getParams(searchValue);
        this.props.fetchAllCollaborator(this.props.store_code, 1, params);

    };

    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    render() {
        var { customer, chat, collaborators, store_code, tabId,store_code } = this.props

        var customerImg = typeof customer.avatar_image == "undefined" || customer.avatar_image == null ? Env.IMG_NOT_FOUND : customer.avatar_image
        var customerId = typeof customer.id == "undefined" || customer.id == null ? null : customer.id;
        var customerName = typeof customer.name == "undefined" || customer.name == null ? "Trống" : customer.name;

        var { showChatBox ,searchValue} = this.state
        console.log(this.props.state)
        return (
            <div id="">
                       <div
                    class="row"
                    style={{ "justify-content": "space-between" }}
                >
                    <form onSubmit={this.searchData}>
                        <div
                            class="input-group mb-6"
                            style={{ padding: "7px 20px" }}
                        >
                            <input
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                                type="search"
                                name="txtSearch"
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                class="form-control"
                                placeholder="Tìm kiếm CTV"
                            />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>

                    </form>

                    <button
            style={{ margin: "auto 0px" }}
            onClick={this.exportListCollaborator}
            class={`btn btn-danger btn-icon-split btn-sm `}
          >
            <span class="icon text-white-50">
              <i class="fas fa-file-export"></i>
            </span>
            <span style={{ color: "white" }} class="text">
              Export Excel
            </span>
          </button>

                </div>
                <div className="card-body">
                    <Table tabId={tabId} showChatBox={showChatBox} handleShowChatBox={this.handleShowChatBox} store_code={store_code} collaborators={collaborators} />

                    <Pagination
                                 searchValue={searchValue}
                                 getParams={this.getParams}
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
        fetchAllCollaborator: (store_code,page,params) => {
            dispatch(collaboratorAction.fetchAllCollaborator(store_code,page,params));
        },
        fetchCustomerId: (store_code, customerId) => {
            dispatch(customerAction.fetchCustomerId(store_code, customerId));
        },
        fetchChatId: (store_code, collaboratorId) => {
            dispatch(collaboratorAction.fetchChatId(store_code, collaboratorId));
        },
        
        exportListCollaborator: (store_code,page,params) => {
            dispatch(collaboratorAction.exportListCollaborator(store_code,page,params));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCollaborator);
