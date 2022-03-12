import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
import ItemTheme from "./ItemTheme";
class Home_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_page_type: null,
    };
    this.initTheme = [
      {
        index: 1,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/gNdPimsxMW1635935514.png",
      },
      {
        index: 2,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/bgbHigFfFE1635128355.png",
      },
      {
        index: 3,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/LZXepjhaEf1635387768.png",
      },

      {
        index: 4,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/NrWkHISXeg1635562805.png",
      },
      {
        isVip: true,
        index: 5,
        theme:
          "https://data1.doapp.vn/public/api/SahaImages/SVLdjoSfmN1637398732.jpg",
      },
      {
        isVip: true,
        index: 6,
        theme: "https://i.imgur.com/tQLEVfQ.png",
      },
      {
        isVip: false,
        index: 7,
        theme: "https://i.imgur.com/g0YoP79.jpg",
      },
    ];
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
    console.log(theme);
    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        store_id: theme.store_id,
        home_page_type: theme.home_page_type,
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
      });
    }
  }

  chooseTheme = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.home_page_type = theme;
    form.header_type = null;
    form.banner_type = null;
    form.product_home_type = null;
    form.post_home_type = null;
    form.footer_type = null;
    this.props.updateTheme(store_code, form);
  };

  render() {
    var { home_page_type } = this.state;
    var { badges } = this.props;
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
