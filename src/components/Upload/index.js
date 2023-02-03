import React, { Component } from "react";
import styled from "styled-components";

const DropFileStyles = styled.div`
  .drop-file-input {
    position: relative;
    width: 130px;
    height: 130px;
    border: 1px dashed #c6c6c6;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drop-file-input input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .drop-file-input:hover,
  .drop-file-input.dragover {
    opacity: 0.6;
  }

  .drop-file-input__label p {
    text-align: center;
    color: #a1a09e;
    padding: 10px;
  }

  .drop-file-input__label svg {
    width: 28px;
    height: 28px;
  }
`;

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  setFileList = (fileList) => {
    this.setState({ fileList: fileList });
  };
  onDragEnter = () => {
    const dropFileInput = document.querySelector(".drop-file-input");
    dropFileInput.classList.add("dragover");
  };

  onDragLeave = () => {
    const dropFileInput = document.querySelector(".drop-file-input");
    dropFileInput.current.classList.remove("dragover");
  };

  onDrop = () => {
    const dropFileInput = document.querySelector(".drop-file-input");
    dropFileInput.current.classList.remove("dragover");
  };

  onFileDrop = (e) => {
    const newFile = e.target.files[0];
    const { fileList } = this.state;
    const { onFileChange } = this.props;
    if (newFile) {
      const updatedList = [...fileList, newFile];
      this.setFileList(updatedList);
      onFileChange(updatedList);
    }
  };
  render() {
    return (
      <DropFileStyles>
        <div
          className="drop-file-input"
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        >
          <div className="drop-file-input__label">
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p>Chọn ảnh hoặc kéo và thả</p>
          </div>
          <input type="file" value="" onChange={this.onFileDrop} />
        </div>
      </DropFileStyles>
    );
  }
}

export default Upload;
