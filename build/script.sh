#!/bin/sh

# 0) cd to root of this repository
cd "$(dirname "$0")/.."

# 1) get tabler-icons repository
git clone https://github.com/tabler/tabler-icons.git

# 2) copy icons-react files
mkdir -p lib
cp --recursive --force tabler-icons/icons-react/. lib

# 3) refactor files for usage with solid
cd lib/icons-js
grep -l 'from "react"' *.js | xargs sed -i 's/import/\/\/import/g'

cd ..
sed -i 's/react/solid-js/g' index.d.ts
sed -i 's/SVGAttributes/JSX.SvgSVGAttributes/g' index.d.ts
sed -i 's/FC/Component/g' index.d.ts
sed -i 's/strokeWidth/stroke-width/g' index.d.ts

cd "$(dirname "$0")/.."

# 4) update package version to match with tabler-icons
deno run --allow-read --allow-write build/script.ts
