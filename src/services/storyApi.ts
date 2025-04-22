
import { mockChapterGeneration } from './mockStoryApi';

// Update this URL to match your Flask backend
const API_URL = 'https://8163-gpu-l4-s-2u4js8n7fvax5-a.asia-southeast1-0.prod.colab.dev';

export const generateChapter = async (topic: string): Promise<string> => {
  try {
    console.log(`Attempting to connect to Flask backend at ${API_URL}/generate-chapter`);
    
    // Try to connect to the real Flask backend
    const response = await fetch(`${API_URL}/generate-chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
      // Add a timeout to avoid waiting too long for the server
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to generate chapter: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully received response from Flask backend');
    return data.chapter;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating chapter:', errorMessage);
    
    if (errorMessage.includes('blocked by CORS policy')) {
      console.error('CORS Error: Your Flask backend needs to enable CORS');
      console.error('Make sure your Flask server has the following code:');
      console.error(`
from flask import Flask
from flask_cors import FLASK_CORS

app = Flask(__name__)
CORS(app, origins=['https://3000-gpu-l4-s-2u4js8n7fvax5-a.asia-southeast1-0.prod.colab.dev'])
      `);
    }
    
    // Fallback to mock API when real API is unavailable
    console.log('Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
