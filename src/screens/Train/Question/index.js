import React, { Component } from "react";

import { connect } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Form from "../../../components/Train/Course/Edit/Form";
import * as trainAction from "../../../actions/train";
import * as categoryBAction from "../../../actions/category_blog";
import * as Types from "../../../constants/ActionType";
import Item from "./Item"
import Alert from "../../../components/Partials/Alert";
import ModalCreate from "../../../components/Train/Question/Create/Form";
import ModalDelete from "../../../components/Train/Question/Delete/Modal";
import ModalUpdate from "../../../components/Train/Question/Edit/Form";

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal : {},
      modalupdate : {}
    }
  }

  componentDidMount() {
    var {store_code , courseId , quizId } = this.props.match.params;

    this.props.fetchQuizId(store_code , courseId , quizId);

  }
  handleUpdateCallBack = (modal) => {
    console.log(modal)
    this.setState({ modalupdate: modal });
  };

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };


  render() {
    var { courseId, store_code , quizId } = this.props.match.params;
    var { course, history , quiz } = this.props
    var questions = quiz.questions ?? []
      return (
      
        <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              <div class="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Câu hỏi trắc nghiệm
                  </h4>
                  <button data-toggle="modal"
            data-target="#createQuestionModal"
            class={`btn btn-info btn-icon-split btn-sm`}
          >
            <span class="icon text-white-50">
              <i class="fas fa-plus"></i>
            </span>
            <span class="text">Thêm câu hỏi</span>
          </button>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                      {
                   questions.map((item,key)=>(
                          <Item handleUpdateCallBack={this.handleUpdateCallBack} handleDelCallBack = {this.handleDelCallBack} data = {item}></Item>
                        ))
                      }
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
          <ModalCreate
          quizId  = {quizId}
              store_code={store_code}
              courseId={courseId}
            />
          <ModalDelete   quizId  = {quizId}
              store_code={store_code}
              courseId={courseId} modal={this.state.modal} />
        </div>
        <ModalUpdate
                  quizId  = {quizId}

              modal={this.state.modalupdate}
              store_code={store_code}
              courseId={courseId}

            />
      </div>
            
        

      );
 
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.trainReducers.train.quizID,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchQuizId: (store_code , courseId , quizId) => {
      dispatch(trainAction.fetchQuizId(store_code , courseId,quizId));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
