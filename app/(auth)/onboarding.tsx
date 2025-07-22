import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface OnboardingScreen {
  key: string;
  image: ImageSourcePropType;
  curve: ImageSourcePropType;
  title: string;
  highlight: string;
  description: string;
}

type ImageSourcePropType = Parameters<typeof Image.resolveAssetSource>[0];

const onboardingScreens: OnboardingScreen[] = [
  {
    key: "1",
    image: require("../../assets/images/onboarding1.png"),
    curve: require("../../assets/images/curve.png"),
    title: "Fresh Water Delivered to",
    highlight: "Your Doorstep",
    description:
      "Get high-quality drinking water delivered quickly and hassle-free.",
  },
  {
    key: "2",
    image: require("../../assets/images/onboarding2.jpg"),
    curve: require("../../assets/images/curve.png"),
    title: "Track Your Delivery in",
    highlight: "Real Time",
    description: "Stay informed from order confirmation to doorstep delivery.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const flatListRef = useRef<FlatList<OnboardingScreen>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const scrollToNext = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push("/(auth)/signin");
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/signin");
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    minimumViewTime: 200,
    waitForInteraction: false,
  }).current;

  return (
    <ImageBackground
      source={require("../../assets/images/drops-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Image source={item.curve} style={styles.curve} />

            <View style={styles.textBox}>
              <Text style={styles.title}>
                {item.title}
                {"\n"}
                <Text style={styles.highlight}>{item.highlight}</Text>
              </Text>

              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.buttonRow}>
                {currentIndex < onboardingScreens.length - 1 ? (
                  <>
                    <TouchableOpacity
                      style={styles.skipBtn}
                      onPress={handleSkip}
                    >
                      <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.nextBtn}
                      onPress={scrollToNext}
                    >
                      <View style={styles.buttonTextRow}>
                        <Text style={styles.nextText}>Next</Text>
                        <Text style={styles.arrowText}>→</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.nextBtnFullWidth}
                    onPress={scrollToNext}
                  >
                    <View style={styles.buttonTextRow}>
                      <Text style={styles.nextText}>Get Started</Text>
                      <Text style={styles.arrowText}>→</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.dots}>
                {onboardingScreens.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, currentIndex === i && styles.activeDot]}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  slide: {
    width,
    height,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width,
    height: height * 0.6,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 0,
  },
  curve: {
    width: width * 0.95,
    height: height * 0.18,
    resizeMode: "stretch",
    marginTop: -100,
    marginLeft: -20,
  },
 textBox: {
  flex: 1,
  width: "100%",
  alignItems: "center",
  paddingHorizontal: 24,
  paddingTop: 30,
  paddingBottom: 10,
  justifyContent: "space-between",
  maxHeight: height * 0.4,
  marginBottom: 5, 
},

  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: 'Poppins',
  },
  highlight: {
    color: "#1E90FF",
    fontWeight: "400",
    fontFamily: 'Poppins',
  },
  description: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
    maxWidth: "90%",
    fontFamily: 'Poppins',
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  skipBtn: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  skipText: {
    color: "#1E90FF",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: 'PoppinsBold',
  },
  nextBtn: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnFullWidth: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: 'PoppinsBold',
  },
  arrowText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#fff",
    fontFamily: 'PoppinsBold',
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#1E90FF",
    width: 15,
    height: 10,
    borderRadius: 6,
  },
});
