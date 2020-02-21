import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Logo from '../img/Logo.svg';
import { H1 } from '../base/headings';
import Input from '../base/Input';
import Button, { Secondary } from '../base/Button';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const Landing = ({ login, setAlert, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };
  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <LandingContainer>
      <LoginWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <TextWrapper>
            <H1 marginLeft="5px">
              <Orange>
                Welcome, <br />
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

const mapStateToProps = state => ({
  isAuthenticated: state.register.isAuthenticated,
});

Landing.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { login, setAlert })(Landing);

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
