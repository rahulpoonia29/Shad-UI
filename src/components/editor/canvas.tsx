"use client";

import { useEditor, useNode } from "@craftjs/core";
import {
	MonitorPlay,
	Smartphone,
	Code,
	Redo,
	Undo,
	CodeXml,
	TabletIcon,
} from "lucide-react";
import React, { useState } from "react";
import { getOutputCode } from "@/lib/code-gen";
import { CodeView } from "./code-view";
import {
	DrawerTrigger,
	DrawerContent,
	Drawer,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";

type CanvasProps = {
	children: React.ReactNode;
};

export const Canvas = ({ children }: CanvasProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();
	const [canvasWidth, setCanvasWidth] = useState("w-[100%]");
	const { canUndo, canRedo, actions, query } = useEditor((state, query) => ({
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
	}));

	console.log("All Nodes", query.getNodes());

	const [codeOutput, setCodeOutput] = useState<string | null>();
	// const [htmlOutput, setHtmlOutput] = useState<string | null>();

	const generateCode = () => {
		const { importString, output } = getOutputCode(query.getNodes());

		console.log("printing ", importString, output);

		setCodeOutput(`${importString}\n\n${output}`);
	};

	// const generateHTML = () => {
	// 	const htmlOutput = getOutputHTMLFromId("canvas-iframe");

	// 	setHtmlOutput(htmlOutput);
	// };

	const [codeOpen, setCodeOpen] = useState(false);
	// const [htmlOpen, setHtmlOpen] = useState(false);

	const handleIconClick = (newWidth: string) => {
		setCanvasWidth(newWidth);
	};

	return (
		<div className="w-full h-full flex justify-center">
			<div className="w-full flex flex-col h-full items-center bg-gray-600 rounded-b-md rounded-t-3xl">
				<div className="flex justify-between items-center p-4 w-full bg-gray-200 rounded-t-md">
					<div className="flex gap-3 items-center justify-center">
						<Smartphone
							onClick={() => handleIconClick("w-[40%]")}
							size={24}
							strokeWidth={1.75}
							className="text-gray-500 hover:text-primary transition duration-300"
						/>
						<TabletIcon
							onClick={() => handleIconClick("w-[65%]")}
							size={24}
							strokeWidth={1.75}
							className="text-gray-500 hover:text-primary transition duration-300"
						/>
						<MonitorPlay
							onClick={() => handleIconClick("w-[100%]")}
							size={24}
							strokeWidth={1.75}
							className="text-gray-500 hover:text-primary transition duration-300"
						/>
					</div>
					<div className="flex gap-4">
						<Drawer
							open={codeOpen}
							onOpenChange={(value: boolean) => {
								generateCode();
								setCodeOpen(value);
							}}
						>
							<DrawerTrigger>
								<Code
									size={24}
									strokeWidth={1.75}
									className="text-gray-500 hover:text-primary transition duration-300"
								/>
							</DrawerTrigger>

							<DrawerContent className="max-h-[90vh]">
								<DrawerHeader>
									<DrawerTitle className="text-center font-semibold">
										TypeScript Code
									</DrawerTitle>
								</DrawerHeader>
								<CodeView codeString={codeOutput as string} />
							</DrawerContent>
						</Drawer>
						{/* <Drawer
							open={codeOpen}
							onOpenChange={(value: boolean) => {
								generateHTML();
								setCodeOpen(value);
							}}
						>
							<DrawerTrigger>
								<CodeXml
									size={24}
									strokeWidth={1.75}
									className="text-gray-500 hover:text-primary transition duration-300"
								/>
							</DrawerTrigger>

							<DrawerContent className="h-[75vh]">
								<CodeView codeString={htmlOutput as string} language="html" />
							</DrawerContent>
						</Drawer> */}
					</div>

					<div className="flex items-center gap-2 opacity-80 active:text-primary">
						<div className="flex">
							<div className="w-8">
								{canUndo && (
									<Undo
										size={24}
										strokeWidth={1.75}
										className="text-gray-500 hover:text-primary transition duration-300"
										onClick={(event) => {
											actions.history.undo();
										}}
									/>
								)}
							</div>
							<div className="w-8">
								{canRedo && (
									<Redo
										size={24}
										strokeWidth={1.75}
										className="text-gray-500 hover:text-primary transition duration-300"
										onClick={(event) => {
											actions.history.redo();
										}}
									/>
								)}
							</div>
						</div>
					</div>
				</div>

				<div
					className={`${canvasWidth} transition-all w-full flex-1 bg-white rounded-b-lg overflow-auto border border-t-0 border-gray-200 p-2 relative space-y-4`}
					ref={(ref) => {
						if (ref) {
							connect(drag(ref));
						}
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

Canvas.craft = {
	displayName: "div",
	props: {
		className: "w-full h-full",
	},
};
