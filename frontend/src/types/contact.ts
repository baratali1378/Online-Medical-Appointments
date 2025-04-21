export interface ContactImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface ContactImage {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail?: ContactImageFormat;
    small?: ContactImageFormat;
    medium?: ContactImageFormat;
    large?: ContactImageFormat;
  };
}

export interface ContactData {
  id: number;
  documentId: string;
  address: string;
  email: string;
  phone: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  image?: ContactImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
