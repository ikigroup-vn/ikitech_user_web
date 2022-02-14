import React, { Component } from "react";
import * as helper from "../../../ultis/helpers";
import ModalCreate from "./Attribute/ModalCreate";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import * as productAction from "../../../actions/product";
import {shallowEqual} from "../../../ultis/shallowEqual";

class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_attribute: {

      },
    };
  }

  onChange = (e, data) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    var attribute = {...this.state.list_attribute};
    attribute[data] = {
      name : data,
      [name] : value
    }

    this.setState({ list_attribute: attribute });
  };

  destroyAttributeP = (e, name) => {
    var data = [...this.props.attributeP];
    if (data.length > 0) {
      data.forEach(function (element, index) {
        if (element == name) {
          return data.splice(index, 1);
        }
      });
      var list_attribute = { ...this.state.list_attribute };
      this.props.destroyAttributeP(
        { _this: this, list_attribute: list_attribute, name: name },
        this.props.store_code,
        {
          list: data,
        }
      );
    }
  };

  componentWillReceiveProps(nextProps)
  {
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var  {product}  = nextProps;

      var list_attribute = {...this.state.list_attribute}
      if(product.attributes.length > 0)
      {
        product.attributes.forEach(attribute => {

          list_attribute[attribute.name] = {
            name : attribute.name,
            ["txt"+attribute.name] : attribute.value
          }

        });
      }
      this.setState({ list_attribute: list_attribute });
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextState,  this.state)
    if(!shallowEqual(nextState.list_attribute , this.state.list_attribute))
    {
     this.props.handleDataFromAttribute(nextState)
    }

    return true
  }
  
  showData = (attribute) => {
    if(typeof attribute == "undefined")
    {
      return null
    }
    var result = null;
    if (attribute.length > 0) {
      var {isRemove} = this.props 

      result = attribute.map((data, index) => {
       var value = typeof this.state.list_attribute[data] == "undefined" ? '' :  this.state.list_attribute[data][`txt`+data]
        return (
          <tr>
            <td>{index + 1}</td>
            <td>
              <h5>
                <span class={`badge badge-success`}>{data}</span>
              </h5>
            </td>
            <td>
              <input
                type="text"
                autocomplete="off"
                name={`txt`+data}
                value={value}
                onChange={(e) => this.onChange(e, data)}
                id="input"
                class="form-control"
                required="required"
                pattern=""
                title=""
                ref = "asd"
              />
            </td>
            <td>
              <button
                onClick={(e) => this.destroyAttributeP(e, data)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${typeof isRemove == "undefined" || isRemove == false ? "hide" : ""}`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {

    var { attributeP, store_code , isCreate , isRemove } = this.props;
    
    return (
      <div class="table-responsive">
        <Alert
          type={Types.ALERT_UID_STATUS}
          alert={this.props.alert}
        />
        <table
          class="table table-striped table-border"
          style={{ color: "black" }}
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên thuộc tính</th>
              <th>Giá trị</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showData(attributeP)}</tbody>
        </table>
        <button
          data-toggle="modal"
          data-target="#modalCreateA"
          type="button"
          class={`btn btn-info btn-sm ${typeof isCreate == "undefined" || isCreate == false ? "hide" : ""}`}
          >
          <i class="fa fa-plus"></i>
          Thêm thuộc tính
        </button>
        <ModalCreate store_code={store_code} attribute={attributeP} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.attributePReducers.alert.alert_update,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    destroyAttributeP: ($this, store_code, attribute) => {
      dispatch(productAction.destroyAttributeP($this, store_code, attribute));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
