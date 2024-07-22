"use client";

import { useEditor, useNode } from "@craftjs/core";
import React, { Component, ReactNode, useMemo, useState } from "react";
import { suggestions } from "@/lib/tailwindClasses";
import Select from "react-tailwindcss-select";
import { FixedSizeList as List } from "react-window";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { Label } from "../ui/label";
import TailwindClasses from "./tailwind-classes";

const selectOptions = suggestions.map((value) => ({
	label: value.category,
	options: value.classes.map((item) => ({
		label: item,
		value: item,
	})),
}));

export const SettingsControl = () => {
	// const { query, actions, selected } = useEditor((state) => {
	// 	const [currentNodeId] = state.events.selected;
	// 	let selected;

	// 	if (currentNodeId) {
	// 		selected = {
	// 			id: currentNodeId,
	// 			name: state.nodes[currentNodeId].data.name,
	// 			settings:
	// 				state.nodes[currentNodeId].related &&
	// 				state.nodes[currentNodeId].related.settings,
	// 		};
	// 	}

	// 	return {
	// 		selected,
	// 	};
	// });
	const { query, actions } = useEditor();
	const {
		id,
		classNames,
		text,
		deletable,
		setting,
		actions: { setProp },
	} = useNode((node) => ({
		classNames: node.data.props["className"] as string,
		text: node.data.props["children"] as string,
		deletable: query.node(node.id).isDeletable(),
		setting: node.data.custom?.setting,
	}));

	// const height = 35;

	// interface MenuListProps {
	// 	options: any[];
	// 	children: any[];
	// 	maxHeight: number;
	// 	getValue: () => any[];
	// }

	// class MenuList extends Component<MenuListProps> {
	// 	render() {
	// 		const { options, children, maxHeight, getValue } = this.props;
	// 		const [value] = getValue();
	// 		const initialOffset = options.indexOf(value) * height;

	// 		return (
	// 			<List
	// 				width={"100%"} // Replace with the desired width value
	// 				height={maxHeight}
	// 				itemCount={children.length}
	// 				itemSize={height}
	// 				initialScrollOffset={initialOffset}
	// 			>
	// 				{({ index, style }) => (
	// 					<div style={style}>{children[index]}</div>
	// 				)}
	// 			</List>
	// 		);
	// 	}
	// }

	return (
		<div className="p-4 space-y-2">
			{deletable ? (
				<Button
					variant={"destructive"}
					className="cursor-pointer w-full"
					onClick={(event) => {
						event.stopPropagation();
						if (parent) {
							actions.delete(id);
						}
					}}
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</Button>
			) : null}

			{typeof text === "string" ? (
				<>
					<Label htmlFor="content">Content</Label>
					<Input
						name="content"
						type="text"
						value={text}
						className="mb-4"
						onChange={(e) =>
							setProp(
								(props: { children: ReactNode }) =>
									(props.children = e.target.value.replace(
										/<\/?[^>]+(>|$)/g,
										"",
									)),
							)
						}
					/>
				</>
			) : null}
			{setting &&
				React.createElement(setting, {
					setProp,
					classNames,
				})}
			<TailwindClasses options={selectOptions} />
		</div>
	);
};
