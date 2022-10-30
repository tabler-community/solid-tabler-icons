import pckg from "../package.json" assert { type: "json" };

const tablerPckgTxt = await Deno.readTextFile("tabler-icons/package.json");
const tablerPckg = JSON.parse(tablerPckgTxt);

console.info(`tablerPckg.version: ${tablerPckg.version}`);

pckg.version = tablerPckg.version;

const pckgJson = JSON.stringify(pckg, null, 4);
const encoder = new TextEncoder();
await Deno.writeFile("package.json", encoder.encode(pckgJson));
