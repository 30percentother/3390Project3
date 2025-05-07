<template>
  <form @submit.prevent="submitMessage">
    <input v-model="username" placeholder="Your Name" required />
    <textarea v-model="message" placeholder="Your Message" required />
    <button type="submit">Post</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['messagePosted'])
const username = ref('')
const message = ref('')

const submitMessage = async () => {
  if (!navigator.geolocation) return alert('Location not supported.')
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const postData = {
      username: username.value,
      message: message.value,
      lat,
      lon
    }
    try {
       await axios.post('http://localhost:3000/addMessage', postData)
       emit('messagePosted')
      // Temporarily simulate post locally
     // postData.date = new Date().toLocaleString()
     // postData.weather = 'Clear'
     // postData.temp = '72'
     // emit('messagePosted', postData)

      username.value = ''
      message.value = ''
    } catch (err) {
      console.error('Failed to post message:', err)
    }
  })
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

input,
textarea {
  width: 100%;
  max-width: 100%;
  min-height: 60px;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  resize: vertical;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: #ffffff;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;

}

button:hover {
  background-color: #45a049;
}
</style>