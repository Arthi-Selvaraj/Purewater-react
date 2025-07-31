import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Checkbox } from 'react-native-paper';
import { useFonts } from 'expo-font';

import CustomInput from '../../components/CustomInput';
import PasswordInput from '../../components/PasswordInput';
import { customFonts, fontFamily } from '../../utils/fonts';

const { width } = Dimensions.get('window');

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) return null;

  const handleSignup = () => {
    if (!name || !phone || !email || !password || !checked) {
      Alert.alert('Validation Error', 'Please fill all fields and agree to terms.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    router.push('/(auth)/verification');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/drops-bg.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.header}>Sign Up</Text>

        <CustomInput label="Full Name" value={name} onChangeText={setName} placeholder="Name" />
        <CustomInput label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Your Mobile Number" />
        <CustomInput label="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
        <PasswordInput label="Create Password" value={password} onChangeText={setPassword} />

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color="#007BFF"
          />
          <Text style={styles.checkboxText}>I agree to the Terms & Privacy Policy</Text>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>Or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialIcons}>
          <Image source={require('../../assets/icons/google.png')} style={styles.socialIcon} />
          <Image source={require('../../assets/icons/facebook.png')} style={styles.socialIcon} />
        </View>

        <Text style={styles.footerText}>
          Already have an account?
          <Text style={styles.signinText} onPress={() => router.push('/(auth)/signin')}>
            {' '}Login
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
  },
   header: {
    fontSize: 25,
    fontFamily: fontFamily.regular, 
    color: '#007BFF',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamily.regular, 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: '#000',
  },
  signupButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 10,
    fontFamily: fontFamily.regular,
    color: '#666',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  socialIcon: {
    width: 45,
    height: 45,
    marginHorizontal: 12,
    resizeMode: 'contain',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: '#333',
  },
  signinText: {
    color: '#007BFF',
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
});
