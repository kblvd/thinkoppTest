import React, { useState, useEffect } from 'react';

function ValidatedSelect({ name, value, onChange, placeholder, options, required, showError }) {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (showError) {
      setTouched(true);
    }
  }, [showError]);

  const isError = required && touched && (value === '' || value === undefined);

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className='isError'>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        style={{
            borderColor: isError ? '#be1f2a' : '#1d1d1d',
            width: '100%',
          }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {isError && (
        <span>Заполните поле</span>
      )}
    </div>
  );
}

export default ValidatedSelect;
