import {
	Box,
	Button,
	SegmentedControl,
	Slider,
	Switch,
	useMantineTheme,
} from "@mantine/core";
import { RowInsertTop } from "tabler-icons-react";
import EditOptionsSection from "./EditOptionsSection";

function FillSection() {
	const theme = useMantineTheme();

	return (
		<EditOptionsSection
			title="Fill"
			text="Choose how many tracks to add"
			icon={
				<RowInsertTop size={40} color={theme.colors[theme.primaryColor][5]} />
			}>
			<Slider
				mb={20}
				size="xs"
				radius="xs"
				labelAlwaysOn
				marks={[
					{ value: 10, label: "10" },
					{ value: 30, label: "30" },
					{ value: 50, label: "50" },
					{ value: 80, label: "100" },
				]}
			/>
			<Button variant="outline">Fill</Button>
		</EditOptionsSection>
	);
}

export default FillSection;
