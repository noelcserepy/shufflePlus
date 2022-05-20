import {
	AppShell,
	useMantineTheme,
	Navbar,
	ScrollArea,
	Header,
	MediaQuery,
	Burger,
	Title,
} from "@mantine/core";
import PlaylistList from "../components/Nav/PlaylistList";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import EditWindow from "./Editor/EditWindow";
import NavHeader from "./Nav/NavHeader";
import UserBox from "./Nav/UserBox";

export default function Editor() {
	const { data: session, status } = useSession();
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);

	return (
		<AppShell
			margin={0}
			padding={0}
			navbarOffsetBreakpoint
			navbar={
				<MediaQuery largerThan="sm" styles={{ height: "100vh" }}>
					<Navbar
						hiddenBreakpoint="sm"
						hidden={!opened}
						width={{ base: 300 }}
						p="xl"
						style={{
							color: theme.colors.dark[0],
							backgroundColor: theme.colors.dark[9],
							minWidth: "300px",
						}}>
						<Navbar.Section
							mb="xl"
							sx={{
								"@media (max-width: 768px)": {
									display: "none",
								},
							}}>
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
				</MediaQuery>
			}
			header={
				<MediaQuery largerThan="sm" styles={{ display: "none" }}>
					<Header height={70} p="md">
						<div
							style={{ display: "flex", alignItems: "center", height: "100%" }}>
							<Burger
								opened={opened}
								onClick={() => setOpened(o => !o)}
								size="sm"
								color={theme.colors.gray[5]}
								mr="xl"
							/>

							<Title order={4}>
								<span style={{ color: theme.colors.gray[0] }}>Shuffle</span>
								<span style={{ color: theme.colors[theme.primaryColor][5] }}>
									Plus
								</span>
							</Title>
						</div>
					</Header>
				</MediaQuery>
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
