import {
  Button,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Product from "../../models/product";
import Card from "../Card";

interface ProductItemProps {
  product: Product;
  onSelect: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const ProductItem: React.FC<ProductItemProps> = (props) => {
  const content = (
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.product.imageUrl }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.product.title}</Text>
        <Text style={styles.price}>${props.product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>{props.children}</View>
    </View>
  );

  return (
    <Card style={styles.product}>
      {Platform.OS === "android" && Platform.Version >= 21 ? (
        <TouchableNativeFeedback
          // style={styles.product}
          onPress={props.onSelect}
          useForeground
        >
          {content}
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity onPress={props.onSelect}>{content}</TouchableOpacity>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});
