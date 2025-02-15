const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Multer (File Upload Setup)
const upload = multer({ dest: "uploads/" });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// Convert Image to Base64
const encodeImage = (filePath) => fs.readFileSync(filePath, "base64");

// Parse AI Response
const parseAIKey = (keyword, response) => {
  const parts = response.split(`${keyword}==`);
  return parts.length > 1 ? parts[1].split("\n")[0].trim() : "";
};

// Scrap Analysis API
app.post("/scrapify", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const imageBase64 = encodeImage(req.file.path);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Updated Model

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            {
              text: `Analyze this image and return details about its scrap value. Follow the format:
                title==<short title>
                desc==<detailed description>
                short_des==<short description>
                shape==<shape of the object>
                color==<color of the object>
                price==<estimated lowest price in rupees without any additional text>
                quality_score==<quality score out of 100%  without any additional text>
                recyclability_score==<recyclability score out of 100%  without any additional text>
                material==[material1, material2]
                attributes==[list of key features]
                elements==[list of abundant elements]
                scrap==yes or no
                `,
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const responseText = result.response.text();

    // Extract information from AI response
    const scrapData = {
      title: parseAIKey("title", responseText),
      desc: parseAIKey("desc", responseText),
      short_des: parseAIKey("short_des", responseText),
      shape: parseAIKey("shape", responseText),
      color: parseAIKey("color", responseText),
      price: parseAIKey("price", responseText),
      quality_score: parseAIKey("quality_score", responseText),
      recyclability_score: parseAIKey("recyclability_score", responseText),
      material: parseAIKey("material", responseText)
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((x) => x.trim()),
      attributes: parseAIKey("attributes", responseText)
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((x) => x.trim()),
      elements: parseAIKey("elements", responseText),
      scrap: parseAIKey("scrap", responseText) === "yes",
      time: new Date(),
    };

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    res.json(scrapData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Repurposing Ideas API
app.post("/repurpose", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const imageBase64 = encodeImage(req.file.path);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            {
              text: `Suggest creative repurposing ideas for this object in a list format with minimum of 5 points:
                ideas==[idea1, idea2, idea3,idea4]
                `,
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const responseText = result.response.text();

    const ideas = parseAIKey("ideas", responseText)
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map((x) => x.trim());

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
