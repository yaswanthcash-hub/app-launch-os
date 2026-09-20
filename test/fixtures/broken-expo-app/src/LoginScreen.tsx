import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

export function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendCode = async () => {
    // True call to SMS verification with no mock or bypass
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  };

  return (
    <View>
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
      <TouchableOpacity onPress={sendCode}>
        <Text>Send SMS Code</Text>
      </TouchableOpacity>
    </View>
  );
}
