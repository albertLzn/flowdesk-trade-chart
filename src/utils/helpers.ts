export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  export const formatNumber = (num: any, decimals: number = 2): string => {
    if (num === null || num === undefined || isNaN(num)) {
      return 'N/A';
    }
    const number = parseFloat(num);
    return number.toFixed(decimals);
  };
  