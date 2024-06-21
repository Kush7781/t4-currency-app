import React from 'react';

const CurrencyInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={styles}
    />
  );
};

const styles = {
    maxWidth: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',

};

export default CurrencyInput;
