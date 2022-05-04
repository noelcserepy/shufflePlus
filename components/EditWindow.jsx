import {
	Card,
	Container,
	Divider,
	Grid,
	Paper,
	Skeleton,
	Title,
	useMantineTheme,
} from "@mantine/core";
import useStore from "../lib/store";
import EditOptions from "./EditOptions";
import TrackList from "./TrackList";

function EditWindow() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);

	if (!currentPlaylist) {
		return (
			<></>
			// <Card.Section
			// 	radius="lg"
			// 	style={{
			// 		backgroundColor: theme.colors.dark[7],
			// 		height: "100%",
			// 		width: "100%",
			// 		margin: 0,
			// 	}}>
			// 	<Container px="lg" py="md">
			// 		<Grid style={{ width: "100%" }}>
			// 			<Grid.Col span={8}>
			// 				<>
			// 					<Skeleton height={50} circle mb="xl" />
			// 					<Skeleton height={8} radius="xl" />
			// 					<Skeleton height={8} mt={6} radius="xl" />
			// 					<Skeleton height={8} mt={6} width="70%" radius="xl" />
			// 				</>
			// 			</Grid.Col>
			// 			<Divider />
			// 			<Grid.Col span={4}>
			// 				<>
			// 					<Skeleton height={50} circle mb="xl" />
			// 					<Skeleton height={8} radius="xl" />
			// 					<Skeleton height={8} mt={6} radius="xl" />
			// 					<Skeleton height={8} mt={6} width="70%" radius="xl" />
			// 				</>
			// 			</Grid.Col>
			// 		</Grid>
			// 	</Container>
			// </Card.Section>
		);
	}
	return (
		<Card
			px="lg"
			py="md"
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "row",
			}}>
			<TrackList />
			<EditOptions />
		</Card>
	);
}

export default EditWindow;
