// types/contact.ts

export interface ContactImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface ContactImage {
  data: {
    attributes: {
      formats: {
        medium: ContactImageFormat;
        [key: string]: ContactImageFormat;
      };
    };
  };
}

export interface ContactData {
  id: number;
  attributes: {
    address: string;
    email: string;
    phone: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    image: ContactImage;
  };
}
