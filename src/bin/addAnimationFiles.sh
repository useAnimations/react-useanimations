#!/bin/bash
set -ex

### WHEN NEW ANIMATIONS ARE ADDED TO THE /lib, 
### CHANGE YOUR PWD TO /lib (very important step) & RUN THIS SCRIPT TO AUTOMATE THE REST
### IMPORTANT - MAKE SURE YOU HAVE TRUNCATE PACKAGE BEFORE RUNNING
touch "../temp.ts"
echo "export type AnimationKey = " >> "../temp.ts"

for file in *; do
  if [[ -f "$file" ]]; then
    echo "'${file%.*}' |" >> "../temp.ts"
    mkdir "${file%.*}"
    mv "$file" "${file%.*}"
    touch "index.ts"
    echo "import type { Animation } from '../../utils/constants';" >> "index.ts"
    echo "import ${file%.*} from './$file';" >> "index.ts"
    echo "" >> "index.ts"
    echo "export default { animationData: ${file%.*}, animationKey: '${file%.*}' } as Animation;" >> "index.ts"
    mv "index.ts" "${file%.*}"
  fi
done

### HACKY - REMOVE LAST CHAR FROM THE TEMP FILE - WHICH IS |
truncate -s -3 "../temp.ts"
echo ";" >> "../temp.ts"
cat "../temp.ts" >> "../utils/constants.ts"
rm "../temp.ts"