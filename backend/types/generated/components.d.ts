import type { Schema, Struct } from '@strapi/strapi';

export interface ContactPhoneNumber extends Struct.ComponentSchema {
  collectionName: 'components_contact_phone_numbers';
  info: {
    displayName: 'Phone Number';
    icon: 'phone';
  };
  attributes: {
    countryCode: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'+93'>;
    label: Schema.Attribute.Enumeration<['mobile', 'work', 'home']>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.phone-number': ContactPhoneNumber;
    }
  }
}
