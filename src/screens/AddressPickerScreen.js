import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View } from 'react-native';
const AddressPickerScreen = () => {
  const handleSelectAddress = (data, details = null) => {
    console.log(data, details);
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GooglePlacesAutocomplete
        placeholder='Tìm kiếm địa chỉ nhận hàng'
        onPress={handleSelectAddress}
        query={{
          key: 'AIzaSyDcQ7z16PswrRunWlv6Vh8IE3iV9OjTj4s',
          language: 'en',
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
      />
    </View>
  );
};

export default AddressPickerScreen;