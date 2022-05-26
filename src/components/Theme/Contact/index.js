import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Types from "../../../constants/ActionType";
import {isPhone} from "../../../ultis/helpers"
class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_show_icon_hotline: null,
            phone_number_hotline: null,
            is_show_icon_email: null,
            email_contact: null,
            is_show_icon_facebook: null,
            id_facebook: null,
            is_show_icon_zalo: null,
            id_zalo: null,
        }
    }


    componentDidMount() {
        var theme = this.props.theme
        if (theme == null || theme == "" || typeof theme.store_id == "undefined") { }
        else {
            this.setState({
                is_show_icon_hotline: theme.is_show_icon_hotline,
                phone_number_hotline: theme.phone_number_hotline == "null" ? null : theme.phone_number_hotline,
                is_show_icon_email: theme.is_show_icon_email,
                email_contact: theme.email_contact == "null" ? null : theme.email_contact,
                is_show_icon_facebook: theme.is_show_icon_facebook ,
                id_facebook: theme.id_facebook == "null" ? null : theme.id_facebook,
                is_show_icon_zalo: theme.is_show_icon_zalo,
                id_zalo: theme.id_zalo == "null" ? null : theme.id_zalo,
            })
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value,
        });
    }

    onChangeStatus = (e) =>{
        var target = e.target;
        var name = target.name;
        var checked = target.checked
        this.setState({
            [name]: checked,
        });    
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.tabId != this.props.tabId)
        if (!shallowEqual(nextProps.theme, this.props.them) || (nextProps.tabId != this.props.tabId)) {
            var theme = nextProps.theme
            this.setState({
                is_show_icon_hotline: theme.is_show_icon_hotline,
                phone_number_hotline: theme.phone_number_hotline,
                // is_show_icon_email: theme.is_show_icon_email,
                // email_contact: theme.email_contact,
                is_show_icon_facebook: theme.is_show_icon_facebook ,
                id_facebook: theme.id_facebook,
                is_show_icon_zalo: theme.is_show_icon_zalo ,
                id_zalo: theme.id_zalo,
            })
        }


    }

    onSave = (e) => {
        e.preventDefault();
        var theme = this.state

        if(!isPhone(theme.phone_number_hotline))
        {
            this.props.showError({
                type: Types.ALERT_UID_STATUS,
                alert: {
                    type: "danger",
                    title: "Thất bại ",
                    disable: "show",
                    content: "Số điện thoại không đúng định dạng",
                },
    
            })
            return
        }
     
        var { store_code } = this.props
        var form = {...this.props.theme}

            form.is_show_icon_hotline= theme.is_show_icon_hotline 
            form.phone_number_hotline= theme.phone_number_hotline
            // form.is_show_icon_email= theme.is_show_icon_email
            // form.email_contact= theme.email_contact
            form.is_show_icon_email= false

            form.email_contact  = null
            form.is_show_icon_facebook= theme.is_show_icon_facebook
            form.id_facebook= theme.id_facebook
            form.is_show_icon_zalo= theme.is_show_icon_zalo 
            form.id_zalo= theme.id_zalo
        
        this.props.updateTheme(store_code, form);
    }
    render() {
        var
            { is_show_icon_hotline,
                phone_number_hotline,
                is_show_icon_email,
                email_contact,
                is_show_icon_facebook,
                id_facebook,
                is_show_icon_zalo,
                id_zalo,
            } = this.state

        return (
            <div className="support">
                <form role="form" onSubmit={this.onSave} >

                    <div class="box-body">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}>




                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Số điện thoại Hotline</label>
                            <div class="form-group" style = {{display : "flex"}}>
                            <input style = {{maxWidth : "500px"}} type="tel" name="phone_number_hotline" value={phone_number_hotline} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />
                                <div class="form-check" style = {{margin : "auto 10px"}}>
                                    <label class="form-check-label" for="gridCheck">
                                        Hiển thị
                                    </label>
                                    <input style = {{marginLeft : "10px"}} class="form-check-input" type="checkbox" id="gridCheck" name="is_show_icon_hotline" checked = {is_show_icon_hotline} onChange = {this.onChangeStatus}   />

                                </div>

                            </div>
                           
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="name">Địa chỉ Email</label>
                             <div class="form-group" style = {{display : "flex"}}>
                             <input style = {{maxWidth : "500px"}} type="email" name="email_contact" value={email_contact} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />
                           
                                <div class="form-check" style = {{margin : "auto 10px"}}>
                                    <label class="form-check-label" for="gridCheck">
                                        Hiển thị
                                    </label>
                                    <input style = {{marginLeft : "10px"}} class="form-check-input" type="checkbox" id="gridCheck" name="is_show_icon_email" checked = {is_show_icon_email} onChange = {this.onChangeStatus}   />

                                </div>

                            </div>
                        </div> */}
                        {/* <div className="form-group">
                            <label htmlFor="name">ID Fanpage FaceBook</label>
                            
                            <div class="form-group" style = {{display : "flex"}}>
                            <input style = {{maxWidth : "500px"}} type="text" name="id_facebook" value={id_facebook} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />
                                <div class="form-check" style = {{margin : "auto 10px"}}>
                                    <label class="form-check-label" for="gridCheck">
                                        Hiển thị
                                    </label>
                                    <input style = {{marginLeft : "10px"}} class="form-check-input" type="checkbox" id="gridCheck" name="is_show_icon_facebook" checked = {is_show_icon_facebook} onChange = {this.onChangeStatus}   />

                                </div>

                            </div>
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="name">ID Zalo</label>
                           
                            <div class="form-group" style = {{display : "flex"}}>
                            <input style = {{maxWidth : "500px"}} type="text" name="id_zalo" value={id_zalo} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />
                                <div class="form-check" style = {{margin : "auto 10px"}}>
                                    <label class="form-check-label" for="gridCheck">
                                        Hiển thị
                                    </label>
                                    <input style = {{marginLeft : "10px"}} class="form-check-input" type="checkbox" id="gridCheck" name="is_show_icon_zalo" checked = {is_show_icon_zalo}  onChange = {this.onChangeStatus}  />

                                </div>

                            </div>
                        </div>

                  
               
             
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-info  btn-sm">

                            <i class="fas fa-save"></i>

                            &nbsp;&nbsp;Lưu
                        </button>

                    </div>
                </form>


            </div>
        );

    }
}


const mapStateToProps = (state) => {
    return {



    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateTheme: (store_code, theme) => {
            dispatch(themeAction.updateTheme(store_code, theme));
        },
        showError: (action) => {
            dispatch(action)
        }

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Support);