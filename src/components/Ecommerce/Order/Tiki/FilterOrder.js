import React, { Component } from "react";
import { ecommerceStatus } from "../../../../ultis/ecommerce";
import Select from "react-select";
class FilterOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleShowStatus = (listStatus) => {
    const { listStore, listStoreSelected, onChangeStore } = this.props;
    return (
      <div className="card-header">
        <div
          class="row"
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginRight: "15px",
            marginLeft: "15px",
          }}
        >
          <Select
            options={listStore}
            placeholder={"Chọn cửa hàng"}
            value={listStoreSelected}
            onChange={onChangeStore}
            isMulti={true}
            noOptionsMessage={() => "Không tìm thấy kết quả"}
          ></Select>
          {/* <Select
            options={listStore}
            placeholder={"Trạng thái thanh toán"}
            value={listStoreSelected}
            onChange={onChangeStore}
            isMulti={true}
            noOptionsMessage={() => "Không tìm thấy kết quả"}
          ></Select> */}
        </div>
      </div>
    );
  };
  showAllStatus = (listStatus) => {
    const allStatusChild = listStatus.reduce(
      (prevListStatus, currentListStatus) => {
        return [...prevListStatus, ...currentListStatus?.data_children];
      },
      []
    );
    return allStatusChild?.length > 0
      ? allStatusChild.map((statusChild) => ({
          value: statusChild.status,
          label: statusChild.name,
        }))
      : [];
  };

  render() {
    const ecommerceStatusFilter = ecommerceStatus.filter(
      (ecommerceS) =>
        ecommerceS?.name?.toLowerCase() == this.props.isCheckedEcommerce()
    );

    return (
      <div>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              class="nav-item nav-link active"
              id="nav-filter-tab"
              data-toggle="tab"
              href="#nav-filter"
              role="tab"
              aria-controls="nav-filter"
              aria-selected="true"
            >
              Bộ lọc
            </a>
            {ecommerceStatusFilter?.length > 0 &&
              ecommerceStatusFilter[0].data.map((status) => (
                <a
                  key={status.key}
                  className="nav-item nav-link"
                  id={`nav-${status.key}-tab`}
                  data-toggle="tab"
                  href={`#nav-${status.key}`}
                  role="tab"
                  aria-controls={`nav-${status.key}`}
                  aria-selected="false"
                >
                  {status.name}
                </a>
              ))}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id={`nav-filter`}
            role="tabpanel"
            aria-labelledby={`nav-filter-tab`}
          >
            {ecommerceStatusFilter?.length > 0 &&
              this.handleShowStatus(
                this.showAllStatus(ecommerceStatusFilter[0].data)
              )}
          </div>
          {ecommerceStatusFilter?.length > 0 &&
            ecommerceStatusFilter[0].data.map((status) => (
              <div
                key={status.key}
                className="tab-pane fade"
                id={`nav-${status.key}`}
                role="tabpanel"
                aria-labelledby={`nav-${status.key}-tab`}
              >
                {this.handleShowStatus(
                  status.data_children?.map((item) => ({
                    value: item.status,
                    label: item.name,
                  }))
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default FilterOrder;
