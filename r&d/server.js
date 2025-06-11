const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API Configuration - can be set via environment variables
const API_BASE_IP = process.env.RPI_IP || '192.168.0.101';
const API_PORT = process.env.RPI_PORT || '8000';
const API_BASE_URL = `http://${API_BASE_IP}:${API_PORT}`;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve the main HTML file (index2.html as default)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Also serve index2.html directly
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files (your HTML file) - but our routes above will take precedence
app.use(express.static(__dirname));

// Configuration endpoint - allows dashboard to get server config
app.get('/config', (req, res) => {
  res.json({
    api_base_ip: API_BASE_IP,
    api_port: API_PORT,
    proxy_mode: true // Indicates we're using proxy mode
  });
});

// Proxy routes for API endpoints
app.get('/api/health', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching health:', error.message);
    res.status(500).json({
      error: 'Failed to fetch health data',
      details: error.message,
      target_url: `${API_BASE_URL}/health`
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
      details: error.message,
      target_url: `${API_BASE_URL}/latest`
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
      details: error.message,
      target_url: `${API_BASE_URL}/time-series`
    });
  }
});

// Fallback endpoint (some APIs might use this)
app.get('/time-series', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/time-series`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching fallback time-series:', error.message);
    res.status(500).json({
      error: 'Failed to fetch time-series data',
      details: error.message,
      target_url: `${API_BASE_URL}/time-series`
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to ${API_BASE_URL}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
  console.log(`⚙️  To change RPi IP: set RPI_IP environment variable (current: ${API_BASE_IP})`);
  console.log(`⚙️  To change RPi port: set RPI_PORT environment variable (current: ${API_PORT})`);
});