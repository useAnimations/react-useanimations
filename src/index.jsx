import React from 'react';
import { debounce } from 'lodash/fp';
import NoResponsive from './components/NoResponsive';

export default ({
  debounceInterval = 200,
  NoResponsiveComponent = NoResponsive,
  withBreakpoints = { width: 700, height: 400 },
  gifSrc = 'https://media.giphy.com/media/10tIjpzIu8fe0/giphy.gif',
  gifAlt = 'Sorry, too small',
  text,
  componentName = 'TooSmallBro',
} = {}) => Component => class AwesomeWrapperBro extends React.Component {
  static displayName = componentName;

  state = {
    showComponent: null,
  };

  setStateToVisible = () => this.setState({ showComponent: true });

  setSizeScreen = () => {
    const height = window.innerHeight > withBreakpoints.height;
    const width = window.innerWidth > withBreakpoints.width;
  
    height && width 
      ? this.setState({ showComponent: true })
      : this.setState({ showComponent: false })
  }

  onDebounceResize = debounce(debounceInterval)(this.setSizeScreen);

  componentWillMount() {
    window.addEventListener('resize', this.onDebounceResize, false);
    this.setSizeScreen();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onDebounceResize, false);
  }

  render() {
    const props = {
      ...this.props,
      onClick: this.setStateToVisible,
      gifSrc,
      gifAlt,
      text,
      }

    return (
      this.state.showComponent 
        ? <Component {...props} />
        : <NoResponsiveComponent {...props}  />
    );
  }
};