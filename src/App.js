import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import './style/Step.css'
import './style/ValidatedInput.css'


export const FormContext = createContext();

function App() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {};
  });

  const totalSteps = 2;

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const resetFormData = () => {
    setFormData({});
    localStorage.removeItem('formData');
  };
  const handleCancel = () => {
    const clearedFields = Object.keys(formData).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFormData(clearedFields);

  };
  return (
    <FormContext.Provider value={{ formData, setFormData, resetFormData, totalSteps }}>
      <Router>
        <header className='mainHeader'>
          <div className='headerContent'>
          <div className='mainTitle'>Производственные параметры фильма</div>
          <button className='clearAll' onClick={handleCancel}>
            Отменить заполнение
          </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          {/* Добавьте другие маршруты */}
        </Routes>
      </Router>
    </FormContext.Provider>
  );
}

export default App;
