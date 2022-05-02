import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<MantineProvider theme={{ colorScheme: "dark" }}>
				<Component {...pageProps} />
			</MantineProvider>
		</SessionProvider>
	);
}

export default MyApp;
