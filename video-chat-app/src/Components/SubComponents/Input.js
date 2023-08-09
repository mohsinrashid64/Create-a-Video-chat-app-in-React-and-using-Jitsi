import React from 'react';

const Input = (props) => {
  const { label, type, id, value, onChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
