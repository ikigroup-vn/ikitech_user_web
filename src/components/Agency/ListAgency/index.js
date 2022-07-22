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
            searchValue: "",

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

        this.props.fetchAllAgency(this.props.store_code, 1, null);
        this.props.fetchAllAgencyType(this.props.store_code);

    }
    closeChatBox = (status) => {
        this.setState({
            showChatBox: status,
        })

    }
    passType = (data) =>{
        var {searchValue} = this.state
        this.setState({type : data})
        var params = this.getParams(searchValue, data)
        this.props.fetchAllAgency(this.props.store_code, 1, params);

    }

    getParams = (searchValue , type) => {
        var params = ``;

        if (searchValue != "" && searchValue != null) {
            params = params + `&search=${searchValue}`;
        }
        if (type != "" && type != null) {
            params = params + `&agency_type_id=${type}`;
        }
        return params
    }
    searchData = (e) => {
        e.preventDefault();
        var { searchValue } = this.state;
        var params = this.getParams(searchValue);
        this.props.fetchAllAgency(this.props.store_code, 1, params);

    };
    exportListAgency = () =>{
        var { searchValue } = this.state;
        var params = this.getParams(searchValue);
        this.props.exportListAgency(this.props.store_code, 1 , params);

    }
    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    render() {
        var { customer, chat, agencys, store_code, tabId, store_code, types } = this.props

        var customerImg = typeof customer.avatar_image == "undefined" || customer.avatar_image == null ? Env.IMG_NOT_FOUND : customer.avatar_image
        var customerId = typeof customer.id == "undefined" || customer.id == null ? null : customer.id;
        var customerName = typeof customer.name == "undefined" || customer.name == null ? "Trống" : customer.name;

        var { showChatBox, searchValue } = this.state
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
                                placeholder="Tìm kiếm đại lý"
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
            onClick={this.exportListAgency}
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
                    <Table
                    passType={this.passType}
                        searchValue={searchValue}
                        getParams={this.getParams}
                        types={types} tabId={tabId} showChatBox={showChatBox} handleShowChatBox={this.handleShowChatBox} store_code={store_code} agencys={agencys} />

                    <Pagination
                        searchValue={searchValue}
                        getParams={this.getParams}
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
        fetchAllAgency: (store_code, page, params) => {
            dispatch(agencyAction.fetchAllAgency(store_code, page, params));
        },
        fetchCustomerId: (store_code, customerId) => {
            dispatch(customerAction.fetchCustomerId(store_code, customerId));
        },
        fetchChatId: (store_code, agencyId) => {
            dispatch(agencyAction.fetchChatId(store_code, agencyId));
        },
        fetchAllAgencyType: (store_code) => {
            dispatch(agencyAction.fetchAllAgencyType(store_code));
        },
        exportListAgency: (store_code,page,params) => {
            dispatch(agencyAction.exportListAgency(store_code,page,params));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListAgency);
