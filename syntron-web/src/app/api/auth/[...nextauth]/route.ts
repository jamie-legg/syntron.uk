// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email openid guilds' }},
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'discord') {
        user.email = profile?.email;
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST }

// GOOD
// https://discord.com/oauth2/authorize?client_id=1232022186684846173&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=guilds+identify+email+openid

