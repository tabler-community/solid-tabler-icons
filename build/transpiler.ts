import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";
import { normalizeGlob, join } from "https://deno.land/std@0.161.0/path/mod.ts";
import { pascalCase } from "https://deno.land/x/case@2.1.1/mod.ts";

const flags = parse(Deno.args, {
	string: ["dir"],
});

const outDir = normalizeGlob(flags.dir);
const iconsDir = join(outDir, "icons");
await Deno.mkdir(iconsDir, { recursive: true });

console.info(`output firectory is ${outDir}`);

let input = "";
const decoder = new TextDecoder();
for await (const chunk of Deno.stdin.readable) {
	input += decoder.decode(chunk);
}

function dropExt(file: string): string {
	return file.split(".")[0];
}

function toIconName(file: string): string {
	return "Icon" + pascalCase(file.split(".")[0]);
}

function toLines(input: string): string[] {
	return input
		.trim()
		.split(/\r?\n/g)
		.map((i) => i.trim());
}

function renameSvgAttr(svg: string): string {
	return svg
		.replaceAll("className=", "class=")
		.replaceAll("={size}", "={props.size}")
		.replaceAll("strokeWidth={stroke}", "stroke-width={props.stroke}")
		.replaceAll("={color}", "={props.color}")
		.replaceAll("strokeLinecap=", "stroke-linecap=")
		.replaceAll("strokeLinejoin=", "stroke-linejoin=")
		.replaceAll("{...props}", "{...props.svg}");
}

function generateComponent(name: string, svg: string): string {
	return `import { Component, mergeProps } from "solid-js";
import { defaultIconProps, IconProps } from "../types";

const ${name}: Component<IconProps> = (props) => {
    props = mergeProps(defaultIconProps, props);
    ${svg}
};
export { ${name} };`;
}

const imports = [];

for (const fileName of toLines(input)) {
	const iconName = toIconName(fileName);
	const rawFileName = dropExt(fileName);
	const outFileName = rawFileName + ".tsx";
	const source = await Deno.readTextFile(fileName);
	const srcLines = toLines(source);
	const fnLine = srcLines.find((str) => str.includes("function"));
	const svgLine = srcLines.find((str) => str.includes("return <svg"));

	if (!fnLine || !svgLine) {
		console.error(
			`error on file ${fileName}. could not find 'function' or 'return <svg' in source.`
		);
		continue;
	}

	const fnName = fnLine.replace("function ", "").replace("({", "").trim();

	if (fnName != iconName) {
		console.error(
			`error on file ${fileName}. icon names do not match. using ${fnName}`,
			{
				fnName,
				iconName,
			}
		);
	}

	const output = generateComponent(fnName, renameSvgAttr(svgLine.trim()));
	const outFile = join(iconsDir, outFileName);
	await Deno.writeTextFile(outFile, output);
	console.info(fileName, ">", outFileName, ">", fnName);

	imports.push(`export { ${fnName} } from "./icons/${rawFileName}";`);
}

const importsFile = join(outDir, "index.tsx");
await Deno.writeTextFile(importsFile, imports.join("\n"));
console.info(`write ${imports.length} imports to ${importsFile}`);
