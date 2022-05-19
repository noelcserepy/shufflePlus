import { Button, Slider, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { RowInsertTop } from "tabler-icons-react";
import useStore from "../../../lib/store";
import useSpotify from "../../../lib/useSpotify";
import EditOptionsSection from "./EditOptionsSection";

function FillSection() {
	const theme = useMantineTheme();
	const [fill, setFill] = useState(1);
	const s = useSpotify();
	const currentTracks = useStore(state => state.currentTracks);
	const setCurrentTracks = useStore(state => state.setCurrentTracks);
	const setCurrentEdited = useStore(state => state.setCurrentEdited);

	const handleFill = () => {
		setCurrentEdited(true);
		const seedTrackIds = currentTracks.map(t => t.track.id);
		s.getRecommendations({
			seed_tracks: seedTrackIds.slice(0, 4),
			limit: fill,
		}).then(res => {
			{
				const newTracks = res.body.tracks.map(t => ({ track: t }));
				setCurrentTracks([...currentTracks, ...newTracks]);
				toast.success(`Filled ${fill} tracks`);
			}
		});
	};

	return (
		<EditOptionsSection
			title="Fill"
			text="Choose how many tracks to add"
			icon={
				<RowInsertTop size={40} color={theme.colors[theme.primaryColor][5]} />
			}>
			<Slider
				value={fill}
				onChange={setFill}
				mb={20}
				size="xs"
				radius="xs"
				labelAlwaysOn
				min={1}
				max={100}
				marks={[
					{ value: 10, label: "10" },
					{ value: 30, label: "30" },
					{ value: 50, label: "50" },
					{ value: 100, label: "100" },
				]}
			/>
			<Button variant="outline" onClick={() => handleFill()}>
				Fill
			</Button>
		</EditOptionsSection>
	);
}

export default FillSection;
