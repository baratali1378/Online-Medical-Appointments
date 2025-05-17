export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface UsefulLink {
  id: number;
  name: string;
  url: string;
}

export interface PhoneNumber {
  id: number;
  countryCode: string;
  text: string;
  label: string;
}

export interface Logo {
  url: string;
}

export interface FooterData {
  company_name: string;
  description: string;
  address: string;
  email: string;
  logo: Logo;
  social_links: SocialLink[];
  useful_links: UsefulLink[];
  phone_number: PhoneNumber[];
}
