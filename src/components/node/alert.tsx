import { UserComponent, useNode } from "@craftjs/core";
import { SettingsControl } from "../editor/settings-control";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import NodeIcon from "./icon";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { withNode } from "./connector";
import { forwardRef } from "react";

type AlertProps = {
	alertTitle: string;
	alertDescription: string;
	children?: React.ReactNode;
	variant?: "default" | "destructive";
	className?: string;
};

export const NodeAlert: UserComponent<AlertProps> = ({
	alertTitle,
	alertDescription,
	children,
	variant,
	className,
}) => {
	const {
		connectors: { connect, drag },
	} = useNode((node) => ({
		props: node.data.props,
	}));

	return (
		<Alert
			variant={variant}
			className={className}
			ref={(ref) => {
				if (ref) connect(drag(ref));
			}}
		>
			<NodeIcon name="terminal" />

			<AlertTitle>{alertTitle}</AlertTitle>
			<AlertDescription>{alertDescription}</AlertDescription>
			{children}
		</Alert>
	);
};

const AlertSettings = () => {
	const {
		alertTitle,
		alertDescription,
		variant,
		actions: { setProp },
	} = useNode((node) => ({
		alertTitle: node.data.props.alertTitle,
		alertDescription: node.data.props.alertDescription,
		variant: node.data.props.variant,
	}));

	return (
		<div>
			<Label htmlFor="alertTitle">Alert Title</Label>
			<Input
				name="alertTitle"
				value={alertTitle}
				onChange={(e) =>
					setProp(
						(props: AlertProps) =>
							(props.alertTitle = e.target.value)
					)
				}
			/>
			<Label htmlFor="alertDescription">Alert Description</Label>
			<Input
				name="alertDescription"
				value={alertDescription}
				onChange={(e) =>
					setProp(
						(props: AlertProps) =>
							(props.alertDescription = e.target.value)
					)
				}
			/>
			<Label htmlFor="variant">Variant</Label>
			<Select
				name="variant"
				defaultValue={variant}
				onValueChange={(value: "default" | "destructive") => {
					setProp((props: AlertProps) => (props.variant = value));
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select a variant" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="default">Default</SelectItem>
						<SelectItem value="destructive">Destructive</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

NodeAlert.craft = {
	displayName: "Alert",
	props: {
		alertTitle: "Alert Title",
		alertDescription: "Alert Description",
		variant: "default",
	},
	rules: {
		canMoveIn: () => false,
	},
	related: {
		toolbar: SettingsControl,
	},
	custom: {
		ImportPath: "@/components/ui/alert",
		setting: AlertSettings,
	},
};
