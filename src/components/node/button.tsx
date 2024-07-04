import { withNode } from "./connector";
import { Button } from "@/components/ui/button";
import { SettingsControl } from "../editor/settings-control";

const draggable = true;

export const NodeButton = withNode(Button, {
	draggable,
});

NodeButton.craft = {
	...NodeButton.craft,
	related: {
		toolbar: SettingsControl,
	},
};
