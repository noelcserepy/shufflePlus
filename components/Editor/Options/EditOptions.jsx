import { Box, Button, useMantineTheme } from "@mantine/core";
import { Checklist } from "tabler-icons-react";
import useStore from "../../../lib/store";
import EditOptionsSection from "./EditOptionsSection";
import FillSection from "./FillSection";
import MergeSection from "./MergeSection";
import SortSection from "./SortSection";

function EditOptions() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const primaryColor = theme.primaryColor;

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

			<EditOptionsSection
				title="Save"
				text="Save the new playlist"
				icon={<Checklist size={40} color={theme.colors[primaryColor][5]} />}>
				<Button variant="outline">Save</Button>
			</EditOptionsSection>
		</Box>
	);
}

export default EditOptions;
