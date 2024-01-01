import { 
  Text, 
  View, 
  ScrollView, 
  Pressable,
  Alert ,
  StyleSheet, 
  TouchableOpacity,
  FlatList,
  Touchable,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "react-native-vector-icons/Entypo";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RazorpayCheckout from "react-native-razorpay";
import AddressService from '../services/AddressService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Mock} from '../contants';
import { v4 as uuidv4 } from 'uuid';
import {Display} from '../utils';
import OrderService from '../services/OrderService';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {CartAction} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

const OrderConfirmationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state?.cartState?.cart);

  const steps = [
    { title: "Address", content: "Địa chỉ thanh toán" },
    { title: "Delivery", content: "Giao hàng" },
    { title: "Payment", content: "Phương thức thanh toán" },
    { title: "Place Order", content: "Đặt hàng thành công" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    AddressService.getUserAddresses().then(response => {
      let fetchedAddresses = response.data;
      setAddresses(fetchedAddresses);
    });
  }, []);

  
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [orderDate, setOrderDate] = useState({});

  useEffect(() => {
    const getCurrentDate = () => {
      const currentDate = new Date();
      const currentOrderDate = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes(),
      };
      setOrderDate(currentOrderDate);
    };
    getCurrentDate();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        cartItems: cart,
        totalPrice: cart?.metaData?.grandTotal,
        shippingAddress: addresses.filter(item => item._id === selectedAddressId)[0].name,
        paymentMethod: selectedOption,
        orderDate: orderDate,
        status: "pending",
      };

      OrderService.addOrder(orderData).then(response => {
        console.log(response);
        if (response.status === true) {
          navigation.navigate("Order");
          dispatch({ type: CartAction.types.CLEAN_CART });
          console.log("order created successfully", response.data);
        } else {
          console.log("error creating order", response.data);
        }
      }).catch(error => {
        console.log("errror", error);
      });
    } catch (error) {
      console.log("errror", error);
    }
  };

  const renderAddressItem = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "#D0D0D0",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          paddingBottom: 17,
          marginVertical: 7,
          borderRadius: 6,
        }}
      >
        {selectedAddressId && selectedAddressId === item?._id ? (
          <TouchableOpacity
            onPress={() => setSelectedAddressId("")}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={25}
              color={Colors.DEFAULT_GREEN}
              />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setSelectedAddressId(item._id)}
          >
            <Ionicons
              name="ellipse-outline"
              size={25}
              color={Colors.DEFAULT_GREY}
            />
          </TouchableOpacity>
        )}

        <View style={{ marginLeft: 6 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item?.name}
            </Text>
            <Ionicons
              name="location-outline"
              size={18}
              color="red"
            />
          </View>

          <Text style={{ fontSize: 15, color: "#181818" }}>
            Số điện thoại : {item?.phone}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 7,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#F5F5F5",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D17842",
              }}
            >
              <Text style={{ color: "#D17842" }}>Chỉnh sửa</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: Colors.DEFAULT_WHITE,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: Colors.LIGHT_RED,
              }}
            >
              <Text style={{ color: Colors.DEFAULT_RED }}>Xoá</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: Colors.DEFAULT_GREEN,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text style={{ color: Colors.DEFAULT_WHITE }}>Đặt làm mặt định</Text>
            </Pressable>
          </View>

          <View>
            {selectedAddressId && selectedAddressId === item?._id && (
              <Pressable
                onPress={() => setCurrentStep(1)}
                style={{
                  backgroundColor: "#008397",
                  padding: 10,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Giao hàng đến địa chỉ này
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Thanh toán</Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Chọn địa chỉ giao hàng
          </Text>

          <FlatList
            data={addresses}
            renderItem={item => renderAddressItem(item)}
            keyExtractor={item => item._id}
          />

          <Pressable
            onPress={() => setCurrentStep(1)}
            style={{
              backgroundColor: COLORS.primaryOrangeHex,
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ 
              color: COLORS.primaryWhiteHex,
              fontSize: FONTSIZE.size_16,
            }}>
              Tiếp tục
            </Text>
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Phương thức giao hàng
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <TouchableOpacity
                onPress={() => setOption(!option)}
              >
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setOption(!option)}
              >
                <Ionicons
                  name="ellipse-outline"
                  size={25}
                  color={Colors.DEFAULT_GREY}
                />
              </TouchableOpacity>
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Giao hàng nhanh
              </Text>{" "}
              - Miễn phí giao hàng với tài khoản thành viên.
            </Text>
          </View>

          <View style={{ 
            flex: 1, flexDirection: "row", 
            justifyContent: "center", alignContent: "center", 
            gap: 16,
          }}>
            <Pressable
              onPress={() => setCurrentStep(0)}
              style={{
                backgroundColor: COLORS.primaryWhiteHex,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                borderColor: COLORS.secondaryLightGreyHex,
                borderWidth: 2,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{
                color: COLORS.secondaryDarkGreyHex,
                fontSize: FONTSIZE.size_16,
              }}>
                Quay lại
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: COLORS.primaryOrangeHex,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ 
                color: COLORS.primaryWhiteHex,
                fontSize: FONTSIZE.size_16,
              }}>
                Tiếp tục
              </Text>
            </Pressable>
          </View>
          
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Chọn phương thức thanh toán
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <TouchableOpacity
                onPress={() => setSelectedOption("")}
              >
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSelectedOption("cash")}
              >
                <Ionicons
                  name="ellipse-outline"
                  size={25}
                  color={Colors.DEFAULT_GREY}
                />
              </TouchableOpacity>
            )}

            <Text>Thanh toán khi nhận hàng</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "card" ? (
              <TouchableOpacity
              onPress={() => setSelectedOption("")}
              >
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSelectedOption("card")}
              >
                <Ionicons
                  name="ellipse-outline"
                  size={25}
                  color={Colors.DEFAULT_GREY}
                />
              </TouchableOpacity>
            )}

            <Text>Thanh toán qua liên kết ngân hàng</Text>
          </View>
          <View style={{ 
            flex: 1, flexDirection: "row", 
            justifyContent: "center", alignContent: "center", 
            gap: 16,
          }}>
            <Pressable
              onPress={() => setCurrentStep(1)}
              style={{
                backgroundColor: COLORS.primaryWhiteHex,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                borderColor: COLORS.secondaryLightGreyHex,
                borderWidth: 2,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{
                color: COLORS.secondaryDarkGreyHex,
                fontSize: FONTSIZE.size_16,
              }}>
                Quay lại
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: COLORS.primaryOrangeHex,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ 
                color: COLORS.primaryWhiteHex,
                fontSize: FONTSIZE.size_16,
              }}>
                Tiếp tục
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Bạn chọn thanh toán
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: FONTSIZE.size_16, color: COLORS.secondaryBlackRGBA }}>
              Giao hàng tới {addresses.filter(item => item._id === selectedAddressId)[0].name}
            </Text>

            <Text
              style={{ fontSize: FONTSIZE.size_16, color: COLORS.secondaryBlackRGBA }}
            >
              Thời gian: {orderDate.hour}:{orderDate.minute} {orderDate.day}/{orderDate.month}/{orderDate.year}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Chưa tính phí vận chuyển
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>
                ${cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Phí vận chuyển
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>$0</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tổng cộng
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                ${cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ 
              fontSize: 18, color: Colors.DARK_ONE,
              paddingBottom: 8,
            }}>
              Phương thức thanh toán 
            </Text>
            <Text style={{ 
              fontSize: FONTSIZE.size_16,
            }}>
              {selectedOption == "cash" ? "Thanh toán khi nhận hàng" : "" }
              {selectedOption == "card" ? "Đã thanh toán qua thẻ ngân hàng" : ""}
            </Text>
          </View>
          
          <View style={{ 
            flex: 1, flexDirection: "row", 
            justifyContent: "center", alignContent: "center", 
            gap: 16,
          }}>
            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: COLORS.primaryWhiteHex,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                borderColor: COLORS.secondaryLightGreyHex,
                borderWidth: 2,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{
                color: COLORS.secondaryDarkGreyHex,
                fontSize: FONTSIZE.size_16,
              }}>
                Quay lại
              </Text>
            </Pressable>
            <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            >
              <Text style={{ 
                color: COLORS.primaryWhiteHex,
                fontSize: FONTSIZE.size_16,
                paddingVertical: 6,
              }}>Xác nhân thanh toán</Text>
            </Pressable>
          </View>
        </View> 
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default OrderConfirmationScreen;
