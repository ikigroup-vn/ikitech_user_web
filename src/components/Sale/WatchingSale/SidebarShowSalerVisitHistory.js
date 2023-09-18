import React, { Component } from 'react';
import * as L from 'leaflet';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const ImageSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const ImageSliderWrapper = styled.div`
  padding-bottom: 8px;
  cursor: pointer;
  width: 400px;
  padding: 20px 0;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  /* margin: 0 6px; */
  cursor: grab;
  touch-action: none;
  user-select: none;
  transition: transform 0.1s;

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ModalImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    margin-top: 6px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #f05d5d 0%, #a7a7cd 100%);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a18787;
  }

  &::-webkit-scrollbar-track {
    background-color: #9b8d8d;
    border-radius: 10px;
  }
`;

const PrevNextButtons = styled.div`
  .slick-prev,
  .slick-next {
    font-size: 0;
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }

  .slick-prev:before{
    content: "←";
    font-size: 24px;
    color: #000;
  }

  .slick-next:before{
    content: "→";
    font-size: 24px;
    color: #000;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: #ff0000;
  }
`;

class SidebarShowSalerVisitHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedImages: [],
      selectedMarker: 0,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { store_code } = this.props;
    const date = this.getCurrentDate();
    this.props.fetchReportSaler(store_code, date, data);

    if (this.map) {
      this.map.remove();
    }
    setTimeout(() => {
      this.createMap([]);
    }, 100);
  }

  createMap(staffArr) {
    const map = L.map('map');
    const hanoiCoordinates = [21.0285, 105.8542];
    if (staffArr.length === 0) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      // Nếu không có dữ liệu staffArr, set view về Hà Nội
      map.setView(hanoiCoordinates, 13);
    } else {
      const bounds = new L.LatLngBounds();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      staffArr.forEach((record, index) => {
        const { longitude, latitude } = record;
        const popupContent = `
          <div style="text-align: center">
            <p style="color: #4e73df">${index + 1} - Điểm check in gần nhất</p>
          </div>
        `;
        const marker = L.marker([latitude, longitude], { autoPopup: true }).addTo(map);
        marker.openPopup();
        marker.bindPopup(popupContent);
        bounds.extend(marker.getLatLng());
        if (index === staffArr.length - 1) {
          map.fitBounds(bounds);
          marker.openPopup();
        }
      });
    }
    this.map = map;
  }

  shouldComponentUpdate(nextProps) {
    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      const { staff } = nextProps;
      const staffArr = [...Object.values(staff)];
      if (this.map) {
        this.map.remove();
      }
      this.createMap(staffArr);
    }
    return true;
  }

  // when on clink to icon direction show map and marker on it self
  showSelectedMarker(record, index) {
    const { latitude, longitude } = record;
    const { selectedMarker } = this.state;
    const map = this.map;
    // Xóa marker trước đó (nếu có)
    if (selectedMarker) {
      map.removeLayer(selectedMarker);
    }
    // Tạo marker mới
    const newSelectedMarker = L.marker([latitude, longitude]).addTo(map);
    // Đặt nội dung cho popup
    newSelectedMarker.bindPopup(`Thứ tự check in: ${index + 1}`);
    // Hiển thị marker
    newSelectedMarker.openPopup();
    // Đặt marker mới vào state
    this.setState({ selectedMarker: newSelectedMarker });
    // Di chuyển bản đồ đến vị trí marker được chọn
    map.setView([latitude, longitude], 15);
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
  
  openModal = (images, selectedIndex) => {
    this.setState({
      showModal: true,
      selectedImages: images,
      selectedIndex: selectedIndex,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: [],
    });
  };

  prevImage = () => {
    if (this.state.selectedIndex > 0) {
      this.setState((prevState) => ({
        selectedIndex: prevState.selectedIndex - 1,
      }));
    }
  };

  nextImage = () => {
    if (this.state.selectedIndex < this.state.selectedImages.length - 1) {
      this.setState((prevState) => ({
        selectedIndex: prevState.selectedIndex + 1,
      }));
    }
  };

  render() {
    const { staff } = this.props;
    const { staff_name } = this.props;
    const image = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKTICmGiRWVCtc6_nUkRrYdqtAZDyJgafUz6Rt0cd9g&s',
      'https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXky4Xwhw55qd8rLfgCPu6TRoYGbFCx42aeuyp51ag&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfhYQOvhnxQpIOI9lxWCaGKcg1vC9jTOeve31ereWwJw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMtwq5iPsJ0bw8cO7ZVoBQV0q2QvNxTO-A4hGLaMDKw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZSGngUVqUBkPyJtwktvS6k4ubENlKvmYQk-QNkiR2&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGhW0FIDAPndbSY7vOPaU_z9itEc36_C7uh9L1eX4&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPy9eQMZ94ZFQ8favL_77uo4xdeH6K5s7uKEENkgr&s',
    ];

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

        {/* Modal */}
        {this.state.showModal && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={this.closeModal}>X</CloseButton>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <PrevNextButtons>
                <div className="slick-prev" onClick={this.prevImage} style={{opacity: this.state.selectedIndex === 0 ? '0.5' : '1'}}>
                </div>

              </PrevNextButtons>
                <ModalImage src={this.state.selectedImages[this.state.selectedIndex]} />
                <PrevNextButtons>
                <div
                  className="slick-next" disabled={this.state.selectedImages.length - 1}
                  onClick={this.nextImage}
                  style={{ opacity: this.state.selectedImages.length - 1 ? '0.5' : '1'}}
                >
                </div>

                </PrevNextButtons>
              </div>
            </ModalContent>
          </Modal>
        )}

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
                              <span style={{ fontWeight: '600' }}>
                                {record?.agency?.customer?.name || 'Không xác định'}
                              </span>{' '}
                              <br />
                              <span style={{ color: 'grey' }}>check in: </span>
                              <span style={{ color: 'rgb(196 186 99)' }}>{record?.time_checkin}</span> -{' '}
                              <span style={{ color: 'grey' }}>check out: </span>
                              <span style={{ color: '#c12026' }}>
                                {record?.time_checkout || <span color="#22d822">Đang ở tại cửa hàng</span>}
                              </span>
                            </div>
                            <div style={{ wordBreak: 'break-word' }}>
                              <span>
                                <span style={{ color: 'grey' }}>Viếng thăm</span> ({Math.ceil(record?.time_visit / 60)}p
                                - {record?.percent_pin || 0}% pin - {record?.images?.length || 0} ảnh)
                              </span>{' '}
                              <br />
                              <span>
                                <span style={{ color: 'grey' }}>Địa chỉ :</span>{' '}
                                {record?.agency?.customer?.address_detail || ''} -{' '}
                                {record?.agency?.customer?.district_name || ''}
                              </span>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <div>Xem vị trí ghim trên bản đồ: </div>
                              <div>
                                <i
                                  class="fas fa-directions"
                                  style={{ fontSize: '24px', color: '#e75353', cursor: 'pointer', marginLeft: '20px' }}
                                  onClick={() => this.showSelectedMarker(record, index)}
                                ></i>
                              </div>
                            </div>
                            <div>
                              <span style={{ color: 'grey' }}>Ghi chú :</span>
                              <span> {record?.note || 'Không có ghi chú!'}</span> <br />
                              {record?.images?.length > 0 ? (
                                <div>
                                  <div>
                                    <span style={{ color: 'grey' }}>Ảnh sản phẩm chụp tại cửa hàng :</span> <br />
                                  </div>
                                  <ImageSlider>
                                    <ScrollContainer>
                                      <ImageSliderWrapper>
                                          <Slider dots={true} infinite={true} speed={500} slidesToShow={Math.ceil(record?.images?.length / 2)} slidesToScroll={1}>
                                            {record?.images.map((img, index) => (
                                              <div key={index}>
                                                <Image
                                                  src={img}
                                                  alt="ảnh chụp tại cửa hàng"
                                                  draggable="true"
                                                  onClick={() => this.openModal(record?.images, index)}
                                                />
                                              </div>
                                            ))}
                                          </Slider>
                                      </ImageSliderWrapper>
                                    </ScrollContainer>
                                  </ImageSlider>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <tbody>
                    <tr>
                      <td colspan="6" style={{ color: '#c4c4c4', fontSize: '14px', paddingTop: '10px' }}>
                        Không có lịch sử để hiển thị
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>

          {/* Map cpn here */}
          <div
            id="map"
            style={{
              height: '90vh',
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
