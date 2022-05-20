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
import toast from "react-hot-toast";

function NewPlaylistModal({ opened, setOpened }) {
	const theme = useMantineTheme();
	const s = useSpotify();
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const setPlaylists = useStore(state => state.setPlaylists);
	const playlists = useStore(state => state.playlists);
	const [name, setName] = useState("");
	const [isPublic, setIsPublic] = useState(true);
	const [description, setDescription] = useState("");

	const nameConfig = {
		dictionaries: [adjectives, colrs],
		separator: " ",
		style: "capital",
	};

	const handleSave = () => {
		if (!name) {
			toast.error("Name required");
			return;
		}

		const options = {
			public: isPublic,
			description: description ? description : "Created by ShufflePlus",
		};

		setOpened(false);

		s.createPlaylist(name, options).then(res => {
			if (res.statusCode === 201) {
				setCurrentPlaylist(res.body);
				setPlaylists([res.body, ...playlists]);
				toast.success("New playlist created");
			}
		});

		setName("");
		setIsPublic(true);
		setDescription("");
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
				<Stack>
					<TextInput
						value={name}
						onChange={e => setName(e.currentTarget.value)}
						label="Playlist name"
						placeholder={"My cool tracks"}
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

export default NewPlaylistModal;
