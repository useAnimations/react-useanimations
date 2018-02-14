<h1 align="center"> react-too-small</h1>
<p align="center">Sorry bro, your screen is too small</p>

<p align="center"><a href="https://react-too-small.netlify.com/">
<img src="https://api.travis-ci.org/digilifecz123/react-too-small.svg" alt="Build Status" /></a>
<a href="https://www.npmjs.com/package/react-motion-menu">
<img src="https://img.shields.io/npm/v/react-too-small.svg" alt="npm version" /></a> 
</p>

<p align="center"><img src ="https://media.giphy.com/media/3o7WINcHQNYNQ8C9s4/giphy.gif?raw=true" /></p>

<p align="center"><a href='https://stackblitz.com/edit/react-too-small-default'>See demo</a></p>


## Installation

Using `yarn`

```
yarn add react-too-small
```

or `NPM`

````
npm install --save react-too-small
````

## How to use

````js
import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import toSmallBro from 'react-too-small';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}


const ComposedComponent = toSmallBro()(App);

render(<ComposedComponent />, document.getElementById('root'));
````

## Code examples
Setting v1: https://stackblitz.com/edit/react-too-small-default

Setting v2: https://stackblitz.com/edit/react-too-small-v2


[![Code Climate](https://media.giphy.com/media/xThtan8PVMww4pu2EE/giphy.gif)](https://stackblitz.com/edit/react-too-small-v2)



## Configuration
feel free to change the config

````js
const config = {
  text: {
      header: 'We are sorry,',
      headerSmall: 'but we are not responsive yet ...',
      italic: '*currently in progress',
      button: 'Continue',
    },
    gifSrc: 'https://media.giphy.com/media/w0vFxYaCcvvJm/giphy.gif',
    debounceInterval: 200,
    NoResponsiveComponent: <CustomComponent />,
    withBreakpoints: { width: 700, height: 400 },
    componentName: 'TooSmallBro',
};

const ComposedComponent = toSmallBro(config)(App);
````


## Built With

* [React](https://github.com/facebook/react) - The web framework used
* [Giphy](https://giphy.com/) - Giphy


This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
