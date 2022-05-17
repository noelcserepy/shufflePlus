import {
	ActionIcon,
	Box,
	Image,
	Space,
	Table,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { Heart, Trash } from "tabler-icons-react";
import useStore from "../../../lib/store";

function TrackList() {
	const theme = useMantineTheme();
	const currentTracks = useStore(state => state.currentTracks);
	const setCurrentTracks = useStore(state => state.setCurrentTracks);

	const handleDelete = t => {
		const newCurrentTracks = currentTracks.filter(
			ct => ct.track.id !== t.track.id
		);
		setCurrentTracks([...newCurrentTracks]);
	};

	const tableData = currentTracks.map((t, i) => ({
		index: i,
		title: (
			<Box
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
					height: "20px",
				}}>
				<Image src={t.track.album.images[2].url} radius="sm" height={30} />
				<Space w="md" />
				<Box style={{ maxWidth: "80%" }}>
					<Text size="sm" lineClamp={1} style={{ textOverflow: "ellipsis" }}>
						{t.track.name}
					</Text>
					<Text
						size="xs"
						lineClamp={1}
						style={{ color: theme.colors.dark[2], textOverflow: "ellipsis" }}>
						{t.track.artists.map(a => a.name).join(", ")}
					</Text>
				</Box>
			</Box>
		),
		heart: (
			<ActionIcon>
				<Heart size={18} />
			</ActionIcon>
		),
		delete: (
			<ActionIcon color="red" onClick={() => handleDelete(t)}>
				<Trash size={18} />
			</ActionIcon>
		),
	}));

	const rows = tableData.map((t, i) => (
		<tr key={`${t.id}--${i}`}>
			<td>{t.index}</td>
			<td>{t.title}</td>
			<td>{t.heart}</td>
			<td>{t.delete}</td>
		</tr>
	));

	return (
		<Box size="lg" p={30}>
			<Table
				highlightOnHover
				horizontalSpacing="xs"
				verticalSpacing="xs"
				fontSize="md">
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</Box>
	);
}

export default TrackList;
