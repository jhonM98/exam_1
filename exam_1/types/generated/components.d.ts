import type { Schema, Struct } from '@strapi/strapi';

export interface AllergenAllergens extends Struct.ComponentSchema {
  collectionName: 'components_allergen_allergens';
  info: {
    description: '';
    displayName: 'Allergens';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'allergen.allergens': AllergenAllergens;
    }
  }
}
