import React, { Component } from "react";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import Table from "./Table";


class RequestPayment extends Component {
    constructor(props) {
        super(props);
     
    }

    componentDidMount() {

        this.props.fetchAllHistory(this.props.store_code);
    }

    render() {
        var {  store_code , historyPayment , tabId    } = this.props
     
        console.log(historyPayment)
        return (
            <div id="wrapper">
                <div className="card-body">
                    <Table tabId = {tabId} store_code={store_code} historyPayment={historyPayment} />
                    </div>
      

            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        historyPayment: state.collaboratorReducers.collaborator.allHistoryPayment,
        auth: state.authReducers.login.authentication,
       

    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllHistory: (store_code) => {
            dispatch(collaboratorAction.fetchAllHistory(store_code));
        },
       
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestPayment);
