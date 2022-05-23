import { Box, Image, Title, useMantineTheme } from "@mantine/core";
import useStore from "../../lib/store";

function CoverPage() {
	const playlists = useStore(state => state.playlists);
	const theme = useMantineTheme();
	const { dark } = theme.colors;
	const coverImages = playlists.map(p => p.images[0].url).slice(0, 7);

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
			<Box mt={200} sx={{ maxWidth: 700, zIndex: 10 }}>
				<Title order={3}>Pick one of your playlists to edit.</Title>

				<Image
					my="lg"
					src="/Arrow.svg"
					sx={{
						maxWidth: 100,
						filter:
							"invert(53%) sepia(31%) saturate(4537%) hue-rotate(247deg) brightness(93%) contrast(96%)",
					}}
				/>
			</Box>

			<div className="animContainer">
				{coverImages.map(c => (
					<img src={c} className="cover" />
				))}
			</div>
		</Box>
	);
}

export default CoverPage;
