
const API_URL = 'http://localhost:8000';

export const generateChapter = async (topic: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/generate-chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate chapter');
    }

    const data = await response.json();
    return data.chapter;
  } catch (error) {
    console.error('Error generating chapter:', error);
    throw error;
  }
};
