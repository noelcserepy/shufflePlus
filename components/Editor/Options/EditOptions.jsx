import { Box, useMantineTheme } from "@mantine/core";
import useStore from "../../../lib/store";
import FillSection from "./FillSection";
import MergeSection from "./MergeSection";
import SaveSection from "./SaveSection";
import SortSection from "./SortSection";

function EditOptions() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	return (
		<Box
			p={36}
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "36px",
				justifyContent: "space-evenly",
			}}>
			<SortSection />

			<MergeSection />

			<FillSection />

			<SaveSection />
		</Box>
	);
}

export default EditOptions;
