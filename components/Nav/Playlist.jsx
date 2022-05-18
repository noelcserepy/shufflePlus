import {
	Image,
	Menu,
	Text,
	Divider,
	UnstyledButton,
	useMantineTheme,
	Box,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";

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
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const isCurrent = currentPlaylist?.id === data.id;
	const theme = useMantineTheme();
	const { dark } = theme.colors;
	const { hovered, ref } = useHover();

	let { name, images } = data;
	let image = "/note2.svg";
	if (images.length > 2) {
		image = images[2].url;
	}

	return (
		<Box
			onClick={() => {
				setCurrentPlaylist({ ...data });
			}}
			style={{
				radius: "2px",
				width: "100%",
				height: "33px",
				marginBottom: 10,
				display: "flex",
				flexWrap: "nowrap",
			}}>
			<UnstyledButton
				ref={ref}
				style={{
					backgroundColor: hovered || isCurrent ? dark[5] : "",
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
					flexWrap: "nowrap",
					height: "100%",
				}}>
				<Image mr="md" radius="xs" src={image} fit="contain" height={30} />
				<Text size="sm" lineClamp={1} style={{ overflow: "ellipsis" }}>
					{name}
				</Text>
			</UnstyledButton>

			{/* <Menu
				mr={5}
				sx={{ alignSelf: "center" }}
				position="right"
				withArrow
				shadow={"sm"}>
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
			</Menu> */}
		</Box>
	);
}
