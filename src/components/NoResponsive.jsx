import React, { Component } from 'react';
import {
  TextWrapper,
  Header,
  Text,
  Gif,
  TextSmall,
  Button,
  Center,
} from './style';

export default class NoResponsive extends Component {
  static defaultProps = {
    text: {
      header: 'We are sorry,',
      headerSmall: 'but we are not responsive yet ...',
      italic: '*currently in progress',
      button: 'Continue',
    },
  };

  render() {
    const height = window.innerHeight;
    const { text, gifSrc, gifAlt, onClick } = this.props;

    return (
      <Center height={height}>
        <div>
          <TextWrapper>
            <Header>{text.header}</Header>
            <Text>{text.headerSmall}</Text>
          </TextWrapper>
          <Gif src={gifSrc} alt={gifAlt} />
          <TextSmall>{text.italic}</TextSmall>
          <Button onClick={onClick}>{text.button}</Button>
        </div>
      </Center>
    );
  }
}
