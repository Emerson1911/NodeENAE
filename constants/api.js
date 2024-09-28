import axios from 'axios';

const apiUrl = 'http://Emerson.somee.com'; 

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const obtenerProductoPorId = async (id) => {
  try {
    console.log(`Solicitando producto con ID: ${id}`);
    const response = await api.get(`/product/${id}`);
    console.log('Respuesta del servidor (obtenerProductoPorId):', response);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
};

export const buscarProductos = async (query) => {
  try {
    console.log('Enviando consulta al servidor:', query);
    const response = await api.post('/product/search', {
      nombreENAE_Like: query.nombreENAE_Like || "",
      descripcionENAE_Like: query.descripcionENAE_Like || "",
      Skip: query.skip || 0,
      Take: query.take || 10,
      SendRowCount: query.sendRowCount || 2,
    });
    console.log('Respuesta del servidor (buscarProductos):', response.data);
    if (Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error('La respuesta no contiene un array de productos');
    }
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    console.log('Enviando datos del nuevo producto al servidor:', producto);
    const response = await api.post('/product', {
      nombreENAE: producto.nombre,
      descripcionENAE: producto.descripcion,
      precio: producto.precio,
    });
    console.log('Respuesta del servidor (crearProducto):', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Cabeceras:', error.response.headers);
    } else if (error.request) {
      console.error('No se recibió respuesta:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    console.error('Error completo:', error);
    throw error;
  }
};

export default api;
