import CredentialsProvider from "next-auth/providers/credentials"
import { getServerSession, type AuthOptions } from "next-auth";
import userService from "@/services/user";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "username", },
        password: { label: "Password", type: "password", }
      },
      async authorize(credentials) {

        if (!credentials?.username || !credentials?.password) return null;

        const user = await userService.login({
          username: credentials.username,
          password: credentials.password,
        });

        if(!user) return null;

        return {
          id: `${user.id}`,
          username: user.username,
          email: user.email,
        };
        
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET
};


export const auth = async () => {

  return await getServerSession (authOptions);

}