import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, store_code , name) => {
    this.props.handleDelCallBack({ table: "khóa học", id: store_code , name:name });
    event.preventDefault();
  }

  showData = (courses , per_page , current_page) => {
    var { store_code } = this.props
    var result = null;
    if (courses.length > 0) {
      var {update , _delete} = this.props

      result = courses.map((data, index) => {
        var image_url = data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url
        var published = data.published == true ? "Đang hiển thị" : "Đang lưu tạm"
        var published_status = data.published == true ? "success" : "secondary"

        return (
          <tr>
            <td>{(per_page * (current_page -1)) + (index + 1)}</td>
            {/* <td>
              {data.id}

            </td> */}

        

            <td>{data.title}</td>

       
            <td>{data.short_description}</td>
            <td>{moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>


            <td className="three-btn-group" style = {{maxWidth : "230px"}}>
            <Link
                to={`/train/chapter/index/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Xem chương - bài học
              </Link>
              <Link
                to={`/train/course/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
                onClick={(e) => this.passDataModal(e, data.id ,data.title)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"}`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var {courses} = this.props
    var per_page = courses.per_page
    var current_page = courses.current_page
    var courses = typeof courses.data == "undefined" ? [] : courses.data
 
    return (
      <div class="table-responsive">
        <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              {/* <th>ID</th> */}

              <th>Tên khóa học</th>
              <th>Mô tả ngắn</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(courses, per_page , current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
