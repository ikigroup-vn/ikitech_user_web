import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import Loading from "../Loading";
import * as Env from "../../ultis/default";
import NotAccess from "../../components/Partials/NotAccess";
import ModalCreate from "../../components/Customer/ModalCreate"
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import ModalEdit from "../../components/Customer/ModalEdit"
import './barcode_style.css'
import ReactToPrint from 'react-to-print';
import BarcodePagePrint from "./ComponentPrint/BarcodePagePrint";
class PrintBarcode extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {

  }


  getComponentRef = (ref) => {
    return <BarcodePagePrint ref={ref} />
  }


  buildListPrintOption = () => {

    var data = [
      {
        name: (<div>Mẫu giấy <b>180</b> </div>),
        size: "Khổ A4 - 20x15mm.",
        isA4: true,
        widthPrint: 210,
        heightPrint: 297,
        column: 10,
        row: 18,
        image: "https://i.imgur.com/y4nAwHP.png",
        componentRef: this.componentRef1,
      },
      {
        name: "Mẫu giấy 65 nhãn",
        size: "Khổ A4, Tomy 145 - 210x297mm.",
        isA4: true,
        widthPrint: 210,
        heightPrint: 297,
        column: 5,
        row: 13,
        image: "https://i.imgur.com/6Ynu3zS.png",
        componentRef: this.componentRef2,
      },
      {
        name: "Mẫu giấy 30 nhãn",
        size: "Khổ A4, Tomy 144 - 67x28mm.",
        isA4: true,
        widthPrint: 210,
        heightPrint: 297,
        column: 3,
        row: 10,
        image: "https://i.imgur.com/QpScjup.png",
        componentRef: this.componentRef3,
      },
      {
        name: "Mẫu giấy cuộn 3 nhãn",
        size: "Khổ 105x22mm.",
        isA4: false,
        widthPrint: 105,
        heightPrint: 22,
        column: 3,
        row: 1,
        image: "https://i.imgur.com/oJ0xP6m.png",
        componentRef: this.componentRef4,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn",
        size: "Khổ 70x22mm.",
        isA4: false,
        widthPrint: 70,
        heightPrint: 22,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/UlmovmM.png",
        componentRef: this.componentRef5,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn",
        size: "Khổ 77x22mm.",
        isA4: false,
        widthPrint: 77,
        heightPrint: 22,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/xFMDfuP.png",
        componentRef: this.componentRef6,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn",
        size: "Khổ 50x40mm.",
        isA4: false,
        widthPrint: 50,
        heightPrint: 40,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn",
        size: "Khổ 30x20mm.",
        isA4: false,
        widthPrint: 30,
        heightPrint: 20,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 1 nhãn",
        size: "Khổ 40x25mm.",
        isA4: false,
        widthPrint: 40,
        heightPrint: 25,
        column: 1,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 1 nhãn",
        size: "Khổ 40x30mm.",
        isA4: false,
        widthPrint: 40,
        heightPrint: 30,
        column: 1,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 1 nhãn",
        size: "Khổ 50x30mm.",
        isA4: false,
        widthPrint: 50,
        heightPrint: 30,
        column: 1,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu tem trang sức / kính mắt",
        size: "Khổ 80x10mm.",
        isA4: false,
        widthPrint: 80,
        heightPrint: 10,
        column: 1,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
    ]


    return data.map((item) =>
      <div className="col-6">
        <div class="card-body" style={{
          border: "1px solid rgba(0,0,0,.125)",
          borderRadius: "0.25rem",
          textAlign: "center",
          marginTop: 1,
          marginRight: 1,
          marginBottom: 2,
          padding: "10px 2px 10px 2px",
        }}>
          <div style={{
            fontSize: 12
          }}>{item.name} </div>
          <div style={{
            fontStyle: "italic",
            fontSize: 12
          }}>- {item.size}</div>
          <img height={80} src={item.image} class="image-option-print"></img>
          <ReactToPrint
            trigger={() => {
              return <button style={{
                marginTop: 8,
                textAlign: "center"
              }} type="button" class="btn btn-outline-primary"><i class="fa fa-print" aria-hidden="true"></i> In</button>
            }}
            content={() => item.componentRef}
          />

          <div style={{ display: "none" }} >
            {

              <BarcodePagePrint
                key={item.name}
                isA4={item.isA4}
                count={180}
                ref={el => (item.componentRef = el)}
                widthPrint={item.widthPrint}
                heightPrint={item.heightPrint}
                column={item.column}
                row={item.row}
              />

            }

          </div>

        </div>  </div>
    )
  }

  render() {
    var { store_code } = this.props;


    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />

        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              <div className="container-fluid">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    In mã vạch
                  </h4>{" "}
                  {getChannel() == "IKIPOS" && <a
                    data-toggle="modal"
                    data-target="#modalCreateCustomer"
                    class="btn btn-info btn-icon-split btn-sm"
                    style={{ height: "fit-content", width: "fit-content" }}
                  >
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span
                      style={{
                        color: "white",
                      }}
                      class={`text `}
                    >
                      Thêm khách hàng
                    </span>
                  </a>}
                </div>

                <br></br>


                <div className="row">

                  <div className="card shadow mb-4 col-lg-8 col-md-12 col-sm-12">
                    <div className="card-header py-3"><h6 className="m-0 title_content font-weight-bold text-primary">Sản phẩm tự chọn</h6></div>


                  </div>


                  <div className="col-lg-4 col-md-12 col-sm-12">

                    <div className="card shadow mb-4 ">
                      <div className="card-header py-3"><h6 className="m-0 title_content font-weight-bold text-primary">Cấu hình tem in</h6></div>

                      <div className="card-body">
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="switch1" disabled name="example" checked={this.state.is_use_points} onChange={this.handChangeCheckbox} />
                          <label class="custom-control-label" for="switch1">Mã barcode</label>
                        </div>
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="switch1" name="example" checked={this.state.is_use_points} onChange={this.handChangeCheckbox} />
                          <label class="custom-control-label" for="switch1">Tên sản phẩm</label>
                        </div>
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="switch1" name="example" checked={this.state.is_use_points} onChange={this.handChangeCheckbox} />
                          <label class="custom-control-label" for="switch1">Giá bán</label>
                        </div>
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="switch1" name="example" checked={this.state.is_use_points} onChange={this.handChangeCheckbox} />
                          <label class="custom-control-label" for="switch1">Khổ rộng</label>
                        </div>


                        <div className="barcode-wrap">
                          <Barcode
                            fontSize={10}
                            width={0.7}
                            textMargin={2}
                            height={52}
                            text="dsadasd"
                            textPosition={"top"}
                            displayValue={true}
                            value="http://github.com/kciter" />

                        </div>


                      </div>

                    </div>


                    <div className="card shadow mb-4 ">
                      <div className="card-header py-3"><h6 className="m-0 title_content font-weight-bold text-primary">Chọn khổ giấy và in</h6></div>


                      <div className="row">
                        {this.buildListPrintOption()}
                      </div>

                    </div>

                  </div>


                </div>




              </div>
              ) : (
              <NotAccess />
              )
            </div>

            <Footer />
          </div>

        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {


  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintBarcode);
