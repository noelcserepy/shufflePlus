import { Children, useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

function TitleModal() {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Edit Playlist">
				<Button>edit</Button>
			</Modal>

			<Group position="center">
				<Button onClick={() => setOpened(true)}>Open Modal</Button>
			</Group>
		</>
	);
}
