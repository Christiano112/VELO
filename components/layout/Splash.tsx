import { COLORS } from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/GlobalStyles";
import { IMAGES } from "@/constants/Images";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export const CustomSplashScreen = () => {
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const loadingProgressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(loadingProgressAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [
    fadeAnim,
    loadingProgressAnim,
    pulseAnim,
    rotateAnim,
    scaleAnim,
    slideAnim,
  ]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidthInterpolate = loadingProgressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[COLORS.light.brand, COLORS.light.brand, COLORS.light.brand]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />

      <Animated.View
        style={[
          styles.backgroundCircle,
          styles.circle1,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundCircle,
          styles.circle2,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Image
            source={IMAGES.WHITE_LOGO}
            style={[
              styles.logoImage,
              {
                width: 120,
                height: 120,
              },
            ]}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.tagline}>Verified Driver. Verified Rider.</Text>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  width: progressWidthInterpolate,
                },
              ]}
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          {
            opacity: fadeAnim,
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          {
            opacity: fadeAnim,
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          {
            opacity: fadeAnim,
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.black,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundCircle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.1,
  },
  circle1: {
    width: width * 1.5,
    height: width * 1.5,
    top: -width * 0.5,
    right: -width * 0.3,
    backgroundColor: COLORS.light.white,
  },
  circle2: {
    width: width * 1.2,
    height: width * 1.2,
    bottom: -width * 0.4,
    left: -width * 0.2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  content: {
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: SPACING.xmLarge,
    shadowColor: COLORS.light.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    shadowColor: COLORS.light.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  tagline: {
    fontSize: FONT_SIZE.normal,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: SPACING.xxLarge + SPACING.medium,
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    alignItems: "center",
    width: 200,
  },
  loadingBar: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: SPACING.normal,
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: COLORS.light.white,
    borderRadius: 2,
    shadowColor: COLORS.light.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  particle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  particle1: {
    top: height * 0.2,
    left: width * 0.1,
  },
  particle2: {
    top: height * 0.7,
    right: width * 0.15,
  },
  particle3: {
    bottom: height * 0.3,
    left: width * 0.8,
  },
});
