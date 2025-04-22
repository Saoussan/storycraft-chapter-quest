
import { mockChapterGeneration } from './mockStoryApi';

const API_URL = 'http://localhost:8000';

export const generateChapter = async (topic: string): Promise<string> => {
  try {
    console.log('Attempting to connect to API at:', API_URL);
    
    // Try to connect to the real Flask backend
    const response = await fetch(`${API_URL}/generate-chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
      // Add a timeout to avoid waiting too long for the server
      signal: AbortSignal.timeout(3000), // Reduced timeout to 3 seconds for faster fallback
    });

    if (!response.ok) {
      console.warn(`API returned error status: ${response.status}`);
      throw new Error(`Failed to generate chapter: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully received chapter from API');
    return data.chapter;
  } catch (error) {
    console.error('Error generating chapter:', error);
    
    // Check if the error is a connection refused error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.warn('Connection to backend server failed. Make sure your Flask server is running on http://localhost:8000');
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      console.warn('Connection to backend timed out after 3 seconds');
    }
    
    // Fallback to mock API when real API is unavailable
    console.log('Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
