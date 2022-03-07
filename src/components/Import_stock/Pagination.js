import React, { Component } from "react";
import { connect } from "react-redux";
import * as ImportAction from "../../actions/import_stock"
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 1
    }
  }

  passPagination = (page) => {
    const branch_id = localStorage.getItem("branch_id")
    this.props.fetchAllImportStock(this.props.store_code,branch_id , page)    
}



  showData = (links) => {
    var result = null;
    var url = null
    if(typeof links == "undefined")
    {
      return result
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active" : null;
        var label = (data.label.includes("&laquo; ") || data.label.includes(" &raquo;")) 
        ? data.label.replace("&laquo; Previous", "Trước").replace("Next &raquo;", "Sau")
        : data.label
        if(data.url == null)
        {
          return (
            <li class={`page-item ${active} `}><a class="page-link">{label}</a></li>
          );
        }
        else{
     
          return (
            <li class={`page-item ${active} `}><a onClick = {()=> this.passPagination(data.url.split('?page=')[1])} class="page-link">{label}</a></li>
          );
        }
     
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    return (
        
   
<nav aria-label="Page navigation" className="float-pagination">
  <ul class="pagination  tab-pagination pg-blue">
    {this.showData(this.props.listImportStock.links)}
  </ul>
</nav>
        
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {

    fetchAllImportStock: (store_code,branch_id , page) => {
      dispatch(ImportAction.fetchAllImportStock(store_code,branch_id , page));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);