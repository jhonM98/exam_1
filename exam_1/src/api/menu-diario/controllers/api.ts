
module.exports = {
  
  async getDesserts(ctx) {
    
    const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
      populate: {
        dessert: true, 
      },
    });

    // Extraer los postres de los menus
    const desserts = menus.flatMap(menu => menu.dessert);

    return desserts;
  },

  // Filtrar menús por rango de precios
  async getMenusforPrice(ctx) {
    const { min_precio, max_precio } = ctx.query;

    // Usamos strapi.documents para buscar menús dentro del rango de precios
    const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
      filters: {
        price: {
          $gte: min_precio || 0,  
          $lte: max_precio || 30, 
        },
      },
    });

    return menus;
  },

  // Filtrar menús sin alérgenos
  async getallergensFreeMenus(ctx) {
    const { exclude_allergens } = ctx.query;

    if (!exclude_allergens) {
      // Si no se pasan alérgenos para excluir, devolvemos todos los menús
      const menus = await strapi.documents('api::plato.plato').findMany({
        populate: { 
          Allergens: true,
        },
      });
      return menus;
    }

    const excludeAllergens = exclude_allergens.split(',');

    // Buscamos todos los menús
    const menus = await strapi.documents('api::plato.plato').findMany({
      populate: {
        Allergens: true, 
      },
    });

    // Filtramos los menús que no contienen los alérgenos indicados
    const menusFiltrados = menus.filter(menu => {
      return !menu.Allergens.some(allergens => excludeAllergens.includes(allergens));
    });

    return menusFiltrados;
  },
};