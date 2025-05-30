import type { Schema, Struct } from '@strapi/strapi';

export interface ContactClinicInformation extends Struct.ComponentSchema {
  collectionName: 'components_contact_clinic_informations';
  info: {
    description: '';
    displayName: 'Clinic Information';
    icon: 'pinMap';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    clinic_name: Schema.Attribute.Text & Schema.Attribute.Required;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

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
    description: '';
    displayName: 'Phone Number';
    icon: 'phone';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DoctorsAvailableSlots extends Struct.ComponentSchema {
  collectionName: 'components_doctors_available_slots';
  info: {
    displayName: 'Available Slots';
    icon: 'doctor';
  };
  attributes: {
    days: Schema.Attribute.Enumeration<
      [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
    > &
      Schema.Attribute.Required;
    end_time: Schema.Attribute.Time & Schema.Attribute.Required;
    start_time: Schema.Attribute.Time & Schema.Attribute.Required;
  };
}

export interface DoctorsDocumentVerification extends Struct.ComponentSchema {
  collectionName: 'components_doctors_document_verifications';
  info: {
    displayName: 'Document Verification';
    icon: 'doctor';
  };
  attributes: {
    current_status: Schema.Attribute.Enumeration<
      ['pending', 'rejected', 'approved']
    >;
    file: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['Medical License', 'ID Card', 'Degree', 'Board Certification']
    > &
      Schema.Attribute.Required;
    uploaded_at: Schema.Attribute.DateTime;
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
    birth: Schema.Attribute.Date;
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
    is_verified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    last_login: Schema.Attribute.DateTime;
    lock_until: Schema.Attribute.DateTime;
    login_attempts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.clinic-information': ContactClinicInformation;
      'contact.contact-details': ContactContactDetails;
      'contact.phone-number': ContactPhoneNumber;
      'doctors.available-slots': DoctorsAvailableSlots;
      'doctors.document-verification': DoctorsDocumentVerification;
      'links.social-links': LinksSocialLinks;
      'links.useful-links': LinksUsefulLinks;
      'personal-info.personal-info': PersonalInfoPersonalInfo;
      'systems.security-fields': SystemsSecurityFields;
    }
  }
}
