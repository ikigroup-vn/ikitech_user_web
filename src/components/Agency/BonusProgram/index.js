import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import ModalCreateBonus from "./ModalCreateBonus";
import moment from "moment";
import { randomString } from "../../../ultis/helpers";
import { Link } from "react-router-dom";
import ModalRemove from "./ModalRemove";
import * as Types from "../../../constants/ActionType";
import * as ENV_default from "../../../ultis/default";
import styled from "styled-components";

const BonusProgramStyles = styled.div`
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    margin-bottom: 0;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
`;
class BonusProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_end: false,
      start_time: moment().format("DD-MM-YYYY"),
      end_time: moment().format("DD-MM-YYYY"),
      modal: {
        threshold: "",
        id: "",
        store_code: "",
      },
    };
  }

  componentDidMount() {
    this.props.getBonusAgencyConfig(this.props.store_code);
  }

  onChangeStatus() {
    var { bonusAgencyConfig, store_code } = this.props;
    var is_end = bonusAgencyConfig?.config?.is_end ?? true;

    var startTime = moment(this.state.start_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var endTime = moment(this.state.end_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    if (
      bonusAgencyConfig?.config?.end_time != null &&
      bonusAgencyConfig?.config?.start_time != null
    ) {
      startTime = moment(bonusAgencyConfig?.config.start_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      endTime = moment(bonusAgencyConfig?.config.end_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    this.props.updateBonusAgencyConfig(store_code, {
      is_end: !is_end,
      start_time: startTime,
      end_time: endTime,
    });
  }

  handleDelCallBack = (e, data) => {
    this.setState({
      modal: {
        threshold: data.threshold,
        reward_name: data.reward_name,
        id: data.id,
        store_code: this.props.store_code,
      },
    });
    e.preventDefault();
  };

  onChangeDatePrime = (e) => {
    try {
      var from = moment(e.value[0], "DD-MM-YYYY").format("DD-MM-YYYY");
      var to = moment(e.value[1], "DD-MM-YYYY").format("DD-MM-YYYY  ");
      this.setState({
        start_time: from,
        end_time: to,
      });
    } catch (error) {
      this.setState({
        start_time: moment().format("DD-MM-YYYY"),
        end_time: moment().format("DD-MM-YYYY"),
      });
    }
    var { bonusAgencyConfig, store_code } = this.props;
    var is_end = bonusAgencyConfig?.config?.is_end ?? true;
    var startTime = moment(this.state.start_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var endTime = moment(this.state.end_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    var valueStartTime = startTime.valueOf();
    var valueEndTime = endTime.valueOf();
    console.log(valueEndTime, valueStartTime);
    if (valueEndTime < valueStartTime) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Thất bại ",
          disable: "show",
          content: "Ngày bắt đầu không được lớn hơn ngày kết thúc",
        },
      });
      return;
    }

    this.props.updateBonusAgencyConfig(store_code, {
      is_end: is_end,
      start_time: startTime,
      end_time: endTime,
    });
  };

  render() {
    var { bonusAgencyConfig, store_code } = this.props;
    var is_end = bonusAgencyConfig?.config?.is_end ?? true;
    var { start_time, end_time, modal } = this.state;

    if (
      bonusAgencyConfig?.config?.end_time != null &&
      bonusAgencyConfig?.config?.start_time != null
    ) {
      start_time = moment(bonusAgencyConfig?.config.start_time).format(
        "DD-MM-YYYY"
      );
      end_time = moment(bonusAgencyConfig?.config.end_time).format(
        "DD-MM-YYYY"
      );
    }

    return (
      <BonusProgramStyles id="wrapper">
        <div className="card-body">
          <div
            className="form-group"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              <div style={{ fontWeight: "500" }}>Hành động</div>
              <label className="status-product">
                <input
                  type="checkbox"
                  hidden
                  name={`${randomString(10)}`}
                  checked={!is_end}
                  onChange={(e) => this.onChangeStatus()}
                />
                <div></div>
              </label>
            </div>
            <Link
              to={`/agency_bonus_steps/${store_code}/create?tab-index=3`}
              class={`btn btn-info btn-icon-split show`}
            >
              <span class="icon text-white-50">
                <i style={{ marginTop: "3px" }} class="fas fa-plus"></i>
              </span>
              <span class="text">Thêm phần thưởng</span>
            </Link>
          </div>

          {is_end == true ? (
            ""
          ) : (
            <div class="form-group">
              <label for="">Ngày bắt đầu và kết thúc</label>

              <div>
                <DateRangePickerComponent
                  min={new Date()}
                  id="daterangepicker"
                  placeholder="Chọn từ ngày... đến ngày..."
                  format="dd/MM/yyyy"
                  width="100%"
                  value={start_time + " đến " + end_time}
                  onChange={this.onChangeDatePrime}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <div class="table-responsive col-12">
              <table class="table table-border table-hover">
                <thead className="thead-quantity">
                  <tr>
                    <th>STT</th>
                    <th style={{ textAlign: "center" }}>Hình ảnh</th>

                    <th>Tên phần thưởng</th>
                    <th>Đơn đạt tối thiểu</th>

                    <th>Giá trị thưởng</th>
                    <th>Giới hạn</th>

                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {this.showAllStep(bonusAgencyConfig?.step_bonus ?? [])}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ModalCreateBonus store_code={store_code} />
        <ModalRemove modal={modal} store_code={this.props.store_code} />
      </BonusProgramStyles>
    );
  }

  showAllStep = (steps) => {
    var result = null;
    if (steps.length > 0) {
      result = steps.map((data, index) => {
        var threshold =
          data.threshold == null
            ? null
            : new Intl.NumberFormat().format(data.threshold.toString());
        var reward_value =
          data.reward_value == null
            ? null
            : new Intl.NumberFormat().format(data.reward_value.toString());

        var reward_name = data.reward_name;
        var reward_image_url = data.reward_image_url;
        var reward_description = data.reward_description;
        var limit =
          data.limit == null
            ? null
            : new Intl.NumberFormat().format(data.limit.toString());
        return (
          <tr>
            <td>{index + 1}</td>
            <td style={{ textAlign: "center" }}>
              <img
                src={
                  reward_image_url == null || reward_image_url == ""
                    ? ENV_default.IMG_NOT_FOUND
                    : reward_image_url
                }
                class="img-responsive"
                width="100px"
                height="115px"
                alt="Image"
              />
            </td>
            <td>{reward_name}</td>
            <td>{threshold}</td>

            <td>{reward_value}</td>
            <td>{limit}</td>

            <td>
              <Link
                to={`/agency_bonus_steps/${this.props.store_code}/update/${data.id}?tab-index=3`}
                class="btn btn-outline-warning btn-sm"
              >
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
                <span class="text">Sửa</span>
              </Link>

              <button
                type="button"
                onClick={(e) => {
                  this.handleDelCallBack(e, data);
                }}
                data-toggle="modal"
                data-target="#removeFormStepBonus"
                style={{ marginLeft: "10px" }}
                class={`btn btn-outline-danger btn-sm `}
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
}

const mapStateToProps = (state) => {
  return {
    bonusAgencyConfig: state.agencyReducers.agency.bonusAgencyConfig,
    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getBonusAgencyConfig: (store_code) => {
      dispatch(agencyAction.getBonusAgencyConfig(store_code));
    },
    updateBonusAgencyConfig: (store_code, form) => {
      dispatch(agencyAction.updateBonusAgencyConfig(store_code, form));
    },
    deleteBonusSteps: (store_code, id) => {
      dispatch(agencyAction.deleteBonusSteps(store_code, id));
    },
    showError: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BonusProgram);
