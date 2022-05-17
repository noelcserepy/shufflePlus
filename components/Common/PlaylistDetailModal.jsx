import {
	Anchor,
	Box,
	Button,
	Image,
	Modal,
	Stack,
	Switch,
	Textarea,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import useStore from "../../lib/store";
import {
	uniqueNamesGenerator,
	adjectives,
	colors as colrs,
} from "unique-names-generator";
import useSpotify from "../../lib/useSpotify";

function PlaylistDetailModal({ opened, setOpened }) {
	const theme = useMantineTheme();
	const s = useSpotify();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const [name, setName] = useState(currentPlaylist.name);
	const [isPublic, setIsPublic] = useState(currentPlaylist.public);
	console.log(isPublic);
	const [description, setDescription] = useState(currentPlaylist.description);

	const nameConfig = {
		dictionaries: [adjectives, colrs],
		separator: " ",
		style: "capital",
	};

	const handleSave = () => {
		console.log("saving");
		setOpened(false);

		s.changePlaylistDetails(currentPlaylist.id, {
			name,
			public: isPublic,
			description,
		});

		s.getPlaylist(currentPlaylist.id).then(res => {
			setCurrentPlaylist(res.body);
			console.log(res.body);
		});
		console.log("saved");
	};

	return (
		<Modal
			size="lg"
			centered
			opened={opened}
			onClose={() => setOpened(false)}
			title="Edit Playlist Details">
			<Box
				p={36}
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
						value={name}
						onChange={e => setName(e.currentTarget.value)}
						label="Playlist name"
						placeholder={currentPlaylist.name}
						mb={-10}
					/>
					<Anchor
						color={theme.primaryColor}
						size="xs"
						onClick={() => setName(uniqueNamesGenerator(nameConfig))}>
						Generate name
					</Anchor>

					<Textarea
						placeholder="Your description..."
						value={description}
						onChange={e => setDescription(e.currentTarget.value)}
						label="Description"
						radius="xs"
					/>
					<Switch
						label="Public"
						color={theme.primaryColor}
						checked={isPublic}
						onChange={e => {
							setIsPublic(e.currentTarget.checked);
						}}
					/>
					<Button variant="outline" onClick={() => handleSave()}>
						Save
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
}

export default PlaylistDetailModal;
