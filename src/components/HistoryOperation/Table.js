import moment from "moment";
import { PureComponent } from "react";
import * as Types from "../../constants/ActionType";

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeHistoryOperationFunction = (e) => {
    const value = e.target.value;
    const { setParams } = this.props;
    setParams("function_type", value);
  };
  handleChangeHistoryOperationAction = (e) => {
    const value = e.target.value;
    const { setParams } = this.props;
    setParams("action_type", value);
  };
  functionsHistoryOperation = () => {
    const { params } = this.props;
    return (
      <select
        value={params.action_type || ""}
        name=""
        id="input"
        class="form-control"
        style={{
          width: "150px",
        }}
        onChange={this.handleChangeHistoryOperationAction}
      >
        <option
          value=""
          disabled
          style={{
            fontWeight: "600",
          }}
        >
          Chức năng
        </option>
        <option value={Types.FUNCTION_TYPE_PRODUCT}>Sản phẩm</option>
        <option value={Types.FUNCTION_TYPE_INVENTORY}>Hàng tồn kho</option>
        <option value={Types.FUNCTION_TYPE_CATEGORY_PRODUCT}>
          Loại sản phẩm
        </option>
        <option value={Types.FUNCTION_TYPE_CATEGORY_POST}>Thêm danh mục</option>
        <option value={Types.FUNCTION_TYPE_ORDER}>Đơn hàng</option>
        <option value={Types.FUNCTION_TYPE_THEME}>Mẫu</option>
      </select>
    );
  };
  actionsHistoryOperation = () => {
    const { params } = this.props;
    return (
      <select
        value={params.function_type || ""}
        name=""
        id="input"
        class="form-control"
        style={{
          width: "130px",
        }}
        onChange={this.handleChangeHistoryOperationFunction}
      >
        <option
          value=""
          disabled
          style={{
            fontWeight: "600",
          }}
        >
          Thao tác
        </option>
        <option value={Types.OPERATION_ACTION_ADD}>Thêm</option>
        <option value={Types.OPERATION_ACTION_UPDATE}>Sửa</option>
        <option value={Types.OPERATION_ACTION_DELETE}>Xóa</option>
        <option value={Types.OPERATION_ACTION_CANCEL}>Hủy</option>
      </select>
    );
  };
  handleDisplayNameAction = (actionType) => {
    let name = "";
    switch (actionType) {
      case Types.OPERATION_ACTION_ADD:
        name = "Thêm";
        break;
      case Types.OPERATION_ACTION_UPDATE:
        name = "Cập nhập";
        break;
      case Types.OPERATION_ACTION_DELETE:
        name = "Xóa";
        break;
      case Types.OPERATION_ACTION_CANCEL:
        name = "Hủy";
        break;
      default:
        break;
    }
    return name;
  };

  showData = (historiesOperation) => {
    if (historiesOperation.length > 0) {
      return historiesOperation.map((history, index) => (
        <tr className="hover-product" key={history.id}>
          <td>{(this.props.params.page - 1) * 20 + index + 1}</td>
          <td>{history.staff_id ? history.staff_name : history.user_name}</td>
          <td>{history.function_type_name}</td>
          <td>{this.handleDisplayNameAction(history.action_type)}</td>
          <td>{moment(history.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>{history.content}</td>
        </tr>
      ));
    }
    return (
      <tr className="hover-product">
        <td
          colSpan={6}
          style={{
            textAlign: "center",
          }}
        >
          Không tìm thấy lịch sử thao tác!
        </td>
      </tr>
    );
  };

  render() {
    const histories =
      typeof this.props.histories === "undefined" ? [] : this.props.histories;
    return (
      <div class="table-responsive">
        <table
          className="table table-border "
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Nhân viên</th>
              <th>{this.functionsHistoryOperation()}</th>
              <th>{this.actionsHistoryOperation()}</th>
              <th>Thời gian</th>
              <th>Nội dung</th>
            </tr>
          </thead>
          <tbody>{this.showData(histories)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
