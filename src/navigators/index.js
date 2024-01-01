import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  SigninScreen,
  SignupScreen,
  ForgotPasswordScreen,
  RegisterPhoneScreen,
  VerificationScreen,
  HomeScreen,
  RestaurantScreen,
  FoodScreen,
  EditProfileScreen,
  AddressPickerScreen,
  OrderConfirmationScreen,
  OrderScreen,
  OrderHistoryScreen,
  RecoverPasswordScreen,
} from '../screens';
import HomeTabs from './BottomTabs';
import {useSelector, useDispatch} from 'react-redux';
import {GeneralAction} from '../actions';
import UserService from '../services/UserService';

const Stack = createStackNavigator();

const Navigators = () => {
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state?.generalState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen 
              name="RecoverPassword"
              component={RecoverPasswordScreen}
            ></Stack.Screen>
            <Stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
            <>
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="Restaurant" component={RestaurantScreen} />
              <Stack.Screen name="Food" component={FoodScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="AddressPicker" component={AddressPickerScreen} />
              <Stack.Screen name="Confirmation" component={OrderConfirmationScreen} />
              <Stack.Screen name="Order" component={OrderScreen} />
              <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default Navigators;
