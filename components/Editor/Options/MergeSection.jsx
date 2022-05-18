import { Button, Select, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { ArrowsJoin } from "tabler-icons-react";
import useStore from "../../../lib/store";
import useSpotify from "../../../lib/useSpotify";
import EditOptionsSection from "./EditOptionsSection";
import { toast } from "react-hot-toast";

function MergeSection() {
	const theme = useMantineTheme();
	const s = useSpotify();
	const playlists = useStore(state => state.playlists);
	const currentTracks = useStore(state => state.currentTracks);
	const setCurrentTracks = useStore(state => state.setCurrentTracks);
	const [playlistToMerge, setPlaylistToMerge] = useState();

	let image = "/note2.svg";

	const selectData = playlists.map(p => ({
		image: p.images.length > 2 ? p.images[2] : image,
		label: p.name,
		value: p.id,
	}));

	const handleMerge = () => {
		const fetchPlaylistTracks = async () => {
			const result = await s.getPlaylistTracks(playlistToMerge);
			setCurrentTracks([...currentTracks, ...result.body.items]);
		};

		if (playlistToMerge) {
			fetchPlaylistTracks();
			toast.success("Successfully Merged!");
		}
	};

	return (
		<EditOptionsSection
			title="Merge"
			text="Choose a playlist to merge with"
			icon={
				<ArrowsJoin size={40} color={theme.colors[theme.primaryColor][5]} />
			}>
			<Select
				placeholder="Pick a playlist"
				searchable
				nothingFound="No options"
				maxDropdownHeight={280}
				data={selectData}
				onChange={value => setPlaylistToMerge(value)}
			/>
			<Button variant="outline" onClick={() => handleMerge()}>
				Merge
			</Button>
		</EditOptionsSection>
	);
}

export default MergeSection;
