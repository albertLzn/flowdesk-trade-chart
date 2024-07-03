import React from 'react';
import { formatNumber } from '../utils/helpers';

interface FormattedNumberProps {
  value: number | string;
  decimals?: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({ value, decimals = 2 }) => {
  return <span>{formatNumber(value, decimals)}</span>;
};

export default FormattedNumber;
