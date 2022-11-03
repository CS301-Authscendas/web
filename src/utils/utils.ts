import { message } from 'antd';
import notification, { NotificationPlacement } from 'antd/lib/notification';
import axios from 'axios';
import { ENDPOINTS, LoginMethod, USER_ENDPOINTS } from '../consts';

export const openNotification = (
  placement: NotificationPlacement,
  msg: string,
  description?: string
) => {
  notification.info({
    message: msg,
    description,
    placement
  });
};

export const getUserDetails = async (
  jwtToken: string,
  loginMethod: LoginMethod
) => {
  try {
    const resp = await axios.get(
      `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.GET_USER}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'login-method': loginMethod
        }
      }
    );
    return resp.data.data.userDetails;
  } catch (e) {
    message.error('Error occurred retrieving user roles');
  }
};
