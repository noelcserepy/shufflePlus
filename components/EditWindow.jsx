import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	Paper,
	ScrollArea,
	Skeleton,
	Title,
	useMantineTheme,
} from "@mantine/core";
import useStore from "../lib/store";
import EditHeader from "./EditHeader";
import EditOptions from "./EditOptions";
import TrackList from "./TrackList";

function EditWindow() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);

	if (!currentPlaylist) {
		return <></>;
	}
	return (
		<ScrollArea
			p={0}
			style={{
				width: "100%",
			}}>
			<EditHeader />
			<EditOptions />
			<TrackList />
		</ScrollArea>
	);
}

export default EditWindow;
