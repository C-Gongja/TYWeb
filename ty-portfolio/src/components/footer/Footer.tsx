export default function Footer() {
	return (
		<div className="p-[50px] mt-[50px] md:px-[180px] bg-transparent flex justify-center items-center">
			<div className=" md:text-2xl flex justify-center items-center">&copy; Taeyoon Kim</div>
			<a href="#" className="">
				<img
					src="/assest/images/logo/logo-color.PNG"
					// width={70}
					height={"auto"}
					alt="logo"
					className="w-[30px] md:w-[50px] select-none borde"
				/>
			</a>
		</div>
	);
}