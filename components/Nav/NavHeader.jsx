import { ActionIcon, Space, Title, Box } from "@mantine/core";
import { Plus } from "tabler-icons-react";

function NavHeader() {
	return (
		<Box
			style={{
				height: "30%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}>
			<Title order={1}>ShufflePlus</Title>
		</Box>
	);
}

export default NavHeader;
