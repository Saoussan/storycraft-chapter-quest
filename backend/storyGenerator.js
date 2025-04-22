
import fetch from 'node-fetch';

// Replace with the Flask backend URL and port
const FLASK_API_URL = 'http://localhost:5000/generate-chapter';

const generateStoryChapter = async (topic) => {
  try {
    // Send a POST request to the Flask API with the topic
    const response = await fetch(FLASK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Expecting Flask to return { chapter: "..." }
    return data.chapter;
  } catch (error) {
    console.error('Error calling Flask API:', error);
    // Optionally, return a fallback or propagate the error
    throw error;
  }
};

export { generateStoryChapter };

