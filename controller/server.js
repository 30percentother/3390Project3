// BACKEND STARTER FILE 

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { addMessage, getMessages } = require('../Model/db')

const app = express()
const PORT = 3000

const WEATHER_API_KEY = '9055233e47a5f72f45363e40bbad40f3'; 
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/getMessages', async (req, res) => {
  try {
    const messages = await getMessages()
    res.json(messages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

app.post('/addMessage', async (req, res) => {
  try {
    const { username, message, lat, lon } = req.body
    const date = new Date().toLocaleString()
    const weatherApiUrl = `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`; // Get in Fahrenheit

    const weatherResponse = await fetch(weatherApiUrl);
    if (!weatherResponse.ok) {
      console.error(`Weather API error! Status: ${weatherResponse.status}`);
      // Optionally handle the error differently, maybe set default weather/temp
      await addMessage({ username, message, date, lat, lon, weather: 'N/A', temp: 'N/A' });
      return res.json({ status: 'Message saved (weather data unavailable)' });
    }
    const weatherData = await weatherResponse.json();

    let weather = 'Unknown';
    let temp = 'N/A';

    // Extract relevant information from the One Call API response
    if (weatherData && weatherData.current) {
      if (weatherData.current.weather && weatherData.current.weather.length > 0) {
        weather = weatherData.current.weather[0].main; // can also use weatherData.current.weather[0].description for more detail
      }
      temp = weatherData.current.temp;
    } else {
      console.warn('Could not parse relevant weather data:', weatherData);
    }

    await addMessage({ username, message, date, lat, lon, weather, temp });
    res.json({ status: 'Message saved' });
  } catch (err) {
    console.error('Error adding message or fetching weather:', err);
    res.status(500).json({ error: 'Failed to add message' });
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

