import React, { useEffect } from "react";
import useSpotify from "../lib/useSpotify";
import { Box, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";
import useStore from "../lib/store";

export default function PlaylistList() {
	const playlists = useStore(state => state.playlists);
	const setPlaylists = useStore(state => state.setPlaylists);
	const theme = useMantineTheme();
	const { data: session, status } = useSession();
	const s = useSpotify();

	useEffect(() => {
		const fetchPlaylists = async () => {
			const result = await s.getUserPlaylists(session.user.id);
			setPlaylists([...result.items]);
		};

		fetchPlaylists();
	}, [session]);

	return (
		<Box>
			{playlists.map(p => (
				<Playlist key={p.id} data={p} />
			))}
		</Box>
	);
}
