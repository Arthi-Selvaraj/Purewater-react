import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Checkbox } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

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

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Mobile Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Your123@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Create Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="xxxxxxxxx"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconContainer}
          >
            <Image
              source={require('../../assets/icons/eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

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
          <Image
            source={require('../../assets/icons/google.png')}
            style={styles.socialIcon}
          />
          <Image
            source={require('../../assets/icons/facebook.png')}
            style={styles.socialIcon}
          />
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
    width: width,
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
  },
  header: {
    fontSize: 25,
    fontFamily: 'Poppins',
    fontWeight:700,
    color: '#007BFF',
    marginBottom: 20,
    letterSpacing:0.5
  },
  label: {
    fontFamily: 'Poppins',
     fontWeight:700,
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    //borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
    color: '#000',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#000',
  },
  signupButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    //borderRadius: 6,
    alignItems: 'center',
    marginBottom: 25,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
    color: '#333',
  },
  signinText: {
    color: '#007BFF',
    fontFamily: 'Poppins',
     textDecorationLine: 'underline',
  },
});
