
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:1337';

const obtenerPreciosConImpuestos = async (menuDiario) => {
  try {
    if (!menuDiario || typeof menuDiario !== 'string') {
      throw new Error('El parámetro "menuDiario" es obligatorio y debe ser una cadena de texto.');
    }

    const response = await axios.get(`${API_URL}/platos`, {
      params: { Menu_Diario: menuDiario }
    });

    const platos = response.data;

    if (!Array.isArray(platos)) {
      throw new Error('La respuesta del servidor no es un array.');
    }

    const tasaImpuesto = menuDiario === 'MenuDiario' ? 0.05 : 0;

    return platos.map((plato) => {
      if (plato.price == null || typeof plato.price !== 'number') {
        return { ...plato, precioConImpuesto: 'N/A' };
      }

      const precioConImpuesto = plato.price * (1 + tasaImpuesto);
      return {
        ...plato,
        precioConImpuesto: parseFloat(precioConImpuesto.toFixed(2))
      };
    });
  } catch (error) {
    console.error('Error obteniendo los precios de los platos:', error.message || error);
    throw new Error('No se pudo obtener los precios de los platos.');
  }
};

export default {
  obtenerPreciosConImpuestos
};
