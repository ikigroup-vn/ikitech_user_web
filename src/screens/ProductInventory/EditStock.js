import React, { Component } from 'react'
import { formatNumber } from '../../ultis/helpers'
import { shallowEqual } from '../../ultis/shallowEqual'

class EditStock extends Component {
    constructor(props){
        super(props)
        this.state ={
            cost_of_capital:"",
            quantity_in_stock:"",
            nameElement:"",
            nameSubElement:"",
            idProduct:"",
            NameDistribute:""
        }
    }
    onChange = (e) =>{
        var value = e.target.value
        var name = e.target.name
        const _value = formatNumber(value) 
        if (!isNaN(Number(_value))) {
            if (e.target.value === "") {
              this.setState({ [name]: "" });
            }
            else {
              this.setState({ [name]: value });
    
            }
          }
        
    }

    handleEditStock = () =>{
        const formdata = {
            product_id: this.state.idProduct,
            stock: this.state.quantity_in_stock,
            cost_of_capital: this.state.cost_of_capital,
            distribute_name:this.state.NameDistribute,
            element_distribute_name:this.state.nameElement,
            sub_element_distribute_name:this.state.nameSubElement
        }
        this.props.editStockCallBack(formdata)
        
    }

    componentWillReceiveProps(nextProps,nextState) {
        if (
          (!shallowEqual(nextProps.modalSub, this.props.modalSub) )
        ) {
          this.setState({
            cost_of_capital: nextProps.modalSub.SubElement.cost_of_capital,
            quantity_in_stock:nextProps.modalSub.SubElement.stock,
            nameElement:nextProps.modalSub.NameElement,
            nameSubElement:nextProps.modalSub.SubElement.name,
            NameDistribute:nextProps.modalSub.NameDistribute,
            idProduct:nextProps.modalSub.idProduct,
          })
        }
        if(!shallowEqual(nextProps.modalElement, this.props.modalElement)){
            this.setState({
                cost_of_capital: nextProps.modalElement.element.cost_of_capital,
                quantity_in_stock:nextProps.modalElement.element.stock,
                NameDistribute:nextProps.modalElement.NameDistribute,
                idProduct:nextProps.modalElement.idProduct,
                nameSubElement:"",
                nameElement:nextProps.modalElement.element.name,
            })
        }

      }

    render() {
        const {cost_of_capital,quantity_in_stock} = this.state
        return (
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-body">
                            <h4>Thông tin kho</h4>
                            <div class="form-group">
                                <label for="product_name">Giá vốn</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="customer_copyright"
                                    autocomplete="off"
                                    onChange={this.onChange}
                                    value ={cost_of_capital}
                                    name="cost_of_capital"
                                />
                            </div>
                            <div class="form-group">
                                <label for="product_name">Tồn kho</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="customer_copyright"
                                    autocomplete="off"
                                    onChange={this.onChange}
                                    value ={quantity_in_stock}
                                    name="quantity_in_stock"
                                />
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" onClick={() =>this.handleEditStock()}  data-dismiss="modal"  data-toggle="modal" data-target="#ModalAlert">Lưu</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" >Đóng</button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default EditStock
