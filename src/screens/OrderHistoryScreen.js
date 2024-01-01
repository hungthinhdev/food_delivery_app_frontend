import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageProps, 
  Image,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Colors, Fonts, Images} from '../contants';
import {Display} from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StaticImageService} from '../services';
import OrderService from '../services/OrderService';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import { FlatList } from 'react-native-gesture-handler';

const OrderHistoryScreen = ({navigation}) => {
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  useEffect(() => {
    OrderService.getOrders().then((response) => {
      if (response.status === true) {
        setOrderHistoryList(response.data);
      }
    });
  }, []);

  const handleOpenModal = (orderId) => {
    setModalVisible(true);
    setSelectedOrderId(orderId);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleCancelOrder = async () => {
    OrderService.updateOrderStatus(selectedOrderId, "Canceled").then(response => {
      if (response.status === true) {
        setOrderHistoryList(status => status.filter(order => order._id !== selectedOrderId));
      }
    });
    setModalVisible(false);
  };

  const renderOrderItem = ({ item }) => {
    return (
      <View style={{ 
        flexDirection: "row", alignItems: "center", marginVertical: 10,
        backgroundColor: COLORS.primaryWhiteHex,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10,
      }}>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>
            Thời gian: {item.orderDate.hour}:{item.orderDate.minute} {item.orderDate.day}-{item.orderDate.month}-{item.orderDate.year}
          </Text>
          <Text style={{ marginTop: 4, color: "gray" }}>
            Tổng thanh toán: {item.totalPrice}
          </Text>
            {item.status === "Pending" && (
              <Text style={styles.orderStatus}>Đang xác nhận</Text>
            )}
            {item.status === "Processing" && (
              <Text style={styles.orderStatus}>Đang xác nhận</Text>
            )}
            {item.status === "Shipped" && (
              <Text style={styles.orderStatus}>Đã xác nhận</Text>
            )}
            {item.status === "OutForDelivery" && (
              <Text style={styles.orderStatus}>Đang trên đường vận chuyển</Text>
            )}
            {item.status === "Delivered" && (
              <Text style={styles.orderStatus}>Đã nhận hàng</Text>
            )}
            {item.status === "Cancelled" && (
              <Text style={styles.orderStatus}>Đơn hàng đã bị huỷ</Text>
            )}
            {(item.status === null || item.status.length === 0) && (
              <Text style={styles.orderStatus}>Đang xác nhận</Text>
            )}
            <Text style={styles.orderStatus}>Đang xác nhận</Text>
        </View>
        <Pressable
          onPress={() => handleOpenModal(item._id)}
          style={{
            backgroundColor: '#ff5948',
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Huỷ đơn hàng
          </Text>
        </Pressable> 
      </View>      
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lịch sử đặt hàng</Text>
      <FlatList
        data={orderHistoryList}
        keyExtractor={(item) => item._id}
        renderItem={(item) => renderOrderItem(item)}
      />
      <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ 
            backgroundColor: COLORS.primaryOrangeHex, 
            paddingVertical: 8,
            marginHorizontal: 96,
            borderRadius: 8,
          }}
        >
        <Text style={{ 
          fontSize: FONTSIZE.size_18, 
          color: COLORS.primaryWhiteHex, 
          textAlign: "center",
        }}>
            Quay lại
        </Text>
      </TouchableOpacity>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bạn muốn huỷ đơn hàng</Text>
              <View style={{flexDirection: "row", 
                  justifyContent: "center", alignContent: "center",
                  gap: 10,
              }}>
                <Pressable
                  style={[styles.button, {color: COLORS.primaryWhiteHex}]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Đóng</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleCancelOrder}>
                  <Text style={styles.textStyle}>Xác nhận</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
            }


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  heading: {
    marginTop: 50,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: "center",
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    color: COLORS.primaryBlackRGBA,
  },
  orderItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    textAlign: "left", 
    color: Colors.GOOGLE_BLUE,
    fontSize: FONTSIZE.size_16,
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;