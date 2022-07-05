import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Train/Course/Edit/Form";
import * as trainAction from "../../../actions/train";
import * as categoryBAction from "../../../actions/category_blog";
import * as Types from "../../../constants/ActionType";
import   "../../../components/Train/Chapter/style.css";

import Alert from "../../../components/Partials/Alert";
class CourseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    passDataModal = (event , data) => {
        var data = JSON.parse(data)
        this.props.handleDelCallBack({ table: "câu hỏi", ...data });
        event.preventDefault();
      }
      passEditFunc = (e, data) => {
        var data = JSON.parse(data)

        this.props.handleUpdateCallBack(
         data
        );
        e.preventDefault();
    };
    

    render() {
        var { data } = this.props;
        return (


            <div className="wrap-box-item hover-product">
                <div className="" style = {{padding : "10px"}}  onClick={(e) =>
                                this.passEditFunc(
                                  e,
                                  JSON.stringify(data)
                                    
                                )
                              }
                    data-toggle="modal"
                    data-target="#updateQuestionModal" >

                    <div className="question">
                    {data.question}
                    </div>
                    <div className="answer">
                        <div className="item-result">
                            A. {data.answer_a}
                        </div>
                        <div className="item-result">
                        B. {data.answer_b}
                        </div>

                        <div className="item-result">
                        C. {data.answer_c}
                        </div>

                        <div className="item-result">
                        D. {data.answer_d}
                        </div>
                        <div className="item-result-correct">
                        Kết quả đúng {data.right_answer ?? "Không có kết quả"}
                        </div>
                    </div>
                </div>
                <div className="action-box">
                {/* <button className="btn-not-background"
                            onClick={(e) =>
                                this.passEditFunc(
                                  e,
                                  JSON.stringify(data)
                                    
                                )
                              }
                        data-toggle="modal"
                        data-target="#updateQuestionModal" 
                    >
                        <i class="fa fa-penci editl"></i>
                    </button> */}
                    <button className="btn-not-background"
                        onClick={(e) => this.passDataModal(e, JSON.stringify(data)
                        )}
                        data-toggle="modal"
                        data-target="#removeQuestionModal"
                    >
                        <i class="fa fa-trash"></i>
                    </button>

                </div>
            </div>

        );

    }
}

const mapStateToProps = (state) => {
    return {
        course: state.trainReducers.train.courseID,


    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
