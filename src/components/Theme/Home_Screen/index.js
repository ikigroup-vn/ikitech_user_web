import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
import ItemTheme from "./ItemTheme";
import Custom_Screen from "../Custom_Screen";
import ModalDefaultReset from "./ModalDefaultReset";
class Home_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_page_type: null,
      is_custom: false,
    };

    //         1 => [1, 1, 1, 1, 1],
    //         2 => [2, 2, 2, 2, 1],
    //         3 => [3, 3, 3, 3, 1],
    //         4 => [4, 4, 4, 4, 1],
    //         5 => [5, 5, 5, 5, 2],
    //         6 => [6, 6, 6, 6, 3],
    //         7 => [1, 1, 1, 5, 1],
    //         8 => [8, 7, 7, 3, 3],
    //         9 => [8, 7, 7, 3, 3],

    this.initTheme = [
      {
        index: 1,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/gNdPimsxMW1635935514.png",
        arr_index_component: [1, 1, 1, 1, 1],
      },
      {
        index: 2,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/bgbHigFfFE1635128355.png",
        arr_index_component: [2, 2, 2, 2, 1],
      },
      {
        index: 3,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/LZXepjhaEf1635387768.png",
        arr_index_component: [3, 3, 3, 3, 1],
      },

      {
        index: 4,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/NrWkHISXeg1635562805.png",
        arr_index_component: [4, 4, 4, 4, 1],
      },
      {
        isVip: true,
        index: 5,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/SVLdjoSfmN1637398732.jpg",
        arr_index_component: [5, 5, 5, 5, 2],
      },
      {
        isVip: true,
        index: 6,
        theme: "https://i.imgur.com/tQLEVfQ.png",
        arr_index_component: [6, 6, 6, 6, 3],
      },
      {
        isVip: false,
        index: 7,
        theme: "https://i.imgur.com/g0YoP79.jpg",
        arr_index_component: [1, 1, 1, 5, 1],
      },
    ];
  }

  getThemeDefault = (index) => {
    var data = null
    this.initTheme.forEach((e) => {

      if (e.index == index) data = e;
    })


    return data
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    var theme = this.props.theme;

    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        store_id: theme.store_id,
        home_page_type: theme.home_page_type,
        theme_default: this.getThemeDefault(theme.home_page_type)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        store_id: theme.store_id,
        home_page_type: theme.home_page_type,
        theme_default: this.getThemeDefault(theme.home_page_type)
      });
    }
  }

  resetTheme = (theme) => {
    if (theme == null) return

    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.header_type = theme.arr_index_component[0];
    form.banner_type = theme.arr_index_component[1];
    form.product_home_type = theme.arr_index_component[2];
    form.post_home_type = theme.arr_index_component[3];
    form.footer_type = theme.arr_index_component[4];


    this.props.updateTheme(store_code, form);
  }

  chooseTheme = (theme) => {

    if (theme == null) return

    var { store_code } = this.props;
    var form = { ...this.props.theme };

    //         $appThemeExists->header_type = $arr_Data[0];
    //         $appThemeExists->banner_type = $arr_Data[1];
    //         $appThemeExists->product_home_type = $arr_Data[2];
    //         $appThemeExists->post_home_type = $arr_Data[3];
    //         $appThemeExists->footer_type = $arr_Data[4];

    form.home_page_type = theme.index;

    form.header_type = theme.arr_index_component[0];
    form.banner_type = theme.arr_index_component[1];
    form.product_home_type = theme.arr_index_component[2];
    form.post_home_type = theme.arr_index_component[3];
    form.footer_type = theme.arr_index_component[4];


    this.props.updateTheme(store_code, form);
  };

  onChangeCustom = () => {
    this.setState({
      is_custom: !this.state.is_custom
    })
  }

  
  render() {
    var { home_page_type, is_custom } = this.state;
    var { badges, store_code, theme } = this.props;

    if (is_custom == true) {
      return <Custom_Screen
        // tabId={tabId}
        theme_default={this.state.theme_default}
        store_code={store_code}
        chooseTheme={this.chooseTheme}
        resetTheme={this.resetTheme}
        goBack={() => {
          this.onChangeCustom()
        }}
      
        theme={theme}
      />
    }


    return (
      <div className="overview">
        <form role="form">
          <div class="box-body">
            <div>
              <div class="row">
                {this.initTheme.map((v, i) => (
                  <ItemTheme
                    badges={badges}
                    chooseTheme={this.chooseTheme}
                    home_page_type={home_page_type}
                    v={v}
                    goBack={() => {
                      this.onChangeCustom()
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div class="box-footer">
            {/* <button type="submit" class="btn btn-info  btn-sm">

                            <i class="fas fa-save"></i>

                            Lưu
                        </button> */}
          </div>
        </form>

       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
    theme: state.themeReducers.theme,
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
