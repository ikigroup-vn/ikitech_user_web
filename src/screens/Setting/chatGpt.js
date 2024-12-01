import React, { Component } from "react";
import { connect } from "react-redux";
import * as themeAction from "../../actions/theme";
import * as SettingAction from "../../actions/notification";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { shallowEqual } from "../../ultis/shallowEqual";
import FontPicker from "font-picker-react";
import styles from "./style.css";
const Dontainer = styled.div`
  border: "1px solid black";
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  max-width: 100%;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const FileInput = styled.input`
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #f7f7f7;
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const DownloadButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(90deg, #007bff, #00d2ff);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(90deg, #00d2ff, #007bff);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

class ChatGPT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: "",
      logo_url: null,
      favicon_url: null,
      image_share_web_url: null,
      home_title: "",
      domain: "",
      tokengpt: "",
      modelgpt: "",
      color_main_1: "",
      font_family: "",
      typeUpload: "",
      loadFont: false,
      home_description: "",
      excelData: [],
    };
  }

  handleDownloadTemplate = () => {
    const sampleData = [
      {
        "Câu hỏi": "Sản phẩm này có bảo hành không?",
        "Trả lời":
          "Dạ có, sản phẩm này được bảo hành trong 12 tháng kể từ ngày mua. Anh/chị vui lòng giữ lại hóa đơn mua hàng để sử dụng khi cần bảo hành ạ.",
      },
      {
        "Câu hỏi": "Tại sao đơn hàng của tôi vẫn chưa được giao?",
        "Trả lời":
          "Dạ, em rất xin lỗi về sự chậm trễ này. Anh/chị có thể cung cấp mã đơn hàng để em kiểm tra giúp mình thông tin chi tiết ngay ạ.",
      },
      {
        "Câu hỏi": "Tôi không hài lòng với dịch vụ, tôi muốn khiếu nại!",
        "Trả lời":
          "Dạ em xin lỗi vì trải nghiệm không tốt của anh/chị. Anh/chị vui lòng cho em biết chi tiết vấn đề để em hỗ trợ xử lý nhanh nhất ạ.",
      },
      {
        "Câu hỏi": "Làm thế nào để tôi được hoàn tiền?",
        "Trả lời":
          "Dạ để được hoàn tiền, anh/chị vui lòng cung cấp thông tin đơn hàng và lý do hoàn tiền. Em sẽ chuyển thông tin đến bộ phận liên quan để xử lý trong vòng 3-5 ngày làm việc ạ.",
      },
      {
        "Câu hỏi": "Sản phẩm này có hỗ trợ kỹ thuật không?",
        "Trả lời":
          "Dạ có, chúng tôi cung cấp dịch vụ hỗ trợ kỹ thuật 24/7. Anh/chị có thể gọi đến tổng đài hoặc gửi email để được tư vấn chi tiết ạ.",
      },
      {
        "Câu hỏi": "Tôi có thể đổi sản phẩm không nếu không vừa ý?",
        "Trả lời":
          "Dạ anh/chị hoàn toàn có thể đổi sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng, miễn là sản phẩm còn nguyên vẹn và chưa qua sử dụng ạ.",
      },
      {
        "Câu hỏi": "Tại sao hóa đơn của tôi bị sai?",
        "Trả lời":
          "Dạ em rất xin lỗi về sự cố này. Anh/chị vui lòng gửi lại hóa đơn qua email hoặc Zalo để em kiểm tra và hỗ trợ điều chỉnh ngay ạ.",
      },
      {
        "Câu hỏi": "Phí vận chuyển được tính như thế nào?",
        "Trả lời":
          "Dạ phí vận chuyển được tính dựa trên địa chỉ giao hàng và trọng lượng đơn hàng. Anh/chị vui lòng nhập địa chỉ tại phần thanh toán để xem phí chính xác ạ.",
      },
      {
        "Câu hỏi": "Sản phẩm này còn hàng không?",
        "Trả lời":
          "Dạ để kiểm tra tồn kho, anh/chị vui lòng cho em biết mã sản phẩm hoặc chi nhánh gần nhất mình muốn mua để em kiểm tra ngay ạ.",
      },
      {
        "Câu hỏi": "Tôi cần tư vấn thêm về cách sử dụng sản phẩm này.",
        "Trả lời":
          "Dạ anh/chị có thể xem hướng dẫn sử dụng kèm theo sản phẩm, hoặc em có thể hướng dẫn trực tiếp ngay bây giờ. Anh/chị vui lòng cho em biết mình cần hỗ trợ gì cụ thể ạ.",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Mẫu");

    // Xuất file Excel
    XLSX.writeFile(workbook, "file_mau.xlsx");
  };

  handleFileUpload = (e) => {
    const file = e.target.files?.[0]; // Lấy file được chọn
    const fileNameElement = document.getElementById("file-name"); // Phần tử hiển thị tên file

    if (file) {
      // Hiển thị tên file
      fileNameElement.textContent = file.name;

      // Đọc dữ liệu từ file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Cập nhật dữ liệu vào state
        this.setState({ excelData: jsonData });
      };
      reader.readAsBinaryString(file);
    } else {
      // Nếu không có file nào được chọn
      this.setState({ excelData: [] });
      fileNameElement.textContent = "Không có tệp nào được chọn";
    }
  };

  handleDownloadJsonl = () => {
    const { excelData } = this.state;
    const jsonlContent = excelData
      .map((item) => {
        // Giả sử 'Câu hỏi' là role: 'user' và 'Trả lời' là role: 'assistant'
        const userMessage = {
          role: "user",
          content: item["Câu hỏi"], // Lấy câu hỏi từ dữ liệu Excel
        };
        const assistantMessage = {
          role: "assistant",
          content: item["Trả lời"], // Lấy câu trả lời từ dữ liệu Excel
        };

        // Chuyển thành JSON
        let jsonString = JSON.stringify({
          messages: [userMessage, assistantMessage],
        });

        // Thêm khoảng trắng sau dấu ":" và dấu ","
        jsonString = jsonString.replace(/(:|,)(?=\S)/g, "$1 "); // Thêm dấu cách sau dấu : và ,

        return jsonString;
      })
      .join("\n"); // Nối các JSON lại bằng ký tự xuống dòng

    const blob = new Blob([jsonlContent], { type: "application/jsonl" });
    saveAs(blob, "data.jsonl");
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    var theme = this.props.theme;
    console.log("theme================>", theme);
    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        store_id: theme.store_id,
        logo_url: theme.logo_url,
        favicon_url: theme.favicon_url,
        image_share_web_url: theme.image_share_web_url,
        home_title: theme.home_title,
        domain: theme.domain,
        tokengpt: theme.gpt_token,
        modelgpt: theme.gpt_model,
        color_main_1: theme.color_main_1,
        font_family: theme.font_family,
        home_description: theme.home_description,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("receipt");
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        store_id: theme.store_id,
        logo_url: theme.logo_url,
        favicon_url: theme.favicon_url,
        image_share_web_url: theme.image_share_web_url,
        home_title: theme.home_title,
        domain: theme.domain,
        tokengpt: theme.gpt_token,
        modelgpt: theme.gpt_model,
        color_main_1: theme.color_main_1,
        font_family: theme.font_family,
        home_description: theme.home_description,
      });
    }
    if (nextProps.faceImg != this.props.faceImg)
      this.setState({ image_share_web_url: nextProps.faceImg });
    if (nextProps.logoImg != this.props.logoImg)
      this.setState({ logo_url: nextProps.logoImg });
    if (nextProps.faviconImg != this.props.faviconImg)
      this.setState({ favicon_url: nextProps.faviconImg });
  }

  handleChangeColor = (color) => {
    this.setState({ color_main_1: color });
  };
  onChangeUpload = (type) => {
    this.setState({
      typeUpload: type,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.store_id != "" && nextState.loadFont == false) {
      this.setState({ loadFont: true });
    }
    return true;
  }
  onSave = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var theme = this.state;
    var form = { ...this.props.theme };
    form.logo_url = theme.logo_url;
    form.favicon_url = theme.favicon_url;
    form.image_share_web_url = theme.image_share_web_url;
    form.home_title = theme.home_title;
    form.domain = theme.domain;

    form.gpt_token = theme.tokengpt;
    form.gpt_model = theme.modelgpt;
    form.color_main_1 = theme.color_main_1;
    form.font_family = theme.font_family;
    form.home_description = theme.home_description;
    this.props.updateTheme(store_code, form);
  };
  showFont = (font) => {
    if (this.state.loadFont == true) {
      return (
        <FontPicker
          // apiKey = {Env.API_KEY_FONT}
          apiKey="AIzaSyDIAniO77CXyauCOf7YwBTRKICq9JMbP8E"
          activeFontFamily={font}
          onChange={(nextFont) =>
            this.setState({
              font_family: nextFont.family,
            })
          }
        />
      );
    }
  };

  render() {
    var {
      logo_url,
      favicon_url,
      image_share_web_url,
      home_title,
      domain,
      tokengpt,
      modelgpt,
      color_main_1,
      font_family,
      typeUpload,
      home_description,
      excelData,
    } = this.state;

    var _color_main_1 =
      color_main_1 == null || color_main_1 == "" ? "#fff" : color_main_1;
    var _font_family =
      font_family == null || font_family == "" ? "Open Sans" : font_family;
    console.log(_font_family);
    return (
      <div className="overview">
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div className="form-group">
              <label htmlFor="name">Token chatGPT</label>
              <input
                type="text"
                className="form-control"
                placeholder="Token chatGPT của bạn"
                id="txtName"
                onChange={this.onChange}
                value={tokengpt || ""}
                name="tokengpt"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Tên model chatGPT</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên model chatGPT của bạn"
                id="txtName"
                onChange={this.onChange}
                value={modelgpt || ""}
                name="modelgpt"
                autoComplete="off"
              />
            </div>
            <div>
              <div className="container">
                <div className="title">
                  <h4>Chuyển EXCEL Sang JSONL</h4>
                </div>
                <button
                  className="template-download-button"
                  onClick={this.handleDownloadTemplate}
                >
                  Tải xuống file excel mẫu
                </button>
                <div className="file-input-wrapper">
                  <label htmlFor="file-upload" className="file-label">
                    Chọn tệp
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="file-input-hidden"
                    accept=".xlsx, .xls"
                    onChange={this.handleFileUpload}
                  />
                  <span id="file-name" className="file-name">
                    Không có tệp nào được chọn
                  </span>
                </div>
                <button
                  className="download-button"
                  onClick={this.handleDownloadJsonl}
                  disabled={excelData.length === 0}
                >
                  Tải xuống JSONL
                </button>
              </div>
            </div>

            {/* <div className="form-group">
                            <label htmlFor="name">Kiểu chữ cho web</label>
                            {this.showFont(_font_family)}
                            <p className="apply-font">Kiểu chữ {_font_family}</p>
                        </div> */}
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info  btn-sm">
              <i class="fas fa-save"></i>
              Lưu
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    faceImg: state.UploadReducers.themeImg.face_img,
    logoImg: state.UploadReducers.themeImg.logo_img,
    faviconImg: state.UploadReducers.themeImg.favicon_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatGPT);
