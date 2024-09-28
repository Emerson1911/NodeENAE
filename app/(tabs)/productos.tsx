import ProductoComponent from "@/components/Producto";
import React from "react";
import { View, StyleSheet } from "react-native";


const ProductosScreen = () => {
  return (
    <View style={styles.container}>
      <ProductoComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

export default ProductosScreen;