import { message, Select, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { statusAction } from "../../store/actions/statusAction";
import { CloseOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { FaBookmark, FaClock, FaLink, FaTelegramPlane } from "react-icons/fa";
import { priorityAction } from "../../store/actions/priorityAction";
import { CHANGE_TASK_MODAL } from "../../store/types/projectType";
import { taskTypeAction } from "../../store/actions/taskTypeAction";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useState } from "react";
import { CHANGE_ASSIGNEES } from "../../store/types/TaskType";
import {
  REMOVE_USER_ASSIGNESS,
  OPEN_MODAL_EDIT_USER,
} from "../../store/types/usersType";
import { projectAction } from "../../store/actions/projectAction";
import { useForm } from "react-hook-form";

const ModalJura = () => {
  const { taskDetailModel } = useSelector((state) => state.projectReducer);
  const { arrStatus } = useSelector((state) => state.statusReducer);
  const { arrAllPriority } = useSelector((state) => state.priorityReducer);
  const { arrTaskType } = useSelector((state) => state.taskTypeReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModel.description
  );
  const [contentDesciption, setContentDesciption] = useState(
    taskDetailModel.description
  );

  const { comment } = useSelector((state) => state.CommentReducer);
  const dispatch = useDispatch();

  const editorRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const renderDesciption = () => {
    let jsxDesciption = parse(taskDetailModel.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            {" "}
            <Editor
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={taskDetailModel.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="my-4">
              <button
                className="btn btn-success mr-4"
                onClick={() => {
                  setVisibleEditor(false);
                  if (editorRef.current) {
                    setContentDesciption(editorRef.current.getContent());
                    dispatch(
                      projectAction.updateDesciptionAction({
                        taskId: taskDetailModel.taskId,
                        description: editorRef.current.getContent(),
                        projectId: taskDetailModel.projectId,
                      })
                    );
                  }
                }}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setVisibleEditor(false);
                  dispatch(
                    updateTaskDetailModel({
                      actionType: CHANGE_TASK_MODAL,
                      name: "desciption",
                      value: historyContent,
                    })
                  );
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer mb-3"
            onClick={() => {
              setHistoryContent(taskDetailModel.description);
              setVisibleEditor(true);
            }}
          >
            {jsxDesciption}
          </div>
        )}
      </div>
    );
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModel;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <FaClock className="mr-2 text-xl" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              min={0}
              className="form-control"
              name="timeTrackingSpent"
              onChange={(e) => {
                console.log("taskDetailModel: ", taskDetailModel);
                dispatch(
                  projectAction.updateTimeTrackingAction({
                    taskId: taskDetailModel.taskId,
                    timeTrackingSpent: e.target.value,
                    timeTrackingRemaining:
                      taskDetailModel.timeTrackingRemaining,
                    projectId: taskDetailModel.projectId,
                  })
                );
              }}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              min={0}
              className="form-control"
              name="timeTrackingRemaining"
              onChange={(e) => {
                dispatch(
                  projectAction.updateTimeTrackingAction({
                    taskId: taskDetailModel.taskId,
                    timeTrackingSpent: taskDetailModel.timeTrackingSpent,
                    timeTrackingRemaining: e.target.value,
                    projectId: taskDetailModel.projectId,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    dispatch(
      updateTaskDetailModel({
        actionType: CHANGE_TASK_MODAL,
        name,
        value,
      })
    );
  };

  const updateTaskDetailModel = (taskUpdate) => {
    switch (taskUpdate.actionType) {
      case CHANGE_ASSIGNEES:
        {
          const { userSelected } = taskUpdate;
          dispatch({
            type: CHANGE_ASSIGNEES,
            userSelected,
          });
        }
        break;
      case REMOVE_USER_ASSIGNESS:
        {
          const { userId } = taskUpdate;
          dispatch({
            type: REMOVE_USER_ASSIGNESS,
            userId,
          });
        }
        break;
    }
    console.log("sau khi thay đổi: ", taskDetailModel);
    const listUserAsign = taskDetailModel?.assigness?.map((user, index) => {
      return user.id;
    });
    const taskUpdateApi = { ...taskDetailModel, listUserAsign };
    dispatch(projectAction.updateTaskAction(taskUpdateApi));
  };

  useEffect(() => {
    dispatch(statusAction.getAllStatusAction());
    dispatch(priorityAction.getAllPriorityAction(""));
    dispatch(taskTypeAction.getAllTaskTypeAction());
  }, []);

  return (
    <div>
      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title flex items-center">
                <FaBookmark className="mr-2 text-green-700" />
                <select
                  name="typeId"
                  value={taskDetailModel?.typeId}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {arrTaskType?.map((tt, index) => {
                    return (
                      <option key={index} value={tt.id}>
                        {tt.taskType}
                      </option>
                    );
                  })}
                </select>
                <span>{taskDetailModel.taskName}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div className="flex items-center">
                  <FaTelegramPlane className="mr-1" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div className="flex items-center">
                  <FaLink className="mr-1" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">This is an issue of type: Task.</p>
                    <div className="description">
                      <p>Description</p>
                      {renderDesciption()}
                    </div>
                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img
                            src={require("../../assets/imgJira/download (1).jfif")}
                            alt="12321"
                          />
                        </div>
                        <form
                          onSubmit={handleSubmit((data) => {
                            let comment = {
                              ...data,
                              taskId: taskDetailModel.taskId,
                            };
                            dispatch(taskTypeAction.postCommentAction(comment));
                            dispatch(
                              taskTypeAction.getAllCommentAction(
                                taskDetailModel.taskId
                              )
                            );
                          })}
                        >
                          <div className="input-comment">
                            <input
                              type="text"
                              name="contentComment"
                              {...register("contentComment", {
                                required: true,
                              })}
                              placeholder="Add a comment ..."
                            />
                            <p>
                              <span style={{ fontWeight: 500, color: "gray" }}>
                                Protip:
                              </span>
                              <span>
                                press
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    background: "#ecedf0",
                                    color: "#b4bac6",
                                  }}
                                >
                                  M
                                </span>
                                to comment
                              </span>
                            </p>
                            <button className="btn btn-success" type="submit">
                              Add Comment
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div>
                              <div className="row">
                                {comment?.map((mem, index) => {
                                  return (
                                    <div className="col-12 mb-1" key={index}>
                                      <span>
                                        <img
                                          src={mem.user.avatar}
                                          alt="..."
                                          style={{
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            display: "inline-block",
                                          }}
                                        />
                                        <span className="text-black">
                                          : {mem.user.name}
                                        </span>
                                      </span>
                                      <p
                                        style={{
                                          fontStyle: "italic",
                                        }}
                                      >
                                        {mem.contentComment}
                                      </p>
                                      <span
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        className="text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                        }}
                                      >
                                        edit
                                      </span>
                                      <span>-</span>
                                      <span
                                        className="text-success"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          dispatch(
                                            taskTypeAction.DeleteCommentAction(
                                              mem.id
                                            )
                                          );
                                          dispatch(
                                            taskTypeAction.getAllCommentAction(
                                              mem.taskId
                                            )
                                          );
                                        }}
                                      >
                                        Delete
                                      </span>
                                      <hr />
                                    </div>
                                  );
                                })}
                              </div>
                              <div></div>
                            </div>
                          </div>
                          <button
                            className="btn btn-light"
                            type="button"
                            onClick={() => {
                              dispatch(
                                taskTypeAction.getAllCommentAction(
                                  taskDetailModel?.taskId
                                )
                              );
                            }}
                          >
                            View comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        className="custom-select"
                        value={taskDetailModel.statusId}
                        onChange={(e) => {
                          dispatch(
                            projectAction.updateStatusAction({
                              taskId: taskDetailModel.taskId,
                              statusId: e.target.value,
                              projectId: taskDetailModel.projectId,
                            })
                          );
                        }}
                      >
                        {arrStatus.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees mb-4">
                      <h6>ASSIGNEES</h6>
                      <div className="grid grid-cols-2">
                        {taskDetailModel?.assigness.map((user, index) => {
                          return (
                            <div
                              key={index}
                              style={{ display: "flex" }}
                              className="item items-center mr-2 mt-2"
                            >
                              <div className="avatar mr-1">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name font-bold flex items-center justify-between w-full">
                                {user.name}
                                <CloseOutlined
                                  className="cursor-pointer"
                                  onClick={() => {
                                    dispatch(
                                      updateTaskDetailModel({
                                        actionType: REMOVE_USER_ASSIGNESS,
                                        userId: user.id,
                                      })
                                    );
                                  }}
                                />
                              </p>
                            </div>
                          );
                        })}
                        <div className="mt-2 mr-2">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              let { value } = e.target;
                              if (value == "0") {
                                return;
                              }
                              let userSelect = projectDetail.members?.find(
                                (mem) => mem.userId == value
                              );
                              userSelect = {
                                ...userSelect,
                                id: userSelect.userId,
                              };
                              dispatch(
                                updateTaskDetailModel({
                                  actionType: CHANGE_ASSIGNEES,
                                  userSelected: userSelect,
                                })
                              );
                            }}
                          >
                            <option value="0">+ Add more</option>
                            {projectDetail.members
                              ?.filter((mem) => {
                                let index =
                                  taskDetailModel?.assigness.findIndex(
                                    (us) => us.id === mem.userId
                                  );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              ?.map((mem, index) => {
                                return (
                                  <option key={index} value={mem.userId}>
                                    {mem.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                      className="priority form-group"
                      style={{ marginBottom: 20 }}
                    >
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        className="form-control"
                        onChange={(e) => {
                          console.log("priority", e.target.value);
                          console.log("priority", taskDetailModel.taskId);
                          dispatch(
                            projectAction.updatePriorityAction({
                              taskId: taskDetailModel.taskId,
                              priorityId: Number(e.target.value),
                              projectId: taskDetailModel.projectId,
                            })
                          );
                        }}
                        value={taskDetailModel.priorityId}
                      >
                        {arrAllPriority?.map((priority, index) => {
                          return (
                            <option key={index} value={priority.priorityId}>
                              {priority.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        type="text"
                        className="estimate-hours"
                        value={taskDetailModel.originalEstimate}
                        onChange={(e) => {
                          dispatch(
                            projectAction.updateEstimateAction({
                              taskId: taskDetailModel.taskId,
                              originalEstimate: e.target.value,
                              projectId: taskDetailModel.projectId,
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalJura;
