const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 CORS middleware – allow dev + production
app.use(
  cors({
    origin: '*', 
  })
);

// (optional but extra-safe: ensure headers are always set)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${encodeURIComponent(
        city
      )}&days=7`
    );

    if (!response.ok) {
      console.error('Weather API responded with status:', response.status);
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch weather data' });
    }

    const data = await response.json();
    return res.json(data);
  } catch (e) {
    console.error('Weather API error:', e);
    return res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
