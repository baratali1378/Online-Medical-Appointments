export interface Image {
  url: string;
  alt?: string;
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
  image?: Image; // Optional in case it's not always returned
}

export interface AboutResponse {
  data: AboutData;
  meta: object;
}
