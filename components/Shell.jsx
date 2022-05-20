import { AppShell, Navbar, Header } from "@mantine/core";
import NavbarComp from "./Navbar";

export default function Shell({ children }) {
	return (
		<AppShell
			padding="md"
			navbar={<NavbarComp />}
			header={
				<Header height={60} p="xs">
					<div>ShufflePlus</div>
				</Header>
			}
			styles={theme => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}>
			{children}
		</AppShell>
	);
}
