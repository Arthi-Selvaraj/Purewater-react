import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaymentSuccessful() {
  const router = useRouter();

  // Handle back swipe / hardware back
  useEffect(() => {
    const backAction = () => {
      router.replace('/(tabs)/home'); // 👈 change this to your home route
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
source={require('../../assets/icons/success-icon.png')}
style={styles.successIcon}
      />
<View>
  <Text style={styles.successText}>Payment</Text>
  <Text style={styles.successText}>successful!</Text>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
    
  },
  successText: {
  fontSize: 28,
  fontWeight: '700',
  color: '#222',
  textAlign: 'center',
  lineHeight: 30,
}
});
