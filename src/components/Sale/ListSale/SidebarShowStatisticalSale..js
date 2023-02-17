import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { format } from "../../../ultis/helpers";
import SidebarFilter from "../../Partials/SidebarFilter";

const SidebarShowStatisticalStyles = styled.div`
  .totalContent {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

class SidebarShowStatisticalSale extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCloseShowSidebar = () => {
    const { setShowSidebar, setSaleInfoStatistical } = this.props;
    setShowSidebar(false);
    setSaleInfoStatistical({});
  };
  render() {
    const { saleInfoStatistical, showSidebar, statisticalUser } = this.props;
    console.log(
      "SidebarShowStatisticalSale ~ render ~ statisticalUser",
      statisticalUser
    );
    return (
      <SidebarFilter
        title={`Thống kê sale của nhân viên ${saleInfoStatistical?.name}`}
        widthSideBar="70%"
        showSidebar={showSidebar}
        setShowSidebar={this.handleCloseShowSidebar}
      >
        <SidebarShowStatisticalStyles>
          {Object.entries(statisticalUser).length > 0 && (
            <div className="row">
              <div className="col-xl-5">
                <div className="d-sm-flex  align-items-center justify-content-between mb-4">
                  <h4 className="h5 title_content mb-0 text-gray-800">
                    Tổng quan của Sale
                  </h4>
                </div>
                <div>
                  <div className="mb-4 ">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body set-padding">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div>
                              <div className=" font-weight-bold text-success text-uppercase mb-1">
                                Tổng doanh thu
                              </div>
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {format(statisticalUser.total_final)}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-money-bill text-gray-300 fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
                    <div className="card border-left-danger shadow h-100 py-2">
                      <div className="card-body set-padding">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div>
                              <div className=" font-weight-bold text-danger text-uppercase mb-1">
                                Tổng đơn
                              </div>
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {statisticalUser.total_order}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body set-padding">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div>
                              <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                Ngày
                              </div>
                            </div>
                            <div className="d-sm-flex  align-items-center justify-content-between">
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {format(statisticalUser.total_final_in_day)}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_day} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body set-padding">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div>
                              <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                Tuần
                              </div>
                            </div>
                            <div className="d-sm-flex  align-items-center justify-content-between">
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {format(statisticalUser.total_final_in_week)}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_week} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body set-padding">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div>
                              <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                Tháng
                              </div>
                            </div>
                            <div className="d-sm-flex  align-items-center justify-content-between">
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {format(statisticalUser.total_final_in_month)}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_month} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body set-padding">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div>
                              <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                Năm
                              </div>
                            </div>
                            <div className="d-sm-flex  align-items-center justify-content-between">
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {format(statisticalUser.total_final_in_year)}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_year} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "10px",
                  }}
                  className="mb-4"
                >
                  <img
                    src="../images/giftbox.png"
                    alt="gift"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <span
                    className="font-weight-bold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Thưởng theo mức doanh thu theo quý
                  </span>
                </div>

                {statisticalUser?.steps_bonus?.length > 0 && (
                  <div>
                    {statisticalUser.steps_bonus.map((step) => (
                      <div className="mb-4" key={step.id}>
                        <div className="card  shadow h-100 py-2">
                          <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    columnGap: "10px",
                                  }}
                                >
                                  <img
                                    src="../images/hand.png"
                                    alt="hand"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                    }}
                                  />
                                  <div className=" font-weight-bold text-secondary mb-1">
                                    Đạt: {format(step.limit)}
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto text-success font-weight-bold">
                                Thưởng: {format(step.bonus)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </SidebarShowStatisticalStyles>
      </SidebarFilter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    statisticalUser: state.saleReducers.sale.statisticalUser,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowStatisticalSale);
