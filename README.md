# Project Title

Sorry bro, your screen is too small, that's why you are seeing this screen.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Examples

Default settings: https://stackblitz.com/edit/react-too-small-default

[![Code Climate](https://media.giphy.com/media/3o7WINcHQNYNQ8C9s4/giphy.gif)](https://stackblitz.com/edit/react-too-small-default)



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

### Configuration

### Other examples

Settings 2: https://stackblitz.com/edit/react-too-small-v2

[![Code Climate](https://media.giphy.com/media/xThtan8PVMww4pu2EE/giphy.gif)](https://stackblitz.com/edit/react-too-small-v2)

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


const text = {
      header: 'Sorry bro,',
      headerSmall: 'your screen is way to small',
      italic: '*but dont worry, we are working on responsive design',
      button: 'F*ck it, just show me the web',
     };

const gifSrc = 'https://media.giphy.com/media/w0vFxYaCcvvJm/giphy.gif';

const ComposedComponent = toSmallBro({text, gifSrc })(App);

render(<ComposedComponent />, document.getElementById('root'));
````

Supported props
---------------

````js
const config = {
  text: {
      header: 'Sorry bro,',
      headerSmall: 'your screen is way to small',
      italic: '*but dont worry, we are working on responsive design',
      button: 'F*ck it, just show me the web',
    },
    gifSrc: 'https://media.giphy.com/media/w0vFxYaCcvvJm/giphy.gif',
    debounceInterval: 300,
    NoResponsiveComponent: <CustomComponent />,
    withBreakpoints: { width: 300, height: 200 },
    componentName: 'TooSmallBro',
};

const ComposedComponent = toSmallBro(config)(App);

render(<ComposedComponent />, document.getElementById('root'));
````


## Built With

* [React](https://github.com/facebook/react) - The web framework used
* [Giphy](https://giphy.com/) - Giphy


This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details