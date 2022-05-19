import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL, spotifyApi } from "../../../lib/useSpotify";

async function refreshAccessToken(token) {
	try {
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshToken);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,

	callbacks: {
		async jwt({ token, account, user }) {
			// Initial sign in
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}
			// Return previous token if access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}
			// Access token has expired, so we refresh it
			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			if (token.accessToken) {
				session.user.accessToken = token.accessToken;
			}
			session.user.username = token.username;
			session.user.image = token.picture;
			session.user.name = token.name;
			session.user.id = token.username;
			return session;
		},
	},
});
