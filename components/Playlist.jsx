import {
	Group,
	Image,
	Menu,
	Space,
	Text,
	Divider,
	UnstyledButton,
	useMantineTheme,
} from "@mantine/core";

import {
	Plus,
	ArrowMerge,
	Backspace,
	Trash,
	Archive,
	Share,
} from "tabler-icons-react";
import useStore from "../lib/store";

export default function Playlist({ data }) {
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const theme = useMantineTheme();

	const { name, images } = data;
	const image = images[0].url;

	return (
		<Group
			position="apart"
			style={{
				backgroundColor: theme.colors.dark[9],
				borderRadius: "5px",
				width: "100%",
				paddingRight: 20,
				paddingBottom: 5,
				paddingTop: 5,
				marginBottom: 5,
			}}>
			<UnstyledButton
				onClick={() => {
					setCurrentPlaylist({ ...data });
				}}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
				}}>
				<Image src={image} height={30} />
				<Space w="md" />
				<Text>{name}</Text>
			</UnstyledButton>

			<Menu position="right" withArrow>
				<Menu.Label>{name}</Menu.Label>
				<Menu.Item icon={<Plus size={14} />}>Create new from this</Menu.Item>
				<Menu.Item icon={<ArrowMerge size={14} />}>Merge</Menu.Item>
				<Menu.Item icon={<Backspace size={14} />}>Rename</Menu.Item>
				<Menu.Item icon={<Archive size={14} />}>Archive</Menu.Item>
				<Menu.Item icon={<Share size={14} />}>Share</Menu.Item>
				<Divider />
				<Menu.Item color="red" icon={<Trash size={14} />}>
					Delete
				</Menu.Item>
			</Menu>
		</Group>
	);
}
