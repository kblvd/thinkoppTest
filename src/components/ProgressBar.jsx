import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../App';
import '../style/ProgressBar.css'

function ProgressBar({ currentStep, totalSteps }) {
  const navigate = useNavigate();
  const { formData } = useContext(FormContext);

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const isStepAccessible = (step) => {
    if (step === 1) return true;

    // Проверка для шага 1
    if (step > 1) {
      if (!formData.firstName || !formData.firstName.trim()) {
        return false;
      }
    }

    // Проверка для шага 2
    if (step > 2) {
      if (!formData.favoriteMovie || !formData.favoriteMovie.trim()) {
        return false;
      }
    }

    // Добавьте проверки для остальных шагов

    return true;
  };

  const handleClick = (step) => {
    if (isStepAccessible(step)) {
      navigate(step === 1 ? '/' : `/step${step}`);
    }
  };

  return (
    <div className='progressBar'>
      {steps.map((step) => (
        <span
          key={step}
          onClick={() => handleClick(step)}
          style={{
            margin: '0 5px',
            border: currentStep === step ? ' 0.50px solid rgba(0, 0, 0, 0.25)' : 'none',
            cursor: isStepAccessible(step) ? 'pointer' : 'not-allowed',
            color: currentStep === step ? 'black' : 'rgba(0, 0, 0, 0.5)',
          }}
        >
          {step}
        </span>
      ))}
    </div>
  );
}

export default ProgressBar;
