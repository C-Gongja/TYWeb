import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DropdownProps {
	children: React.ReactNode; // children을 위한 타입 지정
	isOpen: boolean;
	visibilityAnimation: boolean;
	setVisibilityAnimation: Dispatch<SetStateAction<boolean>>;
}

export default function Dropdown({ children, isOpen, visibilityAnimation, setVisibilityAnimation }: DropdownProps) {
	// const [visibilityAnimation, setVisibilityAnimation] = useState(false);
	const [repeat, setRepeat] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		{/* ← add */ }
		if (isOpen) {
			clearTimeout(repeat);
			setRepeat(null);
			setVisibilityAnimation(true);
		} else {
			setRepeat(setTimeout(() => {
				setVisibilityAnimation(false);
			}, 400));
		}
	}, [isOpen]);

	return (
		<article className={`xl:hidden block ${isOpen ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}`}>
			<ul className="flex flex-col items-center text-white p-5 rounded-b-2xl bg-gradient-to-r from-[#d9d9d91f] to-[#7373731f] backdrop-blur-xl">
				{visibilityAnimation && children}
			</ul>
		</article>
	);
}