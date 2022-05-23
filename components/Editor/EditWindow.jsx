import { ScrollArea, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useStore from "../../lib/store";
import useSpotify from "../../lib/useSpotify";
import CoverPage from "./CoverPage";
import EditHeader from "./EditHeader";
import EditOptions from "./Options/EditOptions";
import TrackList from "./Tracks/TrackList";

function EditWindow() {
	const { data: session, status } = useSession();
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const setCurrentTracks = useStore(state => state.setCurrentTracks);
	const s = useSpotify();

	useEffect(() => {
		const fetchPlaylistTracks = async () => {
			const result = await s.getPlaylistTracks(currentPlaylist.id);
			setCurrentTracks([...result.body.items]);
		};

		if (currentPlaylist) {
			if (!currentPlaylist.edited) {
				fetchPlaylistTracks();
			}
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
				backgroundColor: theme.colors.dark[7],
			}}>
			<EditHeader />
			<EditOptions />
			<TrackList />
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						borderRadius: "5px",
						background: theme.colors.dark[9],
						color: theme.colors.dark[0],
					},
				}}
			/>
		</ScrollArea>
	);
}

export default EditWindow;
