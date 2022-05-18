import {
	ActionIcon,
	Badge,
	Box,
	Container,
	Image,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import useStore from "../../lib/store";
import { prominent } from "color.js";
import { Edit } from "tabler-icons-react";
import PlaylistDetailModal from "../Common/PlaylistDetailModal";

function EditHeader() {
	const theme = useMantineTheme();
	const [colors, setColors] = useState(null);
	const [opened, setOpened] = useState(false);
	const setCurrentColors = useStore(state => state.setCurrentColors);
	const currentPlaylist = useStore(state => state.currentPlaylist);

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	let image = "/note2.svg";
	if (currentPlaylist.images.length > 2) {
		image = currentPlaylist.images[0].url;

		prominent(currentPlaylist.images[2].url, {
			amount: 5,
			format: "hex",
			group: 100,
		}).then(col => {
			const bg = theme.fn.linearGradient(
				180,
				col[4],
				theme.fn.darken(col[2], 0.8)
			);
			setColors(bg);
			const newColors = [col[4], col[2]];
			setCurrentColors(newColors);
		});
	}

	return (
		<Box
			style={{
				height: "400px",
				color: "white",
				background: colors ? colors : theme.colors.dark[6],
			}}>
			<Box
				size="lg"
				p={30}
				style={{
					height: "100%",
					display: "flex",
					flexFlow: "row nowrap",
					justifyContent: "flex-start",
					alignItems: "flex-end",
				}}>
				<Image
					style={{ width: "250px", boxShadow: "0px 0px 20px black" }}
					src={image}
				/>
				<Container
					style={{
						margin: 0,
						marginLeft: "30px",
						maxHeight: "300px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "flex-start",
					}}>
					<Badge size="md" ml={3} variant="filled">
						{currentPlaylist.public ? "Public" : "Private"}
					</Badge>
					<Title order={1} style={{ lineClamp: "2" }}>
						{currentPlaylist.name}
					</Title>
					<Text size="md" ml={3}>
						{currentPlaylist.description}
					</Text>
					<Text size="md" ml={3} style={{ fontWeight: "bold" }}>
						{`${currentPlaylist.owner.display_name} -  ${currentPlaylist.tracks.total} Tracks`}
					</Text>
				</Container>

				<PlaylistDetailModal
					opened={opened}
					setOpened={val => setOpened(val)}
				/>

				<ActionIcon onClick={() => setOpened(true)}>
					<Edit></Edit>
				</ActionIcon>
			</Box>
		</Box>
	);
}

export default EditHeader;
