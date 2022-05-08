import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Text, Transition } from "@mantine/core";
import { ArrowUp } from "tabler-icons-react";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
	const [scroll, scrollTo] = useWindowScroll();

	useEffect(() => {
		console.log(scroll);
	}, [scroll]);
	const viewport = useRef(window);
	const scrollToTop = () =>
		viewport.current.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<Affix position={{ top: 30, right: "50%" }}>
			<Transition transition="slide-up" mounted={scroll.y > 0}>
				{transitionStyles => (
					<Button
						leftIcon={<ArrowUp />}
						style={transitionStyles}
						onClick={() => scrollTo({ y: 0 })}>
						Scroll to top
					</Button>
				)}
			</Transition>
		</Affix>
	);
}
