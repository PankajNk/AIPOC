import React, { useState } from 'react';
import './App.css';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage1(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage2(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (image1 && image2) {
      setResult(`Generated result from combining ${image1.slice(0, 30)}... and ${image2.slice(0, 30)}...`);
    } else {
      setResult('Please select both images first');
    }
  };

  return (
    <div className="App">
      <h1>Image Generator App</h1>
      
      <div className="image-inputs">
        <div className="input-group">
          <label>Image 1:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImage1Change}
          />
          {image1 && <img src={image1} alt="Preview 1" className="preview" />}
        </div>

        <div className="input-group">
          <label>Image 2:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImage2Change}
          />
          {image2 && <img src={image2} alt="Preview 2" className="preview" />}
        </div>
      </div>

      <button className="generator-btn" onClick={handleGenerate}>
        Generator
      </button>

      <div className="result-box">
        <h3>Result:</h3>
        <div className="result-content">
          {result || 'No result yet. Select two images and click Generator.'}
        </div>
      </div>
    </div>
  );
}

export default App;