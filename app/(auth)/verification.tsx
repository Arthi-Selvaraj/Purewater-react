import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Verification() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(150); // 2 min 30 sec
  const router = useRouter();

    const [fontsLoaded] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
      });
    
      if (!fontsLoaded) return null;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleContinue = () => {
    if (otp.length === 6) {
      router.push('/(auth)/add-location');
    } else {
      alert('Enter 6-digit OTP');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/drops-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/PureWaterLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Verify <Text style={styles.blue}>Your Number</Text>
        </Text>

        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to +91 98765 43210
        </Text>

        <Text style={styles.timer}>
          {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.resend}>
          Don’t receive the OTP?{' '}
          <Text style={styles.blue}>Resend</Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 220,
    height: 150,
    marginTop: 60,
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins',
    letterSpacing: 0.6
  },
  blue: {
    color: '#007BFF',
  },
  subtitle: {
    marginTop: 20,
    color: '#444',
    fontSize: 14,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins',
  },
  timer: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop:30,
    fontFamily: 'Poppins',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    //borderRadius: 6,
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 16,
    marginTop: 2,
  },
  resend: {
    
    marginBottom: 10,
    color: '#444',
    fontSize: 14,
    fontFamily: 'Poppins',
    //textDecorationLine:'underline',
  },
  button: {
    backgroundColor: '#007BFF',
    marginTop: 20,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    //fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});
