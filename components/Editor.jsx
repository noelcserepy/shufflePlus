import {
	Grid,
	Box,
	AppShell,
	useMantineTheme,
	Navbar,
	Header,
	Title,
	Container,
} from "@mantine/core";
import PlaylistList from "../components/PlaylistList";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import UserBox from "./UserBox";
import EditWindow from "./EditWindow";

export default function Editor() {
	const { data: session, status } = useSession();
	const theme = useMantineTheme();

	return (
		<AppShell
			margin={0}
			padding={0}
			navbar={
				<Navbar width={{ base: 300 }} p="xs" style={{ color: "white" }}>
					<Title order={1}>ShufflePlus</Title>
					<UserBox />
					<PlaylistList />
				</Navbar>
			}
			sx={{
				overflow: "hidden",
				height: "100vh",
				background: theme.colors.dark[5],
			}}>
			<EditWindow />
		</AppShell>
	);
}
