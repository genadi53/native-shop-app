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
import { CustomColors } from "../../constants/customColors";

interface ProductItemProps {
  product: Product;
  onViewDetail: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onAddToCart: Function;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onViewDetail,
  onAddToCart,
}) => {
  const content = (
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.imageUrl }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={CustomColors.primary}
          title="View Details"
          onPress={onViewDetail}
        />
        <Button
          color={CustomColors.primary}
          title="To Cart"
          onPress={() => {
            // console.log(Platform.Version);
            onAddToCart();
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.product}>
      {Platform.OS === "android" && Platform.Version >= 21 ? (
        <TouchableNativeFeedback
          // style={styles.product}
          onPress={onViewDetail}
          useForeground
        >
          {content}
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity onPress={onViewDetail}>{content}</TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
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
    height: "15%",
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
    height: "25%",
    paddingHorizontal: 20,
  },
});
