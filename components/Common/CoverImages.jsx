function CoverImages() {
	const coverImages = [
		"album1.png",
		"album2.png",
		"album3.png",
		"album4.png",
		"album5.png",
		"album6.png",
		"album7.png",
	];

	return (
		<div className="animContainer">
			{coverImages.map(c => (
				<img key={c} src={c} className="cover" />
			))}
		</div>
	);
}

export default CoverImages;
