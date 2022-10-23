import notification, { NotificationPlacement } from 'antd/lib/notification';

export const openNotification = (
  placement: NotificationPlacement,
  message: string,
  description: string
) => {
  notification.info({
    message: `${message}`,
    description: `${description}`,
    placement
  });
};
