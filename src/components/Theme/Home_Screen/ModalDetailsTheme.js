import { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import themeData from "../../../ultis/theme_data";
const ModalDetailsThemeStyles = styled.div`
  position: fixed;
  z-index: 1100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-theme__overlay {
    position: absolute;
    z-index: 1101;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal-theme__content {
    position: absolute;
    z-index: 1102;
    width: 1000px;
    height: 80%;
    background-color: white;
    border-radius: 10px;
    animation: fadeDownAnimation 0.8s linear 1;
    .modal-theme__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 15px 30px;
      span {
        width: 24px;
        height: 24px;
        cursor: pointer;
        svg {
          transition: all 0.4s;
          &:hover {
            transform: scale(1.05);
            color: #34495e;
          }
        }
      }
    }
  }

  @keyframes fadeDownAnimation {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
const ModalDetailsThemeH4Styles = styled.h4`
  position: relative;
  color: black;
  font-size: 20px;
  &::after {
    content: "";
    position: absolute;
    top: 120%;
    left: 0;
    width: 70px;
    height: 2px;
    background-color: ${(props) => props.color};
  }
`;
class ModalDetailsTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { themeInfo } = this.props;
    console.log("ModalDetailsTheme ~ themeInfo", themeInfo);
    return ReactDOM.createPortal(
      <ModalDetailsThemeStyles className="modal-theme">
        <div
          className="modal-theme__overlay"
          onClick={() => this.props.setShowModalDetailsTheme(false)}
        ></div>
        <div className="modal-theme__content">
          <div className="modal-theme__header">
            <ModalDetailsThemeH4Styles color={themeData().backgroundColor}>
              {themeInfo.name}
            </ModalDetailsThemeH4Styles>
            <span onClick={() => this.props.setShowModalDetailsTheme(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className="modal-theme__body">
            <div className="modal-theme__left">
              <p>{themeInfo.description}</p>
            </div>
            <div className="modal-theme__right" width="640px">
              <div className="modal-theme__img"></div>
            </div>
          </div>
        </div>
      </ModalDetailsThemeStyles>,
      document.querySelector("body")
    );
  }
}

export default ModalDetailsTheme;
