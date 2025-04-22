
import { mockChapterGeneration } from './mockStoryApi';

// Use the proxy endpoint instead of directly calling the Flask backend
const API_ENDPOINT = '/api/generate-chapter';

export const generateChapter = async (topic: string): Promise<string> => {
  try {
    console.log(`Attempting to connect to Flask backend via proxy at ${API_ENDPOINT}`);
    
    // Try to connect to the real Flask backend via the proxy
    const response = await fetch(API_ENDPOINT, {
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
    
    // Fallback to mock API when real API is unavailable
    console.log('Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
