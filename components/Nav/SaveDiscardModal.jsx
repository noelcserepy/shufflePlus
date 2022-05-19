import { Box, Button, Modal, Text, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import useStore from "../../lib/store";

function SaveDiscardModal({ opened, setOpened, data }) {
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);

	const theme = useMantineTheme();

	const handleDiscard = () => {
		setOpened(false);
		setCurrentPlaylist({ ...data });
	};

	return (
		<Modal
			size="xs"
			centered
			opened={opened}
			onClose={() => setOpened(false)}
			title="Unsaved changes">
			<Text size="sm" color={theme.colors.dark[2]}>
				The playlist you have edited has unsaved changes. Do you want to save
				them?
			</Text>
			<Box>
				<Button mt={36} mr={20}>
					Go back and save
				</Button>
				<Button variant="outline" onClick={() => handleDiscard()}>
					Discard
				</Button>
			</Box>
		</Modal>
	);
}

export default SaveDiscardModal;
