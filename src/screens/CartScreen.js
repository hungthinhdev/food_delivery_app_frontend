import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import {Colors, Fonts, Images} from '../contants';
import {FoodCard, Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Display} from '../utils';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import {CartAction} from '../actions';
import {useDispatch} from 'react-redux';

const CartScreen = ({navigation}) => {
  const cart = useSelector(state => state?.cartState?.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const checkoutSuccessfullyHandler = () => {
    // setModalVisible(true);
    navigation.navigate("Confirmation");
  };

  const browseMoreFoodHandler = () => {
    setModalVisible(!modalVisible);
    const cartItems = cart.cartItems;
    for (let item of cartItems) {
      const foodId = item.foodId;
      dispatch(CartAction.removeFromCart({foodId}));
    }
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Thanh toán</Text>
      </View>
      {cart?.cartItems?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {cart?.cartItems?.map(item => (
                <FoodCard
                  {...item?.food}
                  key={item?.food?.id}
                  navigate={() =>
                    navigation.navigate('Food', {foodId: item?.id})
                  }
                />
              ))}
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Tổng tiền</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.itemsTotal?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Discount</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.discount?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Phí vận chuyển</Text>
                <Text
                  style={{...styles.amountText, color: Colors.DEFAULT_GREEN}}>
                  Miễn phí
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Tổng cộng</Text>
              <Text style={styles.totalText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton} 
              onPress={checkoutSuccessfullyHandler}
            >
              <View style={styles.rowAndCenter}>
                <Text style={styles.checkoutText}>Thanh toán</Text>
              </View>
              <Text style={styles.checkoutText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </TouchableOpacity>
            <Separator height={Display.setHeight(9)} />
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
                  <Text style={styles.modalHeader}>Bạn đã đạt hàng thành công</Text>
                  <Text style={styles.modalText}>
                    Đơn hàng của bạn sẽ được giao trong thời gian sớm nhất. Cảm ơn bạn đã sử dụng dịch vụ.
                  </Text>
                  <Pressable
                    onPress={browseMoreFoodHandler}>
                    <Text style={styles.textStyle}>Tiếp tục đặt món ăn</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Chưa có món ăn nào</Text>
          <Text style={styles.emptyCartSubText}>
            Mời bạn đặt thêm món ăn mới
          </Text>
          <TouchableOpacity 
            style={styles.addButtonEmpty}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Tìm kiếm món ăn</Text>
          </TouchableOpacity>
          <Separator height={Display.setHeight(15)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: Display.setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: Display.setWidth(80),
    backgroundColor: Colors.DEFAULT_GREEN,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: Display.setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: Display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
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
    color: '#69aeac',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  }
});

export default CartScreen;
