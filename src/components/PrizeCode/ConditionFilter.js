import { Component } from "react";
import styled from "styled-components";
import * as Types from "../../constants/ActionType";
import { expressions } from "../../ultis/groupCustomer/expressions";
import { genders } from "../../ultis/groupCustomer/genders";
import moment from "moment";
import { AsyncPaginate } from "react-select-async-paginate";
import * as productAction from "../../data/remote/product";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";

const ConditionFilterStyles = styled.div`
  display: flex;
  column-gap: 20px;
  max-height: 38px;

  .sidebar__conditions__dropdown__expression {
    height: 100%;
    width: 80px;
    flex-shrink: 0;
    select {
      border: 1px solid transparent;
      border-bottom-color: #d1d3e2;
      padding: 0.375rem 0.75rem;
      width: 100%;
      outline: none;
      height: 38px;
      cursor: pointer;
    }
  }
  .sidebar__conditions__dropdown__value {
    width: 200px;
    & > div {
      display: flex;
      border: 1px solid transparent;
      border-bottom-color: #d1d3e2;
      padding: 0.375rem 0.75rem;
      height: 38px;

      input {
        width: 100%;
        text-align: right;
      }
      .sidebar__conditions__dropdown__input__number,
      .sidebar__conditions__dropdown__date {
        text-align: left;
      }
      .sidebar__conditions__dropdown__collab {
        background-color: transparent;
        text-align: left;
      }
    }
    select {
      width: 100%;
      border: 1px solid transparent;
      border-bottom-color: #d1d3e2;
      padding: 0.375rem 0.75rem;
      height: 38px;
      outline: none;
    }
  }

  .async-select {
    align-items: center;
  }
`;

class ConditionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: null,
    };
  }

  loadProducts = async (search, loadedOptions, { page }) => {
    console.log("111");
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var { store_code } = this.props;
    const params = `&search=${search}`;
    const res = await productAction.fetchAllProductV2(
      store_code,
      branchIds,
      page,
      params
    );
    console.log("res", res);
    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }

    return {
      options: res.data.data.data.map((i) => {
        return { value: i.id, label: `${i.name}`, product: i };
      }),

      hasMore: res.data.data.data.length == 20,
      additional: {
        page: page + 1,
      },
    };
  };

  render() {
    const { indexOption, province, optionsFilter } = this.props;
    return (
      <ConditionFilterStyles className="sidebar__conditions__dropdown__content">
        <div className="sidebar__conditions__dropdown__expression">
          <select
            className="sidebar__conditions__dropdown__select"
            name="comparison_expression"
            onChange={(e) =>
              this.props.handleChangeInputFilterSearch(e, indexOption)
            }
            value={optionsFilter[indexOption].comparison_expression}
            disabled={
              Number(optionsFilter[indexOption].type_compare) === 0 ||
              Number(optionsFilter[indexOption].type_compare) === 2 ||
              Number(optionsFilter[indexOption].type_compare) === 3
            }
            style={{
              opacity:
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_SEX ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_PROVINCE ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_CTV ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_CUSTOMER_NORMAL ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_AGENCY
                  ? "0.6"
                  : "1",
            }}
          >
            {expressions.length > 0 &&
              expressions.map((expression) => (
                <option key={expression.id} value={expression.value}>
                  {expression.value}
                </option>
              ))}
          </select>
        </div>
        <div className="sidebar__conditions__dropdown__value">
          {Number(optionsFilter[indexOption].type_compare) === 0 ? (
            <select
              className="sidebar__conditions__dropdown__select"
              value={optionsFilter[indexOption].value_compare}
              name="value_compare"
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              <option value="0">Mã trắng</option>
              <option value="1">Đã nhập</option>
              <option value="2">Đã trúng</option>
            </select>
          ) : Number(optionsFilter[indexOption].type_compare) ===
            Types.TYPE_COMPARE_PROVINCE ? (
            <select
              className="sidebar__conditions__dropdown__select"
              value={optionsFilter[indexOption].value_compare}
              name="value_compare"
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              {province.length > 0 &&
                province.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
            </select>
          ) : Number(optionsFilter[indexOption].type_compare) === 1 ? (
            <div>
              <input
                type="date"
                className="sidebar__conditions__dropdown__input sidebar__conditions__dropdown__date"
                autoComplete="off"
                value={optionsFilter[indexOption].value_compare}
                onChange={(e) =>
                  this.props.handleChangeInputFilterSearch(e, indexOption)
                }
                name="value_compare"
                max={moment().format("YYYY-MM-DD")}
              />
            </div>
          ) : Number(optionsFilter[indexOption].type_compare) === 3 ? (
            <select
              className="sidebar__conditions__dropdown__select"
              value={optionsFilter[indexOption].value_compare}
              name="value_compare"
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              {province.length > 0 &&
                province.map((province, index) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
            </select>
          ) : (
            <>
              <AsyncPaginate
                placeholder="Tìm sản phẩm"
                className="async-select"
                value={this.state.selectedProduct}
                loadOptions={this.loadProducts}
                name="value_compare"
                onChange={(e) => {
                  this.setState({ selectedProduct: e });
                  this.props.handleChangeInputFilterSearch(
                    {
                      target: {
                        name: "value_compare",
                        value: e.value,
                      },
                    },
                    indexOption
                  );
                }}
                additional={{
                  page: 1,
                }}
                debounceTimeout={500}
                isClearable
                isSearchable
                styles={{
                  
                }}
              />
            </>
          )}
        </div>
      </ConditionFilterStyles>
    );
  }
}

export default ConditionFilter;
