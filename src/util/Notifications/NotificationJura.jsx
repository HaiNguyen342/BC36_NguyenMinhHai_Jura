import { notification } from "antd";


export const openNotificationWithIcon = (type, message, description = '') => {
    notification[type]({// type: success || error || info || warning
        message: message,
        description: description,
    });
};