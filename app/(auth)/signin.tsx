// app/(auth)/signin.tsx

import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Checkbox } from 'react-native-paper';

import { customFonts, fontFamily } from '../../utils/fonts';
import CustomInput from '../../components/CustomInput';
import PasswordInput from '../../components/PasswordInput';

const { width, height } = Dimensions.get('window');

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) return null;

  const validateAndLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    router.push('/(tabs)/home');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/drops-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.welcome}>Welcome Back!</Text>

        <Image
          source={require('../../assets/images/PureWaterLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.loginTitle}>Login</Text>

        <CustomInput
          label="Phone Number or Email Id"
          value={email}
          onChangeText={setEmail}
          placeholder="username"
        />

        <PasswordInput
          label="Password"
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <View style={styles.rememberRow}>
            <Checkbox
              status={remember ? 'checked' : 'unchecked'}
              onPress={() => setRemember(!remember)}
              color="#007BFF"
            />
            <Text style={styles.rememberText}> Remember me</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={validateAndLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>Or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <Image source={require('../../assets/icons/google.png')} style={styles.socialIcon} />
          <Image source={require('../../assets/icons/facebook.png')} style={styles.socialIcon} />
        </View>

        <Text style={styles.footerText}>
          Don’t have an account?
          <Text
            style={styles.signUpText}
            onPress={() => router.push('/(auth)/signup')}
          >
            {' '}Sign Up
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
    height,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  welcome: {
    fontSize: 18,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontFamily: fontFamily.regular,
    color: '#007BFF',
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamily.regular,
  },
  forgot: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 10,
    color: '#666',
    fontFamily: fontFamily.regular,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  socialIcon: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  footerText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  signUpText: {
    color: '#007BFF',
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
});
