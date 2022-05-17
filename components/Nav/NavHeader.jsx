import { Title, Box, useMantineTheme } from "@mantine/core";

function NavHeader() {
	const theme = useMantineTheme();
	return (
		<Box
			style={{
				height: "30%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}>
			<Title order={4}>
				Shuffle
				<span style={{ color: theme.colors[theme.primaryColor][5] }}>Plus</span>
			</Title>
		</Box>
	);
}

export default NavHeader;
