export default function Resume() {
	return (
		<div id="resume" className="pt-[120px] pb-[80px] px-[5%] md:px-[10%] xl:px-[20%] bg-transparent">
			<h1 className="flex justify-center items-center text-6xl text-white font-bold m-[50px]">Resume</h1>
			<div className="flex justify-center items-center">
				<iframe
					src="/assest/files/resume.pdf"
					width="100%"
					height="800px"
					className="border-4 border-gray-300"
					title="Resume"
				></iframe>
			</div>
		</div>
	);
}
