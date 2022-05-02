import {
	Container,
	ScrollArea,
	Grid,
	Button,
	Paper,
	Box,
	Center,
	Divider,
	useMantineTheme,
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
		<Paper
			sx={{
				overflow: "hidden",
				height: "100vh",
			}}
			style={{
				backgroundColor: theme.colors.dark[6],
				borderRadius: 0,
				margin: 0,
				padding: 20,
				border: 0,
			}}>
			<UserBox />
			<Grid
				style={{
					padding: 20,
				}}>
				<Grid.Col span={3}>
					<PlaylistList />
				</Grid.Col>
				<Grid.Col span={8} offset={1}>
					<EditWindow />
				</Grid.Col>
			</Grid>
		</Paper>
	);
}
