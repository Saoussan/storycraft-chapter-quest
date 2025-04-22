
import { mockChapterGeneration } from './mockStoryApi';

const API_URL = 'http://localhost:8000';

export const generateChapter = async (topic: string): Promise<string> => {
  try {
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
      throw new Error('Failed to generate chapter');
    }

    const data = await response.json();
    return data.chapter;
  } catch (error) {
    console.error('Error generating chapter:', error);
    
    // Fallback to mock API when real API is unavailable
    console.log('Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
