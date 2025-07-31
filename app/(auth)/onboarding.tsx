import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ViewToken,
} from "react-native";

import OnboardingSlide from "../../components/OnboardingSlide";
import { onboardingScreens } from "../../constants/OnboardingData";
import { customFonts } from "../../utils/fonts";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fontsLoaded] = useFonts(customFonts);

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

  
  if (!fontsLoaded) return null;

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
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <OnboardingSlide
            item={item}
            currentIndex={currentIndex}
            totalSlides={onboardingScreens.length}
            onNext={scrollToNext}
            onSkip={handleSkip}
          />
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
});
