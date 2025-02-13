import { useState, useCallback } from "react";
import AnimationWrapper from "../animation/AnimationWrapper";

const commonInputStyles =
	"mt-1 block w-full p-2 border text-black text-lg border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500";

const InputField = ({
	label,
	type,
	name,
	value,
	onChange,
}: {
	label: string;
	type: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
	<div>
		<label htmlFor={name} className="block text-xl font-medium text-gray-200">
			{label}
		</label>
		<input
			type={type}
			id={name}
			name={name}
			value={value || undefined}
			placeholder={`Enter your ${label.toLowerCase()}`}
			onChange={onChange}
			className={commonInputStyles} required />
	</div>
);

const TextareaField = ({
	label,
	name,
	value,
	onChange,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
	<div>
		<label htmlFor={name} className="block text-xl font-medium text-gray-200">
			{label}
		</label>
		<textarea
			id={name}
			name={name}
			rows={4}
			value={value || undefined}
			placeholder={`Enter your ${label}`}
			onChange={onChange}
			className={commonInputStyles}
			required />
	</div>
);

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<AnimationWrapper animationType="scale" delay="0.3s">
		{children}
	</AnimationWrapper>
);

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });
	const { name, email, message } = formData;

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}, []);

	return (
		<section id="contact" className="px-5 bg-transparent md:px-30">
			<div className="h-[120px]"></div>

			<AnimatedSection>
				<h1 className="ml-[20px] font-bold text-6xl text-white md:text-7xl md:text-center md:ml-0">Contact</h1>
			</AnimatedSection>

			<AnimatedSection>
				<div className="shadow-lg rounded-lg p-[20px] mt-[50px] mx-auto md:mx-[120px] bg-gradient-to-t from-[#d9d9d91c] to-[#d9d9d950] backdrop-blur-lg">
					<form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col space-y-4">
						<input type="hidden" name="access_key" value="d9a8aa49-a719-4f46-9927-a0dfc0cadd8f" />

						<InputField label="NAME" type="text" name="name" value={name} onChange={handleChange} />
						<InputField label="E-MAIL" type="email" name="email" value={email} onChange={handleChange} />
						<TextareaField label="MESSAGE" name="message" value={message} onChange={handleChange} />

						<button
							type="submit"
							className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-all"
						>
							<span className="text-lg">SEND</span>
						</button>
					</form>
				</div>
			</AnimatedSection>
		</section>
	);
};

export default ContactForm;