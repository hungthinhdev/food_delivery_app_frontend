import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React ,{useEffect} from "react";
import LottieView from "lottie-react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const OrderScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace("HomeTabs");
        }, 1300);
      }, []);
  return (
    <SafeAreaView style={{ 
      backgroundColor: "white", flex: 1,
    }}>
      <LottieView
        source={require("../assets/thumbs.json")}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 100,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
          paddingHorizontal: 10,
        }}
      >
        Chúc mừng bạn đã đặt hàng thành công.
      </Text>
      <Pressable
        onPress={() => navigation.navigate("HomeTabs")}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginHorizontal: 30,
        }}
        >
          <Text style={{ 
            color: COLORS.primaryWhiteHex,
            fontSize: FONTSIZE.size_20,
            paddingVertical: 6,
          }}>Trở về trang chủ</Text>
        </Pressable>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});