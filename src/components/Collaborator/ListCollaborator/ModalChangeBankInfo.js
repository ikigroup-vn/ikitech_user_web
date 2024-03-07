import { Component } from "react";
import themeData from "../../../ultis/theme_data";
import styled from "styled-components";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import { format, formatNumberV2 } from "../../../ultis/helpers";
import moment from "moment";

const ModalChangeBalanceStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .formBalance {
    h5 {
      margin-bottom: 20px;
    }
    .item-balance {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      &:first-of-type {
        margin-bottom: 15px;
      }
      label {
        margin-bottom: 0;
      }
      input {
        border: 1px solid #e3e6f0;
        padding: 8px 15px;
        border-radius: 4px;
      }
    }
  }
  .modal-dialog {
    animation: popup 1s ease-in-out 1;
  }
  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    50% {
      opacity: 1;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

class ModalChangeBankInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankInfo: {
        bankName: "",
        bankNumber: "",
        bankOwner: "",
      },
    };
  }

  render() {
    const { bankName, bankNumber, bankOwner } = this.state;
    const {bankInfo, setBankInfo} = this.props;

    return (
      <ModalChangeBalanceStyles
        className="modal "
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "600px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                Thay đổi thông tin ngân hàng
              </h4>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setBankInfo({});
                }}
              >
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={() => {}} className="formBalance">
                <div className="item-balance">
                  <label htmlFor="money">Số tài khoản</label>
                  <input
                    type="text"
                    id="money"
                    placeholder={"Số tài khoản..."}
                    name="bankNumber"
                    value={bankNumber}
                    onChange={(e) => {
                      setBankInfo((prev) => {
                        console.log("prev", prev);
                      });
                    }}
                  />
                </div>
                <div className="item-balance">
                  <label htmlFor="reason">Ngân hàng</label>
                  <input
                    type="text"
                    id="reason"
                    placeholder="Ngân hàng..."
                    name="bankName"
                    value={bankName}
                    onChange={(e) => {
                      this.props.setBankInfo((prev) => ({
                        ...prev,
                        bankName: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="item-balance">
                  <label htmlFor="reason">Chủ tài khoản</label>
                  <input
                    type="text"
                    id="reason"
                    placeholder="Chủ tài khoản..."
                    name="bankOwner"
                    value={bankOwner}
                    onChange={(e) => {
                      this.props.setBankInfo((prev) => ({
                        ...prev,
                        bankOwner: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    columnGap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <button type="submit" className="btn btn-outline-primary">
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      this.props.setBankInfo({});
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ModalChangeBalanceStyles>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // changePriceBalance: (store_code, idCollaborator, data) => {
    //   dispatch(
    //     collaboratorAction.changePriceBalance(store_code, idCollaborator, data)
    //   );
    // },
  };
};

export default connect(null, mapDispatchToProps)(ModalChangeBankInfo);
