import { Component, mergeProps } from "solid-js";
import { defaultIconProps, IconProps } from "../types";

const IconAppWindow: Component<IconProps> = (props) => {
    props = mergeProps(defaultIconProps, props);
    return <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-app-window" width={props.size} height={props.size} viewBox="0 0 24 24" stroke-width={props.stroke} stroke={props.color} fill="none" stroke-linecap="round" stroke-linejoin="round" {...props.svg}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x={3} y={5} width={18} height={14} rx={2} /><path d="M6 8h.01" /><path d="M9 8h.01" /></svg>;
};
export { IconAppWindow };