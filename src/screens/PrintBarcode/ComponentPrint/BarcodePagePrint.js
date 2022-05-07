import React, { Component } from "react";
import Barcode from "react-barcode";
import './Barcode7272.css'
class BarcodePagePrint extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    getPageMargins = () => {
        return `@page { margin: ${0} ${0} ${0} ${0} !important;padding: ${0} ${0} ${0} ${0} !important; }`;
    };


    getPrintStyle = () => {
        return `@print @media print { html, body {  overflow: initial !important; }} `;
      };

    buidItems = () => {

        var arr = new Array(this.props.count ?? 1).fill(0);

        var withItem = 20;
        var heightItem = 15;
        const { widthPrint, heightPrint, column, row } = this.props

        return arr.map((index) =>
            <div style={{
                width: (500 ) ,
                height: (500) ,
                padding: 0,
                margin: 0
            }}>
                <Barcode
                    fontSize={10}
                    width={0.5}
                    textMargin={0}
                    height={15}

                    textPosition={"top"}
                    displayValue={true}
                    value="1234455677866778" />
            </div>
        );
    }


  

    render() {
        const { widthPrint, heightPrint, isA4 } = this.props

        return <div style={{
        
        }}>
       <style type="text/css" media="print">{`@page { size: ${widthPrint}mm ${heightPrint}mm; }`}</style>
       <style type="text/css" media="print">{`@media print { html, body {  overflow: initial !important; }}`}</style>

            <style>{this.getPageMargins()}</style>
     
            <div style={{
             
               
     

            }}>
                {this.buidItems()}

            </div>   </div>
    }
}

export default BarcodePagePrint;
