import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://127.0.0.1:5000/bfhl", parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid JSON input or server error");
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((opt) => opt !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes("Numbers") && (
          <div>
            <h3>Numbers</h3>
            <p>{response.numbers.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("Alphabets") && (
          <div>
            <h3>Alphabets</h3>
            <p>{response.alphabets.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("Highest alphabet") && (
          <div>
            <h3>Highest Alphabet</h3>
            <p>{response.highest_alphabet.join(", ")}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>{response?.roll_number || "BFHL Frontend"}</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON input"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleOptionChange}
          />{" "}
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleOptionChange}
          />{" "}
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest alphabet"
            onChange={handleOptionChange}
          />{" "}
          Highest Alphabet
        </label>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
