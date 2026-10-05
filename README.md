## React UseAnimations Icons

[![npm version](https://img.shields.io/npm/v/react-useanimations.svg?style=flat-square)](https://www.npmjs.com/package/react-useanimations) [![npm downloads](https://img.shields.io/npm/dm/react-useanimations.svg?style=flat-square)](https://www.npmjs.com/package/react-useanimations)

#### What is react-useanimations?

React-useanimations is the official React component for [useAnimations](https://useanimations.com) — a free library of 90+ animated Lottie icons.

📖 **Documentation:** [useanimations.com/documentation](https://useanimations.com/documentation) — React props and all import names, plus plain HTML/JS, Vue, iOS and Android guides.

#### Collection

[https://react.useanimations.com](https://react.useanimations.com/) and play with examples or visit our [Storybook](https://useanimations.github.io/react-useanimations/)

![](useanimations-preview.gif)

### Installation

Using Yarn:

```
yarn add react-useanimations
```

or using NPM:

```
npm install -S react-useanimations
```

### Usage
If you still need to use v1, please refer to this README instead - [react-useanimations@v1](https://github.com/useAnimations/react-useanimations/blob/master/README_v1.md)

Basic usage
```javascript
import React from 'react';
import UseAnimations from 'react-useanimations';
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import github from 'react-useanimations/lib/github'

const App = () => <UseAnimations animation={github} />;

export default App;
```

Icons can be configured with inline props:

```javascript
<UseAnimations animation={github} size={56} wrapperStyle={{ padding: 100 }} />
```

These props are available:
| Prop           | Default      | Definition   |
| :------------- | :----------: | -----------: |
| animation   | / | animation file |
|  size | `24`   | animation size    |
|  strokeColor | `'inherit'`   | animation stroke color |
|  fillColor   | `''`          | animation fill color
|  wrapperStyle | `{}` | wrapper div styles |
|  pathCss | `''` | css string for the animation path element |
|  reverse | `false` | assign to `true` when e.g. a checkbox should be checked initially |
|  autoplay | `false`* | false except in animations like loading etc. |
|  loop | `false`* | false except in animations like loading etc. |
|  options | `{}` | provide any other custom options which will override the default ones |
|  speed | `1` | a number to determine the speed of lottie(1 is normal speed) |

<br />
Controlled checkbox example  

```javascript
import React, { useState } from 'react';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';

export const RadioButton = () => {
  // JUST EXAMPLE - THIS PART OF THE STATE WILL PROBABLY COME FROM A PARENT FORM COMPONENT
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <span>radioButton</span>
      <UseAnimations
        reverse={checked}
        onClick={() => {
          setChecked(!checked);
        }}
        size={40}
        wrapperStyle={{ marginTop: '5px' }}
        animation={radioButton}
      />
    </div>
  );
};
```

Animation wrapped in element (use render prop).
```javascript
import heart from 'react-useanimations/lib/heart';

export const WrapperElement = () => {
  return (
    <UseAnimations
      animation={heart}
      size={60}
      onClick={() => {
        // eslint-disable-next-line
        console.log('additional onClick cb is working');
      }}
      render={(eventProps, animationProps) => (
        <button style={{ padding: '20px' }} type="button" {...eventProps}>
          <div {...animationProps} />
        </button>
      )}
    />
  );
};
```
 Note that `eventProps` consists of `onClick`, `mouseOver` and other DOM events which you probably want to assign to your wrapping element (e.g. Button) and `animationProps` consist of an actual animation which you should spread inside a simple `<div>`

### Available animations

`activity`, `airplay`, `alertCircle`, `alertOctagon`, `alertTriangle`, `archive`, `arrowDown`, `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUp`, `arrowUpCircle`, `behance`, `bookmark`, `calendar`, `checkBox`, `checkmark`, `codepen`, `copy`, `download`, `dribbble`, `edit`, `error`, `explore`, `facebook`, `folder`, `github`, `heart`, `help`, `home`, `infinity`, `info`, `instagram`, `linkedin`, `loading`, `loading2`, `loading3`, `lock`, `mail`, `maximizeMinimize`, `maximizeMinimize2`, `menu`, `menu2`, `menu3`, `menu4`, `microphone`, `microphone2`, `notification`, `notification2`, `playPause`, `playPauseCircle`, `plusToX`, `pocket`, `radioButton`, `scrollDown`, `searchToX`, `settings`, `settings2`, `share`, `skipBack`, `skipForward`, `star`, `thumbUp`, `toggle`, `trash`, `trash2`, `twitter`, `userMinus`, `userPlus`, `userX`, `video`, `video2`, `visibility`, `visibility2`, `volume`, `youtube`, `youtube2`, `zoomIn`, `zoomOut`

Import each one from `react-useanimations/lib/<name>`.

### License

The animations are free for personal and commercial use under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution with a link to [useanimations.com](https://useanimations.com) is required; redistributing or reselling the files themselves (e.g. in icon packs, templates or UI kits) is not allowed. See [LICENSE](LICENSE) and [Licencing & Terms](https://useanimations.com/licencing-and-terms).
