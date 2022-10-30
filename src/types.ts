import { JSX } from "solid-js/jsx-runtime";

export type IconProps = {
	size?: number;
	color?: string;
	stroke?: number;
} & {
	svg?: Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;
};

export const defaultIconProps: IconProps = {
	size: 24,
	color: "currentColor",
	stroke: 2,
	svg: {},
};
