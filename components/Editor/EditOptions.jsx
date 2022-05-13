import {
	Box,
	Button,
	Divider,
	Group,
	InputWrapper,
	Slider,
	Stack,
	Switch,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import useStore from "../../lib/store";
import EditOptionsSection from "./EditOptionsSection";
import SortSection from "./SortSection";

function EditOptions() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);

	const handleSort = () => {};

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	return (
		<Box
			p={30}
			style={{
				height: "37vh",
				display: "flex",
				flexFlow: "row wrap",
				justifyContent: "space-evenly",
			}}>
			<SortSection />

			<EditOptionsSection title="Merge" text="Choose a playlist to merge with">
				<Button>Merge with</Button>
			</EditOptionsSection>

			<EditOptionsSection
				title="Fill"
				text="Choose how many tracks you want to add">
				<Slider
					style={{
						width: "100%",
					}}
					marks={[
						{ value: 10, label: "10" },
						{ value: 30, label: "30" },
						{ value: 50, label: "50" },
						{ value: 80, label: "100" },
					]}
				/>
				<Switch label="Only use non-library tracks" />
				<Button>Fill</Button>
			</EditOptionsSection>

			<EditOptionsSection title="Save" text="Save the new playlist">
				<Button>Save as new</Button>
			</EditOptionsSection>
		</Box>
	);
}

export default EditOptions;
