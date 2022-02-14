import React, { Component } from "react";
import { connect } from "react-redux";

import * as auth from "../../../actions/auth";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    this.props.forgot(this.state);
  };

  render() {
    var { txtPhone } = this.state;
    var { products } = this.props;
    console.log(products);
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Nhập số điện thoại hoặc Email"
              autocomplete="off"
              name="txtPhone"
              value={txtPhone}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-user btn-block">
            Tiếp tục
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    forgot: ($form) => {
      dispatch(auth.forgot($form));
    },
  };
};
export default connect(null, mapDispatchToProps)(Form);
