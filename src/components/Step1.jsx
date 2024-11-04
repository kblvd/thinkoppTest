// src/components/Step1.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../App';
import ProgressBar from './ProgressBar';
import ValidatedInput from './ValidatedInput';
import ValidatedSelect from './ValidatedSelect';
import InputMask from 'react-input-mask';


function Step1() {
  const navigate = useNavigate();
  const { formData, setFormData, totalSteps } = useContext(FormContext);

  const [showErrors, setShowErrors] = useState(false);

  const requiredFields = [
    'filmName',
    'genre',
    'format',
    'unf',
    'country',
  ];

  const handleNext = () => {
    if (!isFormValid()) {
      setShowErrors(true);
      return;
    }
    navigate('/step2');
  };



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    return requiredFields.every((field) => {
      const value = formData[field];
      return value && value.trim() !== '';
    });
  };

  return (
    <>
      <div className='step'>
        <div className='collumn'>
          <div className='inputField'>
            <label>Название</label>
            <ValidatedInput
              name="filmName"
              value={formData.filmName || ''}
              onChange={handleChange}
              placeholder="Название проекта"
              required
              showError={showErrors}
            />
          </div>
          <div className='inputField'>
            <label>Жанр</label>
            <ValidatedSelect
              name="genre"
              value={formData.genre || ''}
              onChange={handleChange}
              placeholder="Жанр"
              options={['Драма', 'Комедия', 'Боевик', 'Фантастика', 'Детектив']}
              required
              showError={showErrors}
            />
          </div>
          <div className='inputField'>
            <label>Формат (для онлайн-платформ, большого экрана, интернета, другое)</label>
            <ValidatedSelect
              name="format"
              value={formData.format || ''}
              onChange={handleChange}
              placeholder="Формат"
              options={['Онлайн-платформа', 'Большой экран', 'Интернет', 'Другое']}
              required
              showError={showErrors}
            />
          </div>
          <div className='inputField'>
            <label>№ УНФ или отсутствует</label>
            {/* <ValidatedInput */}
            <InputMask
              name="unf"
              value={formData.unf || ''}
              onChange={handleChange}
              placeholder="890-000-000-00-000"
              mask="999-999-999-99-999"
              min={0}
              required
              showError={showErrors}
              errorMessage="Некорректное значение">
              {(inputProps) => <input {...inputProps} />}
              {/*  /> */}
            </InputMask>

          </div>
        </div>
        <div className='collumn'>
          <div className='inputField'>
            <label>Страна-производитель (копродукция)</label>
            <ValidatedSelect
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              placeholder="Страна"
              options={['Россия', 'США', 'Великобритания', 'Франция', 'Германия']}
              required
              showError={showErrors}
            />
          </div>
          <div className='inputField'>
            <label>
              Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть
            </label>
            <input
              name="estimatePrice"
              value={formData.estimatePrice || ''}
              // onChange={handleChange}
              placeholder="Сметная стоимость"
              required
              showError={showErrors}
              type="number"
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === '') {
                  handleChange(e);
                }
              }}
            />
          </div>
          <div className='inputField' id="textarea">
            <label>Синопсис</label>
            <textarea
              name="synopsis"
              value={formData.synopsis || ''}
              onChange={handleChange}
              placeholder="Описание"
              required
              showError={showErrors}
            />
          </div>
        </div>
      </div>
      <div className='stepFooter'>
        <ProgressBar currentStep={1} totalSteps={totalSteps} validateForm={handleNext} />
        <button
          className='nexStep'
          onClick={handleNext}
          style={{
            backgroundColor: isFormValid() ? '#5BCF83' : '#efefef',
            color: isFormValid() ? '#FFFFFF' : '#ACACAC'
          }}>
          Следующий шаг
          <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{
              stroke: isFormValid() ? '#FFFFFF' : '#ACACAC'
            }}>
            <path d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Step1;
