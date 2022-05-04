import {
	Grid,
	Box,
	AppShell,
	useMantineTheme,
	Navbar,
	Header,
	Title,
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
			padding="md"
			navbar={
				<Navbar width={{ base: 300 }} p="xs">
					<PlaylistList />
				</Navbar>
			}
			header={
				<Header
					height={80}
					p="xs"
					style={{
						display: "flex",
						flexWrap: "nowrap",
						justifyContent: "space-between",
						alignItems: "center",
						color: theme.colors.dark[1],
					}}>
					<Title order={1}>ShufflePlus</Title>
					<UserBox />
				</Header>
			}
			sx={{
				overflow: "hidden",
				height: "100vh",
				margin: 0,
				padding: 0,
			}}>
			<EditWindow />
		</AppShell>
	);
}

{
	/* <Box
				sx={{
					overflow: "hidden",
					height: "100vh",
					margin: 0,
					padding: 0,
				}}
				style={{
					backgroundColor: theme.colors.dark[6],
					borderRadius: 0,
				}}>
				<Grid
					style={{
						height: "100%",
					}}>
					<Grid.Col
						span={3}
						style={{ height: "100%", backgroundColor: theme.colors.dark[9] }}>
						<PlaylistList />
					</Grid.Col>
					<Grid.Col span={9} style={{ height: "100%" }}>
						
					</Grid.Col>
				</Grid>
			</Box> */
}
