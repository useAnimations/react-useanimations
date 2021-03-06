## React UseAnimations Icons

[![npm version](https://img.shields.io/npm/v/react-useanimations.svg?style=flat-square)](https://www.npmjs.com/package/react-useanimations) [![npm downloads](https://img.shields.io/npm/dm/react-useanimations.svg?style=flat-square)](https://www.npmjs.com/package/react-useanimations)

#### What is react-useanimations?

React-useanimations is a collection of free animated open source icons for React.js.

#### Collection

[https://react.useanimations.com](https://react.useanimations.com/) and play with examples.

![](useanimations-preview.gif)

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
This is README for v1, consider upgrading to v2, it will improve your performance - [react-useanimations@v1](https://github.com/useAnimations/react-useanimations/blob/master/README.md)

Basic Usage
```javascript
import React from 'react';
import UseAnimations from 'react-useanimations';

const App = () => <UseAnimations animationKey="github" />;

export default App;
```

Icons can be configured with inline props:

```javascript
<UseAnimations animationKey="alert" size={56} style={{ padding: 100 }} />
```
