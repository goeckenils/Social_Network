import React from 'react';
import styled from 'styled-components';

const Input = props => {
  return (
    <Wrapper>
      <Label>{props.name}</Label>
      <PureInput
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        error={props.error}
        onChange={props.onChange}
      ></PureInput>
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  margin-bottom: 10px;
`;

const PureInput = styled.input`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 25px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: ${props => `1px solid ${props.error ? '#fc7560' : '#b4bece'}`};
  color: #b4bece;
  font-size: 14px;
  width: 100%;
  &::placeholder {
    color: #b4bece;
  }
  &:focus {
    outline-color: #fc7560;
  }
`;

const Label = styled.label`
  position: absolute;
  font-size: 12px;
  color: #b4bece;
  top: 15px;
  left: 25px;
`;
