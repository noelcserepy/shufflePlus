import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<MantineProvider
				theme={{
					colorScheme: "dark",
					defaultRadius: "xs",
					colors: {
						spotify: [
							"#669677",
							"#49875F",
							"#3B8254",
							"#2E7E4A",
							"#207C41",
							"#137B38",
							"#1A6535",
							"#1F5432",
							"#20472E",
							"#1E2D24",
						],
					},
					primaryColor: "grape",
					primaryShade: { light: 6, dark: 8 },
					fontFamily: "NunitoSans, sans-serif",
					headings: {
						fontFamily: "LibreFranklin, sans-serif",
						fontWeight: 600,
						sizes: {
							h1: {
								fontSize: "5em",
								lineHeight: "1em",
							},
							h2: {
								fontSize: "4em",
								lineHeight: "1em",
							},
							h3: {
								fontSize: "3em",
								lineHeight: "1em",
							},
							h4: {
								fontSize: "2.5em",
								lineHeight: "1em",
							},
							h5: {
								fontSize: "2em",
								lineHeight: "1em",
							},
							h6: {
								fontSize: "1em",
								lineHeight: "1em",
							},
						},
					},
					other: {
						fontFamilySecondary: "Hind, sans-serif",
						lineHeights: [1.2, 1.4, 1.6, 1.8, 1.95],
						reduceMotion: true,
					},
				}}>
				<Component {...pageProps} />
			</MantineProvider>
		</SessionProvider>
	);
}

export default MyApp;
