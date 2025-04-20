export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ImageFormats {
  small?: ImageFormat;
  medium?: ImageFormat;
  thumbnail?: ImageFormat;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: object | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AboutData {
  id: number;
  documentId: string;
  title: string;
  content: string;
  seoTitle: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: ImageData; // Optional in case it's not always returned
}

export interface AboutResponse {
  data: AboutData;
  meta: object;
}
