import { Button, Divider, ScrollArea, useMantineTheme } from "@mantine/core";
import useStore from "../../lib/store";
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
				height: "100vh",
			}}>
			<EditHeader />
			<EditOptions />
			<Divider my="xs" sx={theme => theme.colors.dark[0]} />
			<TrackList />
		</ScrollArea>
	);
}

export default EditWindow;
