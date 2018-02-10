import styled from 'styled-components';

export const Gif = styled.img`
  max-width: 90%;
  max-height: 60vh;
  margin: 0 auto;
  display: block;
`;

export const TextWrapper = styled.div`
  padding-bottom: 3%;
`;

export const TextSmall = styled.div`
  font-size: 10px;
  font-style: italic;
  padding-bottom: 4%;
  padding-top: 1%;
`;

export const Center = styled.div`
  text-align: center;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.h1`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-weight: 300;
  padding-bottom: 1%;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-weight: 300;
`;

export const Button = styled.button`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 22px;
  background: #14c9d2;
  text-align: center;
  margin-bottom: 20px;
  white-space: nowrap;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 16px;
  transition: all 0.3s ease 0s;
  &:hover {
    background: #0c9199;
  }
`;
