import React, { forwardRef, PropsWithChildren } from "react";
import {
	useEditor,
	useNode,
	UserComponent,
} from "@craftjs/core";

const BUTTON_PATH = "@/components/button";
const CARD_PATH = "@/components/ui/card";

const importPathMap: { [key: string]: string } = {
	button: BUTTON_PATH,
	card: CARD_PATH,
	cardheader: CARD_PATH,
	cardcontent: CARD_PATH,
	cardfooter: CARD_PATH,
	cardtitle: CARD_PATH,
	carddescription: CARD_PATH,
};

type WithNodeOptions = {
	draggable?: boolean;
	droppable?: boolean;
};

export const withNode = <T extends {}>(
	Component: UserComponent<T>,
	options: WithNodeOptions = {}
): UserComponent<T & { children?: React.ReactNode }> => {
	const { draggable = true, droppable = true } = options;

	const WithNode = forwardRef<
		HTMLElement,
		PropsWithChildren<
			T & {
				className?: string;
			}
		>
	>((props, ref) => {
		const {
			id,
			connectors: { connect, drag },
		} = useNode();

		const { isActive } = useEditor((_, query) => ({
			isActive: query.getEvent("selected").contains(id),
		}));

		const applyRef = (node: HTMLElement | null) => {
			if (node) {
				if (draggable && droppable) {
					connect(drag(node));
				} else if (droppable) {
					connect(node);
				} else if (draggable) {
					drag(node);
				}
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					(
						ref as React.MutableRefObject<HTMLElement | null>
					).current = node;
				}
			}
		};

		return (
			<Component
				ref={applyRef}
				{...props}
				className={
					isActive
						? `${props.className || ""} component-selected`
						: props.className
				}
			>
				{typeof props.children === "string" &&
				props.children.trim() === "" ? (
					<>Empty text</>
				) : (
					props.children || (
						<div className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400">
							Empty container
						</div>
					)
				)}
			</Component>
		);
	});

	WithNode.displayName = `WithNode(${
		Component.displayName || Component.name || "Component"
	})`;

	const importPathMapKey = Component.displayName?.toLowerCase();
	(WithNode as any).craft = {
		...Component.craft,
		displayName: Component.displayName,
		custom: {
			...Component.craft?.custom,
			importPath: importPathMapKey
				? importPathMap[importPathMapKey] || ""
				: "",
		},
	};

	return WithNode as UserComponent;
};
