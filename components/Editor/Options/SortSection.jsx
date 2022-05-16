import { Box, Button, SegmentedControl, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { SortAscending } from "tabler-icons-react";
import useStore from "../../../lib/store";
import useSpotify from "../../../lib/useSpotify";
import EditOptionsSection from "./EditOptionsSection";

function dynamicSort(nestProperty, property, sortOrder) {
	return function (a, b) {
		let result =
			a[nestProperty][property] < b[nestProperty][property]
				? -1
				: a[nestProperty][property] > b[nestProperty][property]
				? 1
				: 0;
		return result * sortOrder;
	};
}

function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}

function createNewFeatures(f) {
	f.positivity = 0.8 * f.valence + 0.2 * f.mode;

	f.tempo = clamp(f.tempo, 50, 180);
	f.tempo = (f.tempo - 50) / 130;

	f.loudness = clamp(f.loudness, -60, 0);
	f.loudness = f.loudness / 60 + 1;

	f.hype =
		0.55 * f.energy + 0.15 * f.tempo + 0.1 * f.loudness + 0.2 * f.danceability;

	f.gig =
		0.1 * f.speechiness +
		0.3 * f.acousticness +
		0.5 * f.liveness +
		0.1 * f.instrumentalness;
}

export default function SortSection() {
	const currentTracks = useStore(state => state.currentTracks);
	const setCurrentTracks = useStore(state => state.setCurrentTracks);
	const currentColors = useStore(state => state.currentColors);
	const theme = useMantineTheme();
	const s = useSpotify();

	const [sortParam, setSortParam] = useState("hype");
	const [sortOrder, setSortOrder] = useState(1);

	const handleSort = () => {
		const fetchTrackFeatures = async () => {
			const trackIds = currentTracks.map(track => track.track.id);
			let features = [];
			const result = await s.getAudioFeaturesForTracks(trackIds);
			features = result.audio_features;
			features.map(f => createNewFeatures(f));

			const tracksWithFeatures = currentTracks.map((t, i) => {
				t.features = features[i];
				return t;
			});

			tracksWithFeatures.sort(dynamicSort("features", sortParam, sortOrder));

			setCurrentTracks(tracksWithFeatures);
		};

		fetchTrackFeatures();
		toast.success("Successfully Sorted!");
	};

	return (
		<EditOptionsSection
			title="Sort"
			text="Choose your order type"
			icon={
				<SortAscending size={40} color={theme.colors[theme.primaryColor][5]} />
			}>
			<SegmentedControl
				color={theme.primaryColor}
				radius="xs"
				sx={theme => ({
					backgroundColor: theme.colors.dark[5],
				})}
				value={sortOrder}
				onChange={setSortOrder}
				data={[
					{ label: "Increasing", value: 1 },
					{ label: "Decreasing", value: -1 },
				]}
			/>
			<SegmentedControl
				color={theme.primaryColor}
				radius="xs"
				sx={theme => ({
					backgroundColor: theme.colors.dark[5],
				})}
				value={sortParam}
				onChange={setSortParam}
				data={[
					{ label: "Hype", value: "hype" },
					{ label: "Positivity", value: "positivity" },
					{ label: "Gig", value: "gig" },
				]}
			/>
			<Button variant="outline" onClick={() => handleSort()}>
				Sort
			</Button>
		</EditOptionsSection>
	);
}
