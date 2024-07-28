import React, { useState } from 'react';
import './App.css';

const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
];

function convertToRoman(num) {
  let result = '';
  romanNumerals.forEach(item => {
    while (num >= item.value) {
      result += item.numeral;
      num -= item.value;
    }
  });
  return result;
}

function App() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);

  const handleConvert = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
      setResult('Please enter a valid date in the format yyyy-mm-dd');
      setError(true);
      setDate(''); // Clear the input field
      return;
    }

    const [year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      setResult('Please enter a valid date');
      setError(true);
      setDate(''); // Clear the input field
      return;
    }

    const dateObj = new Date(year, month - 1, day);
    if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
      setResult('Please enter a valid date');
      setError(true);
      setDate(''); // Clear the input field
      return;
    }

    const romanYear = convertToRoman(year);
    const romanMonth = convertToRoman(month);
    const romanDay = convertToRoman(day);

    setResult(`${date} in Roman numerals is ${romanYear}-${romanMonth}-${romanDay}`);
    setError(false);
    setDate(''); // Clear the input field
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <div className="container">
      <h1>Roman Numeral Date Converter</h1>
      <div className="input-group">
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a date (yyyy-mm-dd)"
          className="input-field"
        />
        <button onClick={handleConvert} className="convert-btn">Convert</button>
      </div>
      <p className={`output ${error ? 'error' : ''}`}>{result}</p>
    </div>
  );
}

export default App;
