import {
	Box,
	Button,
	Group,
	InputWrapper,
	SegmentedControl,
	Slider,
	Stack,
	Switch,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import useStore from "../../lib/store";
import useSpotify from "../../lib/useSpotify";

function EditOptions() {
	const [sortType, setSortType] = useState();
	const [sortDirection, setSortDirection] = useState();
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	const s = useSpotify();

	const handleSort = () => {
		const trackIds = currentPlaylist.tracks.items.map(track => track.track.id);
		let features = [];

		function dynamicSort(property, descending) {
			descending = descending || false;
			var sortOrder = 1;
			if (descending) {
				sortOrder = -1;
			}
			return function (a, b) {
				var result =
					a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
				return result * sortOrder;
			};
		}

		const fetchTrackFeatures = async () => {
			const result = await s.getAudioFeaturesForTracks(trackIds);
			features = result.audio_features;
			console.log(features);
			features.sort(dynamicSort("danceability", true));
			console.log(features);
		};
		fetchTrackFeatures();
	};

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	return (
		<Box
			p={30}
			style={{
				display: "flex",
				flexFlow: "row wrap",
				justifyContent: "space-between",
			}}>
			{/* <InputWrapper id="title" label="Title">
				<Input id="title" value={currentPlaylist.name}></Input>
			</InputWrapper> */}

			<InputWrapper
				id="quick-actions"
				label="Quick actions"
				description="Try out some funky fresh rhymes!">
				<Group
					position="center"
					spacing="sm"
					grow
					style={{
						flexWrap: "nowrap",
					}}>
					<Button>Feeling lucky</Button>
					<Button>Freshen up</Button>
				</Group>
			</InputWrapper>
			<Button>Merge with</Button>

			<InputWrapper id="fill" label="Fill" description="fill">
				<Stack justify="flex-start" spacing="xl">
					<Slider
						marks={[
							{ value: 20, label: "20%" },
							{ value: 50, label: "50%" },
							{ value: 80, label: "80%" },
						]}
					/>
					<Switch label="Only use non-library tracks" />
				</Stack>
			</InputWrapper>

			<InputWrapper id="sort" label="Sort" description="sort">
				<Stack justify="flex-start" spacing="xl">
					<SegmentedControl
						value={sortType}
						onChange={setSortType}
						data={[
							{ label: "Energy", value: "energy" },
							{ label: "Positivity", value: "positivity" },
							{ label: "Gig", value: "gig" },
						]}
					/>
					<SegmentedControl
						value={sortDirection}
						onChange={setSortDirection}
						data={[
							{ label: "Increasing", value: "increasing" },
							{ label: "Decreasing", value: "decreasing" },
						]}
					/>
					<Button onClick={() => handleSort()}>Sort</Button>
				</Stack>
			</InputWrapper>
			<Button>Save as new</Button>
		</Box>
	);
}

export default EditOptions;
