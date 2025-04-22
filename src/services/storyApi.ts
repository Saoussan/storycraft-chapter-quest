
//const API_URL = 'http://localhost:8163';
//const API_URL = 'http://127.0.0.1:8163';
const API_URL = 'https://8163-gpu-l4-s-2u4js8n7fvax5-a.asia-southeast1-0.prod.colab.dev';


export const generateChapter = async (topic: string): Promise<string> => {
  try {
    console.log(`[storyApi] calling API`);
    const response = await fetch(`${API_URL}/generate-chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    console.log(`[storyApi] Response status:`, response.status);
    
    if (!response.ok) {
      console.error(`[storyApi] Request failed with status: ${response.status}`);
      const errorText = await response.text();
      console.error(`[storyApi] Error response:`, errorText);
      throw new Error(`Failed to generate chapter: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log(`[storyApi] Response data received successfully:`, data);
    return data.chapter;
  } catch (error) {
    console.error('[storyApi] Error generating chapter:', error);
    console.error('[storyApi] Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[storyApi] Error stack:', error instanceof Error ? error.stack : 'No stack available');
    
    // You might want to try a fallback to a mock API here if needed
    // console.log('[storyApi] Attempting to use mock API as fallback');
    // import { generateChapter as mockGenerateChapter } from './mockStoryApi';
    // return mockGenerateChapter(topic);
    
    throw error;
  }
};