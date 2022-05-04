import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default"
import { format } from "../../ultis/helpers";
class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event,store_code,name) => {
    this.props.handleDelCallBack({table : "Nhân viên" , id : store_code,name:name });
    event.preventDefault();
}

  showData = (staff) => {
    console.log(staff)
    var {store_code} = this.props
    var result = null;
    if (staff.length > 0) {
      var {update , _delete} = this.props

      result = staff.map((data, index) => {
       
        var decentralization = typeof data.decentralization  != "undefined" && data.decentralization != null    ?  data.decentralization.name : ""

        return (
          <tr className = "hover-product">
            <td>{index + 1}</td>
            <td>
            {data.name}

            </td>

            <td>{data.username}</td>
            <td>{data.phone_number}</td>

            
            <td>{data.email}</td>
            <td>{data.salary != null ? format(data.salary) : ""}</td>
            <td>{decentralization}</td>
 <td style={{ textAlign: "center" }}>
              {data.online ? (
                <>
                  <span
                    style={{
                      background: "green",
                      padding: "0.005px 8px",
                      borderRadius: "50%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {" "}
                  </span>
                  <span>Online</span>
                </>
              ) : (
                <>
                  <span
                    style={{
                      background: "red",
                      padding: "0.005px 8px",
                      borderRadius: "50%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {" "}
                  </span>
                  <span>Offline</span>
                </>
              )}
            </td>


            <td style = {{
              display: "flex",
              justifyContent: "space-around"
          
            }}>
              <Link
                to={`/staff/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
              onClick = {(e)=>this.passDataModal(e,data.id,data.name)}
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
    return (
      <div class="table-responsive">
        <table class="table  " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>

              <th>Tên tài khoản</th>
                            <th>Số điện thoại</th>

              <th>Email</th>
              <th>Lương theo giờ</th>

              <th>Vai trò</th>
              <th>Trạng thái</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
