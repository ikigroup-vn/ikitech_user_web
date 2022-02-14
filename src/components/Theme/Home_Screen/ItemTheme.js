import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default"
class Home_Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home_page_type: null

        };

    }





    chooseTheme = (index) => {
        this.props.chooseTheme(index)
    }



    checkExsitItem = (index ,_isVip, isVip , list_id_theme) =>{
        console.log(index ,_isVip, isVip , list_id_theme)
        if(_isVip == true)
        {
            if(isVip == true)
            {
                var bool = false
                if(list_id_theme == null)
                {
                    return false
                }
                for (const item of list_id_theme) {
                   if(item == index)
                   {
                    bool = true
                   } 
                }
                return bool
            }
            else
            {
                return false
            }
        }
        else
        {
            return true
        }
    }

    render() {

        var { home_page_type, v
        } = this.props
        var isVip = typeof this.props.badges.config_user_vip == "undefined" || this.props.badges.config_user_vip == null ? false  : true
        var list_id_theme = typeof this.props.badges.config_user_vip == "undefined" || this.props.badges.config_user_vip != null ?  this.props.badges.config_user_vip.list_id_theme_vip : []


        return (

            <div class={`form-group col-xs-3 col-lg-3 col-md-3 col-sm-3 ${this.checkExsitItem(v.index , v.isVip ,  isVip  , list_id_theme) == true ? "" : "hide"}`} >

                <div style={{ width: "160px" }}>
                    <img style={{ display: "block", objectFit: "cover" }} src={v.theme} width="160" height="180" />
                    <div class="kv-avatar">
                        <div style={{ display: "flex" }}>
                            <button
                                onClick={() => this.chooseTheme(v.index)}

                                style={{ margin: "10px auto" }}
                                type="button"
                                class={`btn btn-primary btn-sm ${home_page_type !== v.index ? "show" : "hide"}`}

                            >
                                <i class="fa fa-plus"></i> Chọn
                            </button>
                            <button
                                style={{ margin: "10px auto" }}
                                type="button"
                                class={`btn btn-secondary btn-sm ${home_page_type === v.index ? "show" : "hide"}`}

                            >
                                <i class="fa fa-check"></i> Đã chọn
                            </button>
                        </div>
                    </div>
                </div>
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


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home_Screen);