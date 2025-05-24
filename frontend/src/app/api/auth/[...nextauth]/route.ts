// src/pages/api/auth/[...nextauth].ts
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
        role: { label: "Role", type: "text" }, // We now expect a role
      },
      async authorize(credentials) {
        const { email, password, role } = credentials || {};

        try {
          // Dynamically set the URL based on the role (doctor or patient)
          const apiUrl =
            role === "doctor"
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/doctors/login`
              : `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/patients/login`;

          // Make API call to login endpoint
          const { data } = await axios.post(
            apiUrl,
            { email, password },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = data.user;
          const token = data.token; // The token returned from Strapi

          if (user && token) {
            // Make sure the object returned follows NextAuth's User interface
            return {
              id: user.id,
              email: user.email,
              name: user.fullname,
              role: role || "patient",
              image: user.image
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${
                    user.image.url || user.image
                  }`
                : null,
              token, // Store the token
            };
          }

          return null; // Return null if no user or token is found
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
    // Store the JWT token in the token object
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
        token.token = user.token; // Save JWT token to token object
      }
      return token;
    },

    // Add JWT token to the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.token = token.token as string; // Pass token to session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
