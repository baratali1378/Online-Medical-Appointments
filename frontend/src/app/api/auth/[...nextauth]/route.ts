import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, role } = credentials || {};

        try {
          const apiUrl =
            role === "doctor"
              ? `${API_URL}/api/doctors/login`
              : `${API_URL}/api/patients/login`;

          const { data } = await axios.post(
            apiUrl,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          );

          const user = data.user;
          const token = data.token;

          if (user && token) {
            return {
              id: user.id,
              email: user.email,
              name: user.fullname,
              role: role || "patient",
              image: user.image
                ? `${API_URL}${user.image.url || user.image}`
                : null,
              token,
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
      // On initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
        token.token = user.token; // JWT from Strapi
        return token;
      }

      // On subsequent requests, refresh user data from backend
      try {
        const meEndpoint =
          token.role === "doctor" ? "/api/doctor/profile" : "/api/patient/me";

        const response = await axios.get(`${API_URL}${meEndpoint}`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });

        const freshUser = response.data.data;

        token.image = freshUser.personal_info?.image
          ? `${API_URL}${freshUser.personal_info.image.url}`
          : null;
      } catch {
        // If fetch fails, keep existing image token
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.image = token.image as string;
      session.user.token = token.token as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
