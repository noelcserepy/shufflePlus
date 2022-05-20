import { Box, Center, Text, Title, useMantineTheme } from "@mantine/core";

function EditOptionsSection({ title, text, icon, children }) {
	const theme = useMantineTheme();

	return (
		<Box
			p={36}
			mt={30}
			style={{
				borderRadius: "2px",
				position: "relative",
				flex: "1 0 200px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "stretch",
				background: theme.fn.linearGradient(
					0,
					theme.colors.dark[7],
					theme.colors.dark[9]
				),
			}}>
			<Box
				style={{
					height: "60px",
					width: "60px",
					borderRadius: "100%",
					position: "absolute",
					left: "-10px",
					top: "-30px",
					backgroundColor: theme.colors.dark[9],
				}}>
				<Center style={{ width: 60, height: 60 }}>{icon}</Center>
			</Box>
			<Box>
				<Title order={4} style={{ color: theme.colors.dark[0] }}>
					{title}
				</Title>
				<Text mt="xs" mb="lg" style={{ color: theme.colors.dark[2] }}>
					{text}
				</Text>
			</Box>
			<Box
				style={{
					display: "flex",
					rowGap: "10px",
					flexFlow: "column nowrap",
					justifyContent: "space-between",
					alignItems: "stretch",
				}}>
				{children}
			</Box>
		</Box>
	);
}

export default EditOptionsSection;
