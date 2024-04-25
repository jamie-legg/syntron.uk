// pages/api/auth/[...nextauth].ts
import axios from "axios";
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
        }
        
      },
      wellKnown: 'https://discord.com/.well-known/openid-configuration',
      token: 'https://discord.com/api/oauth2/token',
      idToken: true,
      
      profile: async (profile, tokens) => {
        const res = await axios.get('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`
          }
        })
        console.log('res', res);
        
        if(res.status !== 200) {
          throw new Error('Failed to fetch user info');
        }
        const {data:user} = res;


        
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
        };
      }

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
});

export { handler as GET, handler as POST };
