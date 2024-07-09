import { SettingsControl } from "../editor/settings-control";
import { UserComponent, useNode } from "@craftjs/core";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const NodeBadge: UserComponent = ({
	children,
	variant,
	className,
}: {
	children: React.ReactNode;
	variant?: "default" | "secondary" | "outline" | "destructive";
	className?: string;
}) => {
	const {
		connectors: { connect, drag },
	} = useNode((node) => ({
		props: node.data.props,
	}));

	return (
		<div ref={(ref: any) => connect(drag(ref))}>
			<Badge className={className} variant={variant}>
				{children}
			</Badge>
		</div>
	);
};
const BadgeSettings = () => {
	const {
		className,
		variant,
		actions: { setProp },
	} = useNode((node) => ({
		className: node.data.props.className,
		variant: node.data.props.variant,
	}));
	return (
		<div>
			<Label htmlFor="variant">Variant</Label>
			<Select
				name="variant"
				defaultValue={variant}
				onValueChange={(
					value: "default" | "secondary" | "outline" | "destructive"
				) => {
					setProp(
						(props: {
							variant:
								| "default"
								| "secondary"
								| "outline"
								| "destructive";
						}) => (props.variant = value)
					);
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select a variant" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="default">Default</SelectItem>
						<SelectItem value="secondary">Secondary</SelectItem>
						<SelectItem value="outline">Outline</SelectItem>
						<SelectItem value="destructive">Destructive</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

NodeBadge.craft = {
	...NodeBadge.craft,
	displayName: "Badge",
	related: {
		...NodeBadge.craft?.related,
		toolbar: SettingsControl,
	},
	custom: {
		ImportPath: "@/components/ui/badge",
		setting: BadgeSettings,
	},
};
