import { generateColorFromName, getInitials } from "@/utils/name";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface PropType {
  name: string;
  src?: string;
  size?: number;
  bgColor?: string;
  borderWidth?: number;
  borderColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  showBadge?: boolean;
  badgeColor?: string;
  badgeSize?: number;
}

const Avatar = ({
  name = "",
  src,
  size = 50,
  bgColor,
  borderWidth = 0,
  borderColor = "#fff",
  style,
  textStyle,
  showBadge = false,
  badgeColor = "#10B981",
  badgeSize = 12,
}: PropType) => {
  const [imageHasError, setImageHasError] = useState(false);

  useEffect(() => {
    setImageHasError(false);
  }, [src]);

  const avatarStyles = useMemo(
    () => ({
      container: {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor,
        position: "relative" as const,
      },
      fallback: {
        backgroundColor: bgColor || generateColorFromName(name),
        justifyContent: "center" as const,
        alignItems: "center" as const,
      },
      image: {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      text: {
        fontSize: Math.max(size * 0.35, 12),
        color: "#fff",
        fontWeight: "600" as const,
      },
      badge: {
        position: "absolute" as const,
        bottom: 0,
        right: 0,
        width: badgeSize,
        height: badgeSize,
        borderRadius: badgeSize / 2,
        backgroundColor: badgeColor,
        borderWidth: 2,
        borderColor: "#fff",
      },
    }),
    [size, bgColor, name, borderWidth, borderColor, badgeSize, badgeColor],
  );

  const initials = useMemo(() => getInitials(name), [name]);

  return (
    <View style={[styles.container, avatarStyles.container, style]}>
      {src && !imageHasError ? (
        <Image
          source={typeof src === "string" ? { uri: src } : src}
          style={avatarStyles.image}
          onError={() => setImageHasError(true)}
          cachePolicy="memory-disk"
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View style={[styles.fallback, avatarStyles.fallback]}>
          <Text style={[avatarStyles.text, textStyle]}>{initials}</Text>
        </View>
      )}

      {showBadge && <View style={avatarStyles.badge} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  fallback: {
    flex: 1,
  },
});

export default Avatar;
