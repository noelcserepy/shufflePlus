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
import useStore from "../../lib/store";

export default function Playlist({ data }) {
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const theme = useMantineTheme();

	let { name, images } = data;
	const image = images[2].url;

	return (
		<Group
			position="apart"
			style={{
				width: "100%",
				height: "35px",
				paddingRight: 20,
				paddingBottom: 5,
				paddingTop: 5,
				marginBottom: 5,
				flexWrap: "nowrap",
			}}>
			<UnstyledButton
				onClick={() => {
					setCurrentPlaylist({ ...data });
				}}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
					flexWrap: "nowrap",
					height: "100%",
				}}>
				<Image src={image} fit="contain" height={30} />
				<Space w="md" />
				<Text size="sm" lineClamp={1} style={{ overflow: "ellipsis" }}>
					{name}
				</Text>
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
