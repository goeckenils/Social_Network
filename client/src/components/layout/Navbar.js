import React, { Fragment } from 'react';
import styled from 'styled-components';
import Logo from '../img/Logo.svg';

const Navbar = () => {
  return (
    <Fragment>
      <Wrapper>
        <LogoContainer src={Logo} />
        <List>
          <Item>Hallo</Item>
          <Item>Mega</Item>
        </List>
      </Wrapper>
    </Fragment>
  );
};

export default Navbar;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  padding: 0 20px;
  background: blur(8px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.img`
  width: 50px;
`;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  padding: 20px;
  display: block;
  cursor: pointer;
  background: #ffffff;
`;
