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
          "1.png",
        arr_index_component: [1, 1, 1, 1, 1],
        demo_link: "https://taphoademo.myiki.vn/"

      },
      {
        index: 2,
        theme:
          "2.png",
        arr_index_component: [2, 2, 2, 2, 1],
        demo_link: "https://shopmevabe.myiki.vn/"
      },
      {
        index: 3,
        theme:
          "3.png",
        arr_index_component: [3, 3, 3, 3, 1],
        demo_link: "https://moctamtra.myiki.vn/"

      },
      {
        index: 4,
        theme:
          "4.png",
        arr_index_component: [4, 4, 4, 4, 1],
        demo_link: "https://shopdecordemo.myiki.vn/"
      },
      {
        isVip: true,
        index: 5,
        theme:
          "5.png",
        arr_index_component: [5, 5, 5, 5, 2],
        demo_link: "https://echoa.vn"
      },
      {
        isVip: true,
        index: 6,
        theme: "6.png",
        arr_index_component: [6, 6, 6, 6, 3],
        demo_link: "https://daikamart.mydoapp.vn/"
      },
      {
        isVip: false,
        index: 7,
        theme: "7.png",
        arr_index_component: [7, 7, 7, 3, 1],
        demo_link: "https://nowshopdemo.mydoapp.vn/"
      },
      {
        isVip: false,
        index: 8,
        theme: "8.png",
        arr_index_component: [8, 8, 7, 3, 2],
        demo_link: "https://mediamartonline.mydoapp.vn/"
      },
      {
        isVip: false,
        index: 9,
        theme: "9.png",
        arr_index_component: [9, 4, 6, 7, 1],
        demo_link: "https://hoqua.isempai.net/"
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
