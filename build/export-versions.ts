import pckg from "../package.json" assert { type: "json" };

const tablerPckgTxt = await Deno.readTextFile("tabler-package.json");
const tablerPckg = JSON.parse(tablerPckgTxt);
const tablerVersion = tablerPckg.version;

const encoder = new TextEncoder();

console.info(`INFO: write tabler-version.txt ${tablerVersion}`);
await Deno.writeFile("tabler-version.txt", encoder.encode(tablerVersion));

console.info(`INFO: write this-version.txt ${pckg.version}`);
await Deno.writeFile("this-version.txt", encoder.encode(pckg.version));

console.info(`INFO: overwrite package.json`);
pckg.version = tablerVersion;
const pckgJson = JSON.stringify(pckg, null, 4);
await Deno.writeFile("package.json", encoder.encode(pckgJson));
