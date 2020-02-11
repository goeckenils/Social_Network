import styled, { css } from 'styled-components';

export const H1 = styled.h1`
  font-size: ${props => (props.fontSize ? props.fontSize : css`28px`)};
  color: ${props => (props.color ? props.color : css`#B4BECE`)};
  margin-bottom: ${props =>
    props.marginBottom ? props.marginBottom : css`10px`};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : css``)};
  margin-right: ${props => (props.marginRight ? props.marginRight : css``)};
  margin-top: ${props => (props.marginTop ? props.marginTop : css``)};
  padding: ${props => (props.padding ? props.padding : css`0px`)};
`;
export const H2 = styled.h2`
  font-size: ${props => (props.fontSize ? props.fontSize : css`18px`)};
  color: ${props => (props.color ? props.color : css`#B4BECE`)};
  margin-bottom: ${props =>
    props.marginBottom ? props.marginBottom : css`10px`};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : css``)};
  margin-right: ${props => (props.marginRight ? props.marginRight : css``)};
  margin-top: ${props => (props.marginTop ? props.marginTop : css``)};
  padding: ${props => (props.padding ? props.padding : css`0px`)};
`;
export const P = styled.p`
  font-size: ${props => (props.fontSize ? props.fontSize : css`14px`)};
  color: ${props => (props.color ? props.color : css`#B4BECE`)};
  margin-bottom: ${props =>
    props.marginBottom ? props.marginBottom : css`10px`};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : css``)};
  margin-right: ${props => (props.marginRight ? props.marginRight : css``)};
  margin-top: ${props => (props.marginTop ? props.marginTop : css``)};
  padding: ${props => (props.padding ? props.padding : css`0px`)};
`;
