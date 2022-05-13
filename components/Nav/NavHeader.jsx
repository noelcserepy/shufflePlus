import { Title, Box } from "@mantine/core";

function NavHeader() {
	return (
		<Box
			style={{
				height: "30%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}>
			<Title order={4}>ShufflePlus</Title>
		</Box>
	);
}

export default NavHeader;
