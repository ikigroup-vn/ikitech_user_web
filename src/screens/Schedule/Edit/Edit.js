import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Schedule/Edit/Form";
import * as scheduleAction from "../../../actions/schedule";
import * as Types from "../../../constants/ActionType";

import Alert from "../../../components/Partials/Alert";
class ScheduleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var {store_code } = this.props;
    this.props.fetchAllSchedule(store_code);
  }



  render() {
    var { scheduleId, store_code } = this.props;
    var { schedule, history } = this.props

      return (
       

              <div class="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Chỉnh sửa cửa hàng
                  </h4>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                    <section class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div id="messages"></div>

                          <div class="box">
                            <Form history={history} scheduleId={scheduleId} schedule={schedule} store_code={store_code} />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.scheduleReducers.schedule.allSchedule,
    auth: state.authReducers.login.authentication,
    alert: state.scheduleReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllSchedule: (store_code) => {
      dispatch(scheduleAction.fetchAllSchedule(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleEdit);
