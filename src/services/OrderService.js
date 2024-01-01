import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const addOrder = async (orderData) => {
  console.log(`OrderService | addOrder`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.ORDER}/`,
      orderData,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Order added successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Order adding failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Order adding failed`,
    };
  }
};

const getOrders = async () => {
  console.log('OrderService | getOrders');
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.ORDER}/`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Fetch orders successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Order fetching failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Order fetching failed`,
    };
  }
};

const updateOrderStatus = async (orderId, orderStatus) => {
  console.log('OrderService | updateOrderStatus');
  const orderData = {
    orderId,
    orderStatus,
  };
  try {
    let response = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.ORDER}/`,
      orderData,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Cancel order successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Cancel order failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Cancel order failed`,
    };
  }
};

export default {addOrder, getOrders, updateOrderStatus};
