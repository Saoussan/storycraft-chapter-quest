
import { mockChapterGeneration } from './mockStoryApi';

const API_URL = 'http://localhost:8000';

export const generateChapter = async (topic: string): Promise<string> => {
  console.log('[storyApi] Starting chapter generation for topic:', topic);
  
  try {
    console.log('[storyApi] Attempting to connect to real API at:', API_URL);
    
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

    console.log('[storyApi] API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Failed to generate chapter: ${response.status}`);
    }

    const data = await response.json();
    console.log('[storyApi] Successfully generated chapter from API');
    return data.chapter;
  } catch (error) {
    console.error('[storyApi] Error generating chapter:', error);
    
    // Fallback to mock API when real API is unavailable
    console.log('[storyApi] Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
