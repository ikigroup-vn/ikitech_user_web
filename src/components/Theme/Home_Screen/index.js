import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
import ItemTheme from "./ItemTheme";
import Custom_Screen from "../Custom_Screen";
import ModalDefaultReset from "./ModalDefaultReset";
import styled from "styled-components";
import ModalDetailsTheme from "./ModalDetailsTheme";

const HomeScreenStyles = styled.div`
  .theme__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
`;

class Home_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_page_type: null,
      is_custom: false,
      showDetailsTheme: false,
      infoDetailsTheme: {},
    };

    //         1  => [1, 1, 1, 1, 1],
    //         2  => [2, 2, 2, 2, 1],
    //         3  => [3, 3, 3, 3, 1],
    //         4  => [4, 4, 4, 4, 1],
    //         5  => [5, 5, 5, 5, 2],
    //         6  => [6, 6, 6, 6, 3],
    //         7  => [1, 1, 1, 5, 1],
    //         8  => [8, 7, 7, 3, 3],
    //         9  => [8, 7, 7, 3, 3],
    //         10 => [11, 10, 10, 8, 6],

    this.initTheme = [
      {
        index: 1,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/ZQLqkbDnCg1654823729.webp",
        arr_index_component: [1, 1, 1, 1, 1],
        demo_link: "https://mobiledemo.myiki.vn/",
        name: "Shop bán đồ điện tử",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "426px",
        banner_width: "743px",
        description:
          "Giao diện giúp cho cửa hàng có thể dễ dàng bán các sản phẩm điện tử cho chính mình",
        carrers: "Đồ điện tử, gia dụng",
      },
      {
        index: 2,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/UreKuxWypW1654823828.webp",
        arr_index_component: [2, 2, 2, 2, 1],
        demo_link: "https://shopmevabe.myiki.vn/",
        name: "Shop bán đồ trẻ em",
        banner_type: "Banner kết hợp danh mục",
        banner_height: "410px",
        banner_width: "915px",
        description:
          "Giao diện được thiết kế phù hợp trẻ trung, tươi mới phù hợp với bán các sản phẩm cho bé",
      },
      {
        index: 3,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/slSAdCmQzc1654823854.webp",
        arr_index_component: [3, 3, 3, 3, 1],
        demo_link: "https://noithatdemo.myiki.vn/",
        name: "Shop bán đồ nội thất",
        banner_type: "Banner trải dài",
        banner_height: "1530px",
        banner_width: "580px",
        description:
          "Giao diện được thiết kế phù hợp với bán các sản phẩm nội thát",
        carrers: "Nội thất, Trang điểm",
      },
      {
        index: 4,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/uYJRbqpFYW1654823878.webp",
        arr_index_component: [4, 4, 4, 4, 1],
        demo_link: "https://myphamdemo.myiki.vn/",
        name: "Shop mỹ phẩm",
        banner_type: "Banner trải dài",
        banner_height: "1481px",
        banner_width: "475px",
        description:
          "Giao diện được thiết kế trẻ trung, phong cách phù với bán các sản phẩm mỹ phẩm, thời trang",
        carrers: "Thời trang, Mỹ phẩm",
      },
      {
        isVip: false,
        index: 5,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/glDbUFhcrE1654823907.webp",
        arr_index_component: [5, 5, 5, 5, 2],
        demo_link: "https://thoitrangdemo.myiki.vn/",
        name: "Shop thời trang",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "410px",
        banner_width: "673px",
        description:
          "Giao diện được thiết kế trẻ trung, phong cách phù với bán các sản phẩm mỹ phẩm, thời trang",
        carrers: "Thời trang, Trang điểm",
      },
      {
        isVip: false,
        index: 6,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/mIByceRszQ1654823953.webp",
        arr_index_component: [7, 6, 6, 3, 1],
        demo_link: "https://nowshopdemo.myiki.vn/",
        name: "Shop đồ ăn vặt",
        banner_type: "Banner trải dài",
        banner_height: "412px",
        banner_width: "1170px",
        description:
          "Giao diện được thiết kế với gam màu rực rỡ phù hợp với bán các sản phẩm đồ ăn, hoa quả",
        carrers: "Đồ ăn, hoa quả",
      },
      {
        isVip: false,
        index: 7,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/GZZBFLEWFG1654823972.webp",
        arr_index_component: [8, 8, 7, 4, 2],
        demo_link: "https://dogiadungdemo.myiki.vn/",
        name: "Shop đồ gia dụng",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "410px",
        banner_width: "685px",
        description:
          "Giao diện được thiết kết phù hợp với các sản phẩm đồ gia dụng, đồ điện tử",
        carrers: "Đồ gia dụng, đồ điện tử",
      },
      {
        isVip: false,
        index: 8,
        theme:
          "https://data1.ikitech.vn/public/api/SahaImages/ERQPMELUMR1654823991.webp",
        arr_index_component: [9, 6, 5, 5, 5],
        demo_link: "https://shophoaquademo.myiki.vn/",
        name: "Shop hoa quả",
        banner_type: "Banner trải dài",
        banner_height: "1481px",
        banner_width: "440px",
        description:
          "Giao diện được thiết kế phù hợp với bán các mặt hàng đồ ăn, hoa quả",
        carrers: "Đồ ăn, hoa quả",
      },
      {
        isVip: false,
        index: 9,
        theme: "https://i.imgur.com/lTwsZhY.png",
        arr_index_component: [10, 9, 9, 2, 5],
        demo_link: "https://thucphamsach.myiki.vn/",
        name: "Shop thực phẩm",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "355px",
        banner_width: "702px",
        description:
          "Giao diện phù hợp với bán các sản phẩm liên quan đến đồ ăn, hoa quả",
        carrers: "Đồ ăn, hoa quả",
      },
      {
        isVip: false,
        index: 10,
        theme:
          "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_adam_4_1.jpg",
        arr_index_component: [11, 10, 10, 8, 6],
        demo_link: "https://thucphamsach.myiki.vn/",
        name: "Shop thời trang 2",
        banner_type: "Banner trải dài",
        banner_height: "677px",
        banner_width: "1481px",
        description:
          "Giao diện được thiết kế trẻ trung, phong cách phù với bán các sản phẩm mỹ phẩm, thời trang",
        carrers: "Thời trang, trang điểm",
      },
    ];
  }
  setShowModalDetailsTheme = (showDetails) => {
    this.setState({
      showDetailsTheme: showDetails,
    });
  };
  setInfoDetailsTheme = (infoDetails) => {
    this.setState({
      infoDetailsTheme: infoDetails,
    });
  };
  getThemeDefault = (index) => {
    var data = null;
    this.initTheme.forEach((e) => {
      if (e.index == index) data = e;
    });

    return data;
  };

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
        theme_default: this.getThemeDefault(theme.home_page_type),
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
        theme_default: this.getThemeDefault(theme.home_page_type),
      });
    }
  }

  resetTheme = (theme) => {
    if (theme == null) return;

    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.header_type = theme.arr_index_component[0];
    form.banner_type = theme.arr_index_component[1];
    form.product_home_type = theme.arr_index_component[2];
    form.post_home_type = theme.arr_index_component[3];
    form.footer_type = theme.arr_index_component[4];

    this.props.updateTheme(store_code, form);
  };

  chooseTheme = (theme) => {
    if (theme == null) return;

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
      is_custom: !this.state.is_custom,
    });
  };

  render() {
    var { home_page_type, is_custom } = this.state;
    var { badges, store_code, theme } = this.props;

    if (is_custom == true) {
      return (
        <Custom_Screen
          // tabId={tabId}\dashboard\hahaha
          theme_default={this.state.theme_default}
          store_code={store_code}
          chooseTheme={this.chooseTheme}
          resetTheme={this.resetTheme}
          goBack={() => {
            this.onChangeCustom();
          }}
          theme={theme}
        />
      );
    }

    return (
      <HomeScreenStyles className="overview">
        <form role="form">
          <div class="box-body">
            <div class="theme__list">
              {this.initTheme.map((v, i) => (
                <ItemTheme
                  key={i}
                  badges={badges}
                  chooseTheme={this.chooseTheme}
                  home_page_type={home_page_type}
                  v={v}
                  goBack={() => {
                    this.onChangeCustom();
                  }}
                  setShowModalDetailsTheme={this.setShowModalDetailsTheme}
                  setInfoDetailsTheme={this.setInfoDetailsTheme}
                />
              ))}
            </div>
            {Object.entries(this.state.infoDetailsTheme).length > 0 &&
              this.state.showDetailsTheme && (
                <ModalDetailsTheme
                  themeInfo={this.state.infoDetailsTheme}
                  setShowModalDetailsTheme={this.setShowModalDetailsTheme}
                />
              )}
          </div>
          <div class="box-footer"></div>
        </form>
      </HomeScreenStyles>
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
