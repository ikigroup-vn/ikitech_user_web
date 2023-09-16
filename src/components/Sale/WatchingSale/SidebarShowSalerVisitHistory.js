import React, { Component } from 'react';
import * as L from 'leaflet';
import styled from 'styled-components';
import * as staffAction from '../../../actions/staff';
import DatePicker from '../../DatePicker/DatePickerADay.jsx';
import { connect, shallowEqual } from 'react-redux';

const SidebarShowHistoryStyles = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: white;
  z-index: 10000;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  .history_item {
    display: flex;
  }
`;

class SidebarShowSalerVisitHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { data } = this.props;
    const { store_code } = this.props;
    const date = this.getCurrentDate(); 
    this.props.fetchReportSaler(store_code, date, data); 
  }

  createMap(staffArr) {
    const {longitude, latitude} = staffArr[0];
    const map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    if (staffArr.length === 1) {
      L.marker([latitude, longitude]).addTo(map);
      map.setView([latitude, longitude], 13);
    } else if (staffArr.length > 1) {
      const route = staffArr.map((record) => [record.longitude, record.latitude]);
      L.polyline(route, { color: 'blue' }).addTo(map);
      map.fitBounds(L.latLngBounds(route));
    } else {
      map.setView([21.0285, 105.8542], 13);
    }
    this.map = map;
  }

  shouldComponentUpdate(nextProps) {
    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      const { staff } = nextProps;
      const staffArr = [...Object.values(staff)];
      if(this.map){
        this.map.remove()
      }
      this.createMap(staffArr);
    }
    return true;
  }

  onChangeDateFromComponent = (date) => {
    const { data } = this.props;
    const { store_code } = this.props;
    this.props.fetchReportSaler(store_code, date, data);
  };

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleCloseSiderBar = (state) => {
    this.props.setOpenHistorySidebar(state);
  };

  render() {
    const { staff } = this.props;
    const { staff_name } = this.props;
    return (
      <SidebarShowHistoryStyles>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 className="primary name_customers">Lịch sử di chuyển của saler: {staff_name}</h4>
          <i
            style={{ fontSize: '30px', cursor: 'pointer', paddingRight: '20px' }}
            onClick={() => this.handleCloseSiderBar(false)}
            class="fas fa-times"
          ></i>
        </div>

        <div className="history_item">
          <div style={{ width: '35%' }}>
            <div style={{ paddingRight: '20px' }}>
              {/* date picker here */}
              <div style={{ marginBottom: '15px', display: 'flex' }}>
                <DatePicker onChangeDate={(date) => this.onChangeDateFromComponent(date)} />
              </div>

              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderTop: '1px solid #c4c4c4', borderBottom: '1px solid #c4c4c4', lineHeight: '40px' }}>
                    <th style={{ width: '8%', color: '#c4c4c4' }}>STT</th>
                    <th style={{ width: '92%', color: '#c4c4c4' }}>Nhật ký hoạt động</th>
                  </tr>
                </thead>

                {staff?.length ? (
                  staff.map((record, index) => (
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #c4c4c4' }}>
                        <td>{index + 1}</td>
                        <td>
                          <div style={{ padding: '4px 0' }}>
                            <div>
                              <span>
                                check in: <span style={{ color: '#c12026' }}>{record?.time_checkin}</span>
                              </span>{' '}
                              -{' '}
                              <span>
                                check out: <span style={{ color: '#c12026' }}>{record?.time_checkout}</span>
                              </span>
                            </div>
                            <div style={{ wordBreak: 'break-word' }}>
                              <span>
                                Viếng thăm ({Math.ceil(record?.time_visit / 60)}p - {record?.percent_pin || 0}% pin -{' '}
                                {record?.images?.length || 0} ảnh)
                              </span>{' '}
                              -<span style={{ wordBreak: 'break-word' }}>Tại cửa hàng: </span>
                              <span style={{ fontWeight: '600' }}>
                                {record?.agency?.customer?.name || 'Không xác định'}
                              </span>
                              <br />
                              <span>
                                Địa chỉ : {record?.agency?.customer?.address_detail || ''} -{' '}
                                {record?.agency?.customer?.district_name || ''}
                              </span>
                            </div>
                            <div>
                              <span>Ghi chú : {record?.note || 'Không có ghi chú!'}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <p style={{ color: '#c4c4c4', fontSize: '14px' }}>Không có lịch sử để hiển thị</p>
                )}
              </table>
            </div>
          </div>

          {/* Map cpn here */}
          <div
            id="map"
            style={{
              minHeight: '90vh',
              height: '100%',
              border: '1px solid #c4c4c4',
              width: '65%',
              marginRight: '20px',
            }}
          ></div>
        </div>
      </SidebarShowHistoryStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.reportSalerToDistributor || [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportSaler: (store_code, date, staff_id) => {
      dispatch(staffAction.fetchReportSalerToDistributord(store_code, date, staff_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarShowSalerVisitHistory);
