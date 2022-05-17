import {
	Box,
	Button,
	Image,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Editor from "../components/Editor";

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

export default function Home() {
	const { data: session, status } = useSession();
	const theme = useMantineTheme();
	const dark = theme.colors.dark;

	if (!session)
		return (
			<Box
				px={100}
				pt={36}
				sx={{
					overflow: "hidden",
					height: "100vh",
					background: theme.colors.dark[7],
					color: "white",
					position: "relative",
				}}>
				<Title order={5}>
					Shuffle
					<span style={{ color: theme.colors[theme.primaryColor][5] }}>
						Plus
					</span>
				</Title>

				<Box mt={200} sx={{ maxWidth: 700 }}>
					<Title order={3}>A quick way to freshen up your playlists</Title>
					<Text my="lg" size="md" color={dark[2]} sx={{ letterSpacing: 0.8 }}>
						Sort, merge and fill playlists to quickly change up
						<br /> your playlists and keep them fresh!
					</Text>

					<Button onClick={signIn} sx={{ letterSpacing: 0.8 }}>
						Sign in with Spotify
					</Button>
					<Text mt="md" size="xs" color={dark[2]} sx={{ letterSpacing: 0.8 }}>
						No signup needed.
					</Text>
				</Box>
				<Image
					src="/albums.svg"
					sx={{ position: "absolute", top: 0, right: 0 }}
				/>
			</Box>
		);
	if (session) return <Editor />;
}
