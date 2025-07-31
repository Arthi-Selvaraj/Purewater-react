import { ImageSourcePropType } from "react-native";

export interface OnboardingScreen {
  key: string;
  image: ImageSourcePropType;
  curve: ImageSourcePropType;
  title: string;
  highlight: string;
  description: string;
}

export const onboardingScreens: OnboardingScreen[] = [
  {
    key: "1",
    image: require("../assets/images/onboarding1.png"),
    curve: require("../assets/images/curve.png"),
    title: "Fresh Water Delivered to",
    highlight: "Your Doorstep",
    description:
      "Get high-quality drinking water delivered quickly and hassle-free.",
  },
  {
    key: "2",
    image: require("../assets/images/onboarding2.jpg"),
    curve: require("../assets/images/curve.png"),
    title: "Track Your Delivery in",
    highlight: "Real Time",
    description:
      "Stay informed from order confirmation to doorstep delivery.",
  },
];
