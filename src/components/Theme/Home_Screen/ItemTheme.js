import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";

const Hover = ({ onHover, children }) => (
  <div className="hover">
    <div className="hover__no-hover">{children}</div>
    <div className="hover__hover">{onHover}</div>
  </div>
)


class ItemTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_page_type: null,
      show_button: false
    };
  }

  onChangeShowButton = (value) => {
    this.setState({
      show_button: value
    })
  }

  chooseTheme = (dataTheme) => {
    this.props.chooseTheme(dataTheme);
  };

  checkExsitItem = (index, _isVip, isVip, list_id_theme) => {
    console.log(index, _isVip, isVip, list_id_theme);
    if (_isVip == true) {
      if (isVip == true) {
        var bool = false;
        if (list_id_theme == null) {
          return false;
        }
        for (const item of list_id_theme) {
          if (item == index) {
            bool = true;
          }
        }
        return bool;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    var { home_page_type, v } = this.props;
    var { show_button
    } = this.state
    var isVip =
      typeof this.props.badges.config_user_vip == "undefined" ||
        this.props.badges.config_user_vip == null
        ? false
        : true;
    var list_id_theme =
      typeof this.props.badges.config_user_vip == "undefined" ||
        this.props.badges.config_user_vip != null
        ? this.props.badges.config_user_vip.list_id_theme_vip
        : [];

    return (
      <div
        onMouseEnter={() => {

          this.onChangeShowButton(true)
        }}
        onMouseLeave={() => {

          this.onChangeShowButton(false)
        }}
        class={`form-group col-xs-3 col-lg-3 col-md-3 col-sm-3 ${this.checkExsitItem(v.index, v.isVip, isVip, list_id_theme) == true
          ? ""
          : "hide"
          }`}
      >

        <div class="card" style={{ padding: 0 }}>

          <div style={{

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            margin: "auto",
            justifyContent: "center",
          }}>
            <img
              style={{ display: "block", objectFit: "cover" }}
              src={v.theme}
              width="100%"
              height={200}

              onMouseEnter={() => {

                this.onChangeShowButton(true)
              }}
              onMouseLeave={() => {

                this.onChangeShowButton(false)
              }}

            />



            <div class="kv-avatar"
              onMouseEnter={() => {

                this.onChangeShowButton(true)
              }}
              onMouseLeave={() => {

                this.onChangeShowButton(false)
              }}

              style={{
                position: "absolute",

              }}
            >

              {show_button == true &&

                <div style={{ display: "flex " }}>
                  <button
                    onClick={() => this.chooseTheme(v)}
                    style={{ margin: "10px auto" }}
                    type="button"
                    class={`btn btn-primary btn-sm ${home_page_type !== v.index ? "show" : "hide"
                      }`}
                  >
                    Chọn
                  </button>
                  &nbsp;&nbsp;
                  <a href={v.demo_link} target="_blank">   <button

                    style={{ margin: "10px auto" }}
                    type="button"
                    class={`btn btn-primary btn-sm ${home_page_type !== v.index ? "show" : "hide"
                      }`}
                  >
                    Xem demo
                  </button> </a>


                  <button
                    style={{ margin: "10px auto" }}
                    type="button"
                    class={`btn btn-secondary btn-sm ${home_page_type === v.index ? "show" : "hide"
                      }`}
                  >
                    <i class="fa fa-check"></i> Đã chọn
                  </button>


                </div>

              }
            </div>

            {home_page_type === v.index && <a onClick={this.props.goBack} style={{
              color: "#0d6efd"
            }}>Tùy chỉnh</a>}

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemTheme);
