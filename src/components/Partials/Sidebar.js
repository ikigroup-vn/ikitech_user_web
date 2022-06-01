import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { menu } from "../../ultis/menu";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.permission, this.props.permission)) {
      return true;
    } else {
      return true;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const location = window.location.pathname;
    console.log("open" , menu)
    for (const item of menu[0]?.link) {
      if (item.open) {
        console.log("open" , item)
        if(item.setOpenKey?.length > 0)
        for (const element of item.setOpenKey
        ) {
          if (location.includes(element)) {
            if (window.$(`.${item.open}-collapse`).attr("aria-expanded") == "false") {
              window.$(`.${item.open}-collapse`).trigger("click");
              return;
            }
          }
        }
      }
    };
   
  }
  setActiveLocation = (location) => {
    return location.includes("/create")
      ? location.replace("/create", "")
      : location.includes("/edit")
        ? location.replace("/edit", "")
        : location.includes("/detail")
          ? location.replace("/detail", "")
          : location;
  };

  MenuLink_3 = (link) => {
    var result = null;
    if (link.length > 0) {
      var _class = this.props.permission;

      result = link.map((link, index) => {
        return (
          <Route
            key={index}
            index={index}
            path={link.to}
            exact={link.exact}
            children={({ match }) => {
              const location = window.location.pathname;
              const newLocation = this.setActiveLocation(location);
              const isActive = newLocation.includes(link.to + "/");
              var active = isActive ? "active-col" : "";
              // var _class = this.props.permission
              return (
                <Link
                  className={`collapse-item  ${active} ${_class[link.class] == true ||
                    typeof link.class == "undefined" || link.class == null
                    ? "show"
                    : "hide"
                    }`}
                  to={link.to + "/" + this.props.store_code}
                >
                  {link.name}
                </Link>
              );
            }}
          />
        );
      });
    }
    return result;
  };

  activeCollapes = (links, localtion) => {
    for (const link of links) {
      if (localtion.includes(link.to + "/" + this.props.store_code)) {
        return true;
      }
    }
    return false;
  };
  MenuLink_2 = (link) => {
    var result = null;
    if (link?.length > 0) {
      var _class = this.props.permission;

      result = link.map((link, index) => {
        if (typeof link.children !== "undefined") {
          const location = window.location.pathname;
          const newLocation = this.setActiveLocation(location);

          const isActive = this.activeCollapes(link.children, newLocation);
          var active = isActive ? "active" : "";
          var disableHeading =
            this.checkDisplayTitle(link.children) == false ? "show" : "hide";

          return (
            <React.Fragment>
              <li
                className={`nav-item ${active} ${disableHeading} `}
                key={index}
              >
                <a
                  className={`nav-link collapsed ${link.open}-collapse`}
                  href="#"
                  data-toggle="collapse"
                  data-target={`#collapse_${index}`}
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ padding: "0.75rem" }}
                >
                  <i className={link.icon}></i>
                  <span>{link.name}</span>
                </a>
                <div
                  id={`collapse_${index}`}
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{link.name}</h6>
                    {this.MenuLink_3(link.children)}
                  </div>
                </div>
              </li>
            </React.Fragment>
          );
        }
        return (
          <Route
            index={index}
            path={link.to}
            exact={link.exact}
            children={({ match }) => {
              const location = window.location.pathname;
              const newLocation = this.setActiveLocation(location);
              const isActive = newLocation.includes(
                link.to + "/" + this.props.store_code
              );
              var active = isActive ? "active" : "";
              var displayWithTabItem = this.displayItemWithGroup(
                link.itemHasTabName, link
              );
              console.log(link, displayWithTabItem)
              return (
                <li
                  className={`nav-item   ${active} ${displayWithTabItem}  ${_class[link.class] == true ||
                    (link.class == "isVip" &&
                      this.props.badges.config_user_vip != null &&
                      typeof this.props.badges.config_user_vip !=
                      "undefined") ||
                    typeof link.class == "undefined" || link.class == null || displayWithTabItem == "show"
                    ? "show"
                    : "hide"
                    }`}
                >
                  <Link
                    className="nav-link"
                    to={link.to + "/" + this.props.store_code}
                    style={{ padding: "0.75rem" }}
                  >
                    <i className={`fas fa-fw ${link.icon} `}></i>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            }}
          />
        );
      });
    }
    return result;
  };

  displayItemWithGroup = (item, link) => {
    var _class = this.props.permission;
    console.log(link)
    if (typeof link.class != "undefined") {
      if (Array.isArray(link.class)) {
        var check = true
        for (const data of link.class) {


          if (_class[data] == true) {
            check = false
          }
        }
        console.log(check)
        var result = check == false ? "show" : "hide"

        return result

      }
    }
    if (typeof _class.collaborator_config == "undefined") {
      return "hide";
    }
    if (item == "collaborator") {
      if (
        _class.collaborator_config == false &&
        _class.collaborator_list == false &&
        _class.collaborator_payment_request_list == false &&
        _class.collaborator_payment_request_history == false
      ) {
        return "hide";
      }
      return "show";
    }
  };

  checkDisplayTitle = (link) => {
    var result = true;
    console.log(link);
    var _class = this.props.permission;
    if (link?.length > 0) {
      for (const item of link) {
        if (item.isVip == true) {
          return this.props.badges.config_user_vip == null ||
            typeof this.props.badges.config_user_vip == "undefined"
            ? true
            : false;
        }
        console.log(item)
        if (typeof item.class == "undefined" || item.class == null) {
          return false;
        }
        else if (Array.isArray(item.class)) {
          for (const data of item.class) {

            console.log(_class[data])
            var check = true
            if (_class[data] == true) {
              check = false
            }
          }
          return check

        }
        else {
          if (_class[item.class] == true) {
            return false;
          }
        }
      }
    }
    return result;
  };
  MenuLink_1 = (title, link, index) => {
    var disableHeading =
      this.checkDisplayTitle(link) == false ? "show" : "hide";
    return (
      <React.Fragment>
        <div className={`sidebar-heading ${disableHeading}`} key={index}>
          {title}
        </div>

        {this.MenuLink_2(link)}

        <hr class={`sidebar-divider ${disableHeading}`} />
      </React.Fragment>
    );
  };

  showMenus = (menu) => {
    var result = null;
    if (menu.length > 0) {
      result = menu.map((menu, index) => {
        return this.MenuLink_1(menu.title, menu.link, index);
      });
    }
    return result;
  };
  componentDidMount() {
    window.loadScript();
  }
  render() {
    var { badges, stores, permission } = this.props;
    console.log(badges, stores, permission);
    return (
      <div className="col-2 col-2-nav">
        <ul
          className="navbar-nav navbar-main sidebar sidebar-dark accordion"
          style={{
            overflowX: "hidden",
            backgroundColor: themeData().backgroundColor,
          }}
          id="accordionSidebar"
        >
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to={`/dashboard/${this.props.store_code}`}
          >
            {/* <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div> */}
            <div class="sidebar-brand-icon ">
              <img
                width="80%"
                src={
                  badges?.config_user_vip?.url_logo_small_image != null
                    ? badges?.config_user_vip?.url_logo_small_image
                    : themeData().logoTab
                }
                class="img-responsive"
                alt="Image"
              />
            </div>
            <div className="sidebar-brand-text">
              <img
                width="80%"
                src={themeData().logo}
                class="img-responsive"
                alt="Image"
              />
            </div>
          </Link>
          {this.showMenus(menu)}

          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stores: state.storeReducers.store.allStore,
    permission: state.authReducers.permission.data,
    isLoadPermission: state.authReducers.permission.isLoadPermission,
    badges: state.badgeReducers.allBadge,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    loadPermission: (data) => {
      dispatch(data);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
