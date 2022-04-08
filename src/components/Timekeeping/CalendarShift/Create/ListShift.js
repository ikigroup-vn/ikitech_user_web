import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../Shift/Pagination";
import { filter_arr, format } from "../../../../ultis/helpers";

class ListShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPage: 10,
    };
  }

  onChange = (e) => {
    var { value, checked } = e.target;
    console.log(checked);
    var data = JSON.parse(value);
    if (checked == true) this.props.handleAddShift(data, null, "add");
    else this.props.handleAddShift(null, data.id, "remove");
  };

  checkExsit = (list, id) => {
    if (list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true;
        }
      }
    }
    return false;
  };

  showData = (products, list) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var checked = this.checkExsit(list, data.id);

        return (
          <tr>
            <td>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)}
                  />
                </label>
              </div>
            </td>

            <td>{data.name}</td>

            <td>{`${("0" + data.start_work_hour).slice(-2)}:${(
              "0" + data.start_work_minute
            ).slice(-2)}`}</td>
            <td>{`${("0" + data.end_work_hour).slice(-2)}:${(
              "0" + data.end_work_minute
            ).slice(-2)}`}</td>
            <td>
              {data.days_of_week_list
                .sort((a, b) => a - b)
                .map((value) => {
                  if (value === 8) {
                    return `CN, `;
                  } else {
                    return `T${value}, `;
                  }
                })

                .join("")
                .slice(0, -2)}
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
    var { shifts, store_code, listShift } = this.props;
    console.log(shifts, listShift);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListShift"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>
              <h4
                class="modal-title"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Ca chấm công
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <div class="table-responsive">
              <table
                class="table  table-hover table-border"
                style={{ color: "black" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên ca</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Ngày trong tuần</th>
                  </tr>
                </thead>

                <tbody>{this.showData(shifts?.data, listShift)}</tbody>
              </table>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3">
              <div>
                <Pagination
                  style="float-fix"
                  store_code={store_code}
                  shifts={shifts}
                  limit={this.state.numPage}
                  branch_id={this.props.branch_id}
                />
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-primary pagination-btn"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ListShift);
