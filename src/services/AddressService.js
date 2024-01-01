import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getUserAddresses = async () => {
  console.log(`AddressService | getUserAddresses`);
  try {
    let addressResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.ADDRESS}/`,
      {
        headers: authHeader(getToken()),
      },
    );

    // console.log(addressResponse.data.data);

    if (addressResponse?.status === 200) {
      return {
        status: true,
        message: `User address data fetched`,
        data: addressResponse?.data.data,
      };
    } else {
      return {
        status: false,
        message: `User address data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : `User address data not found`,
    };
  }
};

export default {getUserAddresses};
