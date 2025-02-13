import { useRef, ReactNode } from "react";
import { useInView } from "framer-motion";

interface AnimationWrapperProps {
	children: ReactNode;
	animationType?: "translateXFromRight" | "translateXFromLeft" | "translateYFromTop" | "translateYFromBottom" | "scale" | "rotate";
	delay?: string;
}

export default function AnimationWrapper({
	children,
	animationType = "translateXFromRight",
	delay = "0s",
}: AnimationWrapperProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });

	const animations: Record<AnimationWrapperProps["animationType"], React.CSSProperties> = {
		translateXFromRight: {
			transform: isInView ? "none" : "translateX(100vw)",
			opacity: isInView ? 1 : 0,
		},
		translateXFromLeft: {
			transform: isInView ? "none" : "translateX(-100vw)",
			opacity: isInView ? 1 : 0,
		},
		translateYFromTop: {
			transform: isInView ? "none" : "translateX(100vh)",
			opacity: isInView ? 1 : 0,
		},
		translateYFromBottom: {
			transform: isInView ? "none" : "translateX(-100vh)",
			opacity: isInView ? 1 : 0,
		},
		scale: {
			transform: isInView ? "scale(1)" : "scale(0.8)",
			opacity: isInView ? 1 : 0,
		},
		rotate: {
			transform: isInView ? "rotate(0deg)" : "rotate(-90deg)",
			opacity: isInView ? 1 : 0,
		},
	};

	return (
		<section ref={ref}>
			<span
				className="block transition-all duration-500 ease-in-out"
				style={{
					...animations[animationType],
					transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}`,
				}}
			>
				{children}
			</span>
		</section>
	);
}
