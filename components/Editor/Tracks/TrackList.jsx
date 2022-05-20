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
		index: (
			<Box style={{ width: "20px" }}>
				<Text style={{ width: "20px" }}>{i + 1}</Text>
			</Box>
		),
		title: (
			<Box
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Box
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						alignItems: "center",
						height: "20px",
						textOverflow: "ellipsis",
						maxWidth: "70%",
					}}>
					<Image src={t.track.album.images[2].url} radius="sm" height={30} />
					<Space w="md" />
					<Box>
						<Text size="sm" lineClamp={1}>
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
				<ActionIcon color="red" onClick={() => handleDelete(t)}>
					<Trash size={18} />
				</ActionIcon>
			</Box>
		),
	}));

	const rows = tableData.map((t, i) => (
		<tr key={`${t.id}--${i + 1}`}>
			<td style={{ padding: "10px", width: "20px" }}>{t.index}</td>
			<td style={{ padding: "10px" }}>{t.title}</td>
		</tr>
	));

	return (
		<Box p={36}>
			<Table
				highlightOnHover
				horizontalSpacing="xs"
				verticalSpacing="xs"
				fontSize="md">
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</Box>
	);
}

export default TrackList;
