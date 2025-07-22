import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 New state for eye toggle

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

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

        <Text style={styles.label}>Phone Number or Email Id</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="xxxxxxxxxxx"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeIcon}
          >
            <Image
              source={require('../../assets/icons/eye.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

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
    fontFamily: 'Poppinsbold',
    fontWeight: 700,
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
    fontFamily: 'Poppinsbold',
    color: '#007BFF',
    fontWeight:700,
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  label: {
    fontFamily: 'Poppins',
    fontWeight:700,
    marginBottom: 6,
    color: '#000',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
    color: '#000', // 👈 Ensures black text
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
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
    fontFamily: 'Poppins',
  },
  forgot: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Poppins',
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
    fontFamily: 'PoppinsBold',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
  },
  signUpText: {
    color: '#007BFF',
    fontFamily: 'Poppins',
     textDecorationLine: 'underline',
  },
});
