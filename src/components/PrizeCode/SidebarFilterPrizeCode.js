import { Component } from "react";
import styled from "styled-components";
import themeData from "../../ultis/theme_data";
import SidebarFilter from "../Partials/SidebarFilter";
import ConditionFilter from "./ConditionFilter";
import * as Types from "../../constants/ActionType";
import { expressions } from "../../ultis/groupCustomer/expressions";
import { genders } from "../../ultis/groupCustomer/genders";
import moment from "moment";
import { formatNumberV2 } from "../../ultis/helpers";
import * as prizeCodeApi from "../../data/remote/prize_code";

const options = [
  {
    id: 0,
    title: "Trạng thái mã",
  },
  {
    id: 1,
    title: "Thời gian nhập mã",
  },
  {
    id: 2,
    title: "Sản phẩm",
  },
  {
    id: 3,
    title: "Tỉnh",
  },
];

const SidebarFilterStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .sidebar__conditions__item {
    display: flex;
    align-items: center;
    .sidebar__conditions__item__type {
      width: 370px;
      margin-right: 20px;
      select {
        width: 100%;
        border: 1px solid transparent;
        border-bottom-color: #d1d3e2;
        padding: 0.375rem 0.75rem;
        height: 38px;
        outline: none;
      }
    }
    .sidebar__conditions__item__btnDelete {
      margin-left: 10px;
      cursor: pointer;
      svg {
        width: 16px;
        height: 16px;
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

class SidebarFilterPrizeCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsFilter: [
        {
          type_compare: "0",
          comparison_expression: expressions[2].value,
          value_compare: "Mã trắng",
        },
      ],
      showDropdownOptions: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener("click", this.handleClickOutsideDropdown);

    const newOptionsFilter = JSON.parse(
      localStorage.getItem("optionsFilterPrizeCode")
    )
      ? JSON.parse(localStorage.getItem("optionsFilterPrizeCode"))
      : this.state.optionsFilter;

    this.setState({
      optionsFilter: newOptionsFilter,
    });
  };
  componentWillUnmount = () => {
    localStorage.removeItem("optionsFilter");
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
    console.log("e", e);
    console.log("indexCondition", indexCondition);
    const name = e.target.name;
    const value = e.target.value;
    console.log("name", name);
    console.log("value", value);

    const type_compare = Number(value);
    const comparison_expression = expressions.find(
      (expression) =>
        expression.id === (type_compare === 0 || type_compare === 2 ? 2 : 0)
    ).value;

    //Handle change condition input,select
    const newOptionsFilter = this.state.optionsFilter.map((option, index) => {
      if (index === indexCondition) {
        // Check if `name` is 'type_compare'
        if (name === "type_compare") {
          return {
            ...option,
            comparison_expression,
            [name]: value,
          };
        } else {
          // Check nếu `name` khác giá trị trước đó của nó
          return {
            ...option,
            [name]: value,
          };
        }
      } else {
        return option;
      }
    });
    console.log(newOptionsFilter);
    this.setState({
      optionsFilter: newOptionsFilter,
    });
  };

  handleDeleteOptionConditionById = (indexOption) => {
    const newOptionCondition = this.state.optionsFilter.filter(
      (option, index) => index !== indexOption
    );
    this.setState({
      optionsFilter: newOptionCondition,
    });
  };
  handleApplySearchFilter = () => {
    const { optionsFilter } = this.state;
    const {
      setShowFilterSearch,
      searchValue,
      store_code,
      onSetLinks,
      onSetPrizeCode,
      onSetCurrentPage,
    } = this.props;

    const newOptionFilter = [];
    optionsFilter.forEach((option) => {
      newOptionFilter.push({
        type_compare: option.type_compare,
        comparison_expression: option.comparison_expression,
        value_compare: option.value_compare.toString().replace(/\./g, ""),
      });
    });
    var params = `?search=${searchValue}&json_list_filter=${encodeURIComponent(
      JSON.stringify(newOptionFilter)
    )}`;
    // Call api
    prizeCodeApi
      .fetchAllPrizeCode(store_code, params)
      .then((res) => {
        const data = res.data.data.data;
        const links = res.data.data.links;
        const currentPage = res.data.data.current_page;
        onSetCurrentPage(currentPage);
        onSetPrizeCode(data);
        onSetLinks(links);
      })
      .catch(() => {});
    localStorage.setItem(
      "optionsFilterPrizeCode",
      JSON.stringify(newOptionFilter)
    );
    setShowFilterSearch(false);
  };
  handleAddFilterSearch = () => {
    const newOptionFilter = {
      type_compare: 0,
      comparison_expression: expressions[2].value,
      value_compare: "Mã trắng",
    };
    this.setState({
      optionsFilter: [...this.state.optionsFilter, newOptionFilter],
    });
  };
  render() {
    return (
      <>
        <SidebarFilter
          showSidebar={this.props.showFilterSearch}
          setShowSidebar={this.props.setShowFilterSearch}
          widthSideBar="auto"
          title="Bộ lọc"
        >
          <SidebarFilterStyles className="sidebar__conditions">
            {this.state.optionsFilter.length > 0 &&
              this.state.optionsFilter.map((option, index) => (
                <div className="sidebar__conditions__item" key={index}>
                  <div className="sidebar__conditions__item__type">
                    <select
                      className="form-condition-select"
                      name="type_compare"
                      value={option.type_compare}
                      onChange={(e) =>
                        this.handleChangeInputFilterSearch(e, index)
                      }
                    >
                      {options.map((opt) => (
                        <option
                          key={opt.id}
                          value={opt.id}
                          className="sidebar__conditions__add__dropdown__item"
                        >
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ConditionFilter
                    indexOption={index}
                    optionsFilter={this.state.optionsFilter}
                    province={this.props.province}
                    handleChangeInputFilterSearch={
                      this.handleChangeInputFilterSearch
                    }
                    store_code={this.props.store_code}
                  ></ConditionFilter>
                  <span
                    className="sidebar__conditions__item__btnDelete"
                    onClick={() => this.handleDeleteOptionConditionById(index)}
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
              ))}
            <div className="sidebar__conditions__add">
              <div
                onClick={this.handleAddFilterSearch}
                style={{
                  display:
                    this.state.optionsFilter.length < options.length + 1
                      ? "inline-block"
                      : "none",
                }}
              >
                <span>
                  <i className="fas fa-plus"></i>
                </span>
                <span>Thêm điều kiện</span>
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
          </SidebarFilterStyles>
        </SidebarFilter>
      </>
    );
  }
}
export default SidebarFilterPrizeCode;
