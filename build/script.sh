#!/bin/sh
i=0
n=6

echo "[STEP $i/$n] cd to root of this repository"
cd "$(dirname "$0")/.."

echo "[STEP $(((i+=1)))/$n] clone tabler-icons git repository"
git clone https://github.com/tabler/tabler-icons.git

echo "[STEP $(((i+=1)))/$n] cd into 'tabler-icons/icons-react/icons-js'"
cd tabler-icons/icons-react/icons-js

echo "[STEP $(((i+=1)))/$n] refactor all components from react to solid"
grep -l '"' *.js | deno run --allow-read --allow-write ../../../build/transpiler.ts --dir=../../../src/

echo "[STEP $(((i+=1)))/$n] cd back into root of this repository"
cd ../../..

echo "[STEP $(((i+=1)))/$n] run 'npm install'"
npm install

echo "[STEP $(((i+=1)))/$n] run 'npm run build'"
npm run build
