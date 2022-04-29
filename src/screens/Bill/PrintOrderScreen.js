import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as billAction from "../../actions/bill";
import { shallowEqual } from "../../ultis/shallowEqual";
import ComponentA6Bill from "./ComponentA6Bill";
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';
import history from "../../history";
// import './bill.css'

class PrintOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: "show",
            isShow: false,
        }
    }
    componentDidMount() {
        var { store_code, order_code, billId } = this.props.match.params
        this.props.fetchBillId(store_code, order_code);



        window.addEventListener('afterprint', event => {
            //    var =  defaultHrefBack

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            if (params.defaultHrefBack) {
                var link = atob(params.defaultHrefBack)
                console.log("link", link)
                history.push(link)
            }

        });

    }


    shouldComponentUpdate(nextProps, nextState) {

        // if (!shallowEqual(nextProps.bill, this.props.bill)) {


        //     if (nextProps.bill.order_code != null && nextProps.bill.order_code != "" && this.state.isShow == true) {
        //         this.onPrint();
        //     }

        // }

        if (!shallowEqual(this.state.isShow, nextState.isShow) && nextState.isShow == true) {
            this.printIframe("receipt")
        }

        if (this.state.isLoading != true) {
            this.setState({ isLoading: true })
        }

        return true
    }

    goBack = () => {
        var { history } = this.props;
        history.goBack();
    };

    onPrint = () => {
        window.print();
    }
     printIframe = (id) => {
        console.log(id)
        const iframe = document.frames
            ? document.frames[id]
            : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();

        return false;
    };
    render() {

        var { store_code, order_code, billId } = this.props.match.params
        var { bill, stores, currentBranch, badges } = this.props

        if (bill == null || bill.order_code == null) {
            return <Loading />;
        }


        if (this.state.isShow == false) {
            this.setState({
                isShow: true
            })
        }



        return <div>
         
            <iframe
                id="receipt"
                src="https://dev.doapp.vn/api/store/print/bill/290422W2ABAFIL"
                // style={{ display: 'none' }}
                title="Receipt"
                style={{
                    position: "fixed",
                    top: 0, left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    margin: 0, padding: 0,
                    overflow: "hidden",
                    zIndex: 0,
                }}
            />
        </div>

        return (
            <div>
                {/* <ReactToPrint
                    trigger={() => {

                        return <button type="button" class="btn btn-danger  btn-sm"><i class="fas fa-print"></i>&nbsp;In hóa đơn</button>;
                    }}
                    content={() => this.componentRef}
                /> */}


                <ComponentA6Bill
                    bill={bill}
                    ref={el => (this.componentRef = el)}
                />
            </div>

        );

    }
}

const mapStateToProps = (state) => {
    return {
        badges: state.badgeReducers.allBadge,
        bill: state.billReducers.bill.billID,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchBillId: (store_code, billId) => {
            dispatch(billAction.fetchBillId(store_code, billId));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintOrderScreen);
