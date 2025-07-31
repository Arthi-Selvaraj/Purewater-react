import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OnboardingScreen } from "../constants/OnboardingData"; 

const { width, height } = Dimensions.get("window");

interface Props {
  item: OnboardingScreen;
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingSlide: React.FC<Props> = ({
  item,
  currentIndex,
  totalSlides,
  onNext,
  onSkip,
}) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Image source={item.curve} style={styles.curve} />

      <View style={styles.textBox}>
        <Text style={styles.title}>
          {item.title}
          {"\n"}
          <Text style={styles.highlight}>{item.highlight}</Text>
        </Text>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.buttonRow}>
          {currentIndex < totalSlides - 1 ? (
            <>
              <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
                <View style={styles.buttonTextRow}>
                  <Text style={styles.nextText}>Next</Text>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.nextBtnFullWidth} onPress={onNext}>
              <View style={styles.buttonTextRow}>
                <Text style={styles.nextText}>Get Started</Text>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.dots}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default OnboardingSlide;

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width,
    height: height * 0.6,
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
    fontFamily: "Poppins", 
  },
  highlight: {
    color: "#1E90FF",
    fontWeight: "400",
    fontFamily: "Poppins", 
  },
  description: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
    maxWidth: "90%",
    fontFamily: "Poppins",
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
    fontFamily: "PoppinsBold",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  arrowText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#fff",
    fontFamily: "PoppinsBold",
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
