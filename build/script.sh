#!/bin/sh
i=0
n=9

echo "[STEP $i/$n] cd to root of this repository"
cd "$(dirname "$0")/.."

echo "[STEP $(((i+=1)))/$n] clone tabler-icons git repository"
git clone https://github.com/tabler/tabler-icons.git

echo "[STEP $(((i+=1)))/$n] create directory 'lib'"
mkdir -p lib

echo "[STEP $(((i+=1)))/$n] copy files from 'tabler-icons/icons-react/.' to 'lib'"
cp --recursive --force tabler-icons/icons-react/. lib

echo "[STEP $(((i+=1)))/$n] cd into 'lib/icons-js'"
cd lib/icons-js

echo "[STEP $(((i+=1)))/$n] comment out all imports in react files"
grep -l 'from "react"' *.js | xargs sed -i 's/import/\/\/import/g'

echo "[STEP $(((i+=1)))/$n] change file extention to '.jsx'"
for f in *.js; do
   mv -f "$f" "${f%.js}.jsx"
done

echo "[STEP $(((i+=1)))/$n] cd back into 'lib'"
cd ..

echo "[STEP $(((i+=1)))/$n] change file extention to '.jsx' in 'index.js'"
sed -i 's/.js/.jsx/g' index.js

echo "[STEP $(((i+=1)))/$n] replace types in 'index.d.ts'"
sed -i 's/react/solid-js/g' index.d.ts
sed -i 's/SVGAttributes/JSX.SvgSVGAttributes/g' index.d.ts
sed -i 's/FC/Component/g' index.d.ts
sed -i 's/Component, JSX.SvgSVGAttributes/Component, JSX/g' index.d.ts
sed -i 's/strokeWidth/stroke-width/g' index.d.ts
