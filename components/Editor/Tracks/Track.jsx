import {
	Group,
	Image,
	Menu,
	Space,
	Text,
	Divider,
	UnstyledButton,
	Box,
	ActionIcon,
	useMantineTheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";

import {
	Plus,
	ArrowMerge,
	Backspace,
	Trash,
	Archive,
	Share,
	Heart,
} from "tabler-icons-react";

function Track({ data, index }) {
	let name = data.track.name;
	const image = data.track.album.images[2].url;
	const artists = data.track.artists.map(artist => artist.name);
	const artistString = artists.join(", ");
	const theme = useMantineTheme();
	const { hovered, ref } = useHover();

	return (
		<Group
			position="apart"
			ref={ref}
			style={{
				backgroundColor: hovered ? theme.colors.dark[9] : "",
				flexWrap: "nowrap",
				width: "100%",
				padding: 15,
				marginBottom: 5,
				borderRadius: "5px",
				alignContent: "center",
			}}>
			<Box
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
					height: "20px",
				}}>
				<Text>{index}</Text>
				<Space w="md" />
				<Image src={image} radius="sm" height={30} />
				<Space w="md" />
				<Box style={{ maxWidth: "80%" }}>
					<Text size="sm" lineClamp={1} style={{ textOverflow: "ellipsis" }}>
						{name}
					</Text>
					<Text
						size="xs"
						lineClamp={1}
						style={{ color: theme.colors.dark[2], textOverflow: "ellipsis" }}>
						{artistString}
					</Text>
				</Box>
			</Box>
			<Group
				spacing="xs"
				style={{
					flexWrap: "nowrap",
				}}>
				<ActionIcon>
					<Heart size={18} />
				</ActionIcon>
				<ActionIcon color="yellow">
					<Archive size={18} />
				</ActionIcon>
				<ActionIcon color="red">
					<Trash size={18} />
				</ActionIcon>
			</Group>
		</Group>
	);
}

export default Track;
