const fs = require('fs');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const processVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    // Here you would typically use a speech-to-text service to transcribe the video
    // For this example, we'll use a mock transcript
    const mockTranscript = "This is a mock transcript of the video content.";

    // Generate notes using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates concise notes from video transcripts." },
        { role: "user", content: `Generate concise notes from the following transcript:\n\n${mockTranscript}` }
      ],
    });

    const notes = completion.choices[0].message.content;

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ notes });
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'An error occurred while processing the video' });
  }
};

module.exports = { processVideo };