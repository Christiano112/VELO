import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface PropType {
  title: string;
  rightComponent?: React.ReactNode;
  showRightComponent?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  compactTitleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  showBorder?: boolean;
  transitionThreshold?: number;
}

export const AnimatedHeader = ({
  title,
  rightComponent,
  showRightComponent = false,
  onScroll,
  style,
  titleStyle,
  compactTitleStyle,
  containerStyle,
  showBorder = true,
  transitionThreshold = 100,
}: PropType) => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = event.nativeEvent.contentOffset.y;
        setScrollOffset(offset);
        onScroll?.(event);
      },
    },
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, transitionThreshold * 0.8, transitionThreshold],
    outputRange: [1, 0.8, 0],
    extrapolate: "clamp",
  });

  const compactHeaderOpacity = scrollY.interpolate({
    inputRange: [0, transitionThreshold * 0.8, transitionThreshold],
    outputRange: [0, 0.2, 1],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, transitionThreshold],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, transitionThreshold],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  return {
    headerComponent: (
      <View
        style={[
          styles.headerContainer,
          containerStyle,
          showBorder && styles.border,
        ]}
      >
        {/* Original Header */}
        <Animated.View
          style={[styles.header, style, { opacity: headerOpacity }]}
        >
          <View style={styles.leftComponent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#394347" />
            </TouchableOpacity>
          </View>
          <Animated.Text
            style={[
              styles.headerTitle,
              titleStyle,
              {
                transform: [
                  { translateY: titleTranslateY },
                  { scale: titleScale },
                ],
              },
            ]}
          >
            {title}
          </Animated.Text>
          {showRightComponent && (
            <View style={styles.rightComponent}>{rightComponent}</View>
          )}
        </Animated.View>

        {/* Compact Header */}
        <Animated.View
          style={[
            styles.compactHeader,
            style,
            { opacity: compactHeaderOpacity },
          ]}
          pointerEvents={
            scrollOffset > transitionThreshold * 0.8 ? "auto" : "none"
          }
        >
          <View style={styles.leftComponent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#394347" />
            </TouchableOpacity>
          </View>
          <Text
            pointerEvents="none"
            style={[styles.compactHeaderTitle, compactTitleStyle]}
          >
            {title}
          </Text>
          {showRightComponent && (
            <View style={styles.rightComponent}>{rightComponent}</View>
          )}
        </Animated.View>
      </View>
    ),
    scrollProps: {
      onScroll: handleScroll,
      scrollEventThrottle: 16,
    },
    headerHeight: 100,
  };
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    backgroundColor: "#fff",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf4",
  },
  header: {
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.normal,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    gap: SPACING.normal,
  },
  compactHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.normal,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    gap: SPACING.normal,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#394347",
  },
  compactHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#394347",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  leftComponent: {
    alignItems: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: SPACING.medium,
    backgroundColor: COLORS.light.background,
    borderWidth: 1,
    borderColor: COLORS.light.borderColor,
    alignItems: "center",
    justifyContent: "center",
  },
  rightComponent: {
    alignItems: "flex-end",
  },
});
