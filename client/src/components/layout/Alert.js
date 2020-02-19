import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  const makeAlert =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <AlertContainer alertType={alert.alertType} key={alert.id}>
        {console.log(alert.alertType)}
        {alert.msg}
      </AlertContainer>
    ));

  return <Wrapper>{makeAlert}</Wrapper>;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

const AlertContainer = styled.div`
  padding: 20px;
  background-color: ${props =>
    props.alertType === 'danger'
      ? '#dc3545'
      : null || props.alertType === 'success'
      ? '#28a745'
      : null};
  color: #ffffff;
  display: flex;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  border-radius: 4px;
  -webkit-box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.16);
`;
const Wrapper = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;
