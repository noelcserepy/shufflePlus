import { Navbar, Box, Text } from "@mantine/core";
import UserBox from "./UserBox";

export default function NavbarComp() {
	return (
		<Navbar height={{ base: 30 }}>
			<Navbar.Section styles={{ display: "flex", flexDirection: "row" }}>
				<Box>
					<Text>ShufflePlus</Text>
				</Box>
				<UserBox />
			</Navbar.Section>
		</Navbar>
	);
}
