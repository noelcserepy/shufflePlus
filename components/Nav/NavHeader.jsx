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
				<span style={{ color: theme.colors.gray[0] }}>Shuffle</span>
				<span style={{ color: theme.colors[theme.primaryColor][5] }}>Plus</span>
			</Title>
		</Box>
	);
}

export default NavHeader;
