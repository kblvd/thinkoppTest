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

    if (step > 1) {
      if (!formData.firstName || !formData.firstName.trim()) {
        return false;
      }
    }

    if (step > 2) {
      if (!formData.favoriteMovie || !formData.favoriteMovie.trim()) {
        return false;
      }
    }


    return true;
  };

  const handleClick = (step) => {
    if (isStepAccessible(step)) {
      navigate(step === 1 ? '/' : `/step${step}`);
    }
  };

  // return (
  //   <div className='progressBar'>
  //     {steps.map((step) => (
  //       <span
  //         key={step}
  //         onClick={() => handleClick(step)}
  //         style={{
  //           margin: '0 5px',
  //           border: currentStep === step ? ' 0.50px solid rgba(0, 0, 0, 0.25)' : 'none',
  //           cursor: isStepAccessible(step) ? 'pointer' : 'not-allowed',
  //           color: currentStep === step ? 'black' : 'rgba(0, 0, 0, 0.5)',
  //         }}
  //       >
  //         {step}
  //       </span>
  //     ))}
  //   </div>
  // );
  const renderStep = (steps) => {

    let isPrevHidden = false;

  

    return steps.map((step, index) => {

      if (

        index !== 0 &&

        index !== steps.length - 1 &&

        Math.abs(step - currentStep) >= 2

      ) {

        // Проверка, чтобы не было двух последовательных элементов "…"

        if (isPrevHidden) {

          return null; // Пропускаем текущий элемент

        }

        isPrevHidden = true; // Отмечаем, что вставили "…"

        

        // Вставляем элемент "…"

        return (

          <span

            key={`dots-${index}`}

            style={{

              margin: '0 5px',

              border: 'none',

              cursor: 'not-allowed',

              color: 'rgba(0, 0, 0, 0.5)',

            }}

          >

            {".."}

          </span>

        );

      }

  

      isPrevHidden = false; // Сбрасываем флаг, если показываем обычный элемент

  

      // Отображаем обычный элемент

      return (

        <span

          key={step}

          onClick={() => handleClick(step)}

          style={{

            margin: '0 5px',

            border: currentStep === step ? '0.50px solid rgba(0, 0, 0, 0.25)' : 'none',

            cursor: isStepAccessible(step) ? 'pointer' : 'not-allowed',

            color: currentStep === step ? 'black' : 'rgba(0, 0, 0, 0.5)',

          }}

        >

          {step}

        </span>

      );

    });

  };

  

  return (

    <div className='progressBar'>

      {renderStep(steps)}

    </div>

  );
}

export default ProgressBar;
