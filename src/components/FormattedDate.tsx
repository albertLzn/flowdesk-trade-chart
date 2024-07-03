import React from 'react';
import { formatDate } from '../utils/helpers';

interface FormattedDateProps {
  timestamp: number;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ timestamp }) => {
  return <span>{formatDate(timestamp)}</span>;
};

export default FormattedDate;
