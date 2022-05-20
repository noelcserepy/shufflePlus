import {
	Image,
	Text,
	UnstyledButton,
	useMantineTheme,
	Box,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Circle } from "tabler-icons-react";
import useStore from "../../lib/store";

export default function Playlist({ setOpened, setNextPlaylist, data }) {
	const theme = useMantineTheme();

	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const currentPlaylist = useStore(state => state.currentPlaylist);

	const isCurrent = currentPlaylist?.id === data.id;
	const isEdited = isCurrent && currentPlaylist?.edited;

	const { hovered, ref } = useHover();
	const { dark } = theme.colors;

	let { name, images } = data;
	let image = "/note2.svg";

	if (images.length > 2) {
		image = images[2].url;
	}

	const handlePlaylistClick = () => {
		if (isCurrent) {
			return;
		}

		if (currentPlaylist?.edited) {
			setNextPlaylist(data);
			setOpened(true);
			return;
		}

		setCurrentPlaylist({ ...data });
	};

	return (
		<Box
			onClick={() => {
				handlePlaylistClick();
			}}
			style={{
				radius: "2px",
				width: "100%",
				height: "33px",
				marginBottom: 10,
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "center",
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
				<Text
					size="sm"
					lineClamp={1}
					style={{ overflow: "ellipsis", flexGrow: "1" }}>
					{name}
				</Text>
				{isEdited && (
					<Box sx={{ justifySelf: "flex-end", alignItems: "center" }}>
						<Circle size={15} color={theme.colors[theme.primaryColor][5]} />
					</Box>
				)}
			</UnstyledButton>
		</Box>
	);
}
