import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SlideLayoutProps {
  children: React.ReactNode;
  showCurve?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function SlideLayout({ children, showCurve = true, style }: SlideLayoutProps) {
  return (
    <ImageBackground
      source={require('../assets/images/drops-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, style]}>
        {children}
        {showCurve && (
          <Image
            source={require('../assets/images/curve.png')}
            style={styles.curveImage}
            resizeMode="stretch"
          />
        )}
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
  },
  curveImage: {
    width: width * 0.95,
    height: height * 0.18,
    resizeMode: 'stretch',
    marginTop: -90,
    marginLeft: -64,
  },
});
