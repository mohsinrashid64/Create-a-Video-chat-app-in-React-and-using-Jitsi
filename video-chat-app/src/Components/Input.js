import React from 'react';

const Input = (props) => {
  const { label, type, id, value, onChange, name, placeholder,className } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        className={className}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
