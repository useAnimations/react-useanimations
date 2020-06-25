#!/bin/bash

### WHEN NEW ANIMATIONS ARE ADDED TO THE /lib, CHANGE YOUR PWD TO /lib & RUN THIS SCRIPT TO AUTOMATE THE REST
for file in *; do
  if [[ -f "$file" ]]; then
    mkdir "${file%.*}"
    mv "$file" "${file%.*}"
    touch "index.js"
    echo "import ${file%.*} from './$file';" >> "index.js"
    echo "" >> "index.js"
    echo "export default ${file%.*};" >> "index.js"
    mv "index.js" "${file%.*}"
  fi
done