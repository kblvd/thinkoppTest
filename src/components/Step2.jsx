// src/components/Step2.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../App';
import ProgressBar from './ProgressBar';
import ValidatedInput from './ValidatedInput';

function Step2() {
  const navigate = useNavigate();
  const { formData, setFormData, totalSteps } = useContext(FormContext);

  const favoriteMovie = formData.favoriteMovie || '';

  const handleNext = () => {
    if (favoriteMovie.trim() === '') {
      return;
    }
    navigate('/step3');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      favoriteMovie: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      favoriteMovie: e.target.value,
    });
  };

  return (
    <>
      <div className='step'>
        <div className='inputField'>
          <label>Любимый фильм:</label>
          <ValidatedInput
            name="favoriteMovie"
            value={favoriteMovie}
            onChange={handleChange}
            placeholder="Любимый фильм"
            required
          />
        </div>
      </div>
      {/* <button onClick={handleBack}>Назад</button> */}
      <div className='stepFooter'>
      <ProgressBar currentStep={2} totalSteps={totalSteps} />
      <button
        className='nexStep'
        onClick={handleNext}
        style={{
          backgroundColor: '#efefef',
          color: '#ACACAC'
        }}>
        Следующий шаг
        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            stroke: '#ACACAC'
          }}>
          <path d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      </div>
      {/* <button onClick={handleCancel} style={{ marginLeft: '10px' }}>
        Отменить заполнение
      </button> */}


    </>
  );
}

export default Step2;
