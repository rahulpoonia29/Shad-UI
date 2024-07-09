import { withNode } from "./connector";
import { Button } from "@/components/ui/button";
import { SettingsControl } from "../editor/settings-control";

export const NodeButton = withNode(Button,);

NodeButton.craft = {
	...NodeButton.craft,
	displayName: "Button",
	related: {
		...NodeButton.craft?.related,
		toolbar: SettingsControl,
	},
};


