import React, { Component } from 'react';
import { connect, shallowEqual } from 'react-redux';
import * as L from 'leaflet';

import Table from './Table';
import * as staffAction from '../../../actions/staff';
import DatePicker from '../../DatePicker/DatePickerADay.jsx';

class WatchingSaler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_from: '',
      date_to: '',
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.staff !== this.props.staff) {
  //     this.updateMapMarkers();
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      // Tạo bản đồ và đặt tùy chọn mặc định là vị trí cuối cùng của staff trong mảng
      if (this.map) {
        this.map.remove();
      }
      const { staff } = nextProps;
      this.createMap(staff);
    }
    return true;
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  componentDidMount() {
    const today = this.getCurrentDate();
    const { store_code } = this.props;
    this.props.fetchHistoryToDistributor(store_code, today);
  }

  createMap(staffArr) {
    const map = L.map('map');
    const hanoiCoordinates = [21.0285, 105.8542];
    if (staffArr.length === 0) {
      // Nếu không có dữ liệu staffArr, set view về Hà Nội
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      map.setView(hanoiCoordinates, 13);
    } else {
      // Nếu có dữ liệu staffArr, tạo bản đồ và hiển thị các marker và popup
      const bounds = new L.LatLngBounds(); // Để tính toán giới hạn hiển thị của bản đồ
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
  
      staffArr.forEach((record, index) => {
        const { longitude, latitude, name, sale_avatar_image } = record;
        const popupContent = `
          <div style="text-align: center">
            <div style="width: 100%">
              <img src="${sale_avatar_image}" alt="${name}'s Avatar" style="width: 85%; height: 53px; object-fit: cover; border-radius: 51%;" />
            </div>
            <p style="color: #4e73df">${name}</p>
          </div>
        `;
  
        const marker = L.marker([latitude, longitude], { autoPopup: false }).addTo(map);
        marker.bindPopup(popupContent);
  
        // Thêm marker vào giới hạn hiển thị của bản đồ
        bounds.extend(marker.getLatLng());
  
        // Nếu là marker cuối cùng, thì fit bản đồ theo giới hạn
        if (index === staffArr.length - 1) {
          map.fitBounds(bounds);
        }
      });
    }
    this.map = map;
  }

  updateMapMarkers() {
    const { staff } = this.props;
    const staffArray = [...Object.values(staff)];

    if (this.map) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    }

    if (staffArray.length > 0) {
      staffArray.forEach((saler) => {
        const { latitude, longitude, name, sale_avatar_image } = saler;
        const popupContent = `
        <div style="text-align: center">
          <div style="width: 100%">
            <img src="${sale_avatar_image}" alt="${name}'s Avatar" style="width: 85%; height: 53px; object-fit: cover; border-radius: 51%;" />
          </div>
          <p style="color: #4e73df">${name}</p>
        </div>
      `;
        const marker = L.marker([latitude, longitude], { autoPopup: true }).addTo(this.map);
        marker.bindPopup(popupContent);
      });
    }
  }

  onChangeDateFromComponent = (date) => {
    const { store_code } = this.props;
    this.props.fetchHistoryToDistributor(store_code, date);
  };

  render() {
    const { staff } = this.props;
    return (
      <div>
        <div style={{ marginBottom: '15px', display: 'flex' }}>
          <DatePicker onChangeDate={(date) => this.onChangeDateFromComponent(date)} />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '60%', overflowX: 'scroll' }}>
            <Table
              data={staff}
              setOpenHistorySidebar={this.setOpenHistorySidebar}
              store_code={this.props.store_code}
              createMap={this.createMap}
            />
          </div>

          <div style={{ width: '40%', paddingLeft: '15px' }}>
            <div id="map" style={{ height: '100%', minHeight: '500px' }}></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.historySalerToDistributor || [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHistoryToDistributor: (store_code, date) => {
      dispatch(staffAction.fetchHistoryToDistributorByStaffId(store_code, date));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchingSaler);
