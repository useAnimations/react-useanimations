## React UseAnimations Icons

[![npm version](https://img.shields.io/npm/v/react-useanimations.svg?style=flat-square)](https://www.npmjs.com/package/react-useanimations) [![npm downloads](https://img.shields.io/npm/dm/react-useanimations.svg?style=flat-square)](https://www.npmjs.com/package/react-useanimations)

#### What is react-useanimations?

React-useanimations is a collection of free animated open source icons for React.js.

#### Collection

[https://react.useanimations.com](https://react.useanimations.com/) and play with examples.

![](useanimations-preview.gif)

<p align="center">
  <a href="https://bit.dev/feathericons/react-feather"><img src="https://i.imagesup.co/images2/371e9a2b398a5d7cef54a956d959e4534b290a55.gif"></a>
</p>

### Installation

Using Yarn:

```
yarn add react-useanimations
```

or using NPM:

```
npm install react-useanimations
```

### Usage

```javascript
import React from 'react';
import UseAnimations from 'react-useanimations';

const App = () => {
  return <UseAnimations animationKey="alert" />;
};

export default App;
```

Icons can be configured with inline props:

```javascript
<UseAnimations animationKey="alert" size={48} />
```
