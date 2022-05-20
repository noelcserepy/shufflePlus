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
import { useEffect } from "react";

function PlaylistDetailModal({ opened, setOpened }) {
	const theme = useMantineTheme();
	const s = useSpotify();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const [name, setName] = useState(currentPlaylist.name);
	const [isPublic, setIsPublic] = useState(currentPlaylist.public);
	const [description, setDescription] = useState(currentPlaylist.description);

	useEffect(() => {
		setName(currentPlaylist.name);
		setIsPublic(currentPlaylist.public);
		setDescription(currentPlaylist.description);
	}, [currentPlaylist]);

	const nameConfig = {
		dictionaries: [adjectives, colrs],
		separator: " ",
		style: "capital",
	};

	let image = "/note2.svg";
	if (currentPlaylist.images.length > 2) {
		image = currentPlaylist.images[0].url;
	}

	const handleSave = () => {
		if (!name) {
			toast.error("Name required");
			return;
		}

		setOpened(false);

		const options = {
			name,
			public: isPublic,
			description: description ? description : ".",
		};

		s.changePlaylistDetails(currentPlaylist.id, options).then(res => {
			s.getPlaylist(currentPlaylist.id).then(res => {
				setCurrentPlaylist({ ...res.body });
				toast.success("Details saved");
			});
		});
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
					src={image}
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
						value={description}
						onChange={e => setDescription(e.currentTarget.value)}
						label="Description"
						placeholder="Your description..."
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
