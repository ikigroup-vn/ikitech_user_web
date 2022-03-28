import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../components/Partials/Alert'
import Footer from '../../components/Partials/Footer'
import Sidebar from '../../components/Partials/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import * as Types from "../../constants/ActionType";
import * as SettingAction from "../../actions/notification";

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked_switch3:false,
            checked_switch2:false,
            stock:0
        }
    }
    handChangeCheckbox2 = (e) =>{
        this.setState({ checked_switch2: !this.state.checked_switch2 })
    }
    handChangeCheckbox3 = (e) =>{
        this.setState({ checked_switch3: !this.state.checked_switch3 })
    }
    onChange = e =>{
        this.setState({stock:e.target.value})
    }

    componentDidMount(){
        const {store_code} = this.props.match.params
        this.props.fetchAllGeneralSetting(store_code)
    }

    render() {
        const { store_code } = this.props.match.params
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
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <h4 className="h4 title_content mb-0 text-gray-800">
                                        Cài đặt chung
                                    </h4>{" "}

                                </div>

                                <br></br>
                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className='wrap-card' style={{width:"27%"}}>
                                        <div className='wrap-setting' style={{ display: "flex",justifyContent:"space-between" }}>
                                            <div>Thông báo sắp hết hàng</div>
                                            <form action="/action_page.php">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="switch2" name="checked_switch2" checked={this.state.checked_switch2} onChange={this.handChangeCheckbox2} />
                                                    <label class="custom-control-label" for="switch2"></label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className='wrap-setting' style={{ display: "flex",justifyContent:"space-between" }}>
                                            <div>Cho phép bán âm</div>
                                            <form action="/action_page.php">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="switch3" name="checked_switch3" checked={this.state.checked_switch3} onChange={this.handChangeCheckbox3} />
                                                    <label class="custom-control-label" for="switch3"></label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Số lượng sản phẩm thông báo gần hết hàng</label>
                                            <input type="number" class="form-control" name="payment_limit" onChange={this.onChange}  />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        generalSetting: state.notificationReducers.generalSetting
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllGeneralSetting: (store_code) => {
            dispatch(SettingAction.fetchAllGeneralSetting(store_code));
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Setting)