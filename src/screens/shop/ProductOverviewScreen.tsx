import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const ProductOverviewScreen = (props: any) => {
  return <View style={styles.screen}>{props.children}</View>;
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
