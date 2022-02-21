import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  Ionicons,
  // AntDesign,
  // EvilIcons
} from "@expo/vector-icons";
import { CustomColors } from "../../constants/customColors";

interface HeaderButtonProps {
  name: any;
  size?: number;
  color?: string;
  onPress?: (() => void) | undefined;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  name,
  size = 23,
  // color,
  onPress,
}) => {
  return (
    // <TouchableOpacity></TouchableOpacity>
    <Ionicons
      name={name}
      size={size}
      color={Platform.OS === "android" ? "white" : CustomColors.primary}
      onPress={onPress}
    />
  );
  // return <EvilIcons name={"search"} size={size} color={color} />;
  // return <AntDesign name={"home"} size={size} color={color} />;
};

const styles = StyleSheet.create({});
