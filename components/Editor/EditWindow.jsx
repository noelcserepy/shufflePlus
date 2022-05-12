import { Button, Divider, ScrollArea, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useStore from "../../lib/store";
import useSpotify from "../../lib/useSpotify";
import CoverPage from "./CoverPage";
import EditHeader from "./EditHeader";
import EditOptions from "./EditOptions";
import TrackList from "./TrackList";

function EditWindow() {
	const { data: session, status } = useSession();
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const setCurrentTracks = useStore(state => state.setCurrentTracks);
	const s = useSpotify();

	useEffect(() => {
		const fetchPlaylistTracks = async () => {
			const result = await s.getPlaylistTracks(currentPlaylist.id);
			setCurrentTracks([...result.items]);
		};

		if (currentPlaylist) {
			fetchPlaylistTracks();
		}
	}, [session, currentPlaylist]);

	if (!currentPlaylist) {
		return <CoverPage />;
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
