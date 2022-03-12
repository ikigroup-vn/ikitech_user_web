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
import { data } from "./data.js";
import "./style.css";
class Custom_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_type: null,
      banner_type: null,
      product_home_type: null,
      post_home_type: null,
      footer_type: null,
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
        use_footer_html: false,
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
        header_type: theme.header_type,
        banner_type: theme.banner_type,
        product_home_type: theme.product_home_type,
        post_home_type: theme.post_home_type,
        footer_type: theme.footer_type,
      });
    }
  }
  getTabActive = (index) => {
    this.setState({ tabId: index });
  };

  chooseHeader = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.header_type = theme;

    form.home_page_type = null;

    this.props.updateTheme(store_code, form);
  };
  chooseBanner = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.banner_type = theme;

    form.home_page_type = null;

    this.props.updateTheme(store_code, form);
  };
  chooseProduct = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.product_home_type = theme;

    form.home_page_type = null;

    this.props.updateTheme(store_code, form);
  };
  chooseNews = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.post_home_type = theme;

    form.home_page_type = null;

    this.props.updateTheme(store_code, form);
  };
  chooseFooter = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.footer_type = theme;
    form.html_footer = "";
    form.is_use_footer_html = false;
    form.home_page_type = null;

    this.props.updateTheme(store_code, form);
  };

  render() {
    var {
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
      use_footer_html,
      tabId,
    } = this.state;
    var { badges } = this.props;
    return (
      <div className="overview " style={{ marginLeft: "25px" }}>
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

                      paddingTop: "15px",
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

                      paddingTop: "15px",
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

                      paddingTop: "15px",
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

                      paddingTop: "15px",
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

                      paddingTop: "15px",
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
            <div className="col-10 col-10-wrapper">
              <form role="form">
                <div class="box-body">
                  <TabPanel>
                    {data.map((v, i) => (
                      <ItemHeaderTheme
                        badges={badges}
                        chooseHeader={this.chooseHeader}
                        header_type={header_type}
                        v={v}
                      />
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {data.map((v, i) => (
                      <ItemBannerTheme
                        badges={badges}
                        chooseBanner={this.chooseBanner}
                        banner_type={banner_type}
                        v={v}
                      />
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {data.map((v, i) => (
                      <ItemProductTheme
                        badges={badges}
                        chooseProduct={this.chooseProduct}
                        product_home_type={product_home_type}
                        v={v}
                      />
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {data.map((v, i) => (
                      <ItemNewsTheme
                        badges={badges}
                        chooseNews={this.chooseNews}
                        post_home_type={post_home_type}
                        v={v}
                      />
                    ))}
                  </TabPanel>
                  <TabPanel>
                    <div class=" ml-3" style={{ height: "30px" }}>
                      <input
                        type="checkbox"
                        style={{ transform: "scale(1.5)" }}
                        checked={use_footer_html}
                        onChange={(e) => {
                          let checkbox = e.target;
                          if (checkbox.checked) {
                            this.setState({
                              use_footer_html: true,
                            });
                          } else {
                            this.setState({
                              use_footer_html: false,
                            });
                          }
                        }}
                      />
                      <label style={{ marginLeft: "7px" }} for="defaultCheck1">
                        Sử dụng footer tùy chỉnh
                      </label>
                    </div>

                    {!use_footer_html ? (
                      data.map((v, i) => (
                        <ItemFooterTheme
                          badges={badges}
                          chooseFooter={this.chooseFooter}
                          footer_type={footer_type}
                          v={v}
                        />
                      ))
                    ) : (
                      <div class="card shadow mb-4">
                        <div class="card-body">
                          <section class="content">
                            <div class="row">
                              <div class="col-md-12 col-xs-12">
                                <div class="box">
                                  <FormFooterHtml
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
            </div>
          </div>
        </Tabs>
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
export default connect(mapStateToProps, mapDispatchToProps)(Custom_Screen);
