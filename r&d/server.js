const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const API_BASE_URL = 'http://192.168.0.100:8000';

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve the main HTML file (index2.html as default)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html'));
});

// Also serve index2.html directly
app.get('/index2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html'));
});

// Serve static files (your HTML file) - but our routes above will take precedence
app.use(express.static(__dirname));

// Proxy routes for API endpoints
app.get('/api/health', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching health:', error.message);
    res.status(500).json({
      error: 'Failed to fetch health data',
      details: error.message
    });
  }
});

app.get('/api/latest', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/latest`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching latest:', error.message);
    res.status(500).json({
      error: 'Failed to fetch latest data',
      details: error.message
    });
  }
});

app.get('/api/time-series', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/time-series`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching time-series:', error.message);
    res.status(500).json({
      error: 'Failed to fetch time-series data',
      details: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to ${API_BASE_URL}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});