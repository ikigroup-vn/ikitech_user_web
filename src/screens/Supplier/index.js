import React, { Component } from 'react'
import Alert from '../../components/Partials/Alert'
import Sidebar from '../../components/Partials/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import * as dashboardAction from "../../actions/dashboard";
import Footer from '../../components/Partials/Footer';
import * as placeAction from "../../actions/place";
import * as Types from "../../constants/ActionType";
import { connect } from 'react-redux';
import ModalDelete from '../../components/Supplier/ModalDelete';
import ModalCreate from '../../components/Supplier/ModalCreate';
import ModalEdit from '../../components/Supplier/ModalEdit';

class Supplier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_supplier:"",
            modal:""
        }
    }

    handleSetIdBranch = (id) => {
        this.setState({
            id_supplier: id
        })
    }

    handleSetInfor = (item) => {
        this.setState({ modal: item })
    }


    componentDidMount() {
        const {store_code} = this.props.match.params
        this.props.fetchAllSupplier(store_code);
        this.props.fetchPlaceProvince()
    }
    showData = (listSupplier) => {
        var result = null;
        if (listSupplier.length > 0) {

            result = listSupplier.map((data, index) => {

                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.phone}</td>
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
        var listSupplier = this.props.supplier.data ? this.props.supplier.data : []
        var { id_supplier, modal } = this.state
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
                                        <i class="fa fa-plus"></i> Thêm nhà cung cấp
                                    </button>
                                </div>

                                <br></br>
                                <div className='card'>
                                <div className='card-body'>
                                <div class="table-responsive">
                                    <table class="table  " id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên nhà cung cấp</th>

                                                <th>Số điện thoại</th>
                                                <th>Địa chỉ</th>
                                                <th>Quận/huyện</th>

                                                <th>Thành phố</th>

                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>{this.showData(listSupplier)}</tbody>
                                    </table>
                                </div>
                                </div>
                                </div>

                            </div>
                        </div>
                        <Footer />
                    </div>
                    <ModalDelete store_code={store_code} id_supplier={id_supplier} />
                    <ModalCreate store_code={store_code} wards={wards} district={district} province={province} />
                    <ModalEdit store_code={store_code} wards={wards} district={district} province={province} modal={modal}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supplier: state.storeReducers.store.supplier,
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
        fetchAllSupplier: (store_code) => {
            dispatch(dashboardAction.fetchAllSupplier(store_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)