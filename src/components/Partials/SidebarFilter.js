import { Component } from "react";
import styled from "styled-components";

const SidebarFilterStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100vh;
  width: 500px;
  background-color: white;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: all 0.5s;
  .sidebar-filter__content {
    padding: 30px;
    .sidebar-filter__content__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30px;
      h4 {
        color: #10a0b5;
      }
      & > div {
        cursor: pointer;
        i {
          font-size: 24px;
          color: #2d3436;
        }
      }
    }
  }
  &::-webkit-scrollbar {
    width: 0px !important;
  }
`;

class SidebarFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SidebarFilterStyles
        className="sidebar-filter"
        style={{
          transform: !this.props.showFilterSearch
            ? "translateX(100%)"
            : "translateX(0)",
        }}
      >
        <div className="sidebar-filter__content">
          <div className="sidebar-filter__content__header">
            <h4>Bộ lọc</h4>
            <div onClick={() => this.props.setShowFilterSearch(false)}>
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="sidebar-filter__content__body">
            {this.props.children}
          </div>
        </div>
      </SidebarFilterStyles>
    );
  }
}
export default SidebarFilter;
