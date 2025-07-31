

import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { customFonts, fontFamily } from '../../utils/fonts';

const { width, height } = Dimensions.get('window');

export default function AddLocation() {
  const [fontsLoaded] = useFonts(customFonts);
  const router = useRouter();

  if (!fontsLoaded) return null;

  const handleLocation = () => {
    router.push('/(auth)/select-location');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/drops-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/location-hand.png')}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <Image
          source={require('../../assets/images/curve.png')}
          style={styles.curveImage}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.title}>
            Please add <Text style={styles.highlight}>your Location</Text>
          </Text>
          <Text style={styles.subtitle}>
            Adding your location will help us find delivery options available in your area.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleLocation}>
            <Text style={styles.buttonText}>Add current location</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 2,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
  },
  mainImage: {
    width,
    height: height * 0.6,
  },
  curveImage: {
    width: width * 0.95,
    height: height * 0.18,
    resizeMode: 'stretch',
    marginTop: -90,
    marginLeft: -64,
  },
  card: {
    flex: 1,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: '#000',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  highlight: {
    color: '#007BFF',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: '#333',
    marginBottom: 30,
  },
  button: {
    marginTop: 80,
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: fontFamily.regular,
  },
});
