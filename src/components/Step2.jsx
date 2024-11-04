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
    <div>
      <h2>Шаг 2: Ваш любимый фильм</h2>
      <div>
        <label>Любимый фильм:</label>
        <ValidatedInput
          name="favoriteMovie"
          value={favoriteMovie}
          onChange={handleChange}
          placeholder="Любимый фильм"
          required
        />
      </div>
      <button onClick={handleBack}>Назад</button>
      <button
        onClick={handleNext}
        // disabled={favoriteMovie.trim() === ''}
        style={{
          backgroundColor: favoriteMovie.trim() ? 'blue' : 'grey',
          color: 'white',
          marginLeft: '10px',
        }}
      >
        Далее
      </button>
      <button onClick={handleCancel} style={{ marginLeft: '10px' }}>
        Отменить заполнение
      </button>
      <ProgressBar currentStep={2} totalSteps={totalSteps} />
    </div>
  );
}

export default Step2;
