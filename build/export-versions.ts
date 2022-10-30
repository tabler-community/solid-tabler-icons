import pckg from "../package.json" assert { type: "json" };

const thisPckgTxt = await Deno.readTextFile("this-package.json");
const thisPckg = JSON.parse(thisPckgTxt);
const thisVersion = thisPckg["dist-tags"].latest;

const tablerPckgTxt = await Deno.readTextFile("tabler-package.json");
const tablerPckg = JSON.parse(tablerPckgTxt);
const tablerVersion = tablerPckg["dist-tags"].latest;

const encoder = new TextEncoder();

console.info(`INFO: write tabler-version.txt ${tablerVersion}`);
await Deno.writeFile("tabler-version.txt", encoder.encode(tablerVersion));

console.info(`INFO: write this-version.txt ${thisVersion}`);
await Deno.writeFile("this-version.txt", encoder.encode(thisVersion));

console.info(`INFO: overwrite package.json`);
pckg.version = tablerVersion;
const pckgJson = JSON.stringify(pckg, null, 4);
await Deno.writeFile("package.json", encoder.encode(pckgJson));
