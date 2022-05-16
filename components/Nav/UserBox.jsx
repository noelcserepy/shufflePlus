import {
	Avatar,
	Box,
	Group,
	Text,
	useMantineTheme,
	Anchor,
} from "@mantine/core";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserBox() {
	const theme = useMantineTheme();
	const { data: session } = useSession();
	const { image } = session.user;

	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "flex-start",
			}}>
			<Group>
				{image && <Avatar radius="xs" src={image} />}
				{!image && (
					<Avatar radius="sm" color="cyan">
						You
					</Avatar>
				)}
				<Box
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}>
					<Text size="sm">{session.user.name}</Text>
					<Anchor
						size="xs"
						onClick={signOut}
						style={{ color: theme.colors[theme.primaryColor][8] }}>
						Sign Out
					</Anchor>
				</Box>
			</Group>
		</Box>
	);
}
