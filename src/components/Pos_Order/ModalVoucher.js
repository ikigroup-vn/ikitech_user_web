import React, { Component } from 'react'
import { formatNoD, format } from '../../ultis/helpers'
import themeData from '../../ultis/theme_data';
class ModalVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discountType: "",
            code: "",

        }
    }
    handleOnclicks(code) {
        this.props.handleCallbackVoucherInput(code)
    }
    componentDidMount() {
        var discountType = this.props.listVoucher.discount_type
        discountType == 0 ? this.setState({ discountType: "đ" }) : this.setState({ discountType: "%" })
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = e.target.value;
        this.setState({ [name]: value });
    };

    handleChooseVoucher = () => {
        this.props.handleCallbackVoucherInput(this.state.code)
    }

    buildItemsProduct = (voucher) => {
        var pros = "";

        voucher.products.forEach(element => {
            pros += element.name + ","
        });

        if (pros.length > 0) {
            pros = pros.substring(0, pros.length - 1);
        }


        return pros
    }
    render() {
        var { listVoucher } = this.props

        return (
            <div>
                <div class="modal" id="modalVoucher">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chọn Voucher</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group" style={{ padding: "5px", display: "flex", justifyContent: "space-between" }}>
                                    <input
                                        style={{ width: "85%" }}
                                        type="text"
                                        name="code"
                                        value={this.state.code}
                                        onChange={this.onChange}
                                        class="form-control"
                                        placeholder="Nhập mã voucher"
                                    />
                                    <button class="btn btn-info" onClick={() => this.handleChooseVoucher()}
                                        data-dismiss="modal"
                                        style={
                                            {
                                                backgroundColor: this.state.code.length == 0 ?
                                                "grey" : themeData().backgroundColor
                                            }}>Áp dụng</button>
                                </div>

                                {listVoucher.map((item, index) => (
                                    <div className='row' class="voucher-pos-item" id="parent-button-voucher">

                                        <div className='col-12'>
                                            <div className='model-card row' key={index}>

                                                <div className='name-voucher col-3' style={{ width: "120px", height: "120px", padding: "8px" }}>
                                                    <div style={{
                                                        backgroundColor: themeData().backgroundColor,
                                                        color: "white",
                                                        justifyContent: "center",
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "0.25em",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexDirection: "column"
                                                    }}>
                                                        <div className='code' style={{ textAlign: "center" }}><span>{`Mã: ${item.code}`}</span></div>
                                                        <div className='value' style={{ textAlign: 'center' }}>{
                                                        `Giảm
                                                        ${item.discount_for != 1 ? (
                                                            item.discount_type === 0 ? format(Number(item.value_discount)) : item.value_discount + "%"
                                                          ) : ( item.is_free_ship === true ? "Miễn phí vận chuyển" :format(Number(item.ship_discount_value)) )}
                                                         `
                                                         }</div>

                                                    </div>
                                                </div>
                                                <div className='info-voucher col-6' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                                    <div>
                                                        <div className='name' style={{ fontWeight: "bold", paddingTop: 5, paddingBottom: 5 }}><span>{item.name}</span></div>

                                                        {item.voucher_type == 0 &&
                                                            <div className='apply'><span>Giảm giá áp dụng cho toàn bộ sản phẩm </span></div>
                                                        }
                                                        {item.voucher_type == 1 &&
                                                            <div className='apply'><span>Giảm giá áp dụng các sản phẩm: {this.buildItemsProduct(item)} </span></div>
                                                        }


                                                        {
                                                            <div className='apply'><span>{`Cho đơn hàng từ  ${format(Number(item.value_limit_total))}`}</span></div>
                                                        }
                                                        <div className='apply'><span style={{
                                                            color: themeData().backgroundColor
                                                        }}>{`Số lượng còn lại: ${formatNoD(Number(item.amount - item.used))}`}</span></div>
                                                    </div>
                                                    <div>
                                                        <div className='date-voucher'>HSD: {item.end_time}</div>
                                                    </div>
                                                </div>

                                                <div className='voucher-button-wrap'>
                                                    <button class="btn btn-info voucher-yes-pos" onClick={() => this.handleOnclicks(item.code)}
                                                        data-dismiss="modal"
                                                        style={{
                                                            backgroundColor: themeData().backgroundColor
                                                        }}>Sử dụng</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModalVoucher;