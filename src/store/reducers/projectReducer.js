
import { CHANGE_TASK_MODAL, GET_ALL_PROJECT, PUT_PROJECT_DETAIL, SET_PROJECT_DETAIL, SET_SUBMIT_EDIT_PROJECT, SET_TASK_DETAIL } from "../types/projectType"
import { CHANGE_ASSIGNEES } from "../types/TaskType"
import { REMOVE_USER_ASSIGNESS } from "../types/usersType"


const stateDefault = {
    arrAllProject: [
        {
            "members": [
                {
                    "userId": 2387,
                    "name": "123",
                    "avatar": "https://ui-avatars.com/api/?name=123"
                }
            ],
            "creator": {
                "id": 3062,
                "name": "Ngô Đắc Hoà"
            },
            "id": 9285,
            "projectName": "những project đã có task không vậy? Chỉ những có đã được thêm task thôi nha",
            "description": "<p>Test Project</p>",
            "categoryId": 3,
            "categoryName": "Dự án di động",
            "alias": "nhung-project-da-co-task-khong-vay-chi-nhung-co-da-duoc-them-task-thoi-nha",
            "deleted": false
        },
        {
            "members": [],
            "creator": {
                "id": 2914,
                "name": "Hoa"
            },
            "id": 9293,
            "projectName": "adadadaa8123123",
            "description": "giugig",
            "categoryId": 3,
            "categoryName": "Dự án di động",
            "alias": "adadadaa8123123",
            "deleted": false
        },
        {
            "members": [
                {
                    "userId": 2396,
                    "name": "VuiLenDi",
                    "avatar": "https://ui-avatars.com/api/?name=VuiLenDi"
                },
                {
                    "userId": 2914,
                    "name": "Hoa",
                    "avatar": "https://ui-avatars.com/api/?name=Hoa"
                }
            ],
            "creator": {
                "id": 3062,
                "name": "Ngô Đắc Hoà"
            },
            "id": 9307,
            "projectName": "vfdfvdfv123",
            "description": "<p>adfvadfdfsf",
            "categoryId": 2,
            "categoryName": "Dự án phần mềm",
            "alias": "vfdfvdfv123",
            "deleted": false
        },
    ],
    arrAllProject1: [],
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "string"
    },
    projectDetail: {},
    taskDetailModel: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
          },
          "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
          },
          "assigness": [
            {
              "id": 2413,
              "avatar": "https://ui-avatars.com/api/?name=Dutch Lady",
              "name": "Dutch Lady",
              "alias": "dutch-lady"
            },
            {
              "id": 2461,
              "avatar": "https://ui-avatars.com/api/?name=ll",
              "name": "ll",
              "alias": "ll"
            }
          ],
          "lstComment": [],
          "taskId": 7189,
          "taskName": "321321",
          "alias": "321321",
          "description": "<p>321321</p>",
          "statusId": "2",
          "originalEstimate": 321321321,
          "timeTrackingSpent": 5,
          "timeTrackingRemaining": 6,
          "typeId": 1,
          "priorityId": 1,
          "projectId": 9403
    },
}

export const projectReducer = (state = stateDefault, { type, payload, name, value, userSelected, userId }) => {
    switch (type) {
        case GET_ALL_PROJECT: {
            return { ...state, arrAllProject: payload, arrAllProject1: payload }
        }
        case SET_PROJECT_DETAIL: {
            return {...state, projectEdit: payload}
        }
        case PUT_PROJECT_DETAIL: {
            return {...state, projectDetail: payload}
        }
        case SET_TASK_DETAIL: {
            return {...state, taskDetailModel: payload}
        }
        case CHANGE_TASK_MODAL: {
            console.log(state.taskDetailModel);
            return {...state, taskDetailModel: {...state.taskDetailModel, [name]: value}}
        }

        case CHANGE_ASSIGNEES: {
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness, userSelected]
            return {...state }
        }

        case REMOVE_USER_ASSIGNESS: {
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness.filter(us => us.id !== userId)]
            return {...state }
        }
        default: return { ...state }
    }
}