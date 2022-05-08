import { Box, List, Loader, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import useStore from "../../lib/store";
import useSpotify from "../../lib/useSpotify";
import Track from "./Track";

function TrackList() {
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(false);
	const theme = useMantineTheme();
	const { data: session, status } = useSession();
	const s = useSpotify();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);

	useEffect(() => {
		if (currentPlaylist) {
			setLoading(true);
			const fetchPlaylistTracks = async () => {
				const result = await s.getPlaylistTracks(currentPlaylist.id);
				setTracks(result.items);
			};
			fetchPlaylistTracks();
			currentPlaylist.tracks.items = [...tracks];

			setLoading(false);
		}
	}, [session, currentPlaylist]);

	if (!currentPlaylist) return <Box />;

	return (
		<Box size="lg" p={30}>
			{loading ? (
				<Loader theme={{ loader: "bars" }} />
			) : (
				<List>
					{tracks.map((t, i) => (
						<Track key={`${t.id}--${i}`} data={t} index={i} />
					))}
				</List>
			)}
		</Box>
	);
}

export default TrackList;
