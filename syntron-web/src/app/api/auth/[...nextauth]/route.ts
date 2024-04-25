// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.DISCORD_REDIRECT_URI,
          grant_type: 'authorization_code',
          code_challenge_method: 'S256',
        }
        
      },
      checks: ['pkce', 'state'],

    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    pkceCodeVerifier: {
      name: 'pkceCodeVerifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
  }
});

export { handler as GET, handler as POST };
