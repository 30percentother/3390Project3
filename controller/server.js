// BACKEND STARTER FILE 

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { addMessage, getMessages, addAnswer, getAnswers } = require('../Model/db')

const app = express()
const PORT = 3000

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
    const weather = 'Clear' // replace with real API later
    const temp = '72' // placeholder temp

    await addMessage({ username, message, date, lat, lon, weather, temp })
    res.json({ status: 'Message saved' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add message' })
  }
})

// Get all Daily Question answers
app.get('/getAnswers', async (req, res) => {
  try {
    const answers = await getAnswers()
    res.json(answers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch answers' })
  }
})

// Add a Daily Question answer
app.post('/addAnswer', async (req, res) => {
  try {
    const { name, answer } = req.body
    const date = new Date().toLocaleString()

    await addAnswer({ name, answer, date })
    res.json({ status: 'Answer saved' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add answer' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
