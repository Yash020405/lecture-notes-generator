const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const { processVideo } = require('./videoController');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/process-video', upload.single('video'), processVideo);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;