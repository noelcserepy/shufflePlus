import { Box, List } from "@mantine/core";
import { useEffect } from "react";
import useStore from "../../lib/store";
import useSpotify from "../../lib/useSpotify";
import Track from "./Track";

function TrackList() {
	const s = useSpotify();
	const currentTracks = useStore(state => state.currentTracks);

	// useEffect(() => {}, [currentTracks]);

	return (
		<Box size="lg" p={30}>
			<List>
				{currentTracks.map((t, i) => (
					<Track key={`${t.id}--${i}`} data={t} index={i} />
				))}
			</List>
		</Box>
	);
}

export default TrackList;
