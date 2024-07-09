import React, { lazy, Suspense, forwardRef } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { SettingsControl } from "../editor/settings-control";
import { useNode, UserComponent } from "@craftjs/core";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, "ref"> {
	name: keyof typeof dynamicIconImports;
	className?: string;
	color?: string;
	size?: number;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref) => {
	const LucideIcon = lazy(dynamicIconImports[name]);

	return (
		<Suspense fallback={fallback}>
			<LucideIcon {...props} ref={ref} />
		</Suspense>
	);
});

Icon.displayName = "Icon";

const NodeIcon: UserComponent<IconProps> = ({ name, ...props }) => {
	const {
		connectors: { connect, drag },
	} = useNode((node) => ({
		props: node.data.props,
	}));

	return (
		<Icon
			ref={(ref: any) => ref && connect(drag(ref))}
			name={name}
			{...props}
		/>
	);
};

NodeIcon.craft = {
	displayName: "Icon",
	props: {
		name: "app-window",
		color: "currentColor",
		size: 24,
	},
	related: {
		toolbar: SettingsControl,
	},
	custom: {
		importPath: "lucide-react",
	},
};

export default NodeIcon;
