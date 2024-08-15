import axios, { AxiosResponse } from 'axios';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';

// Typing for the user profile from your Auth Server
interface GameHistory {
name: string;
date: string;
server: string;
region: string;
quality: number;
players: [
  {
    team: string;
    player: string;
    score: number;
    place: number;

  }
]
}

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.DISCORD_REDIRECT_URI,
        },
      },
      wellKnown: "https://discord.com/.well-known/openid-configuration",
      token: "https://discord.com/api/oauth2/token",
      idToken: true,
      profile: async (profile, tokens) => {
        // Fetch user info from Discord
        const discordResponse = await axios.get("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });

        if (discordResponse.status !== 200) {
          throw new Error("Failed to fetch Discord user info");
        }

        const discordUser = discordResponse.data;

        // Payload to send to your Auth Server
        const userPayload = {
          provider: "discord",
          id: discordUser.id,
          name: discordUser.username,
          email: discordUser.email,
          image: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
        };

        // API call to your Auth Server to create or update the user
        console.log('env', process.env.NELG_HISTORY_API_URL);
        
        const authServerResponse: AxiosResponse<GameHistory[]> = await axios.get(`${process.env.NELG_HISTORY_API_URL!+discordUser.id}`);
        if(authServerResponse.data !== null){
          userPayload.name = authServerResponse.data[0].players[0].player;
        }

        return userPayload;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        },
      },
          profile: async (profile, tokens) => {
            

        // Payload to send to your Auth Server
        const userPayload = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };



        return userPayload;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
