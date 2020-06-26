#!/bin/bash
set -ex

### WHEN NEW ANIMATIONS ARE ADDED TO THE /lib, 
### CHANGE YOUR PWD TO /lib (very important step) & RUN THIS SCRIPT TO AUTOMATE THE REST
touch "../temp.ts"
echo "export const ANIMATION_KEYS = {" >> "../temp.ts"

for file in *; do
  if [[ -f "$file" ]]; then
    echo "  ${file%.*}: '${file%.*}'," >> "../temp.ts"
    mkdir "${file%.*}"
    mv "$file" "${file%.*}"
    touch "index.ts"
    echo "import { ANIMATION_KEYS } from '../../utils/constants';" >> "index.ts"
    echo "import ${file%.*} from './$file';" >> "index.ts"
    echo "" >> "index.ts"
    echo "export default { animationData: ${file%.*}, animationKey: ANIMATION_KEYS.${file%.*} };" >> "index.ts"
    mv "index.ts" "${file%.*}"
  fi
done

echo "};" >> "../temp.ts"
cat "../temp.ts" >> "../utils/constants.ts"
rm "../temp.ts"