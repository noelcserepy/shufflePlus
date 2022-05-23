import { Box, Image, Title, useMantineTheme } from "@mantine/core";
import useStore from "../../lib/store";
import CoverImages from "../Common/CoverImages";

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
			<CoverImages />
		</Box>
	);
}

export default CoverPage;
