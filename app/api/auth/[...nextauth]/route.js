import User from "@/models/userModel";
import { connectToDB } from "@/utils/DAO";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const nextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        const { email, password } = credentials;
        await connectToDB();

        const user = await User.findOne({
          email: email.toLowerCase(),
        }).select("+password");

        if (!user || !(await bcrypt.compare(password, user.password))) return;

        return {
          email: user.email,
          name: user.firstName + " " + user.lastName,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.user.role;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
