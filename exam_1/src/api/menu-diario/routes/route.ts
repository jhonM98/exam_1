
module.exports = {
  routes: [
    // Ruta para obtener los postres
    {
      method: 'GET',
      path: '/menus/desserts',
      handler: 'menu-diario.getDesserts',  
    },
    // Ruta para filtrar menús por rango de precios
    {  
      method: 'GET',
      path: '/menus/filterByPrice', 
      handler: 'menu-diario.filterByPrice',  
    
    },
    // Ruta para filtrar menús sin alérgenos
    {
      method: 'GET',
      path: '/menus/excludeAllergens',  
      handler: 'menu-diario.excludeAllergens',  
    },
    // Ruta para obtener los platos populares o favoritos
    {
      method: 'GET',
      path: '/platos/populares',
      handler: 'menu-diario.getPopulares', 
    },
  ],
};