#!/bin/bash
set -ex

### SCRIPT FOR CREATING STORIES WITH ALL ANIMATIONS WHICH ARE INSIDE /LIB FOLDER
### CALL THE SCRIPT FROM /LIB FOLDER
touch "../generated.stories.tsx"
echo "import React from 'react';" >> "../generated.stories.tsx"

for dir in *; do
  if [[ -d "$dir" ]]; then
    echo "import ${dir%.*} from './lib/${dir%.*}';" >> "../generated.stories.tsx"
  fi
done

echo "import UseAnimation from '.';" >> "../generated.stories.tsx"
echo "export default {
  title: 'Animations',
  component: UseAnimation,
};" >> "../generated.stories.tsx"

echo "export const All = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>" >> "../generated.stories.tsx"

for dir in *; do
  if [[ -d "$dir" ]]; then
    echo "<div style={{ padding: '20px' }}>
      <span>${dir%.*}</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={${dir%.*}} />
    </div>" >> "../generated.stories.tsx"
  fi
done

echo "</div>
);" >> "../generated.stories.tsx"