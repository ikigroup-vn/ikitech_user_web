import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const TableStyles = styled.div`
  .time_end_token {
    position: relative;
    .time_end_token_content {
      &:hover + .time_end_token_tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    .time_end_token_tooltip {
      position: absolute;
      right: 0;
      top: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      font-weight: 400;
      width: 260px;
      padding: 10px;
      border-radius: 10px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFrist: false,
      agencySelected: {},
      agencySelectedForChangeBalance: {},
    };
  }

  showData = (listConnect) => {
    var result = null;
    if (listConnect.length > 0) {
      result = listConnect.map((data, index) => {
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>
                <span
                  style={{
                    backgroundColor:
                      data.platform?.toLowerCase() === "tiki"
                        ? "#09a0ef"
                        : data.platform?.toLowerCase() === "lazada"
                        ? "#262696"
                        : data.platform?.toLowerCase() === "shopee"
                        ? "#E74B2C"
                        : data.platform?.toLowerCase() === "tiktok"
                        ? "#000"
                        : "",
                    color: "#fff",
                    padding: "3px 5px",
                  }}
                >
                  {data.platform}
                </span>
              </td>
              <td>
                <div>
                  <div>{data.shop_id}</div>
                  <div
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {data.shop_name}
                  </div>
                </div>
              </td>
              <td></td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  {data.type_sync_products == "0" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#e81414",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3ce814",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  {data.type_sync_inventory == "0" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#e81414",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3ce814",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  {data.type_sync_orders == "0" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#e81414",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3ce814",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </td>
              <td>
                {moment(data.expiry_token, "YYYY-MM-DD HH:mm:ss").format(
                  "DD/MM/YYYY HH:mm:ss"
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  render() {
    var listConnectEcommerce = this.props.listConnectEcommerce
      ? this.props.listConnectEcommerce
      : [];

    return (
      <TableStyles class="" style={{ overflow: "auto", minHeight: "200px" }}>
        <table className="table table-border">
          <thead>
            <tr>
              <th>Sàn TMĐT</th>
              <th>Shop ID | Tên gian hàng</th>
              <th>Đơn gắn vào cửa hàng*</th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Đồng bộ sản phẩm*
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Cập nhật tồn kho*
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Đồng bộ đơn hàng*
              </th>
              <th>Hạn sử dụng</th>
              <th>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "5px",
                  }}
                  className="time_end_token"
                >
                  <span>Hạn token</span>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    className="time_end_token_content"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                  <div className="time_end_token_tooltip">
                    Khi kết nối với các sàn, mỗi sàn sẽ có hạn token khác nhau,
                    khi gần hết hạn token, bạn cần kết nối lại như khi thêm mới
                    1 gian hàng bình thường để hệ thống gia hạn lại được token
                    với các sàn
                  </div>
                </div>
              </th>
              <th>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </th>
            </tr>
          </thead>

          <tbody>{this.showData(listConnectEcommerce)}</tbody>
        </table>
      </TableStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
