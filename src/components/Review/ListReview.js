import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default";
import { shallowEqual } from "../../ultis/shallowEqual";
import Stars from "../Partials/Stars";
import moment from "moment";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers"
import * as reviewAction from "../../actions/review";

class ListReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearchStar: "",
      isSearchStar: false,
      isSearchStatus: false,
      valueSearchStatus: "",
      filter_by_stars: null,
      filter_by_status: null,
    }
  }

  passDeleteFunc = (e, id) => {
    this.props.handleDelCallBack({ title: "Đánh giá", id: id });
    e.preventDefault();
  };

  changeStatus = (id, status) => {
    var { store_code } = this.props;
    this.props.changeStatus(store_code, id, { status: status });
  };

  componentDidMount() {
    helper.loadExpandTable()

  }




  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.valueSearchStar != this.state.valueSearchStar) {
      this.setState({ isSearchStar: true })
    }
    if ((this.props.filter_by != nextProps.filter_by) || (this.props.filter_by_value != nextProps.filter_by_value)) {
      var { filter_by, filter_by_value } = nextProps
      if (filter_by == "status") {
        this.setState({ filter_by_status: filter_by_value, filter_by_stars: "" })
      }
      if (filter_by == "stars") {
        this.setState({ filter_by_stars: filter_by_value, filter_by_status: "" })

      }
    }


    return true
  }


  showListImg = (imgs) => {
    var result = <span   style={{ padding: "10px" }}>Không có hình ảnh nào</span>;
    if (typeof imgs == "undefined") {
      return result;
    }
    if (imgs.length == 0) {
      result = imgs.map((data, index) => {
        return (
          <div>
            <img
              style={{ padding: "10px" }}
              src={data}
              class="img-responsive"
              width="120px"
              height="120px"
              alt="Image"
            />
          </div>
        );
      });
    }
    return result;
  };

  showData = (reviews) => {
    var result = null;
    if (typeof reviews == "undefined") {
      return result;
    }
    if (reviews.length > 0) {
      var { censorship } = this.props
      result = reviews.map((data, index) => {

        var image_product = "";
        var image_review = "";
        try {
          image_product =
            data.product.images.length > 0
              ? data.product.images[data.product.index_image_avatar].image_url
              : Env.IMG_NOT_FOUND;
        } catch (error) {
          image_product = Env.IMG_NOT_FOUND;
        }
        try {
          image_review = JSON.parse(data.images);
        } catch (error) {
          image_review = [];
        }
        var time = moment(data.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "DD-MM-YYYY HH:mm:ss"
        );
        var image_customer =
          data.customer.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data.customer.avatar_image;
        var status =
          data.status == 0
            ? "Đang chờ"
            : data.status == 1
              ? "Đã duyệt"
              : "Đã hủy";
        var _status =
          data.status == 0
            ? "secondary"
            : data.status == 1
              ? "success"
              : "danger";
        var disable_Confirm =
          data.status == 0 || data.status == -1 ? "show" : "hide";
          var disable_Delete =
          data.status == -1 ? "show" : "hide";
        var disable_Cancel =
          data.status == 0 || data.status == 1 ? "show" : "hide";
        var { isSearchStar, isSearchStatus, valueSearchStar, valueSearchStatus } = this.state
        console.log(isSearchStar, isSearchStatus, valueSearchStar, valueSearchStatus)
        // var searchStar = ""
        // var searchStatus = ""
        // if(isSearchStar)
        // {
        //   if(valueSearchStar == "")
        //   searchStar = "show"
        //   else
        //   searchStar = Number(valueSearchStar) == data.stars ? "show" : "hide"
        // }
        // if(isSearchStatus)
        // {
        //   if(valueSearchStatus == "")
        //   searchStatus = "show"
        //   else
        //   searchStatus = Number(valueSearchStatus) == data.status ? "show" : "hide"
        // }
        return (
          <React.Fragment>
            <tr class={`sub-container hover-product `} >
              <td>
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className=" btn-success exploder"
                >
                  <span class="fa fa-plus"></span>
                </button>
              </td>
              <td>{data.customer.name}</td>
              <td>{data.product.name}</td>
              <td>
                <img
                  src={image_product}
                  class="img-responsive"
                  width="100px"
                  height="100px"
                  alt="Image"
                />
              </td>
              <td style={{
                display: "flex",
                "justify-content": "center"
              }}>
                <Stars num={data.stars} />
              </td>
              <td>
                <span
                  style={{ fontSize: "14px" }}
                  class={`${_status}`}
                >
                  {status}
                </span>
              </td>
              <td>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => this.passDeleteFunc(e, data.id)}
                  data-toggle="modal"
                  data-target="#removeModal"
                  class={`btn btn-danger btn-sm ${disable_Delete} ${censorship == true ? "show" : "hide"}`}
                >
                  <i class="fa fa-trash"></i> Xóa
                </button>
                <button
                                style = {{marginLeft : "10px"}}

                  type="submit"
                  class={`btn btn-info  btn-sm ${disable_Confirm} ${censorship == true ? "show" : "hide"}`}
                  onClick={() => {
                    this.changeStatus(data.id, 1);
                  }}
                >
                    <i class="fas fa-check"></i>                 Duyệt

                </button>
                <button
                style = {{marginLeft : "10px"}}
                  onClick={() => {
                    this.changeStatus(data.id, -1);
                  }}
                  class={`btn btn-warning  btn-sm ${disable_Cancel} ${censorship == true ? "show" : "hide"} `}
                >
                    <i class="fas fa-times"></i>Hủy
                 
                </button>
              </td>
            </tr>
            <tr class="explode hide" style={{ background: "rgb(200 234 222)" }}>
              <td colSpan={8}>
                <div class="row">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="info_user">
                      <img
                        style={{ marginBottom: "10px" }}
                        src={image_customer}
                        class="img-responsive"
                        width="100px"
                        height="100px"
                        alt="Image"
                      />
                      <p class="sale_user_label" id="sale_user_name">
                        Khách hàng:{" "}
                        <span id="user_name"> {data.customer.name} </span>
                      </p>

                      <p class="sale_user_label">
                        Số điện thoại:{" "}
                        <span id="user_tel">{data.customer.phone_number}</span>
                      </p>
                    </div>
                    {/* <div class="box-footer">
                      <button
                        style={{ marginRight: "10px" }}
                        type="submit"
                        class={`btn btn-info btn-icon-split btn-sm ${disable_Confirm} ${censorship == true ? "show" : "hide"}`}
                        onClick={() => {
                          this.changeStatus(data.id, 1);
                        }}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-save"></i>
                        </span>
                        <span class="text">Xác nhận</span>
                      </button>
                      <a
                        onClick={() => {
                          this.changeStatus(data.id, -1);
                        }}
                        class={`btn btn-warning btn-icon-split  btn-sm ${disable_Cancel} ${censorship == true ? "show" : "hide"} `}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-times"></i>
                        </span>
                        <span class="text">Hủy</span>
                      </a>
                    </div> */}
                  </div>
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <div class="info_user">

                      <p class="sale_user_label" id="sale_user_name">
                        Nội dung: <span id="user_name"> {data.content} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Hình ảnh:
                      </p>
                      <div class="row">{this.showListImg(image_review)}</div>
                      <p class="sale_user_label" id="sale_user_name">
                        Thời gian: {time}
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  searchStars = (e) => {
    var { getParams, store_code } = this.props
    var value = e.target.value
    var params = getParams("stars", value)
    this.props.fetchAllReview(store_code, 1, params);

    this.setState({ filter_by_stars: value, filter_by_status: "" })

  }
  searchStatus = (e) => {
    var { getParams, store_code } = this.props
    var value = e.target.value
    var params = getParams("status", value)
    this.props.fetchAllReview(store_code, 1, params);
    this.setState({ filter_by_status: value, filter_by_stars: "" })

  }
  componentDidUpdate(prevProps, prevState) {

    helper.loadExpandTable()
  }

  render() {
    var { reviews } = this.props;
    var reviews = typeof reviews.data == "undefined" ? [] : reviews.data;
    var { filter_by_stars, filter_by_status } = this.state
    return (
      <table class="table table-border">
        <thead>
          <tr>
            <th></th>
            <th>Họ tên</th>
            <th>Tên sản phẩm</th>
            <th>Ảnh sản phẩm</th>
            <th style={{
              display: "flex",
              "justify-content": "center"
            }}>
              <select value={filter_by_stars} style={{ maxWidth: "150px" }} name="" id="input" className="form-control" onChange={this.searchStars}>
                <option value="" disabled>-- Sao đánh giá --</option>

                <option value="">Tất cả sao</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>
            </th>
            <th>
              Trạng thái
              {/* <select value = {filter_by_status} style={{ height: "27px" }} name="" id="input" onChange = {this.searchStatus}>
                <option value="">Tất cả trạng thái</option>
                <option value="1">Đã duyệt</option>
                <option value="0">Chờ xác nhận</option>
                <option value="-1">Đã hủy</option>{" "}
              </select> */}
            </th>

            <th style ={{paddingLeft : "25px"}}>Hành động</th>
          </tr>
        </thead>
        <tbody>{this.showData(reviews)}</tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeStatus: (store_code, id, data) => {
      dispatch(reviewAction.changeStatus(store_code, id, data));
    },
    fetchAllReview: (store_code, page, params) => {
      dispatch(reviewAction.fetchAllReview(store_code, page, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(ListReview);
