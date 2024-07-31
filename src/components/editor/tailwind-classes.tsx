import { useEditor, useNode } from "@craftjs/core";
import { useMemo, useState } from "react";
import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

type Props = {
	options: { label: string; options: { label: string; value: string }[] }[];
};

export default function TailwindClasses({ options }: Props) {

	const {
		classNames,
		actions: { setProp },
	} = useNode((node) => ({
		classNames: node.data.props["className"] as string,
	}));

	const tailwindcssArr = classNames
		? classNames.split(" ").filter(Boolean)
		: [];

	const initialOptions = tailwindcssArr.map((value) => ({
		label: value,
		value,
	}));

	const [value, setValue] = useState<SelectValue>(initialOptions);

	useMemo(() => {
		const tailwindcssArr = classNames
			? classNames.split(" ").filter(Boolean)
			: [];

		const newOptions = tailwindcssArr.map((value) => ({
			label: value,
			value,
		}));

		setValue(newOptions);
	}, [classNames]);

	return (
		<Select
			primaryColor={"blue"}
			options={options}
			isSearchable={true}
			isClearable={true}
			isMultiple={true}
			placeholder={"Add new classes..."}
			value={value}
			classNames={{
				menuButton: (
					value?: { isDisabled?: boolean | undefined } | undefined,
				) =>
					`flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
						value?.isDisabled
							? "bg-gray-200"
							: "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
					}`,

				menu: "absolute z-10 w-full shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",

				listItem: (value?: { isSelected?: boolean }) =>
					`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
						value?.isSelected
							? `text-white bg-blue-500`
							: `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
					}`,
			}}
			formatGroupLabel={(data) => (
				<div
					className={`py-2 text-xs flex items-center justify-between`}
				>
					<span className="font-bold">{data.label}</span>
					<span className="bg-gray-200 h-5 p-1.5 flex items-center justify-center rounded-full">
						{data.options.length}
					</span>
				</div>
			)}
			onChange={(option) => {
				if (option && Array.isArray(option)) {
					const classNames = option
						.map((item) => item.value)
						.join(" ");
					setProp((props: { className: string }) => {
						console.log("Setting props ", props.className);
						props.className = classNames;
					});
				}

				if (!option) {
					setProp(
						(props: { className: string }) =>
							(props.className = ""),
					);
				}

				setValue(option);
			}}
		/>
	);
}
