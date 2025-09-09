import React, { useState } from 'react';
import './App.css';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [dragOver1, setDragOver1] = useState(false);
  const [dragOver2, setDragOver2] = useState(false);

  const handleFileRead = (file, setImage) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    handleFileRead(file, setImage1);
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    handleFileRead(file, setImage2);
  };

  const handleDragOver = (e, setDragState) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState(true);
  };

  const handleDragLeave = (e, setDragState) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState(false);
  };

  const handleDrop = (e, setImage, setDragState) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileRead(files[0], setImage);
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
          <div 
            className={`drop-zone ${dragOver1 ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, setDragOver1)}
            onDragEnter={(e) => handleDragOver(e, setDragOver1)}
            onDragLeave={(e) => handleDragLeave(e, setDragOver1)}
            onDrop={(e) => handleDrop(e, setImage1, setDragOver1)}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImage1Change}
              className="file-input"
            />
            <div className="drop-zone-content">
              {image1 ? (
                <img src={image1} alt="Preview 1" className="preview" />
              ) : (
                <div className="drop-zone-text">
                  <p>Drag & drop an image here</p>
                  <p>or click to select</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="input-group">
          <label>Image 2:</label>
          <div 
            className={`drop-zone ${dragOver2 ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, setDragOver2)}
            onDragEnter={(e) => handleDragOver(e, setDragOver2)}
            onDragLeave={(e) => handleDragLeave(e, setDragOver2)}
            onDrop={(e) => handleDrop(e, setImage2, setDragOver2)}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImage2Change}
              className="file-input"
            />
            <div className="drop-zone-content">
              {image2 ? (
                <img src={image2} alt="Preview 2" className="preview" />
              ) : (
                <div className="drop-zone-text">
                  <p>Drag & drop an image here</p>
                  <p>or click to select</p>
                </div>
              )}
            </div>
          </div>
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