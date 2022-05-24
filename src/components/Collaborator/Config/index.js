import React, { Component } from "react";
import * as CollaboratorAction from "../../../actions/collaborator";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber } from "../../../ultis/helpers"

class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            steps: [],
            allow_payment_request: false,
            payment_1_of_month: false,
            payment_16_of_month: false,
            payment_limit: "",
            percent_collaborator_t1: "",
            allow_rose_referral_customer:false,

        }
    }

    componentDidMount() {
        var { store_code } = this.props
        this.props.fetchCollaboratorConf(store_code);
        this.props.fetchAllSteps(store_code);
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        const _value = formatNumber(value);
        if (!isNaN(Number(_value))) {

            value = new Intl.NumberFormat().format(_value);
            value = value.toString().replace(/\./g,',')

            if (name == "percent_collaborator_t1") {
                if (_value < 101) {
                    if (target.value == "") {
                        this.setState({ [name]: "" });
                    }
                    else {
                        this.setState({ [name]: value });

                    }
                }
                else
                {
                    this.setState({ [name]: "100" });

                }
            }
            else {
                if (target.value == "") {
                    this.setState({ [name]: "" });
                }
                else {
                    this.setState({ [name]: value });

                }
            }

        }
    }

    onChangeSelect = (e) => {
        var name = e.target.name
        var checked = e.target.checked
        this.setState({
            [name]: checked
        })
    }


    handleDelCallBack = (e, id) => {
        this.props.handleDelCallBack({ title: "Mức", id: id });
        e.preventDefault();
    };

    handleEditCallBack = (e, id, limit, bonus) => {
        this.props.handleEditCallBack({ id: id, limit: limit, bonus: bonus });
        e.preventDefault();
    };
    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps.config, this.props.config) || this.state.id == null || nextProps.tabId != this.props.tabId) {
            var config = nextProps.config
            this.setState({
                id: config.id,
                allow_payment_request: config.allow_payment_request,
                payment_1_of_month: config.payment_1_of_month,
                payment_16_of_month: config.payment_16_of_month,
                payment_limit: config.payment_limit == null ? null : new Intl.NumberFormat().format(config.payment_limit.toString()),
                percent_collaborator_t1: config.percent_collaborator_t1 == null ? null : new Intl.NumberFormat().format(config.percent_collaborator_t1.toString()),
                allow_rose_referral_customer: config.allow_rose_referral_customer
            })
        }
        if (!shallowEqual(nextProps.steps, this.props.steps) || this.state.id == null || nextProps.tabId != this.props.tabId) {
            this.setState({
                steps: nextProps.steps
            })
        }
    }

    showAllStep = (configs) => {
        var result = null;
        if (configs.length > 0) {
            result = configs.map((data, index) => {
                var limit = data.limit == null ? null : new Intl.NumberFormat().format(data.limit.toString());
                var bonus = data.bonus == null ? null : new Intl.NumberFormat().format(data.bonus.toString());
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            <div class="input-group">
                                <input name="" value={limit} id="input" class="form-control" />
                            </div>
                        </td>
                        <td>
                            <input name="" value={bonus} id="input" class="form-control" />

                        </td>
                        <td style={{ display: "flex" }}>

                            <button
                                onClick={(e) => { this.handleEditCallBack(e, data.id, data.limit, data.bonus) }}

                                data-toggle="modal"
                                data-target="#updateModal"
                                class="btn btn-warning btn-sm"
                            >
                                <i class="fa fa-edit"></i> Sửa
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { this.handleDelCallBack(e, data.id) }}
                                data-toggle="modal"
                                data-target="#removeModal"
                                style={{ marginLeft: "10px" }}
                                class={`btn btn-danger btn-sm `}
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
    onSave = (e) => {
        e.preventDefault();
        var { allow_payment_request, allow_rose_referral_customer, payment_1_of_month, payment_16_of_month, payment_limit, percent_collaborator_t1 } = this.state
        window.$('.modal').modal('hide');
        this.props.updateConfig(this.props.store_code, {
            allow_payment_request, payment_1_of_month, payment_16_of_month,
            payment_limit: payment_limit == null ? payment_limit : formatNumber(payment_limit),
            percent_collaborator_t1 : percent_collaborator_t1 == null ? percent_collaborator_t1 : formatNumber(percent_collaborator_t1),
            allow_rose_referral_customer
        });
    };
    render() {

        var {allow_rose_referral_customer, steps, payment_16_of_month, payment_limit, payment_1_of_month, allow_payment_request,percent_collaborator_t1 } = this.state
        return (
            <div className="collaborator-config">

                <form onSubmit={this.onSave} role="form">
                    <div className="form-group">
                        <label htmlFor="name">Cách tính thưởng cộng tác viên theo doanh số</label>
                        <p

                        >
                            <i>
                                ( Là phần thưởng dành cho CTV khi chinh phục được các mức doanh số )
                            </i>
                        </p>

                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Thông tin cấu hình</label>

                        <div class="table-responsive col-7">
                            <table class="table table-border table-hover">
                                <thead className="thead-quantity">
                                    <tr>
                                        <th>STT</th>
                                        <th>Mức doanh số</th>
                                        <th>Thưởng</th>
                                        <th>
                                            <button
                                                type="button"
                                                style={{ marginLeft: "10px", float: "right" }}
                                                data-toggle="modal"
                                                data-target="#createModal"
                                                class="btn btn-primary btn-sm"
                                            >
                                                <i class="fa fa-plus"></i> Thêm
                                            </button>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showAllStep(steps)}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" name="allow_rose_referral_customer" onChange={this.onChangeSelect} checked={allow_rose_referral_customer} />
                            <label class="form-check-label" for="gridCheck">
                                Cho phép hưởng hoa hồng từ khách hàng giới thiệu
                            </label>
                        </div>

                    </div>

                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" checked={allow_payment_request} />
                            <label class="form-check-label" for="gridCheck">
                                Cho phép gửi yêu cầu thanh toán
                            </label>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" name="payment_1_of_month" onChange={this.onChangeSelect} checked={payment_1_of_month} />
                            <label class="form-check-label" for="gridCheck">
                                Cho phép quyết toán ngày 1 hàng tháng
                            </label>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" name="payment_16_of_month" onChange={this.onChangeSelect} checked={payment_16_of_month} />
                            <label class="form-check-label" for="gridCheck">
                                Cho phép quyết toán ngày 16 hàng tháng
                            </label>
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Số tiền hoa hồng đủ để quyết toán</label>

                        <input type="text" class="form-control" name="payment_limit" onChange={this.onChange} value={payment_limit} style={{ maxWidth: "40%" }} />


                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Phần trăm hoa hồng các cấp</label>
                        <p

                        >
                            <i>
                                ( Thưởng % từ hoa hồng đơn hàng của CTV giới thiệu )
                            </i>
                        </p>
                        <input type="text" class="form-control" name="percent_collaborator_t1" onChange={this.onChange} value={percent_collaborator_t1} style={{ maxWidth: "40%" }} />


                    </div>
                    <div className="form-group">
                        <button

                            type="submit"
                            class={`btn btn-primary btn-sm `}
                        >
                            <i class="fa fa-save"></i> Lưu
                        </button>

                    </div>
                </form>


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        steps: state.collaboratorReducers.collaborator.allStep,
        config: state.collaboratorReducers.collaborator.config,

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateConfig: (store_code, data) => {
            dispatch(CollaboratorAction.updateConfig(store_code, data));
        },
        fetchCollaboratorConf: (store_code) => {
            dispatch(CollaboratorAction.fetchCollaboratorConf(store_code))
        },
        fetchAllSteps: (store_code) => {
            dispatch(CollaboratorAction.fetchAllSteps(store_code))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Config);