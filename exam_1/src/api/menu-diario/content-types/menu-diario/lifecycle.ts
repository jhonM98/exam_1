module.exports = {
  async beforeCreate(event) {
    await validateAndCalculate(event);
  },

  async beforeUpdate(event) {
    await validateAndCalculate(event);
  }
};

// Función para validar y calcular
async function validateAndCalculate(event: Event): Promise<void> {
  const data = event.params.data;

  // Validar que un plato no se repita en varias categorías
  if (data.platos && Array.isArray(data.platos)) {
    const platoIds = new Set();
    data.platos.forEach((plato: Plato) => {
      if (platoIds.has(plato.id)) {
        throw new Error("Un plato no puede estar en varias categorías.");
      }
      platoIds.add(plato.id);
    });

    // Calcular Sum_Precio
    data.Sum_Precio = data.platos.reduce((sum, plato) => sum + (plato.price || 0), 0);
  }
}

// Interfaces
interface EventParams {
  data: {
    platos?: Plato[];
    Sum_Precio?: number;
    [key: string]: any;
  };
}

interface Event {
  params: EventParams;
  action: string;
}

interface Plato {
  id: string;
  price?: number;
}


