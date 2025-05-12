import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/patients/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          );

          const user = data.patient;

          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.fullname,
              role: "user",
              image: user.image
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${
                    user.image.url || user.image
                  }`
                : null,
            };
          }

          return null;
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message || "Invalid credentials"
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
