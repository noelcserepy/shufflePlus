import { Box, useMantineTheme } from "@mantine/core";
import useStore from "../../../lib/store";
import FillSection from "./FillSection";
import MergeSection from "./MergeSection";
import SaveSection from "./SaveSection";
import SortSection from "./SortSection";

function EditOptions() {
	const setCurrentPlaylist = useStore(state => state.setCurrentPlaylist);
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const theme = useMantineTheme();

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	const setEdited = edited => {
		setCurrentPlaylist({ ...currentPlaylist, edited });
	};

	return (
		<Box
			p={36}
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "36px",
				justifyContent: "space-evenly",
			}}>
			<SortSection setEdited={val => setEdited(val)} />

			<MergeSection setEdited={val => setEdited(val)} />

			<FillSection setEdited={val => setEdited(val)} />

			<SaveSection setEdited={val => setEdited(val)} />
		</Box>
	);
}

export default EditOptions;
