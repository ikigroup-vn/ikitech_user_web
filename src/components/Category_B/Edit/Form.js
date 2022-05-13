import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import * as categoryBAction from "../../../actions/category_blog";
import { shallowEqual } from "../../../ultis/shallowEqual";
import CKEditor from "ckeditor4-react";
import ModalUpload from "./ModalUpload"
import * as Env from "../../../ultis/default"
import {isEmpty} from "../../../ultis/helpers"

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      txtTitle: "",
      image: ""
    };
  }
  componentDidMount() {
    this.props.initialUpload()
  }

  componentWillReceiveProps(nextProps) {
    var { category_blog } = this.props
    if (!shallowEqual(nextProps.category_blog, category_blog)) {
      nextProps.category_blog.forEach(item => {
        if (item.id == Number(nextProps.categoryBId)) {
          this.setState(
            {
              txtTitle: item.title,
              txtContent: item.description,
              image: item.image_url
            }
          )
        }
      });
    }

    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image })
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

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onSave = (e) => {
    var { store_code, categoryBId } = this.props
    e.preventDefault();
    var { txtContent, txtTitle, image } = this.state
    if(txtTitle == null || !isEmpty(txtTitle))
    {
      this.props.showError({

        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tiêu đề không được để trống",
        },
      }
      )
      return;
    }
    this.props.updateCategoryB(categoryBId, {
      title: txtTitle,
      description: txtContent,
      image_url: image,
    }, store_code);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  render() {

    var { txtTitle, txtContent, image } = this.state
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;
    console.log(this.props)
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
                value={txtTitle}
                name="txtName"
                placeholder="Nhập tiêu đề bài viết"
                autocomplete="off"
                onChange={this.onChange}
                name="txtTitle"
              />
            </div>
            <div class="form-group">
              <label>Ảnh: &nbsp; </label>
              <img src={`${image}`} width="150" height="150" />
            </div>
            <div class="form-group">

              <div class="kv-avatar">
                <div >
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-toggle="modal"
                    data-target="#uploadModalCategoryB"
                  >
                    <i class="fa fa-plus"></i> Upload ảnh
                  </button>
                </div>
              </div>

            </div>



            <div class="form-group">
              <label for="product_name">Nội dung mô tả danh mục</label>
              
              <textarea name="txtContent" value={txtContent} onChange = {this.onChange} id="input" class="form-control" rows="3"></textarea>
              
              {/* <CKEditor
                data={txtContent}
                onChange={this.onChangeDecription}
              /> */}
            </div>





          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info btn-icon-split btn-sm">
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Lưu</span>
            </button>
            <a
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning btn-icon-split  btn-sm"
            >
              <span class="icon text-white-50">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span class="text"> Trở về</span>
            </a>
          </div>

        </form>
        <ModalUpload />

      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.categoryBImg.categoryB_img,

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error)
    },
    initialUpload: () => {
      dispatch(categoryBAction.initialUpload())
    },
    updateCategoryB: (id, data, store_code) => {
      dispatch(categoryBAction.updateCategoryB(id, data, store_code))
    }

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
