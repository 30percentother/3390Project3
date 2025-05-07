<template>
  <div class="daily-card">
    <h2>Daily Question</h2>
    <p class="question-text">Why did we procrastinate on this project?</p>
  </div>

  <div class="daily-form">
    <input
      type="text"
      placeholder="Your Name"
      class="name-input"
      v-model="name"
    />
    <textarea
      placeholder="Your answer..."
      v-model="answer"
    />
    <button @click="submitAnswer">Submit</button>
  </div>

  <div class="answer-list">
    <div
      v-for="(item, index) in answers"
      :key="index"
      class="answer-card"
    >
      <div class="info">
        <div class="username-tag">{{ item.name || 'Anonymous' }}</div>
        <p class="message-text">{{ item.answer }}</p>
        <div class="timestamp">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref('')
const answer = ref('')
const answers = ref([])

const fetchAnswers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/getAnswers')
    answers.value = res.data
  } catch (err) {
    console.error('Failed to fetch answers:', err)
  }
}

const submitAnswer = async () => {
  if (!name.value.trim() || !answer.value.trim()) return

  try {
    await axios.post('http://localhost:3000/addAnswer', {
      name: name.value,
      answer: answer.value
    })

    name.value = ''
    answer.value = ''
    await fetchAnswers()
  } catch (err) {
    console.error('Failed to submit answer:', err)
  }
}

onMounted(fetchAnswers)
</script>

<style scoped>
.daily-card {
  background-color: #bd00ff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  padding: 1rem;
  color: #333;
  width: 100%;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
}

.question-text {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0;
  text-align: center;
  color: #ffffff;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.daily-form {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

.name-input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  font-family: inherit;
}

textarea {
  width: 100%;
  min-height: 60px;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  resize: vertical;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

button {
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

button:hover {
  background-color: #45a049;
}

.answer-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 1rem;
}

.answer-card {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 8px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #FF6961; 
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
}

.username-tag {
  align-self: flex-start;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.message-text {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 auto;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.timestamp {
  margin-top: 12px;
  font-size: 0.75rem;
  opacity: 0.85;
  text-align: center;
}
</style>