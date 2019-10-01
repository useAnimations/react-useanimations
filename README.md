## React UseAnimations Icons

[![npm version](https://img.shields.io/npm/v/react-feather.svg?style=flat-square)](https://www.npmjs.com/package/react-feather) [![npm downloads](https://img.shields.io/npm/dm/react-feather.svg?style=flat-square)](https://www.npmjs.com/package/react-feather)

#### What is react-useanimations?

react-feather is a collection of free animated open source icons for React.js.

[Explore icons](https://bit.dev/feathericons/react-feather) and play with examples.

<p align="center">
  <a href="https://bit.dev/feathericons/react-feather"><img src="https://i.imagesup.co/images2/371e9a2b398a5d7cef54a956d959e4534b290a55.gif"></a>
</p>

#### Based on Feather Icons `v4.22.1`

#### Version `2.0.0` adds support for tree-shaking, to help you reduce bundle size.

### Installation

    ### Npm

    npm install react-useAnimations --save

    ### Yarn

    yarn add react-useAnimations --D

### Usage

```javascript
import React from 'react';
import UseAnimations from 'react-useAnimations';

const App = () => {
  return <UseAnimations animationKey="alert" />;
};

export default App;
```

Icons can be configured with inline props:

```javascript
<Camera color="red" size={48} />
```
