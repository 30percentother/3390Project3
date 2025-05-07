// DATABASE MODEL FILE

const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Database connection
const db = new sqlite3.Database(path.resolve(__dirname, 'messages.db'), (err) => {
  if (err) return console.error('DB connection error:', err)
  console.log('✅ Connected to SQLite database')
})

// Create messages table if it doesn't exist
const init = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      message TEXT,
      date TEXT,
      lat REAL,
      lon REAL,
      weather TEXT,
      temp TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      answer TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `)
}
init()

// Save a message to the database
function addMessage({ username, message, date, lat, lon, weather, temp }) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO messages (username, message, date, lat, lon, weather, temp) VALUES (?, ?, ?, ?, ?, ?, ?)`
    db.run(sql, [username, message, date, lat, lon, weather, temp], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

// Get all messages from the database
function getMessages() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

// Save a daily answer to the database
function addAnswer({ name, answer, date }) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO answers (name, answer, date) VALUES (?, ?, ?)`
    db.run(sql, [name, answer, date], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

// Get all daily answers from the database
function getAnswers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM answers ORDER BY id DESC', [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

module.exports = { addMessage, getMessages, addAnswer, getAnswers }
