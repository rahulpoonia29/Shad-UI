import type { Node, Nodes } from "@craftjs/core";

let imports: { displayName: string; importPath: string }[] = [];

const generateComponentCode = (
	nodesMap: Nodes,
	nodeId: string,
	level: number
): string => {
	const node = nodesMap[nodeId];
	const { displayName, props, nodes, linkedNodes, custom } = node.data;

	const indentation = getIndentation(level);

	if (custom && custom.componentCode) {
		let componentCode = custom.componentCode;

		// Replace placeholders with actual prop values
		componentCode = componentCode.replace(
			/\{\$(.*?)\}/g,
			(match: string, p1: string) => {
				return props[p1] || "";
			}
		);

		// Apply indentation
		return componentCode
			.trim()
			.split("\n")
			.map((line: any) => `${indentation}${line}`)
			.join("\n");
	}

	const openingTag = `<${displayName}${generatePropsString(props)}>`;
	const closingTag = `</${displayName}>`;

	if (!imports.find((item) => item.displayName === displayName)) {
		imports.push({
			displayName,
			importPath: custom.importPath,
		});
	}

	if (nodes.length === 0 && Object.keys(linkedNodes).length === 0) {
		// No child nodes, return the self-closing tag
		return `${indentation}${openingTag}${generateChildString(
			props.children,
			level + 1
		)}${closingTag}`;
	} else {
		// Has child nodes, recursively generate code for children
		const childComponents = nodes.map((childId) =>
			generateComponentCode(nodesMap, childId, level + 1)
		);

		const childComponentsString = childComponents.length
			? `\n${childComponents.join(`\n`)}`
			: "";

		const linkedChildComponents = Object.entries(linkedNodes).map(
			([key, value]) => generateComponentCode(nodesMap, value, level + 1)
		);

		const linkedChildComponentsString = linkedChildComponents.length
			? `\n${linkedChildComponents.join(`\n`)}`
			: "";

		return `${indentation}${openingTag}${childComponentsString}${linkedChildComponentsString}\n${indentation}${closingTag}`;
	}
};

const generatePropsString = (props: {
	[key: string]: string | undefined;
}): string => {
	const propsArray = Object.entries(props)
		.filter(([key, value]) => value !== undefined && value !== "")
		.filter(([key]) => key !== "children") // Exclude children from props
		.map(([key, value]) => `${key}="${value}"`);
	return propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";
};

const getIndentation = (level: number): string => {
	if (!level) {
		return "";
	}
	return " ".repeat(level * 2); // Adjust the number of spaces per level as needed
};

const generateChildString = (
	children: string | Node[] | undefined,
	level: number
): string => {
	if (typeof children === "string") {
		// If children is a string, return it directly
		return children;
	} else if (Array.isArray(children) && children.length > 0) {
		return children
			.map((child) =>
				generateComponentCode({ TEMP: child }, "TEMP", level)
			)
			.join("");
	} else {
		return "";
	}
};

interface ComponentInfo {
	displayName: string;
	importPath: string;
}

const generateImportStatements = (components: ComponentInfo[]): string => {
	const filteredComponents = components.filter(
		(comp) => !["div", "span", "p"].includes(comp.displayName)
	);

	const groupedComponents: { [key: string]: ComponentInfo[] } = {};

	// Group components by import path
	filteredComponents.forEach((comp) => {
		const key = comp.importPath || ""; // Use an empty string for components without a path
		if (!groupedComponents[key]) {
			groupedComponents[key] = [];
		}
		groupedComponents[key].push(comp);
	});

	// Generate import statements
	const importStatements = Object.values(groupedComponents).map((group) => {
		const displayNameList = group
			.map((comp) => comp.displayName)
			.join(", ");
		const importPath = group[0].importPath
			? ` from "${group[0].importPath}"`
			: "";
		return `import { ${displayNameList} }${importPath};`;
	});

	return importStatements.join("\n");
};

function wrapInsideComponent(input: string): string {
	return `
export function Component() {
  return (
    ${input.trim().replace(/^/gm, "  ")}
  );
}
  `.trim();
}

export const getOutputCode = (nodes: Nodes) => {
	imports = [];

	const componentString = generateComponentCode(nodes, "ROOT", 2);
	const importString = generateImportStatements(imports);
	const output = wrapInsideComponent(componentString);

	return { importString, output };
};
