import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFrist: false,
    };
  }

  showChatBox = (agencyId, status) => {
    this.props.handleShowChatBox(agencyId, status);
  };

  componentDidMount() {
    this.setState({ loadFrist: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (!shallowEqual(prevProps.agencys, this.props.agencys) &&
        prevProps.agencys.length == 0) ||
      prevProps.tabId != 1 ||
      prevState.loadFrist != this.state.loadFrist
    ) {
      helper.loadExpandTable();
    }
  }


  onChangeStatus = (e, id) => {
    var checked = !this["checked" + id].checked
    var status = checked == true ? 1 : 0
    this.props.updateAgency(this.props.store_code, id, {
      status: status
    }
    )
  }

  changeAgencyType = (e, id) => {
    var value = e.target.value
    this.props.updateAgency(this.props.store_code, id, {
      agency_type_id: value
    }
    )
  }




  showData = (agencys) => {
    var { store_code } = this.props;
    var result = null;
    if (agencys.length > 0) {
      result = agencys.map((data, index) => {
        var avatar =
          data.customer.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data.customer.avatar_image;
        var img_front =
          data.front_card == null ? Env.IMG_NOT_FOUND : data.front_card;
        var img_back =
          data.back_card == null ? Env.IMG_NOT_FOUND : data.back_card;

        var address_default = ""

        if (data.customer != null && typeof data.customer != "undefined") {
          if (typeof data.customer.default_address === 'object' && data.customer.default_address !== null) {
            if (data.customer.default_address.address_detail !== null && data.customer.default_address.address_detail !== "") {
              address_default = address_default + data.customer.default_address.address_detail + ", "
            }
            if (data.customer.default_address.wards_name !== null && data.customer.default_address.wards_name !== "") {
              address_default = address_default + data.customer.default_address.wards_name + ", "
            }
            if (data.customer.default_address.district_name !== null && data.customer.default_address.district_name !== "") {
              address_default = address_default + data.customer.default_address.district_name + ", "
            }
            if (data.customer.default_address.province_name !== null && data.customer.default_address.province_name !== "") {
              address_default = address_default + data.customer.default_address.province_name
            }
          }
        }
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>
                {index + 1}
              </td>{" "}
              <td>
                <img
                  src={avatar}
                  class="img-responsive"
                  width="100px"
                  height="115px"
                  alt="Image"
                />
              </td>

              <td>{data.customer.name}</td>
              <td>{data.customer.phone_number}</td>
              <td>
                {data.customer.email == null ? "Trống" : data.customer.email}
              </td>
              <td>

                <select name="agency_type_id" id="input" value={data.agency_type_id} required="required" onChange={(e) => this.changeAgencyType(e, data.id)}>
                  <option value=""></option>
                  {
                    this.props.types.map((data, index) => {
                      return <option value={data.id}>{data.name}</option>

                    })}
                </select>

              </td>

              <td>
                <div className="on-off" onClick={(e) => { this.onChangeStatus(e, data.id) }}>
                  <input ref={(ref) => this["checked" + data.id] = ref} type="checkbox" class="checkbox" name={`${randomString(10)}`} checked={data.status == 1 ? true : false} />

                  <label for="checkbox" class="switch">
                    <span class="switch__circle">
                      <span style = {{backgroundColor : data.status == 1 ? "white" : "gray"}} class="switch__circle-inner"></span>
                    </span>
                    <span class="switch__left"></span>
                    <span class="switch__right"></span>
                  </label>
                </div>
              </td>
              <td style={{
                display: "flex",
                "flex-direction": "column"
              }}>
                <button
                  style={{ margin: "2px 0" }}
                  onClick={() => this.showChatBox(data.customer.id, "show")}
                  class="btn btn-success btn-sm"
                >
                  <i class="fa fa-comment-alt"></i> Chat
                </button>

                <a
                  style={{ margin: "2px 0" }}

                  href={`tel:${data.customer.phone_number}`}
                  class="btn btn-primary btn-sm"
                >
                  <i class="fa fa-phone"></i> Gọi ngay
                </a>
                <Link
                  style={{ margin: "2px 0" }}

                  to={`/order/${this.props.store_code}?agency_by_customer_id=${data.customer_id}&tab-index=1`}
                  class="btn btn-danger btn-sm"
                >
                  <i class="fa fa-history"></i> Lịch sử đơn hàng
                </Link>

                <Link
                  style={{ margin: "2px 0" }}

                  to={`/agency/${this.props.store_code}/report/${data.customer_id}?tab-index=1`}
                  class="btn btn-info btn-sm"
                >
                  <i class="fa fa-bar-chart"></i> Báo cáo
                </Link>
              </td>
            </tr>

          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  optionsType = () =>{
    var result = null
    var {types} = this.props
    if(types.length> 0){
      result = types.map((data) =>{
        return (
          <option value ={data.id}>{data.name}</option>
        )
      })
    }
    return result
  }
  onChangeType = (e) =>{
    var {value} = e.target
    this.setState({txtType : value})
    this.props.passType(value);

  }
  render() {
    var agencys =
      typeof this.props.agencys.data == "undefined"
        ? []
        : this.props.agencys.data;
      var {txtType} = this.state
    return (
      <div class="" style = {{overflow : "auto"}}>
        <table class="table table-border">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>

              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Gmail</th>

              <th>
                
                <select name="txtType" value = {txtType} id="input"   onChange={this.onChangeType}>
                  <option  disabled>Cấp đại lý</option>                
                    <option value="" >Tất cả</option>

                  {this.optionsType()}

                </select>
                
              </th>


              <th>Trạng thái hoạt động</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(agencys)}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgency: (store_code, id, data) => {
      dispatch(agencyAction.updateAgency(store_code, id, data));
    },
    fetchAllAgency: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllAgency(store_code, page, params));
  },

  };
};
export default connect(null, mapDispatchToProps)(Table);