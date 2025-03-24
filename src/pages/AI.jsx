import React, { useState } from 'react';
import axios from 'axios';

import Menu from "../components/Menu"

import "./AI.css"

const AI = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  // Handle input field change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle submit button click
  const handleButtonClick = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter a prompt');
      return;
    }

    try {
      // Call Cohere API to generate text
      const generatedText = await generateText(inputValue);
      setResponse(generatedText); // Set the response to the generated text
    } catch (error) {
      console.error('Error generating text:', error);
      setResponse('There was an error generating the text');
    }

    setInputValue(''); // Clear the input field after submission
  };

  // Function to make the API call to Cohere
  const generateText = async (prompt) => {
    const apiKey = 'o6wravLGPwpZ5lT5EpXKPfMHTS3DjI5I7uU6VsRf'; // Replace with your API key
  
    try {
      const response = await axios.post(
        'https://api.cohere.ai/v2/chat', // Updated endpoint for Chat API V2
        {
          model: 'command-r-plus-08-2024', // Choose the appropriate model for your use case
          messages: [
            {
              role: 'user', // User's input message
              content: prompt, // The input prompt
            },
          ],
          max_tokens: 1000, // Set maximum tokens
          temperature: 0.75, // Adjust randomness
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // API key for authorization
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );
  
      // Make sure to adjust based on the actual response format
      return response.data.message.content[0].text; // Correctly extract the response text
    } catch (error) {
      console.error('Error generating text:', error);
      throw new Error('There was an error generating the text');
    }
  };
  

  return (
    <>
      <Menu />
      
      <div className="container">
      <h1 className="title">
        AI-Powered QnA
        </h1>
        <h3 className="AIsubtext">Use this tool while studying to get any of your questions answered</h3>
        {/* Input field for the prompt */}
        <div className="aiPromptContainer">
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your question"
            className="input-field"
            />

            {/* Submit button */}
            <button onClick={handleButtonClick} className="submit-button">
            Ask AI
            </button>
        </div>

        {/* Text box for displaying the result */}
        <div className="result-box">
          <textarea
            value={response}
            readOnly
            rows={10}
            className="result-textarea"
            placeholder='Response will be generated here'
          />
        </div>
      </div>
    </>
  );
};

export default AI;
