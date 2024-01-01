import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getUserData = async () => {
  console.log(`UserService | getUserData`);
  try {
    let userResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-user`,
      {
        headers: authHeader(getToken()),
      },
    );

    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `User data fetched`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `User data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : `User data not found`,
    };
  }
};

const updateUserData = async (userInfo) => {
  console.log(`UserService | updateUserData`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/update-user/`,
      userInfo,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `UserInfo updated successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `UserInfo updated failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `UserInfo updated failed`,
    };
  }
};

const checkExistingUser = async username => {
  console.log(`UserService | checkExistingUser`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/check-existing/`,
      {
        'username': username,
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: 'User exists',
      };
    } else {
      return {
        status: false,
        message: 'User not found',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Username not found',
    };
  }
};

const recoverUserPassword = async (username, password) => {
  console.log(`UserService | recoverUserPassword`);
  const updated = {
    username,
    password,
  };
  try {
    let response = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/recover-password/`,
      updated,
    );
    if (response.status === 200) {
      return {
        status: true,
        message: 'Recover Password Successfully',
        data: response.data.data,
      };
    } else {
      return {
        status: false,
        message: 'Recover Password Failed',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Username not found',
    };
  }
};

export default {
  getUserData,
  updateUserData,
  checkExistingUser,
  recoverUserPassword,
};
