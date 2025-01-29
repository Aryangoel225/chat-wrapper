const cors = require("cors"); // ✅ Import CORS
app.use(cors()); // ✅ Allow all origins

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ Import CORS
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5000;

// ✅ Enable CORS for all requests
app.use(cors());
app.use(bodyParser.json());

// ✅ Initialize Google Generative AI
const genAI = new GoogleGenerativeAI({ apiKey: "YOUR_GOOGLE_API_KEY" });

app.post("/generate-travel-plan", async (req, res) => {
   const { destination, travelDates, preferences } = req.body;

   if (!destination || !travelDates || !preferences) {
       return res.status(400).json({ error: "All fields are required." });
   }

   try {
       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

       const prompt = `Create a travel itinerary for a trip to ${destination} on the dates ${travelDates}, considering these preferences: ${preferences}.`;

       const result = await model.generateContent({ prompt });

       res.json({ response: result.response.text });
   } catch (error) {
       console.error("Error generating travel plan:", error);
       res.status(500).json({ error: "Failed to generate travel plan. Please try again later." });
   }
});

app.listen(PORT, () => {
   console.log(`✅ Server running on http://localhost:${PORT}`);
});