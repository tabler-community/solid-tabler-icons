import { Component, mergeProps } from "solid-js";
import { defaultIconProps, IconProps } from "../types";

const IconApple: Component<IconProps> = (props) => {
    props = mergeProps(defaultIconProps, props);
    return <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apple" width={props.size} height={props.size} viewBox="0 0 24 24" stroke-width={props.stroke} stroke={props.color} fill="none" stroke-linecap="round" stroke-linejoin="round" {...props.svg}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={12} cy={14} r={7} /><path d="M12 11v-6a2 2 0 0 1 2 -2h2v1a2 2 0 0 1 -2 2h-2" /><path d="M10 10.5c1.333 .667 2.667 .667 4 0" /></svg>;
};
export { IconApple };