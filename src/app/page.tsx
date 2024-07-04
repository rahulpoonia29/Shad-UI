"use client";

import { Editor, Frame, Element } from "@craftjs/core";
import { SideMenu } from "@/components/editor/side-menu";
import { Header } from "@/components/editor/header";
import { Canvas } from "@/components/editor/canvas";
import { NodeButton } from "@/components/node/button";
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

export default function Index() {
	return (
		<section className="w-full min-h-screen flex flex-col">
			<Header />
			<Editor
				resolver={{
					NodeButton,
					Canvas,
					NodeCardHeader,
					NodeCard,
					NodeCardContent,
					NodeCardDescription,
					NodeCardTitle,
					NodeCardFooter,
					NodeOneBlock,
					NodeTwoBlocks,
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
									<NodeButton>Button 1</NodeButton>
									<NodeButton>Button 2</NodeButton>
									<NodeButton>Button 3</NodeButton>
									<NodeButton>Button 4</NodeButton>
									<NodeCard></NodeCard>
								</Element>
							</Frame>
						</ReactIframe>
					</Viewport>

					<ControlPanel />
				</div>
			</Editor>
		</section>
	);
}
