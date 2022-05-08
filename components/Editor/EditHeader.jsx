import {
	ActionIcon,
	Badge,
	Box,
	Button,
	Container,
	Group,
	Image,
	Input,
	Modal,
	Stack,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import useStore from "../../lib/store";
import { prominent } from "color.js";
import { Edit } from "tabler-icons-react";

function EditHeader() {
	const theme = useMantineTheme();
	const [colors, setColors] = useState(null);
	const [opened, setOpened] = useState(false);

	const currentPlaylist = useStore(state => state.currentPlaylist);

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

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
	});

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
					src={currentPlaylist.images[0].url}
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
					<Badge size="md" variant="filled">
						{currentPlaylist.public ? "Public" : "Private"}
					</Badge>
					<Title order={1} style={{ fontSize: "5vw", lineClamp: "2" }}>
						{currentPlaylist.name}
					</Title>
					<Text size="md">{currentPlaylist.description}</Text>
					<Text size="md" style={{ fontWeight: "bold" }}>
						{`${currentPlaylist.owner.display_name} -  ${currentPlaylist.tracks.total} Tracks`}
					</Text>
				</Container>

				<Modal
					size="md"
					centered
					opened={opened}
					onClose={() => setOpened(false)}
					title="Edit Playlist">
					<Box
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
						}}>
						<Image
							style={{ width: "50%", boxShadow: "0px 0px 20px black" }}
							src={currentPlaylist.images[0].url}
						/>
						<Stack>
							<TextInput
								label="Playlist name"
								placeholder={currentPlaylist.name}
							/>
							<Button>Generate name</Button>
						</Stack>
					</Box>
				</Modal>

				<ActionIcon onClick={() => setOpened(true)}>
					<Edit></Edit>
				</ActionIcon>
			</Box>
		</Box>
	);
}

export default EditHeader;
