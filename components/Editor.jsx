import { AppShell, useMantineTheme, Navbar, ScrollArea } from "@mantine/core";
import PlaylistList from "../components/Nav/PlaylistList";
import React from "react";
import { useSession } from "next-auth/react";
import EditWindow from "./Editor/EditWindow";
import NavHeader from "./Nav/NavHeader";
import UserBox from "./Nav/UserBox";

export default function Editor() {
	const { data: session, status } = useSession();
	const theme = useMantineTheme();

	return (
		<AppShell
			margin={0}
			padding={0}
			navbar={
				<Navbar
					width={{ base: 300 }}
					p="xl"
					style={{
						color: theme.colors.dark[0],
						backgroundColor: theme.colors.dark[9],
					}}>
					<Navbar.Section mb="xl">
						<NavHeader />
					</Navbar.Section>

					<Navbar.Section
						grow
						my="xl"
						component={ScrollArea}
						offsetScrollbars
						scrollHideDelay={100}>
						<PlaylistList />
					</Navbar.Section>

					<Navbar.Section mt="xl">
						<UserBox />
					</Navbar.Section>
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
