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

export interface LinksSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_social_links';
  info: {
    description: '';
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text;
  };
}

export interface UsefulLinksUsefulLinks extends Struct.ComponentSchema {
  collectionName: 'components_useful_links_useful_links';
  info: {
    description: '';
    displayName: 'Useful Links';
    icon: 'link';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.phone-number': ContactPhoneNumber;
      'links.social-links': LinksSocialLinks;
      'useful-links.useful-links': UsefulLinksUsefulLinks;
    }
  }
}
