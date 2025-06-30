// import findUserByCredentials from "@/lib/user";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },

//       authorize: async (credentials) => {
//         const user = await findUserByCredentials(
//           credentials.email as string,
//           credentials.password as string
//         );

//         return user;
//       },
//     }),
//   ],
// });

import findUserByCredentials from "@/lib/user";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seu@email.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios!");
        }

        const user = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          throw new Error("Email ou senha inválidos!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Página de login personalizada
  },
  session: {
    strategy: "jwt", // Usa JWT para a sessão
  },
  secret: process.env.AUTH_SECRET, // Secret para JWT
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
