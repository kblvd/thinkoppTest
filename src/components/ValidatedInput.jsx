// import React, { useState, useEffect } from 'react';

// function ValidatedInput({ name, value, onChange, placeholder, required, showError }) {
//   const [touched, setTouched] = useState(false);

//   useEffect(() => {
//     if (showError) {
//       setTouched(true);
//     }
//   }, [showError]);

//   const isError = required && touched && value.trim() === '';

//   const handleBlur = () => {
//     setTouched(true);
//   };

//   return (
//     <div className='isError'>      
//       {isError && (
//         <span>Заполните поле</span>
//       )}
//       <input
//         name={name}
//         // type="text"
//         value={value}
//         onChange={onChange}
//         onBlur={handleBlur}
//         placeholder={placeholder}
//         style={{
//           borderColor: isError ? '#be1f2a' : '#1d1d1d',
//           width: '100%',
//         }}
//       />

//     </div>
//   );
// }

// export default ValidatedInput;
import React, { useState, useEffect } from 'react';

function ValidatedInput({
  name,
  value,
  onChange,
  placeholder,
  required,
  showError,
  type = 'text',
  pattern,
  errorMessage,
}) {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (showError) {
      setTouched(true);
    }
  }, [showError]);

  const isEmpty = value.trim() === '';
  let isError = false;

  if (required && touched && isEmpty) {
    isError = true;
  } else if (pattern && touched && !new RegExp(pattern).test(value.trim().toLowerCase())) {
    isError = true;
  }

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className='isError'>
      {isError && (
        <span >
          {errorMessage || 'Заполните поле'}
        </span>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{
          borderColor: isError ? '#be1f2a' : '#1d1d1d',
          width: '100%',
        }}
      />

    </div>
  );
}

export default ValidatedInput;
