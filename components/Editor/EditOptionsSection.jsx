import { Box, Button, Text, Title, useMantineTheme } from "@mantine/core";

function EditOptionsSection({ title, text, buttonText, children }) {
	const theme = useMantineTheme();

	return (
		<Box
			p={36}
			style={{
				width: "20%",
				borderRadius: "2px",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "flex-start",
				backgroundColor: theme.colors.dark[6],
			}}>
			<Box
				style={{
					height: "60px",
					width: "60px",
					borderRadius: "100%",
					position: "absolute",
					left: "-30px",
					top: "-10px",
					backgroundColor: theme.colors.dark[2],
				}}></Box>
			<Box>
				<Title mt="md" order={4} style={{ color: theme.colors.dark[0] }}>
					{title}
				</Title>
				<Text mt="xs" mb="lg" style={{ color: theme.colors.dark[2] }}>
					{text}
				</Text>
			</Box>
			{children}
		</Box>
	);
}

export default EditOptionsSection;
