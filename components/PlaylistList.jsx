import React, { useEffect, useState } from "react";
import useSpotify from "../lib/useSpotify";
import {
	Card,
	Container,
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
		<Card
			px="lg"
			py="md"
			style={{
				height: "100%",
				backgroundColor: "#ffffff00",
				padding: 5,
			}}>
			<ScrollArea offsetScrollbars style={{ height: "100%", width: "100%" }}>
				{playlists.map(p => (
					<Playlist key={p.id} data={p} />
				))}
			</ScrollArea>
		</Card>
	);
}
