import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Logo from '../img/Logo.svg';
import { H1 } from '../base/headings';
import Input from '../base/Input';
import Button, { Secondary } from '../base/Button';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (email, password) => {
    const data = {
      email,
      password,
    };

    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem('x-auth-token', JSON.stringify(data.token));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
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
            <Secondary to="/register" marginLeft="5px">
              Register
            </Secondary>
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
