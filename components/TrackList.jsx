import {
	Box,
	Container,
	List,
	Loader,
	Paper,
	ScrollArea,
	Space,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import useStore from "../lib/store";
import useSpotify from "../lib/useSpotify";
import Track from "./Track";

function TrackList() {
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(false);
	const theme = useMantineTheme();
	const { data: session, status } = useSession();
	const s = useSpotify();
	const currentPlaylist = useStore(state => state.currentPlaylist);

	useEffect(() => {
		if (currentPlaylist) {
			setLoading(true);
			const fetchPlaylistTracks = async () => {
				const result = await s.getPlaylistTracks(currentPlaylist.id);
				setTracks(result.items);
			};
			fetchPlaylistTracks();
			setLoading(false);
		}
	}, [session, currentPlaylist]);

	if (!currentPlaylist) return <Box />;

	return (
		<Paper>
			<Container>
				<Title order={3}>Playlist: {currentPlaylist.name}</Title>
				<Space h="xl" />
				{loading ? (
					<Loader theme={{ loader: "bars" }} />
				) : (
					<>
						<ScrollArea style={{ height: "91vh" }}>
							{!currentPlaylist ? (
								<div>no playlist</div>
							) : (
								<List>
									{tracks.map(t => (
										<Track key={t.id} data={t} />
									))}
								</List>
							)}
						</ScrollArea>
					</>
				)}
			</Container>
		</Paper>
	);
}

export default TrackList;
