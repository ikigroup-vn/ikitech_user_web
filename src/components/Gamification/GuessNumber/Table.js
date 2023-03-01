import { PureComponent } from "react";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";
import * as Types from "../../../constants/ActionType";
import history from "../../../history";
import { getQueryParams } from "../../../ultis/helpers";

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
  handleShowModalDeleteGame = (id) => {
    const { setOpenModalDeleteGameGuessNumber, setIdGameGuessNumber } =
      this.props;
    setOpenModalDeleteGameGuessNumber(true);
    setIdGameGuessNumber(id);
  };
  handleUpdateGameGuessNumbers = (e, id) => {
    if (e.target.closest(".btn-delete") === null) {
      const { store_code } = this.props;
      const page = getQueryParams("page") || 1;
      history.push(
        `/game_guess_numbers/${store_code}/update/${id}?page=${page}`
      );
    }
  };

  showData = (listGameGuessNumbers) => {
    if (listGameGuessNumbers?.data?.length > 0) {
      return listGameGuessNumbers.data.map((game, index) => (
        <TableStyles
          className="hover-product"
          key={game.id}
          onClick={(e) => this.handleUpdateGameGuessNumbers(e, game.id)}
        >
          <td>
            {(listGameGuessNumbers.current_page - 1) *
              listGameGuessNumbers.per_page +
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
                onClick={(e) => this.handleUpdateGameGuessNumbers(e, game.id)}
              >
                <i className="fa fa-edit"></i>Sửa
              </button>
              <button
                className="btn btn-danger btn-sm btn-delete"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={() => this.handleShowModalDeleteGame(game.id)}
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
    const { listGameGuessNumbers } = this.props;
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
          <tbody>{this.showData(listGameGuessNumbers)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
