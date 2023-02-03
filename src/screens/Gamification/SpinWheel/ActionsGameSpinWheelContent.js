import React, { Component } from "react";

class ActionsGameSpinWheelContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { store_code } = this.props;
    return (
      <div className="gameSpinWheel__content">
        <div className="gameSpinWheel__form">
          <div className="form-group gameSpinWheel__item">
            <label for="txtName">Tên vòng quay</label>
            <input
              type="text"
              className="form-control input-sm"
              id="txtName"
              name="txtName"
              placeholder="Nhập tên vòng quay"
              autoComplete="off"
              //   value={txtName}
              //   onChange={this.onChange}
            />
          </div>
          <div className="form-group gameSpinWheel__item">
            <label for="txtName">Số lượt quay trong ngày</label>
            <input
              type="text"
              className="form-control input-sm"
              id="txtName"
              name="txtName"
              placeholder="Nhập tên vòng quay"
              autoComplete="off"
              //   value={txtName}
              //   onChange={this.onChange}
            />
          </div>
          <div className="form-group gameSpinWheel__item"></div>
          <div className="form-group gameSpinWheel__item"></div>
        </div>
      </div>
    );
  }
}

export default ActionsGameSpinWheelContent;
