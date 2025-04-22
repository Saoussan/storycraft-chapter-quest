
import { mockChapterGeneration } from './mockStoryApi';

const API_URL = 'http://localhost:8000';

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
      const errorText = await response.text();
      console.error(`Server responded with status ${response.status}: ${errorText}`);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully received response from Flask backend');
    return data.chapter;
  } catch (error) {
    // Provide more specific error messages based on the error type
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Connection refused: Flask server is not running or not accessible at', API_URL);
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Request timed out: Flask server took too long to respond');
    } else {
      console.error('Error generating chapter:', error);
    }
    
    // Fallback to mock API when real API is unavailable
    console.log('Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
