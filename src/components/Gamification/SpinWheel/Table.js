import { PureComponent } from "react";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";
import * as Types from "../../../constants/ActionType";
import history from "../../../history";

const TableStyles = styled.tr`
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
  }
`;

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleShowModalDeleteGroupCustomer = (id) => {
    const { setOpenModalDeleteGameSpinWheel, setIdGameSpinWheel } = this.props;
    setOpenModalDeleteGameSpinWheel(true);
    setIdGameSpinWheel(id);
  };
  handleUpdateGameSpinWheels = (e, id) => {
    if (e.target.closest(".btn-delete") === null) {
      const { store_code } = this.props;
      history.push(`/game_spin_wheels/${store_code}/update/${id}`);
    }
  };

  showData = (listGameSpinWheels) => {
    if (listGameSpinWheels?.data?.length > 0) {
      return listGameSpinWheels.data.map((game, index) => (
        <TableStyles
          className="hover-product"
          key={game.id}
          onClick={(e) => this.handleUpdateGameSpinWheels(e, game.id)}
        >
          <td>
            {(listGameSpinWheels.current_page - 1) *
              listGameSpinWheels.per_page +
              index +
              1}
          </td>
          <td>
            {
              <img
                src={
                  game.images?.length > 0
                    ? game.images[0]
                    : "../images/notfound.png"
                }
                alt="image_game"
              />
            }
          </td>
          <td>{game.name}</td>
          <td>
            {game.apply_for === Types.GROUP_CUSTOMER_ALL
              ? "Tất cả"
              : Types.GROUP_CUSTOMER_CTV
              ? "Cộng tác viên"
              : Types.GROUP_CUSTOMER_AGENCY
              ? "Đại lý cấp..."
              : Types.GROUP_CUSTOMER_BY_CONDITION
              ? "Nhóm..."
              : ""}
          </td>
          <td>{game.description}</td>
          <td>{getDDMMYYYHis(game.time_start)}</td>
          <td>{getDDMMYYYHis(game.time_end)}</td>
          <td>
            <div className="actions">
              <button
                className="btn btn-warning btn-sm"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={(e) => this.handleUpdateGameSpinWheels(e, game.id)}
              >
                <i className="fa fa-edit"></i>Sửa
              </button>
              <button
                className="btn btn-danger btn-sm btn-delete"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={() => this.handleShowModalDeleteGroupCustomer(game.id)}
              >
                <i className="fa fa-trash"></i> Xóa
              </button>
            </div>
          </td>
        </TableStyles>
      ));
    }
    return [];
  };

  render() {
    const { listGameSpinWheels } = this.props;
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
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Đối tượng</th>
              <th>Miêu tả</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showData(listGameSpinWheels)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
