import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import * as saleAction from "../../../actions/sale";
import * as staffAction from "../../../actions/staff";
import Chat from "../../Chat";
import * as Env from "../../../ultis/default";
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";
import moment from "moment";
import * as helper from "../../../ultis/helpers";
import SDateRangePicker from "../../DatePicker/DateRangePicker";
import * as Types from "../../../constants/ActionType";
import Select from "react-select";
import { getBranchId } from "../../../ultis/branchUtils";

const typeCustomers = [
  {
    id: 1,
    label: "Đại lý",
    value: Types.TYPE_CUSTOMER_AGENCY,
  },
  {
    id: 2,
    label: "CTV",
    value: Types.TYPE_CUSTOMER_COLLABORATOR,
  },
  {
    id: 3,
    label: "Khách lẻ",
    value: Types.TYPE_CUSTOMER_RETAIL,
  },
];

class TopCommission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      date_from: "",
      date_to: "",
      customer_type: "",
      searchValue: [],
      page: 1,
      listSale: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { staff } = this.props;
    if (!shallowEqual(staff, nextProps.staff)) {
      const newListSale = nextProps.staff.filter(
        (staff) => staff.is_sale === true
      );
      this.setState({
        listSale: newListSale,
      });
    }
    return true;
  }
  componentDidMount() {
    const { store_code, fetchAllStaff } = this.props;

    fetchAllStaff(store_code, null, `branch_id=${getBranchId()}`, null);
    var date = helper.getDateForChartMonth();
    var params = `&date_from=${date.from}&date_to=${date.to}`;
    this.props.fetchAllTopCommission(store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
    });
  }
  convertOptions = (opts) => {
    if (opts?.length > 0) {
      const newOptions = opts.reduce(
        (prevOption, currentOption) => [
          ...prevOption,
          {
            value: currentOption.id,
            label: currentOption.name,
          },
        ],
        []
      );
      return newOptions;
    }
    return [];
  };
  setPage = (page) => {
    this.setPage({ page });
  };
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    const { customer_type, searchValue } = this.state;
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      from = null;
      to = null;
    }

    const params = this.getParams(from, to, searchValue, customer_type);
    this.props.fetchAllTopCommission(this.props.store_code, 1, params);
    this.setState({
      date_from: from,
      date_to: to,
      page: 1,
    });
  };

  onChangeDateFromComponent = (date) => {
    // var from = "";
    // var to = "";
    // try {
    //   from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD")
    //   to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD")
    // } catch (error) {
    //     from = null
    //     to = null
    // }
    const { customer_type, searchValue } = this.state;

    const params = this.getParams(
      date.from,
      date.to,
      searchValue,
      customer_type
    );
    this.props.fetchAllTopCommission(this.props.store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
      page: 1,
    });
  };

  handleChangeSearch = (sale) => {
    const { customer_type, date_from, date_to } = this.state;
    const { store_code, fetchAllTopCommission } = this.props;
    const params = this.getParams(date_from, date_to, sale, customer_type);

    fetchAllTopCommission(store_code, 1, params);
    this.setState({ searchValue: [...sale], page: 1 });
  };

  onSelectTypeCustomer = (e) => {
    const { date_from, date_to, searchValue } = this.state;
    const { store_code, fetchAllTopCommission } = this.props;
    const value = e.target.value;
    const params = this.getParams(date_from, date_to, searchValue, value);

    fetchAllTopCommission(store_code, 1, params);
    this.setState({ customer_type: value, page: 1 });
  };
  getParams = (from, to, sale, customerType) => {
    var params = "";
    if (from && to) {
      params += `&date_from=${from}&date_to=${to}`;
    }
    if (sale?.length > 0) {
      const staff_ids = sale.reduce((prevSale, currentSale, index) => {
        return (
          prevSale +
          `${
            index === sale.length - 1
              ? currentSale.value
              : `${currentSale.value},`
          }`
        );
      }, "");
      params += `&staff_ids=${staff_ids}`;
    }
    if (customerType != "" && customerType != null) {
      params += `&customer_type=${customerType}`;
    }
    return params;
  };
  exportTopten = () => {
    var { date_from, date_to } = this.state;
    var params = `&date_from=${date_from}&date_to=${date_to}`;
    this.props.exportTopten(this.props.store_code, 1, params);
  };
  render() {
    var {
      customer,
      chat,
      topReport,
      store_code,
      tabId,
      store_code,
      types,
      fetchAllTopCommission,
    } = this.props;

    var customerImg =
      typeof customer.avatar_image == "undefined" ||
      customer.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : customer.avatar_image;
    var customerId =
      typeof customer.id == "undefined" || customer.id == null
        ? null
        : customer.id;
    var customerName =
      typeof customer.name == "undefined" || customer.name == null
        ? "Trống"
        : customer.name;

    var {
      showChatBox,
      date_from,
      date_to,
      customer_type,
      searchValue,
      listSale,
    } = this.state;
    console.log(this.props.topReport);
    return (
      <div id="wrapper">
        <div className="" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "15px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "400px",
                }}
              >
                {" "}
                <Select
                  options={this.convertOptions(listSale)}
                  placeholder={"Chọn sale"}
                  value={searchValue}
                  onChange={this.handleChangeSearch}
                  isMulti={true}
                  noOptionsMessage={() => "Không tìm thấy kết quả"}
                ></Select>
              </div>
              <select
                value={customer_type}
                onChange={this.onSelectTypeCustomer}
                style={{ width: "auto" }}
                id="input"
                class="form-control"
              >
                <option value="">--Chọn loại khách hàng--</option>
                {typeCustomers.map((typeCustomer) => (
                  <option value={typeCustomer.value} key={typeCustomer.id}>
                    {typeCustomer.label}
                  </option>
                ))}
              </select>
              <SDateRangePicker onChangeDate={this.onChangeDateFromComponent} />
            </div>

            <button
              style={{ margin: "auto 0px" }}
              onClick={this.exportTopten}
              class={`btn btn-danger btn-icon-split btn-sm `}
            >
              <span class="icon text-white-50">
                <i class="fas fa-file-export"></i>
              </span>
              <span style={{ color: "white" }} class="text">
                Export Excel
              </span>
            </button>
          </div>

          <Table
            types={types}
            tabId={tabId}
            showChatBox={showChatBox}
            handleShowChatBox={this.handleShowChatBox}
            store_code={store_code}
            topReport={topReport}
          />

          <Pagination
            store_code={store_code}
            topReport={topReport}
            fetchAllTopCommission={fetchAllTopCommission}
            getParams={this.getParams}
            from={date_from}
            to={date_to}
            searchValue={searchValue}
            customer_type={customer_type}
            setPage={this.setPage}
          />
        </div>

        <Chat
          customerName={customerName}
          customerImg={customerImg}
          customerId={customerId}
          chat={chat}
          store_code={store_code}
          closeChatBox={this.closeChatBox}
          showChatBox={showChatBox}
        ></Chat>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topReport: state.saleReducers.sale.topCommission,
    staff: state.staffReducers.staff.allStaff,
    auth: state.authReducers.login.authentication,
    chat: state.chatReducers.chat.chatID,
    customer: state.customerReducers.customer.customerID,
    types: state.agencyReducers.agency.allAgencyType,
    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllTopCommission: (store_code, page, params) => {
      dispatch(saleAction.fetchAllTopCommission(store_code, page, params));
    },
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
    exportTopten: (store_code, page, params) => {
      dispatch(saleAction.exportTopten(store_code, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopCommission);
