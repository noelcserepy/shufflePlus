import { Box, Image, Space, Text, Title, useMantineTheme } from "@mantine/core";

function CoverPage() {
	const theme = useMantineTheme();
	return (
		<Box
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				overflow: "hidden",
			}}>
			<Image
				src="/guitar.svg"
				style={{
					position: "absolute",
					right: "10%",
					top: "-5%",
				}}
			/>
			<Image
				src="/note1.svg"
				style={{
					position: "absolute",
					right: "30%",
					bottom: "-10%",
				}}
			/>
			<Image
				src="/note2.svg"
				style={{
					position: "absolute",
					right: "-5%",
					bottom: "20%",
				}}
			/>
			<Box
				style={{
					position: "relative",
					top: "177px",
					left: "36px",
					width: "40%",
					zIndex: "2",
				}}>
				<Image
					src="/blob.svg"
					style={{
						position: "absolute",
						transformOrigin: "70% 50%",
						transform: "scale(2)",
						zIndex: "-1",
					}}
				/>
				<Title order={1} style={{ color: "#ffffff" }}>
					Choose one of your playlists
				</Title>
				<Text
					mt="md"
					mb="xl"
					color="white"
					size="xl"
					weight="400"
					sx={{
						fontFamily: theme.other.fontFamilySecondary,
					}}>
					Or create a new one
				</Text>
				<Space h="xs" />
				<Image src="/Arrow.svg" width="20%" mt="xl" />
			</Box>
		</Box>
	);
}

export default CoverPage;
