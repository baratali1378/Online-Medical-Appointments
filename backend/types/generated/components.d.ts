import type { Schema, Struct } from '@strapi/strapi';

export interface ContactContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_details_s';
  info: {
    displayName: 'Contact Details ';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    alternate_phone: Schema.Attribute.String;
    city: Schema.Attribute.Relation<'oneToOne', 'api::city.city'>;
    phone_number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    postal_code: Schema.Attribute.String;
  };
}

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

export interface LinksUsefulLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_useful_links';
  info: {
    displayName: 'Useful links';
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface PersonalInfoPersonalInfo extends Struct.ComponentSchema {
  collectionName: 'components_personal_info_personal_infos';
  info: {
    description: '';
    displayName: 'Personal Info';
    icon: 'user';
  };
  attributes: {
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    fullname: Schema.Attribute.String & Schema.Attribute.Required;
    gender: Schema.Attribute.Enumeration<['Male', 'Female', 'Others']>;
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface SystemsSecurityFields extends Struct.ComponentSchema {
  collectionName: 'components_systems_security_fields';
  info: {
    description: '';
    displayName: 'Security Fields';
  };
  attributes: {
    is_locked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    last_login: Schema.Attribute.DateTime;
    lock_until: Schema.Attribute.DateTime;
    login_attempts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.contact-details': ContactContactDetails;
      'contact.phone-number': ContactPhoneNumber;
      'links.social-links': LinksSocialLinks;
      'links.useful-links': LinksUsefulLinks;
      'personal-info.personal-info': PersonalInfoPersonalInfo;
      'systems.security-fields': SystemsSecurityFields;
    }
  }
}
