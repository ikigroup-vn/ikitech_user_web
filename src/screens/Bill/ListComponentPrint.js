import React, { Component } from "react";

import ComponentToPrint from "./ComponentToPrint";
export default class ListComponentToPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        var { badges, bills, store_code, stores, currentBranch } = this.props
        console.log(bills);
        return (
            <div >
                {bills.length > 0 && bills.map((bill,index) => {
                    return (
                        <React.Fragment>
                        <ComponentToPrint
                            badges={badges}
                            bill={bill}
                            store_code={store_code}
                            stores={stores}
                            currentBranch={this.props.currentBranch}
                        />
                        {
                            index < bills.length -1 && (
                                <div className = "page-break"></div>
                            )
                        }
                        </React.Fragment>

                    )
                })}

            </div>
        );
    }
}
