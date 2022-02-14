import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import CreateModal from "./ModalCreate"
import Table from "./Table";

class ListAgency extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount() {

        this.props.fetchAllAgencyType(this.props.store_code);
    }

    render() {
        var { types, store_code } = this.props
        console.log(types)
        return (
            <div id="wrapper">
                <CreateModal store_code={store_code} />

                <div className="card-body">
                    <a
                        style={{ float: "right" }}

                        data-toggle="modal" data-target="#createType"
                        class={`btn btn-info btn-icon-split btn-sm`}
                    >
                        <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                        </span>
                        <span style={{ color: "white" }} class={`text `}>Thêm cấp</span>
                    </a>
                    <Table types={types} store_code={store_code} />


                </div>





            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        types: state.agencyReducers.agency.allAgencyType,
        auth: state.authReducers.login.authentication,

    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllAgencyType: (store_code) => {
            dispatch(agencyAction.fetchAllAgencyType(store_code));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListAgency);
