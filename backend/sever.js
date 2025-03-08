const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
const upload = multer({ dest: "uploads/" });

// Tamil-to-English dictionary
const translations = {
    "வணக்கம்": "Hello",
    "நன்றி": "Thank you",
    "குட்பை": "Goodbye",
    "எப்படி இருக்கிறீர்கள்?": "How are you?",
    "நான் நன்றாக இருக்கிறேன்": "I am fine"
};

// **1. Translate Text Input**
app.post("/translate", (req, res) => {
    const text = req.body.text.trim();
    const translatedText = translations[text] || "Translation not available";
    res.json({ translated_text: translatedText });
});

// **2. Translate Text from File**
app.post("/upload-text", upload.single("file"), (req, res) => {
    const filePath = req.file.path;
    const text = fs.readFileSync(filePath, "utf-8").trim();
    fs.unlinkSync(filePath);  // Delete file after reading
    const translatedText = translations[text] || "Translation not available";
    res.json({ translated_text: translatedText });
});

// **3. Translate Text from Image**
app.post("/upload-image", upload.single("file"), (req, res) => {
    const filePath = req.file.path;

    Tesseract.recognize(filePath, "tam") // Tamil OCR
        .then(({ data: { text } }) => {
            fs.unlinkSync(filePath);
            const extractedText = text.trim();
            const translatedText = translations[extractedText] || "Translation not available";
            res.json({ translated_text: translatedText });
        })
        .catch(() => res.status(500).json({ error: "Error processing image" }));
});

// **Start Server**
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
