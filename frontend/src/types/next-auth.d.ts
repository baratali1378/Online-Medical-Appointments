// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    name?: string;
    role: string;
    image?: string | null;
  }
}
