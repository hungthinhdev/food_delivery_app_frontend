import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator, 
  Animated, 
  Easing,
} from 'react-native';
import {Separator, ToggleButton} from '../components';
import {Colors, Fonts, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Display} from '../utils';
import {useDispatch} from 'react-redux';
import {StorageService} from '../services';
import {GeneralAction} from '../actions';
import UserService from '../services/UserService';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState({});
  const [userData, setUserData] = useState(null);
  const [userPlaceholder, setUserPlaceholder] = useState({});

  const [isUpdatedUserInfo, setIsUpdatingUserInfo] = useState(false);

  useEffect(() => {
    UserService.getUserData().then(response => {
      const userInfo = response.data.data;
      const userInfoPlaceholder = {};

      if (!userInfo.hasOwnProperty("firstName")) {
        userInfoPlaceholder.firstName = "Chưa có thông tin họ";
      } else {
        userInfoPlaceholder.firstName = userInfo.firstName;
      }

      if (!userInfo.hasOwnProperty("lastName")) {
        userInfoPlaceholder.lastName = "Chưa có thông tin tên";
      } else {
        userInfoPlaceholder.lastName = userInfo.lastName;
      }

      if (!userInfo.email) {
        userInfoPlaceholder.email = "Chưa có thông tin địa chỉ email";
      } else {
        userInfoPlaceholder.email = userInfo.email;
      }

      if (!userInfo.about) {
        userInfoPlaceholder.about = "Chưa có thông tin about";
      } else {
        userInfoPlaceholder.about = userInfo.about;
      }

      if (!userInfo.phone) {
        userInfoPlaceholder.phone = "Chưa có thông tin số điện thoại";
      } else {
        userInfoPlaceholder.phone = userInfo.phone;
      }

      if (!userInfo.address) {
        userInfoPlaceholder.address = "Chưa có thông tin địa chỉ";
      } else {
        userInfoPlaceholder.address = userInfo.address;
      }

      setActiveUser(userInfo);
      setUserData(userInfo);
      setUserPlaceholder(userInfoPlaceholder);
    })
  }, []);

  const handleUpdateUserInfo = () => {
    console.log(userData);
    setIsUpdatingUserInfo(true);
    UserService.updateUserData(userData).then(response => {
      setIsUpdatingUserInfo(false);
      setUserData(response.data);
    });
  };

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, [animation]);

  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={Colors.DEFAULT_WHITE}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Thông tin tài khoản</Text>
        <View>
          <Feather name="bell" size={20} color={Colors.DEFAULT_WHITE} />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
      </View>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={{
            uri: 'https://tse4.mm.bing.net/th?id=OIP.PMhANanxddOBObcYxcYOcwHaGy&pid=Api&P=0&h=180'
          }} />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>{activeUser.username}</Text>
          <Text style={styles.emailText}>{activeUser.email}</Text>
        </View>
      </View>

      {/* Main EditProfile Start */}

      {isUpdatedUserInfo == false ?
      (<View style={styles.mainContainer}>

      {/* first name */}
        <View style={styles.action}>
          <Ionicons name="person-circle-outline" color="#333333" size={20} />
          <TextInput
            placeholder={userPlaceholder.firstName}
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.firstName : 'Thành' }
            onChangeText={(txt) => setUserData({...userData, firstName: txt})}
            style={styles.textInput}
          />
        </View>

        {/* Last Name */}
        <View style={styles.action}>
          <Ionicons name="person-circle-outline" color="#333333" size={20} />
          <TextInput
            placeholder={userPlaceholder.lastName}
            placeholderTextColor="#666666"
            value={userData ? userData.lastName : "Hưng" }
            onChangeText={(txt) => setUserData({...userData, lastName: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        
        {/* Email */}
        <View style={styles.action}>
          <Ionicons name="mail-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder={userPlaceholder.email}
            placeholderTextColor="#666666"
            value={userData ? userData.email : '' }
            onChangeText={(txt) => setUserData({...userData, about: txt})}
            autoCorrect={true}
            style={[styles.textInput, {height: 40}]}
          />
        </View>

        {/* About */}
        <View style={styles.action}>
          <Ionicons name="clipboard-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder={userPlaceholder.about}
            placeholderTextColor="#666666"
            value={userData ? userData.about : ''}
            onChangeText={(txt) => setUserData({...userData, about: txt})}
            autoCorrect={true}
            style={[styles.textInput, {height: 40}]}
          />
        </View>

        {/* Phone */}
        <View style={styles.action}>
          <Feather name="phone" color="#333333" size={20} />
          <TextInput
            placeholder={userPlaceholder.phone}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={userData ? userData.phone : ''}
            onChangeText={(txt) => setUserData({...userData, phone: txt})}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#333333"
            size={20}
          />
          <TextInput
            placeholder={userPlaceholder.address}
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.city : ''}
            onChangeText={(txt) => setUserData({...userData, city: txt})}
            style={styles.addressInput}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("AddressPicker")}
          >
            <Ionicons name="earth-outline" color="#333333" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={handleUpdateUserInfo}
        >
          <Text style={styles.checkoutText}>Cập nhật</Text>
        </TouchableOpacity>

        {/* Main EditProfile End */}
      </View>)
      : (
        <View style={styles.mainContainer}>
          <Text style={styles.isUpdatingAnouncement}>Đang cập nhật thông tin. Vui lòng chờ trong giây lát.</Text>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <ActivityIndicator size="large" color="#3498db" />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: 100,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  alertBadge: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  profileHeaderContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImageContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    elevation: 3,
  },
  profileImage: {
    width: Display.setWidth(15),
    height: Display.setWidth(15),
    borderRadius: 32,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  emailText: {
    fontSize: 10,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  menuContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
  },
  menuIcon: {
    backgroundColor: Colors.LIGHT_GREEN,
    height: Display.setWidth(8),
    width: Display.setWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  menuText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center',
    marginTop: 5,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.DEFAULT_WHITE,
    elevation: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginTop: 25,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 13,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 13 * 1.4,
    color: Colors.INACTIVE_GREY,
    marginLeft: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  addressInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
    flexGrow: 1,
  },
  isUpdatingAnouncement: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    marginBottom: SPACING.space_4,
    fontWeight: "700",
  }
});

export default EditProfileScreen;
