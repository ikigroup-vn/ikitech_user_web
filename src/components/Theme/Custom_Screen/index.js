import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
import ItemHeaderTheme from "./ItemHeaderTheme";
import ItemBannerTheme from "./ItemBannerTheme";
import ItemProductTheme from "./ItemProductTheme";
import ItemNewsTheme from "./ItemNewsTheme.js";
import ItemFooterTheme from "./ItemFooterTheme.js";
import FormFooterHtml from "./FormFooterHtml";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  headerImg,
  bannerImg,
  productImg,
  blogImg,
  footerImg,
} from "./data.js";
import Slider from "react-slick";

import "./style.css";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import ModalDefaultReset from "../Home_Screen/ModalDefaultReset";
import styled from "styled-components";

const OverviewStyles = styled.div`
  .price__display {
    .price__display__title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .price__display__content {
      display: flex;
      column-gap: 15px;
      .price__display__item {
        display: flex;
        align-items: center;
        column-gap: 3px;
        label {
          margin-bottom: 0;
          cursor: pointer;
        }
        input {
          cursor: pointer;
        }
      }
    }
  }
`;
class Custom_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_type: null,
      banner_type: null,
      product_home_type: null,
      post_home_type: null,
      footer_type: null,
      html_footer: null,
      use_footer_html: false,
      tabId: 0,
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onChangeThemeDefault = (theme) => {
    this.setState({
      themeDefaultReset: theme,
    });
  };

  componentDidMount() {
    var theme = this.props.theme;
    console.log(theme);
    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        store_id: theme.store_id,
        header_type: theme.header_type,
        banner_type: theme.banner_type,
        product_home_type: theme.product_home_type,
        post_home_type: theme.post_home_type,
        footer_type: theme.footer_type,
        use_footer_html: theme.is_use_footer_html,

        html_footer: theme.html_footer,
      });
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      console.log(theme);
      this.setState({
        store_id: theme.store_id,
        header_type: theme.header_type,
        banner_type: theme.banner_type,
        product_home_type: theme.product_home_type,
        post_home_type: theme.post_home_type,
        footer_type: theme.footer_type,
        use_footer_html: theme.is_use_footer_html,
        html_footer: theme.html_footer,
      });

      setTimeout(
        function () {
          //Start the timer
          this.scrollToIndex(this.props);
        }.bind(this),
        200
      );
    }
  }

  scrollToIndex = (propsx) => {
    var theme = propsx != null ? propsx.theme : this.props.theme;
    const indexHeader = headerImg.findIndex(
      (header) => header.index === theme.header_type
    );
    const indexBanner = bannerImg.findIndex(
      (banner) => banner.index === theme.banner_type
    );
    const indexProduct = productImg.findIndex(
      (product) => product.index === theme.product_home_type
    );
    const indexBlog = blogImg.findIndex(
      (blog) => blog.index === theme.post_home_type
    );
    const indexFooter = footerImg.findIndex(
      (footer) => footer.index === theme.footer_type
    );

    if (this.sliderHeader != null) {
      this.sliderHeader.slickGoTo(indexHeader);
    }
    if (this.sliderBanner != null) {
      this.sliderBanner.slickGoTo(indexBanner);
    }
    if (this.sliderProduct != null) {
      this.sliderProduct.slickGoTo(indexProduct);
    }
    if (this.sliderNews != null) {
      this.sliderNews.slickGoTo(indexBlog);
    }
    if (this.sliderFooter != null) {
      this.sliderFooter.slickGoTo(indexFooter);
    }
  };

  getTabActive = (index) => {
    this.setState({ tabId: index });

    setTimeout(
      function () {
        //Start the timer
        this.scrollToIndex(this.props);
      }.bind(this),
      200
    );
  };

  chooseHeader = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.header_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseBanner = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.banner_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseProduct = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.product_home_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseNews = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.post_home_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseFooter = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.footer_type = theme;
    form.html_footer = "";
    form.is_use_footer_html = false;

    this.props.updateTheme(store_code, form);
  };

  setDefaultTheme = () => {
    this.props.chooseTheme(this.props.theme_default);
    this.props.onChangeThemeDefault(this.props.theme_default);
  };

  isSameDefault = () => {
    var {
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
      use_footer_html,
      tabId,
    } = this.state;

    var arr = [
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
    ];

    if (shallowEqual(this.props.theme_default?.arr_index_component, arr)) {
      return true;
    }

    return false;
  };
  onChangePriceShow = (e) => {
    const { store_code, updateTheme, theme } = this.props;
    const form = {
      ...theme,
      option_total_show_type: e.target.value,
    };
    updateTheme(store_code, form);
  };

  render() {
    const setting = {
      dots: true,
      autoplay: false,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      arrow: true,
      dotsClass: "slick-dots slick-thumb",
    };
    const settingBanner = {
      dots: false,
      autoplay: false,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      arrow: true,
      dotsClass: "slick-dots slick-thumb",
    };
    var {
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
      use_footer_html,
      html_footer,
      tabId,
    } = this.state;
    var { badges, store_code, theme } = this.props;
    return (
      <OverviewStyles className="overview " style={{ marginLeft: "25px" }}>
        <div className="row justify-content-between  align-items-center">
          <button
            style={{ marginRight: "10px", marginBottom: 25, marginTop: 10 }}
            type="button"
            onClick={this.props.goBack}
            class="btn btn-warning  btn-sm"
          >
            <i class="fas fa-arrow-left"></i>&nbsp;Quay lại
          </button>

          {
            this.isSameDefault() == false && (
              <button
                type="button"
                class="btn btn-primary-no-background btn-sm"
                style={{
                  color: "#0d6efd",
                  "border-color": "#0d6efd",
                }}
                onClick={() => {
                  this.onChangeThemeDefault(this.props.theme_default);
                }}
                data-toggle="modal"
                data-target="#modalDefaultReset"
              >
                <i class="fas fa-undo"></i>
                <span class="text">&nbsp;Khôi phục mặc định</span>
              </button>
            )
            //  <a
            //   onClick={() => {

            //     this.onChangeThemeDefault(this.props.theme_default)
            //   }}
            //   data-toggle="modal"
            //   data-target="#modalDefaultReset"
            //   style={{
            //     color: "#0d6efd"
            //   }}>Khôi phục mặc định</a>
          }
        </div>

        <Tabs defaultIndex={0} onSelect={(index) => this.getTabActive(index)}>
          <div className="row">
            <div
              className="col-2 col-2-nav "
              style={{
                width: "100%",
                height: "fit-content",
              }}
            >
              <TabList>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>1.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Header
                  </p>
                  {tabId === 0 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #bcbcbc",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>2.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Banner
                  </p>
                  {tabId === 1 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>3.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Product
                  </p>
                  {tabId === 2 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>

                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>4.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Tin tức
                  </p>
                  {tabId === 3 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>5.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Footer
                  </p>
                  {tabId === 4 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
              </TabList>
            </div>
            <div
              className="col-10 col-10-wrapper"
              style={{
                border: "none",
              }}
            >
              <form role="form">
                <div class="box-body">
                  <TabPanel>
                    <Slider
                      {...setting}
                      ref={(sliderHeader) => (this.sliderHeader = sliderHeader)}
                    >
                      {headerImg.map((v, i) => (
                        <ItemHeaderTheme
                          badges={badges}
                          chooseHeader={this.chooseHeader}
                          header_type={header_type}
                          indexHeader={i}
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <Slider
                      {...settingBanner}
                      ref={(sliderBanner) => (this.sliderBanner = sliderBanner)}
                    >
                      {bannerImg.map((v, i) => (
                        <ItemBannerTheme
                          badges={badges}
                          indexBanner={i}
                          chooseBanner={this.chooseBanner}
                          banner_type={banner_type}
                          S
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <div className="price__display">
                      <div className="price__display__title">
                        Hiển thị bộ đếm
                      </div>
                      <div className="price__display__content">
                        <div className="price__display__item">
                          <input
                            type="radio"
                            name="price__show"
                            id="price__viewed"
                            value={0}
                            checked={theme.option_total_show_type === 0}
                            onChange={this.onChangePriceShow}
                          />
                          <label htmlFor="price__viewed">
                            Chỉ hiển thị đã xem
                          </label>
                        </div>
                        <div className="price__display__item">
                          <input
                            type="radio"
                            name="price__show"
                            id="price__buyed"
                            value={1}
                            checked={theme.option_total_show_type === 1}
                            onChange={this.onChangePriceShow}
                          />
                          <label htmlFor="price__buyed">
                            Chỉ hiển thị đã bán
                          </label>
                        </div>
                        <div className="price__display__item">
                          <input
                            type="radio"
                            name="price__show"
                            id="price__all"
                            value={2}
                            checked={theme.option_total_show_type === 2}
                            onChange={this.onChangePriceShow}
                          />
                          <label htmlFor="price__all">
                            Hiển thị đã xem và đã bán
                          </label>
                        </div>
                      </div>
                    </div>
                    <Slider
                      {...setting}
                      ref={(sliderProduct) =>
                        (this.sliderProduct = sliderProduct)
                      }
                    >
                      {productImg.map((v, i) => (
                        <ItemProductTheme
                          badges={badges}
                          indexProduct={i}
                          chooseProduct={this.chooseProduct}
                          product_home_type={product_home_type}
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <Slider
                      {...setting}
                      ref={(sliderNews) => (this.sliderNews = sliderNews)}
                    >
                      {blogImg.map((v, i) => (
                        <ItemNewsTheme
                          badges={badges}
                          indexNews={i}
                          chooseNews={this.chooseNews}
                          post_home_type={post_home_type}
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <div class=" ml-3" style={{ height: "30px" }}>
                      <input
                        type="checkbox"
                        style={{ transform: "scale(1.5)" }}
                        checked={use_footer_html}
                        onChange={(e) => {
                          let checkbox = e.target;
                          var form = { ...this.props.theme };

                          if (checkbox.checked) {
                            this.setState({
                              use_footer_html: true,
                            });

                            form.is_use_footer_html = true;
                            this.props.updateTheme(store_code, form);
                          } else {
                            this.setState({
                              use_footer_html: false,
                            });
                            form.is_use_footer_html = false;
                            this.props.updateTheme(store_code, form);
                          }
                        }}
                      />
                      <label style={{ marginLeft: "7px" }} for="defaultCheck1">
                        Sử dụng footer tùy chỉnh
                      </label>
                    </div>

                    {!use_footer_html ? (
                      <Slider
                        {...setting}
                        ref={(sliderFooter) =>
                          (this.sliderFooter = sliderFooter)
                        }
                      >
                        {footerImg.map((v, i) => (
                          <ItemFooterTheme
                            badges={badges}
                            indexFooter={i}
                            chooseFooter={this.chooseFooter}
                            footer_type={footer_type}
                            v={v}
                          />
                        ))}
                      </Slider>
                    ) : (
                      <div class="card shadow mb-4">
                        <div class="card-body">
                          <section class="content">
                            <div class="row">
                              <div class="col-md-12 col-xs-12">
                                <div class="box">
                                  <FormFooterHtml
                                    html_footer={html_footer}
                                    theme={this.props.theme}
                                    store_code={this.props.store_code}
                                  />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    )}
                  </TabPanel>
                </div>
              </form>

              <ModalDefaultReset
                theme={this.state.themeDefaultReset}
                resetTheme={this.props.resetTheme}
              />
            </div>
          </div>
        </Tabs>
      </OverviewStyles>
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
export default connect(mapStateToProps, mapDispatchToProps)(Custom_Screen);
