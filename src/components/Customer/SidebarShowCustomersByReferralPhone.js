import { Component } from "react";
import styled from "styled-components";
import SidebarFilter from "../Partials/SidebarFilter";
import * as customerAction from "../../actions/customer";
import { connect } from "react-redux";

const SidebarShowCustomersByReferralPhoneStyles = styled.div``;

class SidebarShowCustomersByReferralPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { store_code, fetchAllCustomerByInferralPhone, customerInfo } =
      this.props;

    const { page } = this.state;
    if (
      Object.entries(nextProps.customerInfo).length > 0 &&
      customerInfo.phone_number !== nextProps.customerInfo.phone_number
    ) {
      fetchAllCustomerByInferralPhone(
        store_code,
        page,
        null,
        nextProps.customerInfo.phone_number
      );
    }
    return true;
  }
  render() {
    const { customerInfo, children } = this.props;
    return (
      <SidebarFilter
        title={`Những người giới thiệu bởi ${customerInfo.name}`}
        widthSideBar="70%"
        showCustomersByReferralPhone={this.props.showCustomersByReferralPhone}
        setShowCustomersByReferralPhone={
          this.props.setShowCustomersByReferralPhone
        }
      >
        <SidebarShowCustomersByReferralPhoneStyles>
          {children}
        </SidebarShowCustomersByReferralPhoneStyles>
      </SidebarFilter>
    );
  }
}

export default SidebarShowCustomersByReferralPhone;
