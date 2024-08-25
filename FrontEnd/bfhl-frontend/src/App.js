import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or error in API call');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    if (selectedOptions.length === 0) {
      return (
        <div>
          <h3>Full JSON Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      );
    }

    return (
      <div>
        {selectedOptions.map(option => (
          <div key={option.value}>
            <h3>{option.label}</h3>
            <pre>
              {option.value === 'numbers'
                ? response[option.value].join(',')
                : JSON.stringify(response[option.value], null, 2)}
            </pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>{response ? response.roll_number : 'Frontend App'}</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="10"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      <Select
        isMulti
        options={options}
        onChange={setSelectedOptions}
      />
      {renderResponse()}
    </div>
  );
}

export default App;

