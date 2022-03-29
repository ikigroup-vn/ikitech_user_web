import React, { Component } from 'react'
import Alert from '../../components/Partials/Alert'
import Sidebar from '../../components/Partials/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import NotAccess from "../../components/Partials/NotAccess";
import Footer from '../../components/Partials/Footer';
import * as Types from "../../constants/ActionType";
import * as dashboardAction from "../../actions/dashboard";
import { connect } from 'react-redux';
import ModalDelete from '../../components/Branch/ModalDelete';
import ModalCreate from '../../components/Branch/ModalCreate';
import * as placeAction from "../../actions/place";
import ModalEdit from '../../components/Branch/ModalEdit';

class Branch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_branch: "",
            modal: ""
        }
    }
    handleSetIdBranch = (id) => {
        this.setState({
            id_branch: id
        })
    }
    handleSetInfor = (item) => {
        this.setState({ modal: item })
    }

    componentDidMount() {
        this.props.fetchBranchStore(this.props.store_code);
        this.props.fetchPlaceProvince()
    }
    showData = (listBranch) => {
        var { store_code } = this.props
        var result = null;
        if (listBranch.length > 0) {
            var { update, _delete } = this.props

            result = listBranch.map((data, index) => {

                var decentralization = typeof data.decentralization != "undefined" && data.decentralization != null ? data.decentralization.name : ""

                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.branch_code}</td>
                        <td>{data.address_detail}</td>
                        <td>{data.district_name}</td>
                        <td>{data.province_name}</td>
                        <td>
                            <button
                                onClick={() => this.handleSetInfor(data)}
                                class="btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#modalEdit"
                            >
                                <i class="fa fa-edit"></i> Sửa
                            </button>
                            <button
                                onClick={() => this.handleSetIdBranch(data.id)}
                                style={{ marginLeft: "10px" }}
                                data-toggle="modal"
                                data-target="#removeModal"
                                class="btn btn-danger btn-sm"
                            >
                                <i class="fa fa-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                );
            });
        } else {
            return result;
        }
        return result;
    };
    render() {
        var { store_code } = this.props.match.params
        var listBranch = this.props.branchStore ? this.props.branchStore : []
        var { id_branch, modal } = this.state
        var { wards, district, province } = this.props
        return (
            <div id="wrapper">
                <Sidebar store_code={store_code} />
                <div className="col-10 col-10-wrapper">

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar store_code={store_code} />

                            <div className="container-fluid">
                                <Alert
                                    type={Types.ALERT_UID_STATUS}
                                    alert={this.props.alert}
                                />
                                <div
                                    style={{ display: "flex", justifyContent: "flex-end" }}
                                >
                                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalAddress">
                                        <i class="fa fa-plus"></i> Thêm chi nhánh
                                    </button>
                                </div>

                                <br></br>
                                <div className='card'>
                                <div className='card-body'>
                                {listBranch.length >0 ?                                
                                <div class="table-responsive">
                                    <table class="table  " id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên chi nhánh</th>

                                                <th>Mã chi nhánh</th>
                                                <th>Địa chỉ</th>
                                                <th>Quận/huyện</th>

                                                <th>Thành phố</th>

                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>{this.showData(listBranch)}</tbody>
                                    </table>
                                </div>:
                                <div style={{fontSize:"15px",fontWeight:"bold",textAlign:"center"}}>Chi nhánh mặc định</div>
                                }

                                </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                    <ModalDelete store_code={store_code} id_branch={id_branch} />
                    <ModalCreate store_code={store_code} wards={wards} district={district} province={province} />
                    <ModalEdit store_code={store_code} wards={wards} district={district} province={province} modal={modal} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        branchStore: state.storeReducers.store.branchStore,
        wards: state.placeReducers.wards,
        province: state.placeReducers.province,
        district: state.placeReducers.district
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPlaceProvince: () => {
            dispatch(placeAction.fetchPlaceProvince());
        },
        fetchBranchStore: (store_code) => {
            dispatch(dashboardAction.fetchBranchStore(store_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Branch)