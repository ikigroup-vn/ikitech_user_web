import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as trainAction from "../../../actions/train";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenLesson: false,
            listArr: []
        }
    }

    onSortEnd = (oldIndex, newIndex) => {
        var listArr = arrayMove(this.props.data?.lessons, oldIndex, newIndex);
        var listId = [];
        var listPosition = [];
        listArr.forEach((element, index) => {
            listId.push({ id: element.id, position: index + 1 });

        });
        var { courseId, store_code } = this.props

        this.props.sortLesson(store_code, { list_sort: listId, train_chapter_id: this.props.data.id }, courseId);
    };
    passEditFunc = (e, id, train_course_id, title, short_description) => {
        this.props.handleUpdateCallBack({
            id: id,
            train_course_id: train_course_id,
            title: title,
            short_description: short_description,
        });
        e.preventDefault();
    };
    passEditLessonFunc = (e, id, train_chapter_id, title, link_video_youtube, description, short_description) => {
        this.props.handleUpdateLessonCallBack({
            id,
            train_chapter_id,
            title,
            short_description,
            link_video_youtube, description
        });
        e.preventDefault();
    };

    passDataModal = (event, store_code, name, train_course_id) => {
        this.props.handleDelCallBack({ table: "chương", id: store_code, name: name, train_course_id });
        event.preventDefault();
    }

    passDelLessonDataModal = (event, store_code, name, train_chapter_id) => {
        this.props.handleDelLessonCallBack({ table: "bài học", id: store_code, name: name, train_chapter_id });
        event.preventDefault();
    }

    showData = (lessons) => {
        var result = null;
        if (lessons.length > 0) {
            var { update, _delete } = this.props

            result = lessons.map((data, index) => {

                return (

                    <SortableItem key={data.id}>
                        <div class="resp-table-row" style={{ width: "100%" }}>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {index + 1}

                            </div>

                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {data.title}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {data.short_description}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                <a href={data.link_video_youtube}></a>{data.link_video_youtube}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                <div
                                    className="group-btn-table"
                                >
                                    <button
                                        onClick={(e) =>
                                            this.passEditLessonFunc(
                                                e,
                                                data.id,
                                                data.train_chapter_id,
                                                data.title,
                                                data.link_video_youtube,
                                                data.description,

                                                data.short_description
                                            )
                                        }
                                        data-toggle="modal"
                                        data-target="#updateLessonModal" class={`btn btn-warning btn-sm`}
                                    >
                                        <i class="fa fa-edit"></i> Sửa
                                    </button>
                                    <button
                                        onClick={(e) => this.passDelLessonDataModal(e, data.id, data.title, data.train_chapter_id
                                        )}
                                        style={{ marginLeft: "10px" }}
                                        data-toggle="modal"
                                        data-target="#removeLessonModal"
                                        class={`btn btn-danger btn-sm `}
                                    >
                                        <i class="fa fa-trash"></i> Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SortableItem>

                    // <tr>
                    //     <td>
                    //         {index + 1}
                    //     </td>
                    //     <td>{data.title}</td>
                    //     <td>{data.short_description}</td>
                    //     <td><a href={data.link_video_youtube}></a>{data.link_video_youtube}</td>

                    //     <td>{moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>


                    //     <td style={{ display: "flex" }}>
                    //         <button
                    //             onClick={(e) =>
                    //                 this.passEditLessonFunc(
                    //                     e,
                    //                     data.id,
                    //                     data.train_chapter_id,
                    //                     data.title,
                    //                     data.link_video_youtube,
                    //                     data.description,

                    //                     data.short_description
                    //                 )
                    //             }
                    //             data-toggle="modal"
                    //             data-target="#updateLessonModal" class={`btn btn-warning btn-sm`}
                    //         >
                    //             <i class="fa fa-edit"></i> Sửa
                    //         </button>
                    //         <button
                    //             onClick={(e) => this.passDelLessonDataModal(e, data.id, data.title, data.train_chapter_id
                    //             )}
                    //             style={{ marginLeft: "10px" }}
                    //             data-toggle="modal"
                    //             data-target="#removeLessonModal"
                    //             class={`btn btn-danger btn-sm `}
                    //         >
                    //             <i class="fa fa-trash"></i> Xóa
                    //         </button>
                    //     </td>
                    // </tr>
                );
            });
        } else {
            return (<div class="resp-table-row" style={{ width: "100%" }}>
                <div style={{ textAlign: "center" }}>Không có bài học nào!</div>
            </div>
            );
        }
        return result;
    };
    render() {

        var { data, index } = this.props
        var { isOpenLesson } = this.state
        return (
            <>
                <SortableItem key={data.id} collection={data.id}>
                    <div class="resp-table-row" style={{ width: "100%" }}>
                        <div class="table-body-cell icon-show-detail" style={{ width: "3%" }} >
                            <button style={{ maxWidth: "30px" }} className="btn-not-background" onClick={() => {
                                this.setState({ isOpenLesson: !isOpenLesson })
                            }}>              <i class={`fas fa-angle-double-${isOpenLesson === true ? "down" : "right"}`}></i>
                            </button>
                        </div>

                        <div class="table-body-cell" style={{ width: "15%" }}>
                            {data.title}
                        </div>
                        <div class="table-body-cell" style={{ width: "20%" }}>
                            {data.short_description}
                        </div>
                        <div class="table-body-cell" style={{ width: "15%" }}>
                            {moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}
                        </div>
                        <div class="table-body-cell" style={{ width: "15%" }}>
                            <div
                                className="group-btn-table"
                            >
                                <button
                                    onClick={(e) =>
                                        this.passEditFunc(
                                            e,
                                            data.id,
                                            data.train_course_id,
                                            data.title,

                                            data.short_description
                                        )
                                    }
                                    data-toggle="modal"
                                    data-target="#updateModal" class={`btn btn-warning btn-sm`}
                                >
                                    <i class="fa fa-edit"></i> Sửa
                                </button>
                                <button
                                    onClick={(e) => this.passDataModal(e, data.id, data.title, data.train_course_id
                                    )}
                                    style={{ marginLeft: "10px" }}
                                    data-toggle="modal"
                                    data-target="#removeModal"
                                    class={`btn btn-danger btn-sm `}
                                >
                                    <i class="fa fa-trash"></i> Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </SortableItem>
                {/* <tr>
                    <td>
                    <i onClick = {()=>{
                        this.setState({isOpenLesson : !isOpenLesson})
                    }} class={`fas fa-angle-double-${isOpenLesson === true ? "down" : "right"}`}></i>
                                        </td>
                    <td>{data.title}</td>
                    <td>{data.short_description}</td>
                    <td>{moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>


                    <td style={{ display: "flex" }}>
                        <button
                            onClick={(e) =>
                                this.passEditFunc(
                                    e,
                                    data.id,
                                    data.train_course_id,
                                    data.title,

                                    data.short_description
                                )
                            }
                            data-toggle="modal"
                            data-target="#updateModal" class={`btn btn-warning btn-sm`}
                        >
                            <i class="fa fa-edit"></i> Sửa
                        </button>
                        <button
                            onClick={(e) => this.passDataModal(e, data.id, data.title, data.train_course_id
                            )}
                            style={{ marginLeft: "10px" }}
                            data-toggle="modal"
                            data-target="#removeModal"
                            class={`btn btn-danger btn-sm `}
                        >
                            <i class="fa fa-trash"></i> Xóa
                        </button>
                    </td>
                </tr> */}


                <tr className={`${isOpenLesson == true ? "" : "hide"}`}>
                    <td colSpan={5} style={{
                        border: "1px solid #dcd2d2",
                        padding: "10px"
                    }}>
                        <div
                            style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
                        >
                            <h6 className="  " style={{ fontWeight: "500" }}>
                                Danh sách bài học
                            </h6>{" "}

                            <button
                                data-toggle="modal"
                                data-target="#createLessonModal"

                                class={`btn btn-info btn-icon-split btn-sm `}
                                onClick={() => { this.props.passChapterId(data.id) }}
                            >
                                <span class="icon text-white-50">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span class="text">Thêm bài học</span>
                            </button>
                        </div>
                        {
                            isOpenLesson == true &&
                            <>
                                <div id="resp-table">

                                    <div className="resp-table-body">
                                        <div style={{ fontWeight: "500" }} class="table-body-cell">

                                        </div>
                                        <div style={{ fontWeight: "500" }} class="table-body-cell">
                                            Tên chương
                                        </div>
                                        <div style={{ fontWeight: "500" }} class="table-body-cell">
                                            Mô tả ngắn      </div>
                                        <div style={{ fontWeight: "500" }} class="table-body-cell">
                                            Video bài học      </div>
                                        <div style={{ fontWeight: "500" }} class="table-body-cell">
                                            Ngày tạo
                                        </div>
                                        <div style={{ fontWeight: "500" }} class="table-body-cell">
                                            Hành động
                                        </div>
                                    </div>
                                    {
                                        data.lessons > 0 ? <SortableList
                                            onSortEnd={this.onSortEnd}
                                            className="resp-table-body"
                                            draggedItemClassName="dragged"
                                        >
                                            {this.showData(data.lessons)}
                                        </SortableList> : <div class="resp-table-row" style={{ width: "100%" }}>
                                            <div style={{ textAlign: "center" }}>Không có bài học nào!</div>
                                        </div>
                                    }


                                </div>

                            </>



                        }

                    </td>
                </tr>



            </>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        sortLesson: (store_code, data, train_course_id) => {
            dispatch(trainAction.sortLesson(store_code, data, train_course_id));
        },
    };
};
export default connect(null, mapDispatchToProps)(Table);