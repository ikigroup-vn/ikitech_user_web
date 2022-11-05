import { Component } from "react";
import styled from "styled-components";
import { options } from "../../ultis/groupCustomer/options";
import themeData from "../../ultis/theme_data";
import SidebarFilter from "../Partials/SidebarFilter";
import ConditionFilterCustomer from "./ConditionFilterCustomer";
import * as Types from "../../constants/ActionType";
import { expressions } from "../../ultis/groupCustomer/expressions";
import { genders } from "../../ultis/groupCustomer/genders";
import moment from "moment";
import { formatNumberV2 } from "../../ultis/helpers";

const SidebarFilterCustomerStyles = styled.div`
  .sidebar__conditions__item {
    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span:first-child {
        cursor: pointer;
        color: #2d3436;
        font-weight: 600;
      }
      span:last-child {
        i {
          transition: all 0.3s;
        }
      }
    }
    &:hover .sidebar__conditions__item__btnDelete {
      visibility: visible;
      opacity: 1;
    }
    .sidebar__conditions__item__btnDelete {
      transition: all 0.3s;
      visibility: hidden;
      opacity: 0;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
    .sidebar__conditions__item__type {
      display: flex;
      align-items: center;
      column-gap: 10px;
      .sidebar__conditions__item__btnDelete {
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
    .sidebar__conditions__dropdown {
      transition: max-height 0.5s linear;
      margin: 5px 0 15px;
    }
  }
  .sidebar__conditions__add {
    position: relative;
    display: inline-block;
    margin-top: 10px;
    & > div {
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid rgb(218, 218, 225);
      color: #2d3436;
      cursor: pointer;
      span {
        transition: all 0.5s;
        &:hover {
          color: rgb(127, 140, 141);
        }
      }
    }
    .sidebar__conditions__add_dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      width: max-content;
      min-width: 154px;
      padding: 12px 0;
      border-radius: 6px;
      border: 1px solid rgb(218, 218, 225);
      color: #2d3436;
      background-color: white;
      .sidebar__conditions__add__dropdown__item {
        padding: 5px 12px;
        transition: all 0.3s;
        &:hover {
          background-color: rgb(218, 218, 225);
        }
      }
      &::before {
        content: "";
        position: absolute;
        z-index: 20;
        top: -7px;
        left: 10%;
        width: 16px;
        background-color: white;
        transform: rotate(45deg);
        height: 16px;
        border-radius: 2px;
        border: 1px solid transparent;
        border-left-color: rgb(218, 218, 225);
        border-top-color: rgb(218, 218, 225);
      }
    }
    span:last-child {
      margin-left: 5px;
    }
  }
  .sidebar__conditions__btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    button {
      width: 120px;
      padding: 6px 0;
      border-radius: 6px;
      outline: none;
      border: 1px solid transparent;
      color: white;
      font-weight: 600;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

class SidebarFilterCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsFilter: [
        {
          type_compare: Types.TYPE_COMPARE_TOTAL_FINAL_COMPLETED,
          comparison_expression: expressions[0].value,
          value_compare: 0,
        },
        {
          type_compare: Types.TYPE_COMPARE_DATE_REG,
          comparison_expression: expressions[0].value,
          value_compare: moment().format("YYYY-MM-DD"),
        },
      ],
      idsOptionFilterSelected: [
        Types.TYPE_COMPARE_TOTAL_FINAL_COMPLETED,
        Types.TYPE_COMPARE_DATE_REG,
      ],
      showDropdownOptions: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener("click", this.handleClickOutsideDropdown);
    const idsOption = JSON.parse(localStorage.getItem("optionsFilter"))
      ? JSON.parse(localStorage.getItem("optionsFilter")).reduce(
          (prevOption, currentOption) => {
            return [...prevOption, currentOption.type_compare];
          },
          []
        )
      : this.state.idsOptionFilterSelected;
    this.setState({
      optionsFilter: JSON.parse(localStorage.getItem("optionsFilter"))
        ? JSON.parse(localStorage.getItem("optionsFilter"))
        : this.state.optionsFilter,
      idsOptionFilterSelected: idsOption,
    });
  };
  componentWillUnmount = () => {
    window.removeEventListener("click", this.handleClickOutsideDropdown);
  };

  handleClickOutsideDropdown = (e) => {
    const addCondition = document.querySelector(".sidebar__conditions__add");
    if (addCondition.contains(e.target)) {
      return;
    }
    this.setShowDropdownOptions(false);
  };
  setShowDropdownOptions(showDropdownOptions) {
    this.setState({ showDropdownOptions });
  }
  handleChangeInputFilterSearch = (e, indexCondition) => {
    const name = e.target.name;
    const value = e.target.value;

    //Handle change condition input,select
    const newOptionsFilter = [];
    this.state.optionsFilter.forEach((option, index) => {
      if (index === indexCondition) {
        newOptionsFilter.push({
          ...option,
          [name]:
            name === "value_compare" &&
            this.state.optionsFilter[indexCondition].type_compare <
              Types.TYPE_COMPARE_MONTH_BIRTH
              ? formatNumberV2(value)
              : name === "value_compare" &&
                Number(
                  this.state.optionsFilter[indexCondition].type_compare
                ) === Types.TYPE_COMPARE_AGE
              ? Math.floor(Math.min(Math.max(Number(value), 1), 99))
              : value,
        });
      } else {
        newOptionsFilter.push(option);
      }
    });
    this.setState({
      optionsFilter: newOptionsFilter,
    });
  };
  setIdOptionFilterSelected = (idOption) => {
    this.setState({
      idOptionFilterSelected: idOption,
    });
  };
  findTitleOptionById = (idTypeCompare) => {
    const optionIsFound = options.filter(
      (option) => option.id === idTypeCompare
    );
    return optionIsFound[0].title;
  };
  handleShowOptionFilterById = (idOption) => {
    const { idsOptionFilterSelected } = this.state;
    this.setState({
      idsOptionFilterSelected: idsOptionFilterSelected.includes(idOption)
        ? idsOptionFilterSelected.filter((id) => id !== idOption)
        : [...idsOptionFilterSelected, idOption],
    });
  };
  handleShowTypeCondition = () => {
    const newOptions = [];
    options.forEach((option) => {
      var checkedOption = false;
      this.state.optionsFilter.forEach((optionFiter) => {
        if (option.id === Number(optionFiter.type_compare)) {
          checkedOption = true;
          return;
        }
        return;
      });

      if (!checkedOption) {
        newOptions.push(option);
      }
    });
    return newOptions.map((option) => (
      <div
        key={option.id}
        className="sidebar__conditions__add__dropdown__item"
        onClick={() => this.handleAddOptionConditionById(option.id)}
      >
        {option.title}
      </div>
    ));
  };
  handleAddOptionConditionById = (idOption) => {
    const type_compare = idOption;
    const comparison_expression =
      type_compare === Types.TYPE_COMPARE_AGE ||
      type_compare === Types.TYPE_COMPARE_SEX ||
      type_compare === Types.TYPE_COMPARE_PROVINCE ||
      type_compare === Types.TYPE_COMPARE_CTV ||
      type_compare === Types.TYPE_COMPARE_AGENCY
        ? expressions[2].value
        : expressions[0].value;
    const value_compare =
      type_compare < Types.TYPE_COMPARE_MONTH_BIRTH
        ? 0
        : type_compare === Types.TYPE_COMPARE_MONTH_BIRTH ||
          type_compare === Types.TYPE_COMPARE_AGE
        ? 1
        : type_compare === Types.TYPE_COMPARE_SEX
        ? genders[0].value
        : type_compare === Types.TYPE_COMPARE_PROVINCE
        ? this.props?.province[0]?.id
        : type_compare === Types.TYPE_COMPARE_DATE_REG
        ? moment().format("YYYY-MM-DD")
        : 0;
    const newOption = {
      type_compare,
      comparison_expression,
      value_compare,
    };
    this.setState({
      optionsFilter: [...this.state.optionsFilter, newOption],
      idsOptionFilterSelected: [
        ...this.state.idsOptionFilterSelected,
        idOption,
      ],
    });
  };
  handleDeleteOptionConditionById = (idOption) => {
    const newOptionCondition = this.state.optionsFilter.filter(
      (option) => option.type_compare !== idOption
    );
    this.setState({
      optionsFilter: newOptionCondition,
    });
  };
  handleApplySearchFilter = () => {
    const { optionsFilter } = this.state;
    const { setShowFilterSearch, searchValue, store_code } = this.props;

    const newOptionFilter = [];
    optionsFilter.forEach((option) => {
      newOptionFilter.push({
        type_compare: option.type_compare,
        comparison_expression: option.comparison_expression,
        value_compare: option.value_compare.toString().replace(/\./g, ""),
      });
    });
    var params = `&search=${searchValue}&json_list_filter=${JSON.stringify(
      newOptionFilter
    )}`;
    this.props.fetchAllCustomer(store_code, 1, params);
    localStorage.setItem("optionsFilter", JSON.stringify(optionsFilter));
    setShowFilterSearch(false);
  };
  render() {
    return (
      <>
        <SidebarFilter
          showSidebar={this.props.showFilterSearch}
          setShowSidebar={this.props.setShowFilterSearch}
          title="Bộ lọc"
        >
          <SidebarFilterCustomerStyles className="sidebar__conditions">
            {this.state.optionsFilter.length > 0 &&
              this.state.optionsFilter.map((option, index) => (
                <div
                  className="sidebar__conditions__item"
                  key={option.type_compare}
                >
                  <div>
                    <div className="sidebar__conditions__item__type">
                      <span
                        onClick={() =>
                          this.handleShowOptionFilterById(option.type_compare)
                        }
                      >
                        {this.findTitleOptionById(option.type_compare)}
                      </span>
                      <span
                        className="sidebar__conditions__item__btnDelete"
                        onClick={() =>
                          this.handleDeleteOptionConditionById(
                            option.type_compare
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                    </div>
                    <span>
                      <i
                        className="fa fa-angle-right"
                        style={{
                          transform:
                            this.state.idsOptionFilterSelected.includes(
                              option.type_compare
                            )
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                        }}
                      ></i>
                    </span>
                  </div>
                  <div
                    className="sidebar__conditions__dropdown"
                    style={{
                      maxHeight: this.state.idsOptionFilterSelected.includes(
                        option.type_compare
                      )
                        ? "200px"
                        : "0",
                      overflow: this.state.idsOptionFilterSelected.includes(
                        option.type_compare
                      )
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    <ConditionFilterCustomer
                      indexOption={index}
                      types={this.props.types}
                      optionsFilter={this.state.optionsFilter}
                      province={this.props.province}
                      handleChangeInputFilterSearch={
                        this.handleChangeInputFilterSearch
                      }
                    ></ConditionFilterCustomer>
                  </div>
                </div>
              ))}
            <div className="sidebar__conditions__add">
              <div
                onClick={() =>
                  this.setShowDropdownOptions(!this.state.showDropdownOptions)
                }
                style={{
                  display:
                    this.state.optionsFilter.length < options.length
                      ? "inline-block"
                      : "none",
                }}
              >
                <span>
                  <i className="fas fa-plus"></i>
                </span>
                <span>Thêm điều kiện</span>
              </div>
              <div
                className="sidebar__conditions__add_dropdown"
                style={{
                  display: this.state.showDropdownOptions ? "block" : "none",
                }}
              >
                {this.handleShowTypeCondition()}
              </div>
            </div>
            <div className="sidebar__conditions__btn">
              <button
                style={{
                  backgroundColor: themeData().backgroundColor,
                }}
                onClick={this.handleApplySearchFilter}
              >
                Áp dụng
              </button>
            </div>
          </SidebarFilterCustomerStyles>
        </SidebarFilter>
      </>
    );
  }
}
export default SidebarFilterCustomer;
