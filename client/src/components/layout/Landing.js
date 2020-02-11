import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Logo from '../img/Logo.svg';
import { H1 } from '../base/headings';
import Input from '../base/Input';
import Button, { Secondary } from '../base/Button';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <LandingContainer>
      <LoginWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <TextWrapper>
            <H1 marginLeft="5px">
              <Orange>
                Welcome, <br></br>
              </Orange>
              sign in to continue
            </H1>
          </TextWrapper>
          <Input
            onChange={e => setEmail(e.target.value)}
            value={email}
            name="Email"
            type="text"
            placeholder="Max@Mustermann.de"
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="Password"
            type="password"
            placeholder="********"
          />
          <ButtonWrapper>
            <Button marginRight="5px" type="submit">
              Login
            </Button>
            <Secondary marginLeft="5px">Register</Secondary>
          </ButtonWrapper>
        </LoginForm>
      </LoginWrapper>
      <LogoContainer>
        <img src={Logo} alt="" />
      </LogoContainer>
    </LandingContainer>
  );
};

export default Landing;

const LandingContainer = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`;

const LoginWrapper = styled.div`
  width: 385px;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LoginForm = styled.form`
  width: 385px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding: 5px;
`;
const TextWrapper = styled.div``;

const Orange = styled.span`
  color: #fc7560;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
