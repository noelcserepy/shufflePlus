import {
	Avatar,
	Box,
	Group,
	UnstyledButton,
	Text,
	useMantineTheme,
	Button,
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
			sx={{
				padding: theme.spacing.sm,
			}}>
			<Group>
				{image && <Avatar radius="lg" src={image} />}
				{!image && (
					<Avatar radius="lg" color="cyan">
						NC
					</Avatar>
				)}
				<Box>
					<Text size="sm">{session.user.name}</Text>
					<Anchor size="xs" onClick={signOut}>
						Sign Out
					</Anchor>
				</Box>
			</Group>
		</Box>
	);
}
