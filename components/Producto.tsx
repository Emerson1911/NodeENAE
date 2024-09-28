import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import { buscarProductos } from '../constants/api';

const ProductoComponent = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nombreENAE, setNombreENAE] = useState(''); 
  const [descripcionENAE, setDescripcionENAE] = useState(''); 
  const [take, setTake] = useState(10); 
  const [skip, setSkip] = useState(0); 

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Consultando productos con los siguientes parámetros:', {
        nombreENAE_Like: nombreENAE,
        descripcionENAE_Like: descripcionENAE,
        skip,
        take,
      });
      const productosData = await buscarProductos({ 
        nombreENAE_Like: nombreENAE, 
        descripcionENAE_Like: descripcionENAE, 
        skip: skip, 
        take: take, 
        sendRowCount: 0 
      });
      console.log('Productos recibidos:', productosData);
      if (!productosData || productosData.length === 0) {
        setError('No se encontraron productos.');
      } else {
        setProductos(productosData);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setError('No se pudo cargar la lista de productos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Buscar productos" onPress={cargarProductos} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : productos.length > 0 ? (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.boldText}>Nombre: {item.nombreENAE}</Text>
              <Text>Descripción: {item.descripcionENAE}</Text>
              <Text>Precio: {item.precio}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No se encontraron productos.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ProductoComponent;
