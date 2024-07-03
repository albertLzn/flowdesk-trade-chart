import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  color: red;
  font-weight: bold;
  margin: 1em 0;
`;

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => (
  <ErrorWrapper>{message}</ErrorWrapper>
);

export default ErrorNotification;
