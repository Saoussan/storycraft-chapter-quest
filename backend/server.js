
import express from 'express';
import cors from 'cors';
import { generateStoryChapter } from './storyGenerator.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/generate-chapter', async (req, res) => {
  try {
    const { topic } = req.body;
    const chapter = await generateStoryChapter(topic);
    res.json({ chapter });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate chapter' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
