import { SocialLink } from "./footer";

export interface ContactData {
  id: number;
  documentId: string;
  address: string;
  email: string;
  phone?: string;
  image?: {
    url: string;
  };
  social_medias?: SocialLink[];
}
