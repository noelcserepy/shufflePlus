import {
	Badge,
	Box,
	Button,
	Container,
	Group,
	Image,
	Input,
	InputWrapper,
	Paper,
	SegmentedControl,
	Slider,
	Space,
	Stack,
	Switch,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from "@mantine/core";
import useStore from "../lib/store";

function EditHeader() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	console.log(currentPlaylist);

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	return (
		<Box
			style={{
				height: "500px",
				color: "white",
				background: theme.fn.linearGradient(
					45,
					theme.colors.dark[0],
					theme.colors.dark[9]
				),
			}}>
			<Box
				size="lg"
				p={30}
				style={{
					height: "500px",
					display: "flex",
					flexFlow: "row nowrap",
					justifyContent: "flex-start",
					alignItems: "flex-end",
				}}>
				<Image style={{ width: "300px" }} src={currentPlaylist.images[0].url} />
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
					<Title order={1} lineClamp style={{ fontSize: "6em" }}>
						{currentPlaylist.name}
					</Title>
					<Text size="md">{currentPlaylist.description}</Text>
					<Text size="md" style={{ fontWeight: "bold" }}>
						{`${currentPlaylist.owner.display_name} -  ${currentPlaylist.tracks.total} Tracks`}
					</Text>
				</Container>
			</Box>
		</Box>
	);
}

export default EditHeader;
