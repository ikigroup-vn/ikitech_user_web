import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as customerAction from "../../actions/customer_sales";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { debounce } from 'lodash'
import { getDDMMYYYHis, getDDMMYYY } from "../../ultis/date";

class DataItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }

        this.onCallApi = debounce(this.props.editCustomerSale, 1000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        var { store_code } = this.props;
        if (!shallowEqual(nextState.data, this.state.data) && nextState.updateApi == true) {
            this.onCallApi(store_code, nextState.data.id, nextState.data)
        }
        return true;
    }

    editCustomerSale = (store_code, id, data) => {
        this.props.editCustomerSale(store_code, id, data)
    }



    componentWillReceiveProps(nextProps, nextState) {
        var { store_code } = this.props;
        if (!shallowEqual(nextProps.data, this.props.data)) {
            this.setState({ updateApi: false, data: nextProps.data });

        }
        if (!shallowEqual(nextProps.customer, this.props.customer) && this.state.data.id == nextProps.customer.id) {
            // this.state = {
            //     updateApi: false,
            //     data: nextProps.customer
            // }
            this.setState({ updateApi: false, data: nextProps.customer });

        }

    }

    onChangeStatus = (event) => {
        this.setState({
            updateApi: true,
            data: {
                ...this.state.data,
                status: event.target.value
            }
        });
    }

    onChangeStaff = (event) => {
        this.setState({
            updateApi: true,
            data: {
                ...this.state.data,
                staff_id: event.target.value
            }
        });
    }


    onChangeText = (event) => {
        this.setState({
            updateApi: true,
            data: {
                ...this.state.data,
                [event.target.name]: event.target.value
            }
        });
    }


    buildOptionStaff = () => {
        var { staff } = this.props

        return (staff ?? []).map((ele) =>
            <option value={ele.id}>{ele.name}</option>
        )

    }

    passDataModal = (event, store_code, name) => {
        this.props.handleDelCallBack({ table: "Nhân viên", id: store_code, name: name });
        event.preventDefault();
    }



    render() {
        var { data } = this.state;
        var { store_code, index, paginate, numPage , checked , is_user} = this.props;

        console.log(this.props.data)
        return (
            <tr className="hover-product">
                   {is_user === true &&     <td>   <input
                    style={{
                        height: "initial",
                    }}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => this.props.onChangeSelected(e, JSON.stringify(data))}
                /></td>} 

               

                <td data-toggle="modal"
                    data-target="#modalEditCustomer"
                    onClick={() => {
                        this.props.handleSetInfor(data)
                    }}><div>{data.name}</div><div>{data.phone_number}</div><div style={{
                        fontSize: 10
                    }}> Ngày thêm: {getDDMMYYY(data.created_at)}</div></td>
                <td>
                    <select name="" value={data?.status} id="input" class="form-control" onChange={this.onChangeStatus}>
                        <option disabled={true}>Trạng thái</option>
                        <option value="0">Cần tư vấn</option>
                        <option value="1">Đang tư vấn</option>
                        <option value="2">Thành công</option>
                        <option value="3">Thất bại</option>
                    </select>
                </td>
                <td><textarea value={data.consultation_1} onChange={this.onChangeText} name="consultation_1"></textarea>
                    <p>{data.time_update_consultation_1 == null ? "" : getDDMMYYYHis(data.time_update_consultation_1)}</p>
                </td>
                <td><textarea value={data.consultation_2} onChange={this.onChangeText} name="consultation_2"></textarea>
                    <p>{data.time_update_consultation_2 == null ? "" : getDDMMYYYHis(data.time_update_consultation_2)}</p>
                </td>
                <td><textarea value={data.consultation_3} onChange={this.onChangeText} name="consultation_3"></textarea>
                    <p>{data.time_update_consultation_3 == null ? "" : getDDMMYYYHis(data.time_update_consultation_3)}</p>
                </td>
                {is_user === true &&         <td>
                    <select name="" value={data?.staff_id} id="input" class="form-control" onChange={this.onChangeStaff}>
                        <option value={null}>Chưa phân công</option>
                        {this.buildOptionStaff()}
                    </select>
                </td>} 

           
                <td style={{ display: "flex" }}>
                    <button
                        data-toggle="modal"
                        data-target="#modalEditCustomer"
                        onClick={() => {
                            this.props.handleSetInfor(data)
                        }}
                        // style={{ marginLeft: "10px", marginTop: 15 }}
                        class={`btn btn-warning btn-sm`}
                    >
                        <i class="fa fa-edit"></i> Sửa
                    </button>
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={(e) => this.passDataModal(e, data.id, data.name)}
                        data-toggle="modal"
                        data-target="#removeModal"
                        class={`btn btn-danger btn-sm ${is_user === true ? "" : "hide"}`}
                    >
                        <i class="fa fa-trash"></i> Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {

        customer: state.customerSaleReducers.customer_sales.customerID,
        chat: state.chatReducers.chat.chatID,
        permission: state.authReducers.permission.data,
        wards: state.placeReducers.wards,
        province: state.placeReducers.province,
        district: state.placeReducers.district
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCustomerSale: (id, page, params) => {
            dispatch(customerAction.fetchAllCustomerSale(id, page, params));
        },
        fetchCustomerSaleId: (store_code, customerId) => {
            dispatch(customerAction.fetchCustomerSaleId(store_code, customerId));
        },
        editCustomerSale: (store_code, customerId, data) => {
            dispatch(customerAction.editCustomerSale(store_code, customerId, data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataItem);
