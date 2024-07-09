import { UserComponent, useNode } from "@craftjs/core";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SettingsControl } from "../editor/settings-control";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type AvatarProps = {
	fallback: string;
	ImageURL: string;
	avatarALT?: string;
	className?: string;
};

export const NodeAvatar: UserComponent = ({
	fallback,
	ImageURL,
	avatarALT,
	className,
}: AvatarProps) => {
	const {
		connectors: { connect, drag },
	} = useNode((node) => ({
		props: node.data.props,
	}));

	return (
		<Avatar className={className} ref={(ref: any) => connect(drag(ref))}>
			<AvatarImage src={ImageURL} alt={avatarALT} />
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	);
};

const AvatarSettings = () => {
	const {
		fallback,
		avatarImage,
		avatarALT,
		actions: { setProp },
	} = useNode((node) => ({
		fallback: node.data.props.fallback,
		avatarImage: node.data.props.avatarImage,
		avatarALT: node.data.props.avatarALT,
	}));

	return (
		<div>
			<Label htmlFor="avatarImage">Avatar Image</Label>
			<Input
				name="avatarImage"
				value={avatarImage}
				onChange={(e) =>
					setProp(
						(props: AvatarProps) =>
							(props.ImageURL = e.target.value)
					)
				}
			/>
			<Label htmlFor="avatarALT">Avatar ALT</Label>
			<Input
				name="avatarALT"
				value={avatarALT}
				onChange={(e) =>
					setProp(
						(props: AvatarProps) =>
							(props.avatarALT = e.target.value)
					)
				}
			/>
			<Label htmlFor="fallback">Fallback</Label>
			<Input
				name="fallback"
				value={fallback}
				onChange={(e) =>
					setProp(
						(props: AvatarProps) =>
							(props.fallback = e.target.value)
					)
				}
			/>
		</div>
	);
};

NodeAvatar.craft = {
	...NodeAvatar.craft,
	displayName: "Avatar",
	props: {
		fallback: "CN",
		ImageURL: "https://github.com/shadcn.png",
		avatarALT: "avatar",
	},
	rules: {
		canMoveIn: () => false,
	},
	related: {
		...NodeAvatar.craft?.related,
		toolbar: SettingsControl,
	},
	custom: {
		ImportPath: "@/components/ui/avatar",
		imports: ["Avatar", "AvatarFallback", "AvatarImage"],
		componentCode: `<Avatar>\n\t<AvatarImage src="{$ImageURL}" alt="{$avatarALT}"/>\n\t<AvatarFallback>CN</AvatarFallback>\n</Avatar>`,
		setting: AvatarSettings,
	},
};
