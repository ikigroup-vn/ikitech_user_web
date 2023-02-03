import moment from "moment";
import React, { Component } from "react";
import MomentInput from "react-moment-input";
import { connect } from "react-redux";
import styled from "styled-components";
import * as AgencyAction from "../../../actions/agency";
import * as groupCustomerAction from "../../../actions/group_customer";
import Upload from "../../../components/Upload";
import * as Types from "../../../constants/ActionType";
import { formatNumberV2 } from "../../../ultis/helpers";
const groups = [
  {
    id: 0,
    name: "group_customer",
    type: "radio",
    label: "Tất cả",
    value: Types.GROUP_CUSTOMER_ALL,
  },
  {
    id: 1,
    name: "group_customer",
    type: "radio",
    label: "Đại lý",
    value: Types.GROUP_CUSTOMER_AGENCY,
  },
  {
    id: 2,
    name: "group_customer",
    type: "radio",
    label: "Cộng tác viên",
    value: Types.GROUP_CUSTOMER_CTV,
  },
  {
    id: 3,
    name: "group_customer",
    type: "radio",
    label: "Nhóm khách hàng",
    value: Types.GROUP_CUSTOMER_BY_CONDITION,
  },
];

const ActionsGameSpinWheelContentStyles = styled.div`
  .gameSpinWheel__main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
  .gameSpinWheel__imageContent {
    .gameSpinWheel__imageSelect {
      label {
        & > div {
          width: 120px;
          height: 120px;
          border: 1px dashed;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #a1a09e;
          cursor: pointer;
          svg {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
`;

class ActionsGameSpinWheelContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtTurnInDay: "",
      txtMaxAmountCoin: "",
      txtMaxGift: "",
      txtNumberLimit: "",
      txtStart: "",
      txtEnd: "",
      displayError: "hide",
      group_customer: 0,
      agency_type_id: null,
      group_type_id: null,
    };
  }
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (
      name === "txtTurnInDay" ||
      name === "txtMaxAmountCoin" ||
      name === "txtMaxGift" ||
      name === "txtNumberLimit"
    ) {
      const valueNumber = formatNumberV2(value);
      this.setState({ [name]: valueNumber });
    } else {
      this.setState({ [name]: value });
    }
  };
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state;
    if (e != "" && txtEnd != "") {
      if (
        !moment(e, "DD-MM-YYYY HH:mm").isBefore(
          moment(txtEnd, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        console.log("hidddeee");
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtStart: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtStart } = this.state;

    if (txtStart != "" && e != "") {
      if (
        !moment(txtStart, "DD-MM-YYYY HH:mm").isBefore(
          moment(e, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtEnd: time,
    });
  };

  render() {
    const { store_code, types, groupCustomer } = this.props;
    const {
      txtName,
      txtTurnInDay,
      txtMaxAmountCoin,
      txtMaxGift,
      txtNumberLimit,
      group_customer,
      agency_type_id,
      group_type_id,
      displayError,
    } = this.state;

    return (
      <ActionsGameSpinWheelContentStyles className="gameSpinWheel__content">
        <div className="gameSpinWheel__form">
          <div className="gameSpinWheel__main">
            <div className="form-group gameSpinWheel__item">
              <label for="txtName">Tên vòng quay</label>
              <input
                type="text"
                className="form-control input-sm"
                id="txtName"
                name="txtName"
                placeholder="Nhập tên vòng quay"
                autoComplete="off"
                value={txtName}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group gameSpinWheel__item">
              <label for="txtTurnInDay">Số lượt quay trong ngày</label>
              <input
                type="text"
                className="form-control input-sm"
                id="txtTurnInDay"
                name="txtTurnInDay"
                placeholder="Nhập số lượt quay trong ngày..."
                autoComplete="off"
                value={txtTurnInDay}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group gameSpinWheel__item">
              <label for="product_name">Ngày bắt đầu</label>
              <MomentInput
                min={moment()}
                format="DD-MM-YYYY HH:mm"
                options={true}
                enableInputClick={true}
                monthSelect={true}
                readOnly={true}
                translations={{
                  DATE: "Ngày",
                  TIME: "Giờ",
                  SAVE: "Đóng",
                  HOURS: "Giờ",
                  MINUTES: "Phút",
                }}
                onSave={() => {}}
                onChange={this.onChangeStart}
              />
            </div>
            <div className="form-group gameSpinWheel__item">
              <label for="product_name">Ngày kết thúc</label>
              <MomentInput
                min={moment()}
                format="DD-MM-YYYY HH:mm"
                options={true}
                enableInputClick={true}
                monthSelect={true}
                readOnly={true}
                translations={{
                  DATE: "Ngày",
                  TIME: "Giờ",
                  SAVE: "Đóng",
                  HOURS: "Giờ",
                  MINUTES: "Phút",
                }}
                onSave={() => {}}
                onChange={this.onChangeEnd}
              />
              <div
                className={`alert alert-danger ${displayError}`}
                role="alert"
                style={{
                  marginTop: "10px",
                }}
              >
                Thời gian kết thúc phải sau thời gian bắt đầu
              </div>
            </div>
            <div className="form-group gameSpinWheel__item">
              <label for="txtMaxAmountCoin">Số xu tối đa</label>
              <input
                type="text"
                className="form-control input-sm"
                id="txtMaxAmountCoin"
                name="txtMaxAmountCoin"
                placeholder="Nhập số xu tối đa..."
                autoComplete="off"
                value={txtMaxAmountCoin}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group gameSpinWheel__item">
              <label for="txtMaxGift">Số phần thưởng tối đa</label>
              <input
                type="text"
                className="form-control input-sm"
                id="txtMaxGift"
                name="txtMaxGift"
                placeholder="Nhập số lượng phần thưởng tối đa..."
                autoComplete="off"
                value={txtMaxGift}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group discount-for">
              <label htmlFor="group_customer">Áp dụng cho</label>
              <div
                style={{
                  display: "flex",
                  columnGap: "10px",
                }}
                className="radio discount-for"
                onChange={this.onChange}
              >
                {groups.map((group) => (
                  <label key={group.id}>
                    <input
                      type={group.type}
                      name={group.name}
                      checked={group_customer == group.value ? true : false}
                      className={group.name}
                      value={group.value}
                    />
                    <span
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      {group.label}
                    </span>
                  </label>
                ))}
              </div>
              {group_customer == Types.GROUP_CUSTOMER_AGENCY && (
                <select
                  onChange={this.onChange}
                  value={agency_type_id}
                  name="agency_type_id"
                  class="form-control"
                >
                  <option value={-1}>--- Chọn cấp đại lý ---</option>
                  <option value={0}>Tất cả</option>
                  {types.map((v) => {
                    return (
                      <option value={v.id} key={v.id}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              )}
              {group_customer == Types.GROUP_CUSTOMER_BY_CONDITION && (
                <select
                  onChange={this.onChange}
                  value={group_type_id}
                  name="group_type_id"
                  class="form-control"
                >
                  <option value={-1}>--- Chọn nhóm khách hàng ---</option>
                  {groupCustomer.length > 0 &&
                    groupCustomer.map((group) => {
                      return (
                        <option value={group.id} key={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                </select>
              )}
            </div>
            <div className="form-group gameSpinWheel__item">
              <label for="txtNumberLimit">Giới hạn số người tham gia</label>
              <input
                type="text"
                className="form-control input-sm"
                id="txtNumberLimit"
                name="txtNumberLimit"
                placeholder="Nhập giới hạn số người tham gia..."
                autoComplete="off"
                value={txtNumberLimit}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="gameSpinWheel__image form-group">
            <label for="txtName">Hình ảnh</label>
            <div className="gameSpinWheel__imageContent">
              <Upload />
            </div>
          </div>
        </div>
      </ActionsGameSpinWheelContentStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.agencyReducers.agency.allAgencyType,
    groupCustomer: state.groupCustomerReducers.group_customer.groupCustomer,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    fetchGroupCustomer: (store_code) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsGameSpinWheelContent);
