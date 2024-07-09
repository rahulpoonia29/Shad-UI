import { ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { OneBlock, NodeOneBlock, NodeTwoBlocks } from "./layout";
import { NodeButton } from "./button";
import { NodeCard } from "./card";
import { Element } from "@craftjs/core";
import { NodeAlert } from "./alert";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { NodeBadge } from "./badge";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NodeAvatar } from "./avatar";

export type Components = {
	name: string;
	items: {
		name: string;
		node: ReactElement;
		demo?: ReactNode;
	}[];
};

export const componentsMap: Components[] = [
	{
		name: "Buttons",
		items: [
			{
				name: "Default",
				demo: <Button>Default</Button>,
				node: <NodeButton>Default</NodeButton>,
			},
			{
				name: "Outline",
				demo: <Button variant={"outline"}>Outline</Button>,
				node: <NodeButton variant={"outline"}>Outline</NodeButton>,
			},
			{
				name: "Destructive",

				demo: <Button variant={"destructive"}>Destructive</Button>,
				node: (
					<NodeButton variant={"destructive"}>Destructive</NodeButton>
				),
			},
		],
	},
	{
		name: "Cards",
		items: [
			{
				name: "Default",
				demo: (
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>Card Description</CardDescription>
						</CardHeader>
						<CardContent>Empty Container</CardContent>
						<CardFooter>
							<Button className="w-full">Footer button</Button>
						</CardFooter>
					</Card>
				),
				node: <NodeCard></NodeCard>,
			},
		],
	},
	{
		name: "Alerts",
		items: [
			{
				name: "Default",
				demo: (
					<Alert>
						<Terminal />
						<AlertTitle>Alert Title</AlertTitle>
						<AlertDescription>Alert Description</AlertDescription>
					</Alert>
				),
				node: (
					<NodeAlert
						alertTitle="Title"
						alertDescription="Description"
					/>
				),
			},
			{
				name: "Destructive",
				demo: (
					<Alert variant={"destructive"}>
						<Terminal />
						<AlertTitle>Alert Title</AlertTitle>
						<AlertDescription>Alert Description</AlertDescription>
					</Alert>
				),
				node: (
					<NodeAlert
						alertTitle="Title"
						alertDescription="Description"
						variant={"destructive"}
					/>
				),
			},
		],
	},
	{
		name: "Badge",
		items: [
			{
				name: "Default",
				demo: <Badge>Default</Badge>,
				node: <NodeBadge>Default</NodeBadge>,
			},
			{
				name: "Secondary",
				demo: <Badge variant={"secondary"}>Secondary</Badge>,
				node: <NodeBadge variant={"secondary"}>Secondary</NodeBadge>,
			},
			{
				name: "Outline",
				demo: <Badge variant={"outline"}>Outline</Badge>,
				node: <NodeBadge variant={"outline"}>Outline</NodeBadge>,
			},
			{
				name: "Destructive",
				demo: <Badge variant={"destructive"}>Destructive</Badge>,
				node: (
					<NodeBadge variant={"destructive"}>Destructive</NodeBadge>
				),
			},
		],
	},
	{
		name: "Avatar",
		items: [
			{
				name: "Default",
				demo: (
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				),
				node: (
					<NodeAvatar
					// fallback="CN"
					// ImageURL="https://github.com/shadcn.png"
					// avatarALT="avatar"
					>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</NodeAvatar>
				),
			},
		],
	},
	{
		name: "Layout",
		items: [
			{
				name: "One Block",
				demo: (
					<OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400">
						One Block
					</OneBlock>
				),
				node: (
					<Element
						canvas
						is={NodeOneBlock as typeof NodeOneBlock & string}
						id="one-block"
					/>
				),
			},
			{
				name: "Two Blocks",
				demo: (
					<OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400 flex flex-row">
						<OneBlock className="text-center italic bg-yellow-100 outline-dashed outline-amber-400">
							First Block
						</OneBlock>
						<OneBlock className="text-center italic bg-yellow-100 outline-dashed outline-amber-400">
							Second Block
						</OneBlock>
					</OneBlock>
				),
				node: <NodeTwoBlocks></NodeTwoBlocks>,
			},
		],
	},
];
