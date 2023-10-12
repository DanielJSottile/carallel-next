import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session, SessionStrategy, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { CustomSession } from '../../../../../types';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const response = await fetch(`http://localhost:8080/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_name: credentials?.username,
              password: credentials?.password,
            }),
          });
          const { user, access_token: accessToken } = await response.json();
          // If no error and we have user data, return it
          // console.log(user, accessToken, 'USER USER!!');
          if (user && accessToken) {
            return { ...user, accessToken };
          }
          // Return null if user data could not be retrieved
          console.error(user.error || user.message);
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: {token: JWT; user: User}) {
      if (user) {
        return {
          ...token,
          ...('accessToken' in user ? { accessToken: user.accessToken } : {}),
          id: user.id,
          ...('user_name' in user ? { username: user.user_name } : {}),
          ...('links_visited' in user ? { linksVisited: user.links_visited } : {}),
          name: [...('first_name' in user ? [user.first_name] : []), ...('last_name' in user ? [user.last_name] : [])].join(' ')
        };
      }
      return token;
    },
    async session({ session, token }: {session: Session | CustomSession; token: JWT}) {
      if (token) {
        return {
          ...session,
          accessToken: token.accessToken as string,
          user: {
            ...session.user,
            id: token.id as string,
            username: token.username as string,
            email: token.username as string,
            linksVisited: token.linksVisited as string[],
          },
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
