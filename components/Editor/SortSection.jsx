import {
	Button,
	InputWrapper,
	SegmentedControl,
	Stack,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import useStore from "../../lib/store";
import useSpotify from "../../lib/useSpotify";

function dynamicSort(nestProperty, property, descending) {
	descending = descending || false;
	var sortOrder = 1;
	if (descending) {
		sortOrder = -1;
	}
	return function (a, b) {
		var result =
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

	const s = useSpotify();

	const [sortParam, setSortParam] = useState();
	const [sortOrder, setSortOrder] = useState();

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

			tracksWithFeatures.sort(
				dynamicSort(
					"features",
					sortParam,
					sortOrder == "increasing" ? false : true
				)
			);

			setCurrentTracks(tracksWithFeatures);
		};

		fetchTrackFeatures();
	};

	return (
		<InputWrapper id="sort" label="Sort" description="sort">
			<Stack justify="flex-start" spacing="xl">
				<SegmentedControl
					value={sortParam}
					onChange={setSortParam}
					data={[
						{ label: "Energy", value: "hype" },
						{ label: "Positivity", value: "positivity" },
						{ label: "Gig", value: "gig" },
					]}
				/>
				<SegmentedControl
					value={sortOrder}
					onChange={setSortOrder}
					data={[
						{ label: "Increasing", value: "increasing" },
						{ label: "Decreasing", value: "decreasing" },
					]}
				/>
				<Button onClick={() => handleSort()}>Sort</Button>
			</Stack>
		</InputWrapper>
	);
}
