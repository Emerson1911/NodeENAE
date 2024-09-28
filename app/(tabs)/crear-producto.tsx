
// app/crear-producto.tsx
import CrearProductoScreen from '@/components/CrearProductoScreen';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const CrearProducto = () => {
  return (
    <View style={styles.container}>
      <CrearProductoScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CrearProducto;