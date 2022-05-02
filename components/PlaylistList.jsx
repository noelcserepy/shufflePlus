import React, { useEffect, useState } from "react";
import useSpotify from "../lib/useSpotify";
import {
	Container,
	Divider,
	List,
	Paper,
	ScrollArea,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";

export default function PlaylistList() {
	const [playlists, setPlaylists] = useState([]);
	const theme = useMantineTheme();
	const { data: session, status } = useSession();
	const s = useSpotify();

	useEffect(() => {
		const fetchPlaylists = async () => {
			const result = await s.getUserPlaylists(session.user.id);
			setPlaylists(result.items);
		};

		fetchPlaylists();
	}, [session]);

	return (
		<Paper radius="lg" style={{ backgroundColor: theme.colors.dark[7] }}>
			<Container px="lg" py="md">
				<Title order={3}>Playlists</Title>
				<ScrollArea style={{ height: "91vh" }}>
					{playlists.map(p => (
						<Playlist key={p.id} data={p} />
					))}
				</ScrollArea>
			</Container>
		</Paper>
	);
}

// images[0].url
// name
