import {
	Box,
	Button,
	Image,
	Space,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";

function CoverPage() {
	const theme = useMantineTheme();
	const { dark } = theme.colors;
	return (
		<Box
			px={100}
			sx={{
				overflow: "hidden",
				height: "100vh",
				background: theme.colors.dark[7],
				color: "white",
				position: "relative",
			}}>
			<Box mt={200} sx={{ maxWidth: 700 }}>
				<Title order={3}>Use your existing playlists as inspiration</Title>
				<Text my="lg" size="md" color={dark[2]} sx={{ letterSpacing: 0.8 }}>
					Or create a new one from scratch
				</Text>
				<span>
					<Image src="/Arrow.svg" sx={{ maxWidth: 100 }} />
					<Button variant="outline" sx={{ letterSpacing: 0.8 }}>
						Create new
					</Button>
				</span>
				<Text mt="md" size="xs" color={dark[2]} sx={{ letterSpacing: 0.8 }}>
					No signup needed.
				</Text>
			</Box>
		</Box>
	);
}

export default CoverPage;
