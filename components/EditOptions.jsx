import {
	Box,
	Button,
	Container,
	Group,
	Image,
	Input,
	InputWrapper,
	Paper,
	SegmentedControl,
	Slider,
	Space,
	Stack,
	Switch,
	TextInput,
	Title,
	useMantineTheme,
} from "@mantine/core";
import useStore from "../lib/store";

function EditOptions() {
	const theme = useMantineTheme();
	const currentPlaylist = useStore(state => state.currentPlaylist);
	console.log(currentPlaylist);

	if (!currentPlaylist)
		return (
			<Box style={{ width: "50%", backgroundColor: theme.colors.dark[6] }} />
		);

	return (
		<Paper
			radius="lg"
			p={10}
			style={{
				backgroundColor: theme.colors.dark[9],
				height: "100%",
			}}>
			<Container>
				<Title order={3}>{currentPlaylist.name}</Title>
				<Stack>
					<Image style={{ width: "50%" }} src={currentPlaylist.images[0].url} />

					<InputWrapper id="title" label="Title">
						<Input id="title" value={currentPlaylist.name}></Input>
					</InputWrapper>

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
								data={[
									{ label: "Energy", value: "energy" },
									{ label: "Positivity", value: "positivity" },
									{ label: "Gig", value: "gig" },
								]}
							/>
							<SegmentedControl
								data={[
									{ label: "Increasing", value: "increasing" },
									{ label: "Decreasing", value: "decreasing" },
								]}
							/>
							<Button>Sort</Button>
						</Stack>
					</InputWrapper>
					<Button>Save</Button>
				</Stack>
			</Container>
		</Paper>
	);
}

export default EditOptions;
