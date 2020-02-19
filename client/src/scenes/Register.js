import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Logo from '../components/img/Logo.svg';
import { H1 } from '../components/base/headings';
import Input from '../components/base/Input';
import Button, { Secondary } from '../components/base/Button';
import { useHistory, Link } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = React.useState(false);
  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const name = firstName.concat(lastName);
    if (password === password2) {
      register({ name, email, password });
    } else {
      setAlert('Passwords does not match', 'danger');
      setError(true);
    }
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
              register to continue
            </H1>
          </TextWrapper>
          <InputWrapper>
            <Input
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              name="Name"
              type="text"
              placeholder="Max"
            />
            <Input
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              name="Nachname"
              type="text"
              placeholder="Mustermann"
            />
          </InputWrapper>
          <Input
            onChange={e => setEmail(e.target.value)}
            value={email}
            name="Email"
            type="text"
            placeholder="Max@Mustermann.de"
          />
          <Input
            // borderColor={border}
            onChange={e => setPassword(e.target.value)}
            value={password}
            error={error}
            name="Password"
            type="password"
            placeholder="********"
          />
          <Input
            onChange={e => setPassword2(e.target.value)}
            value={password2}
            error={error}
            name="Confirm Password"
            type="password"
            placeholder="********"
          />
          <ButtonWrapper>
            <Button marginRight="5px" type="submit">
              Register
            </Button>
            <Secondary to="/" marginLeft="5px">
              Back to login
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);

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
const InputWrapper = styled.div`
  display: flex;
`;
const TextWrapper = styled.div``;

const Orange = styled.span`
  color: #fc7560;
`;
