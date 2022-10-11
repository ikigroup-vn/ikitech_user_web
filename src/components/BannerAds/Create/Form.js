import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import * as bannerAdsAction from "../../../actions/banner_ads";
import ModalUpload from "./ModalUpload";

import * as Env from "../../../ultis/default";
import { isEmpty } from "../../../ultis/helpers";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: 0,
      image_url: null,
      link_to: "",
    };
  }
  componentDidMount() {
    this.props.initialUpload();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({ image_url: nextProps.image });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    var { store_code } = this.props;
    e.preventDefault();
    var { title, image_url, link_to, type } = this.state;

    if (image_url == null || !isEmpty(image_url)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn hình ảnh quảng cáo",
        },
      });
      return;
    }
    if (title == null || !isEmpty(title)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tiêu đề không được để trống",
        },
      });
      return;
    }
    this.props.createBannerAds(store_code, {
      title,
      type,
      link_to,

      image_url,
    });
  };

  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  render() {
    var { title, image_url, link_to, type } = this.state;
    var image =
      image_url == "" || image_url == null ? Env.IMG_NOT_FOUND : image_url;
    var { store_code } = this.props;

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Tiêu đề</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={title}
                name="title"
                placeholder="Nhập tiêu đề "
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label>Ảnh: &nbsp; </label>
              <img src={`${image}`} width="150" height="150" />
            </div>
            <div class="form-group">
              <div class="kv-avatar">
                <div>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-toggle="modal"
                    data-target="#uploadModalBannerAds"
                  >
                    <i class="fa fa-plus"></i> Upload ảnh
                  </button>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Vị trí</label>

              <select
                name="type"
                value={type}
                id="input"
                class="form-control"
                required="required"
                onChange={this.onChange}
              >
                <option value="0">Dưới Banner chính</option>
                <option value="7">Bên phải Banner chính</option>

                <option value="1">Trên sản phẩm nổi bật</option>
                <option value="2">Trên sản phẩm mới</option>
                <option value="3">Trên sản phẩm khuyến mại</option>
                <option value="4">Trên danh sách tin tức</option>
                <option value="6">Bên phải danh sách tin tức</option>
                <option value="5">Trên Footer</option>

                {/* <option value="6">Dưới danh mục sản phẩm</option> */}
                {/* <option value="7">Dưới danh mục tin tức</option> */}
                {/* <option value="8">Trên header</option> */}
              </select>
            </div>

            <div class="form-group">
              <label for="product_name">URL trang đích</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={link_to}
                name="link_to"
                placeholder="VD: https://sy.ikiglobal.com/san-pham/Day-dong-ho-cho-Apple-Watch-Nike+-38-40mm-2220"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-plus"></i> &nbsp;Tạo
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
        <ModalUpload store_code={store_code} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.bannerAdsImg.bannerAds_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    initialUpload: () => {
      dispatch(bannerAdsAction.initialUpload());
    },
    createBannerAds: (store_code, data) => {
      dispatch(bannerAdsAction.createBannerAds(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
