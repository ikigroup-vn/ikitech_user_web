import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { getAppointments } from "../../actions/appointment";
import { DatePicker } from "antd";
import dayjs from 'dayjs'
const { RangePicker } = DatePicker;

const columns = [
  // {
  //   'title': "STT",
  //   'dataIndex': "key",
  // },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
  },
  {
    title: "Ngày",
    dataIndex: "schedule",
    render: (schedule) => new Date(schedule).toLocaleDateString(),
  },
  {
    title: "Thời gian",
    dataIndex: "schedule",
    render: (schedule) => new Date(schedule).toLocaleTimeString(),
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
  },
];

class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableParams: {
        pagination: {
          current: 1,
          pageSize: 10,
          total: null,
        },
      },
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString()
    };
  }

  componentDidMount() {
    
    this.props.getAppointments(
      this.props.store_code,
      this.state.tableParams.pagination.current,
      this.state.start_date,
      this.state.end_date
    );
  }

  componentWillReceiveProps({ appointments }) {
    if (appointments?.total)
      return this.setState((state) => {
        return {
          tableParams: {
            pagination: {
              ...state.tableParams.pagination,
              total: appointments.total,
            },
          },
        };
      });
  }

  mapingData = () => {
    return this.props.appointments.data;
  };

  handleTableChange = (pagination) => {
    this.props.getAppointments(
      this.props.store_code,
      pagination.current,
      this.state.start_date,
      this.state.end_date
    );
    this.setState({ tableParams: pagination });
  };

  filterByDateRange = (date, dateStrings) => {
    let start_date = dateStrings[0] ? new Date(dateStrings[0]).toISOString() : '';
    let end_date = dateStrings[1] ? new Date(dateStrings[1]).toISOString() : ''
    this.props.getAppointments(
      this.props.store_code,
      1,
      start_date,
      end_date
    );
    this.setState({ start_date, end_date });
  
  }

  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 title_content font-weight-bold text-primary">
            Danh sách lịch hẹn
          </h6>
          <RangePicker
            showTime
            onChange={this.filterByDateRange}
            value={[this.state.start_date ? dayjs(this.state.start_date) : '',  this.state.end_date ? dayjs(this.state.end_date) : '']} />
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={this.mapingData()}
            pagination={this.state.tableParams.pagination}
            onChange={this.handleTableChange}
          ></Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointmentReducers.Appointment.appointments,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAppointments: (store_code, page, start_date, end_date) => {
      dispatch(getAppointments(store_code, page, start_date, end_date));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentTable);
