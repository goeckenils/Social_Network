import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <AlertContainer alertType={alert.alertType} key={alert.id}>
      {alert.msg}
    </AlertContainer>
  ));

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
  position: absolute;
  color: #ffffff;
  left: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  border-radius: 4px;
  -webkit-box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.16);
`;
