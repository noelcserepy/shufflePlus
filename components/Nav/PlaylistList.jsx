import React, { useEffect } from "react";
import useSpotify from "../../lib/useSpotify";
import { Box, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";
import useStore from "../../lib/store";
import { useState } from "react";
import SaveDiscardModal from "./SaveDiscardModal";

export default function PlaylistList() {
	const playlists = useStore(state => state.playlists);
	const setPlaylists = useStore(state => state.setPlaylists);
	const [opened, setOpened] = useState(false);
	const [nextPlaylist, setNextPlaylist] = useState();

	const theme = useMantineTheme();
	const { data: session, status } = useSession();
	const s = useSpotify();

	useEffect(() => {
		const fetchPlaylists = async () => {
			const result = await s.getUserPlaylists(session.user.id);
			setPlaylists([...result.body.items]);
		};

		fetchPlaylists();
	}, [session]);

	return (
		<Box>
			{playlists.map(p => (
				<Playlist
					key={p.id}
					data={p}
					opened={opened}
					setOpened={val => setOpened(val)}
					setNextPlaylist={val => setNextPlaylist(val)}
				/>
			))}
			<SaveDiscardModal
				opened={opened}
				setOpened={val => setOpened(val)}
				nextPlaylist={nextPlaylist}
			/>
		</Box>
	);
}
