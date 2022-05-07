import React, { Component } from "react";
import Barcode from "react-barcode";
import { shallowEqual } from "../../../ultis/shallowEqual";
import './Barcode7272.css'
class BarcodePagePrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

        if (!shallowEqual(nextProps.products, this.props.products)) {
            this.setState({
                products: nextProps.products
            })
        }

    }

    getPageMargins = () => {
        return `@page { margin: ${0} ${0} ${0} ${0} !important;padding: ${0} ${0} ${0} ${0} !important; }`;
    };


    getPrintStyle = () => {
        return `@print @media print { html, body {  overflow: initial !important; }} `;
    };

    getDatasProducts = () => {
        var arr = []
        var products = this.state.products


        products.forEach(pro => {
  
            for (var i = 0; i < pro.quantity; i++) {
                arr.push(pro);
            }

        });

        return arr;

    }
    buildItemsTable = () => {
        const { widthPrint, heightPrint, column, row } = this.props

        var arrColumn = new Array(column ?? 1).fill(0);
        var arrRow = new Array(row ?? 1).fill(0);

        var arrPro = this.getDatasProducts();

    
        return arrRow.map((row2,indexRow) => {
            return <tr>
                {
                    arrColumn.map((col2, indexCol) => {

                        var index = column * indexRow + indexCol;
                    
                        var product = arrPro[index]
                        return <td>
                            <div style={{
                                fontSize:11
                            }}>{product?.name}</div>
                            <Barcode
                                fontSize={0}
                                width={0.5}
                                textMargin={0}
                                height={15}
                                textPosition={"top"}
                                displayValue={false}
                                value={product?.barcode} />
                            <div style={{
                                fontSize:11
                            }}>{product?.price}</div>
                        </td>

                    })
                }

            </tr>

        })

    }



    render() {
        const { widthPrint, heightPrint, isA4 } = this.props

        return <div style={{

        }}>

            <style type="text/css" media="print">{`

       @page { size: ${widthPrint}mm ${heightPrint}mm; }
       @media print { html, body {  overflow: initial !important; }}
       
       `}</style>

            <style>{this.getPageMargins()}</style>

            {/* <div style={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                {this.buidItems()}

            </div>  */}
            <table style={{
                tableLayout: "fixed",
                width: "100%",
                height: "100%"
            }}>
                {this.buildItemsTable()}
            </table>

        </div>
    }
}

export default BarcodePagePrint;
