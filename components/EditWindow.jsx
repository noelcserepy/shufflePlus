import { Divider, Grid, Paper, Skeleton, useMantineTheme } from "@mantine/core";
import useStore from "../lib/store";
import EditOptions from "./EditOptions";
import TrackList from "./TrackList";

function EditWindow() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);

	if (!currentPlaylist) {
		return (
			<Paper radius="lg" style={{ backgroundColor: theme.colors.dark[7] }}>
				<Grid style={{ width: "100%" }}>
					<Grid.Col span={8}>
						<>
							<Skeleton height={50} circle mb="xl" />
							<Skeleton height={8} radius="xl" />
							<Skeleton height={8} mt={6} radius="xl" />
							<Skeleton height={8} mt={6} width="70%" radius="xl" />
						</>
					</Grid.Col>
					<Divider />
					<Grid.Col span={4}>
						<>
							<Skeleton height={50} circle mb="xl" />
							<Skeleton height={8} radius="xl" />
							<Skeleton height={8} mt={6} radius="xl" />
							<Skeleton height={8} mt={6} width="70%" radius="xl" />
						</>
					</Grid.Col>
				</Grid>
			</Paper>
		);
	}
	return (
		<Paper radius="lg" style={{ backgroundColor: theme.colors.dark[7] }}>
			<Grid style={{ width: "100%" }}>
				<Grid.Col span={8}>
					<TrackList />
				</Grid.Col>
				<Divider />
				<Grid.Col span={4}>
					<EditOptions />
				</Grid.Col>
			</Grid>
		</Paper>
	);
}

export default EditWindow;
