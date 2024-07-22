"use client";

import { Editor, Frame, Element } from "@craftjs/core";
import { SideMenu } from "@/components/editor/side-menu";
import { Header } from "@/components/editor/header";
import { Canvas } from "@/components/editor/canvas";
import {
	NodeCardHeader,
	NodeCard,
	NodeCardContent,
	NodeCardDescription,
	NodeCardTitle,
	NodeCardFooter,
} from "@/components/node/card";
import { ReactIframe } from "@/components/editor/react-iframe";
import { ControlPanel } from "@/components/editor/control-panel";
import { Viewport } from "@/components/editor/viewport";
import { RenderNode } from "@/components/editor/render-node";
import { componentsMap } from "@/components/node/components-map";
import { NodeOneBlock, NodeTwoBlocks } from "@/components/node/layout";
import {
	NodeAlert,
	// NodeAlertContainer,
	// NodeAlertContent,
	// NodeAlertContent,
	// NodeAlertDescription,
	// NodeAlertTitle,
} from "@/components/node/alert";
import NodeIcon from "@/components/node/icon";
import { NodeBadge } from "@/components/node/badge";
import { NodeButton } from "@/components/node/button";
import { NodeAvatar } from "@/components/node/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Index() {
	return (
		<section className="w-full min-h-screen flex flex-col">
			<Header />
			<Editor
				resolver={{
					Canvas,
					// Components
					// Button
					NodeButton,
					// Card
					NodeCard,
					NodeCardHeader,
					NodeCardTitle,
					NodeCardDescription,
					NodeCardContent,
					NodeCardFooter,
					// Alert
					NodeAlert,
					// NodeAlertContent,
					// NodeAlertContainer,
					// NodeAlertTitle,
					// NodeAlertDescription,
					// Badge
					NodeBadge,
					// Avatar
					NodeAvatar,
					AvatarImage,
					AvatarFallback,
					// Layout
					NodeOneBlock,
					NodeTwoBlocks,
					// Icon
					NodeIcon,
				}}
				onRender={RenderNode}
			>
				<div className="flex flex-1 relative overflow-hidden">
					<SideMenu componentsMap={componentsMap} />
					<Viewport>
						<ReactIframe
							title="my frame"
							className="p-4 w-full h-full page-container"
						>
							<Frame>
								<Element is={Canvas} id="ROOT" canvas>
									{/* <NodeButton>Default</NodeButton>
									<NodeBadge>Badge</NodeBadge>*/}
									{/* <NodeAvatar
										fallback="CN"
										avatarImage="https://github.com/shadcn.png"
										avatarALT="avatar"
									/> */}
									{/* <NodeCard></NodeCard> */}
									<NodeAlert
										alertTitle="Title"
										alertDescription="description"
									/>
								</Element>
							</Frame>
						</ReactIframe>
					</Viewport>

					<ControlPanel />
				</div>
			</Editor>
		</section>
		// <div>Editor</div>
	);
}
