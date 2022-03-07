import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as OrderAction from '../../actions/add_order';

class ModalSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPersion: ""
        }
    }
    handleOnclicks = (namePertion, phone, id) => {
        this.props.handleCallbackSupplier({ name: namePertion, phone_number: phone,id_supplier:id })
    }
    onChangeSearchPersion = (e) => {
        this.setState({ searchPersion: e.target.value })
    }
    handleSearchPersion = (e) => {
        e.preventDefault()
        var { store_code } = this.props
        var { searchPersion } = this.state
        var params = `search=${searchPersion}`
        this.props.fetchSearchPersion(store_code, params);
    };
    render() {
        var { supplier } = this.props

        return (
            <div>
                <div class="modal" id="supplier">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Danh sách nhà cung cấp</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="input-group mb-6" style={{ marginTop: "10px", paddingLeft: "20px" }}>
                                <form onSubmit={this.handleSearchPersion}>
                                    <div
                                        class="input-group mb-6"
                                        style={{ marginTop: "10px" }}
                                    >
                                        <input

                                            type="search"
                                            name="txtSearch"
                                            value={this.state.searchPersion}
                                            onChange={this.onChangeSearchPersion}
                                            class="form-control"
                                            placeholder="Nhập tên nhà cung cấp"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="btn btn-primary"
                                                type="submit"

                                            >
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div class="modal-body">
                                {(supplier.data ?? []).map((item, index) => (
                                    <div className='model-card row' key={index} style={{ borderRadios: "0.25em", border: "dashed 2px red", position: "relative", margin: "5px" }}>
                                        <button class="btn btn-info" onClick={() => this.handleOnclicks(item.name, item.phone, item.id)} data-dismiss="modal" style={{ backgroundColor: "green", position: "absolute", right: "3px", top: "3px", zIndex: "100" }}>Chọn</button>
                                        <div className='col-6'>
                                            <span style={{ fontWeight: "bold" }}>Tên</span>
                                            <div className='name-pertion'>{item.name}</div>
                                        </div>
                                        <div className='col-6'>
                                            <span style={{ fontWeight: "bold" }}>SDT</span>
                                            <div className='phone-pertion'>{item.phone}</div>
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
const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}
export default connect(null, mapDispatchToProps)(ModalSupplier);